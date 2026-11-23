// ============================================================================
// IELTS LISTENING (SURVIVAL ENGLISH) — SHARED SUPABASE CLOUD CLIENT & UTILITIES
// ============================================================================

(function () {
  const CLASS_LIST = ["ONB204", "CB221"];

  const EXERCISES_CATALOG = [
    { id: "ex-01", num: "01", sectionGroup: "section1", track: "53.MP3", ieltsPart: "IELTS Part 1", questionType: "Note Completion", title: "Ex 01 · Health problems (53.MP3)", shortTitle: "Health problems" },
    { id: "ex-02", num: "02", sectionGroup: "section1", track: "54.MP3", ieltsPart: "IELTS Part 1", questionType: "Note Completion", title: "Ex 02 · In a camera shop (54.MP3)", shortTitle: "In a camera shop" },
    { id: "ex-03", num: "03", sectionGroup: "section1", track: "55.MP3", ieltsPart: "IELTS Part 1", questionType: "Table / Matching", title: "Ex 03 · In the restaurant (55.MP3)", shortTitle: "In the restaurant" },
    { id: "ex-04", num: "04", sectionGroup: "section1", track: "56.MP3", ieltsPart: "IELTS Part 1", questionType: "Form Completion", title: "Ex 04 · At the reception desk in a hotel (56.MP3)", shortTitle: "At the reception desk" },
    { id: "ex-05", num: "05", sectionGroup: "section1", track: "57.MP3", ieltsPart: "IELTS Part 2", questionType: "Sentence Completion", title: "Ex 05 · Christmas (57.MP3)", shortTitle: "Christmas" },
    { id: "ex-06", num: "06", sectionGroup: "section1", track: "58.MP3", ieltsPart: "IELTS Part 1/3", questionType: "Summary Completion", title: "Ex 06 · Trip to Stonehenge (58.MP3)", shortTitle: "Trip to Stonehenge" },
    { id: "ex-07", num: "07", sectionGroup: "section1", track: "59.MP3", ieltsPart: "IELTS Part 3", questionType: "Summary Completion", title: "Ex 07 · Marriage (59.MP3)", shortTitle: "Marriage" },
    { id: "ex-08", num: "08", sectionGroup: "section1", track: "60.MP3", ieltsPart: "IELTS Part 2", questionType: "Map Labelling", title: "Ex 08 · University campus (60.MP3)", shortTitle: "University campus" },
    { id: "ex-09", num: "09", sectionGroup: "section2", track: "61.MP3", ieltsPart: "IELTS Part 3/4", questionType: "Summary Completion", title: "Ex 09 · Music in New Orleans (61.MP3)", shortTitle: "Music in New Orleans" },
    { id: "ex-10", num: "10", sectionGroup: "section2", track: "62.MP3", ieltsPart: "IELTS Part 1", questionType: "Table Completion", title: "Ex 10 · Talking to a landlady (62.MP3)", shortTitle: "Talking to a landlady" },
    { id: "ex-11", num: "11", sectionGroup: "section2", track: "63.MP3", ieltsPart: "IELTS Part 2/4", questionType: "Pick from a List & Summary", title: "Ex 11 · The news (63.MP3)", shortTitle: "The news" },
    { id: "ex-12", num: "12", sectionGroup: "section2", track: "64.MP3", ieltsPart: "IELTS Part 2", questionType: "Multiple Choice & Note Completion", title: "Ex 12 · Some interesting places to go (64.MP3)", shortTitle: "Some interesting places" },
    { id: "ex-13", num: "13", sectionGroup: "section2", track: "65.MP3", ieltsPart: "IELTS Part 2", questionType: "Note & Table Completion", title: "Ex 13 · Trip to Belfast (65.MP3)", shortTitle: "Trip to Belfast" },
    { id: "ex-14", num: "14", sectionGroup: "section2", track: "66.MP3", ieltsPart: "IELTS Part 2/4", questionType: "Note, Table & Sentence Completion", title: "Ex 14 · TV and radio (66.MP3)", shortTitle: "TV and radio" },
    { id: "ex-15", num: "15", sectionGroup: "section2", track: "67.MP3", ieltsPart: "IELTS Part 2/4", questionType: "Table Completion & True/False", title: "Ex 15 · Sports (67.MP3)", shortTitle: "Sports" }
  ];

  let cachedClient = null;

  function getClient() {
    if (cachedClient) return cachedClient;
    const cfg = window.SUPABASE_CONFIG || {};
    const url = String(cfg.url || "").trim().replace(/\/+$/, "");
    const anonKey = String(cfg.anonKey || "").trim();
    if (!url || !anonKey || !window.supabase || typeof window.supabase.createClient !== "function") {
      return null;
    }
    cachedClient = window.supabase.createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
    return cachedClient;
  }

  function getRedirectUrl() {
    return window.location.origin + window.location.pathname;
  }

  async function signInWithGoogle() {
    const client = getClient();
    if (!client) return { error: new Error("Chưa cấu hình Supabase.") };
    return client.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: getRedirectUrl(),
        queryParams: { prompt: "select_account" }
      }
    });
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatDateTime(isoOrText) {
    if (!isoOrText) return "";
    const d = new Date(isoOrText);
    if (isNaN(d.getTime())) return String(isoOrText);
    const pad = n => (n < 10 ? "0" + n : "" + n);
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  function parseFullNameAndClass(rawFullName) {
    const raw = String(rawFullName || "").trim();
    const match = raw.match(/^\[([A-Za-z0-9_-]+)\]\s*(.*)$/);
    if (match) {
      const candidateClass = match[1].toUpperCase();
      if (CLASS_LIST.includes(candidateClass)) {
        return {
          className: candidateClass,
          fullName: match[2].trim()
        };
      }
    }
    return {
      className: "",
      fullName: raw
    };
  }

  function formatStoredFullName(fullName, className) {
    const cleanName = String(fullName || "").trim();
    const upperClass = String(className || "").trim().toUpperCase();
    return upperClass && CLASS_LIST.includes(upperClass)
      ? `[${upperClass}] ${cleanName}`
      : cleanName;
  }

  function getInitials(name) {
    const parts = String(name || "")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    if (parts.length === 0) return "HV";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function renderGoogleIconSvg(size) {
    const s = size || 18;
    return `
      <svg width="${s}" height="${s}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    `;
  }

  function estimateIeltsBand(correct, total) {
    if (!total || total <= 0) return "—";
    const pct = (correct / total) * 100;
    if (pct >= 95) return "Band 9.0";
    if (pct >= 88) return "Band 8.5";
    if (pct >= 80) return "Band 8.0";
    if (pct >= 72) return "Band 7.5";
    if (pct >= 65) return "Band 7.0";
    if (pct >= 58) return "Band 6.5";
    if (pct >= 50) return "Band 6.0";
    if (pct >= 42) return "Band 5.5";
    if (pct >= 34) return "Band 5.0";
    if (pct >= 25) return "Band 4.5";
    return "Band 4.0";
  }

  function getBandColorClass(pct) {
    if (pct >= 80) return "band-high";
    if (pct >= 60) return "band-mid";
    return "band-low";
  }

  function renderResultsBreakdownHtml(resultsArr) {
    const list = Array.isArray(resultsArr) ? resultsArr : [];
    if (list.length === 0) return "";
    return `
      <div class="ai-corr-table-wrap">
        <table class="ai-corr-table">
          <thead>
            <tr>
              <th style="width:64px;">Câu</th>
              <th style="width:36%;">Câu trả lời của học viên</th>
              <th style="width:36%;">Đáp án chuẩn (Answer Key)</th>
              <th style="width:96px;">Kết quả</th>
            </tr>
          </thead>
          <tbody>
            ${list
              .map(
                item => `
                <tr>
                  <td class="ai-col-num">${escapeHtml(item.label || item.id)}</td>
                  <td>
                    <span class="${item.isCorrect ? "il-ans-ok" : "il-ans-bad"}">
                      ${escapeHtml(item.userAnswer || "(Bỏ trống)")}
                    </span>
                  </td>
                  <td style="font-weight:700;color:#166534;">${escapeHtml(item.expected || "")}</td>
                  <td>
                    <span class="il-res-pill ${item.isCorrect ? "ok" : "bad"}">
                      ${item.isCorrect ? "✓ Đúng" : "✗ Sai"}
                    </span>
                  </td>
                </tr>
              `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  window.ListeningCloud = {
    CLASS_LIST,
    EXERCISES_CATALOG,
    getClient,
    getRedirectUrl,
    signInWithGoogle,
    escapeHtml,
    formatDateTime,
    parseFullNameAndClass,
    formatStoredFullName,
    getInitials,
    renderGoogleIconSvg,
    estimateIeltsBand,
    getBandColorClass,
    renderResultsBreakdownHtml
  };
})();
