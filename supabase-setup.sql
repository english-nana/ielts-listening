-- ============================================================================
-- IELTS LISTENING (SURVIVAL ENGLISH) — SUPABASE DATABASE SETUP
-- ============================================================================
-- An toàn khi chạy trên cùng dự án Supabase với VSTEP Writing & Speaking Part 1:
-- - Giữ nguyên toàn bộ bảng teachers, profiles, writing_submissions, speaking_attempts hiện có
-- - Bổ sung bảng riêng public.ielts_listening_submissions
-- - Bảo vệ cột teacher_score, teacher_feedback ở tầng Database Trigger (RLS)
--
-- Cách chạy:
-- 1. Mở Supabase Dashboard -> SQL Editor -> New query
-- 2. Dán toàn bộ file này và bấm nút RUN
-- 3. Vào Authentication -> URL Configuration -> Redirect URLs và thêm domain GitHub Pages của bạn
-- ============================================================================

-- 1. ĐẢM BẢO BẢNG GIÁO VIÊN & HÀM is_teacher() TỒN TẠI
create table if not exists public.teachers (
  email text primary key,
  full_name text default '',
  created_at timestamptz not null default now()
);

alter table public.teachers enable row level security;

insert into public.teachers (email, full_name)
values ('mtung0208@gmail.com', 'Giáo viên')
on conflict (email) do nothing;

create or replace function public.is_teacher()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1
    from public.teachers
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

drop policy if exists "Teachers can read own record" on public.teachers;
create policy "Teachers can read own record"
  on public.teachers for select
  using (lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')));

-- 2. ĐẢM BẢO BẢNG HỒ SƠ HỌC VIÊN (PROFILES) TỒN TẠI
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text not null default '',
  avatar_url text not null default '',
  auth_provider text not null default 'email',
  created_at timestamptz not null default now(),
  last_active_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Profiles: student read own or teacher read all" on public.profiles;
create policy "Profiles: student read own or teacher read all"
  on public.profiles for select
  using (auth.uid() = id or public.is_teacher());

drop policy if exists "Profiles: student insert own" on public.profiles;
create policy "Profiles: student insert own"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "Profiles: student update own or teacher update" on public.profiles;
create policy "Profiles: student update own or teacher update"
  on public.profiles for update
  using (auth.uid() = id or public.is_teacher())
  with check (auth.uid() = id or public.is_teacher());

drop policy if exists "Profiles: teacher delete any" on public.profiles;
create policy "Profiles: teacher delete any"
  on public.profiles for delete
  using (public.is_teacher());

create or replace function public.teacher_delete_student(target_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  if not public.is_teacher() then
    raise exception 'Permission denied: only teachers can delete accounts';
  end if;
  if target_user_id is null then
    raise exception 'Missing target_user_id';
  end if;
  if target_user_id = auth.uid() then
    raise exception 'Cannot delete your own active teacher account';
  end if;

  delete from auth.users where id = target_user_id;
end;
$$;

-- Tự động tạo hồ sơ học viên khi đăng ký / đăng nhập Google lần đầu (cần thiết cho Project Supabase mới)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url, auth_provider)
  values (
    new.id,
    lower(coalesce(new.email, '')),
    coalesce(
      nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''),
      nullif(trim(new.raw_user_meta_data ->> 'name'), ''),
      split_part(coalesce(new.email, 'Học viên'), '@', 1)
    ),
    coalesce(new.raw_user_meta_data ->> 'avatar_url', new.raw_user_meta_data ->> 'picture', ''),
    coalesce(new.raw_app_meta_data ->> 'provider', 'email')
  )
  on conflict (id) do update set
    email = excluded.email,
    full_name = case when public.profiles.full_name = '' then excluded.full_name else public.profiles.full_name end,
    avatar_url = case when excluded.avatar_url <> '' then excluded.avatar_url else public.profiles.avatar_url end,
    auth_provider = excluded.auth_provider,
    last_active_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. BẢNG BÀI NỘP IELTS LISTENING (UNIT THREE: SURVIVAL ENGLISH — EX 01–15)
create table if not exists public.ielts_listening_submissions (
  id text primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  section_group text not null default 'section1',
  exercise_id text not null,
  exercise_title text not null default '',
  track_name text not null default '',
  answers_json jsonb not null default '{}'::jsonb,
  results_json jsonb not null default '[]'::jsonb,
  correct_count int not null default 0,
  total_questions int not null default 0,
  score_percent int not null default 0,
  estimated_band text not null default '',
  attempts_count int not null default 1,
  is_submitted boolean not null default true,
  submitted_at timestamptz not null default now(),
  teacher_score text not null default '',
  teacher_feedback text not null default '',
  teacher_updated_at timestamptz,
  student_seen_feedback_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, exercise_id)
);

create index if not exists idx_ielts_listening_user
  on public.ielts_listening_submissions (user_id, exercise_id);

create index if not exists idx_ielts_listening_submitted
  on public.ielts_listening_submissions (is_submitted, submitted_at desc);

alter table public.ielts_listening_submissions enable row level security;

drop policy if exists "Listening: student read own or teacher read all" on public.ielts_listening_submissions;
create policy "Listening: student read own or teacher read all"
  on public.ielts_listening_submissions for select
  using (auth.uid() = user_id or public.is_teacher());

drop policy if exists "Listening: student insert own" on public.ielts_listening_submissions;
create policy "Listening: student insert own"
  on public.ielts_listening_submissions for insert
  with check (auth.uid() = user_id);

drop policy if exists "Listening: student update own or teacher grade" on public.ielts_listening_submissions;
create policy "Listening: student update own or teacher grade"
  on public.ielts_listening_submissions for update
  using (auth.uid() = user_id or public.is_teacher())
  with check (auth.uid() = user_id or public.is_teacher());

drop policy if exists "Listening: student delete own or teacher delete" on public.ielts_listening_submissions;
create policy "Listening: student delete own or teacher delete"
  on public.ielts_listening_submissions for delete
  using (auth.uid() = user_id or public.is_teacher());

-- Bảo vệ cột nhận xét & điểm giáo viên không bị học viên tự chỉnh sửa
create or replace function public.protect_listening_teacher_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_teacher() and coalesce(auth.role(), '') <> 'service_role' then
    if tg_op = 'INSERT' then
      new.teacher_feedback := '';
      new.teacher_score := '';
      new.teacher_updated_at := null;
      new.student_seen_feedback_at := null;
    else
      new.teacher_feedback := old.teacher_feedback;
      new.teacher_score := old.teacher_score;
      new.teacher_updated_at := old.teacher_updated_at;
    end if;
  else
    if tg_op = 'UPDATE'
       and (new.teacher_feedback is distinct from old.teacher_feedback
            or new.teacher_score is distinct from old.teacher_score) then
      new.teacher_updated_at := now();
      new.student_seen_feedback_at := null;
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_protect_listening_teacher_fields on public.ielts_listening_submissions;
create trigger trg_protect_listening_teacher_fields
  before insert or update on public.ielts_listening_submissions
  for each row execute procedure public.protect_listening_teacher_fields();

-- Học viên đánh dấu đã xem thông báo nhận xét từ Giáo viên
create or replace function public.mark_listening_feedback_seen(p_submission_id text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.ielts_listening_submissions
  set student_seen_feedback_at = coalesce(student_seen_feedback_at, now())
  where id = p_submission_id
    and user_id = auth.uid();
end;
$$;

-- 4. CẤP QUYỀN TRUY CẬP SCHEMA & BẢNG
grant usage on schema public to anon, authenticated, service_role;
grant select on table public.teachers to authenticated, service_role;
grant select, insert, update, delete on table public.profiles to authenticated, service_role;
grant select, insert, update, delete on table public.ielts_listening_submissions to authenticated, service_role;
grant execute on function public.is_teacher() to anon, authenticated, service_role;
grant execute on function public.teacher_delete_student(uuid) to authenticated, service_role;
grant execute on function public.mark_listening_feedback_seen(text) to authenticated, service_role;
