// ============================================================================
// IELTS LISTENING — UNIT THREE: SURVIVAL ENGLISH
// Interactive Studio Engine, Audio/TTS Player, Auto-Grader & Supabase Cloud Sync
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    const CLOUD = window.ListeningCloud || null;
    const DATA = window.IELTS_LISTENING_DATA || { EXERCISES: [], byId: {} };
    const EXERCISES = DATA.EXERCISES || [];
    const esc = CLOUD ? CLOUD.escapeHtml : (s => String(s || ''));
    const fmtTime = CLOUD ? CLOUD.formatDateTime : (s => String(s || ''));

    // ========================================================================
    // 1. GLOBAL RUNTIME STATE
    // ========================================================================
    let currentAccount = null;
    let currentExerciseId = EXERCISES[0] ? EXERCISES[0].id : 'ex-01';
    let currentLeftTab = 'pre'; // 'pre' | 'script' | 'key'
    let activeMapTargetId = '1';
    let isHighlightModeActive = false;
    let wsFontSize = 15;

    const unlockedScriptSet = new Set();
    const unlockedKeySet = new Set();
    const showAllViSet = new Set();
    const showEvidenceSet = new Set();

    const authState = {
        authMode: 'login',
        authError: '',
        authInfo: '',
        authLoading: false,
        isTeacher: false,
        needsProfileSetup: false,
        profileFormName: '',
        profileFormClass: CLOUD && CLOUD.CLASS_LIST ? CLOUD.CLASS_LIST[0] : 'ONB204',
        profileFormError: '',
        profileSaving: false,
        regSelectedClass: CLOUD && CLOUD.CLASS_LIST ? CLOUD.CLASS_LIST[0] : 'ONB204',
        submissionsByExId: {},
        notifOpen: false,
        notifPollTimer: null,
        isSubmitting: false,
        localPreviewMode: false
    };

    // Debounced Draft Saver (matches VSTEP Writing)
    const draftSaver = (() => {
        const pending = new Map();
        let timerId = null;

        const flush = () => {
            if (timerId) {
                clearTimeout(timerId);
                timerId = null;
            }
            if (pending.size === 0) return;
            pending.forEach((val, key) => {
                try { localStorage.setItem(key, val); } catch (e) {}
            });
            pending.clear();
        };

        const schedule = (key, value) => {
            pending.set(key, value);
            if (!timerId) {
                timerId = setTimeout(flush, 250);
            }
        };

        window.addEventListener('pagehide', flush);
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') flush();
        });

        return { schedule, flush };
    })();

    function getUserScopedKey(baseKey) {
        return currentAccount && currentAccount.id ? `${baseKey}__${currentAccount.id}` : baseKey;
    }

    function getDraftKey(exId) {
        return getUserScopedKey(`ielts_listen_draft_${exId}`);
    }

    function getLocalSubStoreKey() {
        return getUserScopedKey('ielts_listen_local_subs_v1');
    }

    function loadLocalFallbackSubs() {
        try {
            const raw = localStorage.getItem(getLocalSubStoreKey());
            return raw ? JSON.parse(raw) : {};
        } catch (e) {
            return {};
        }
    }

    function saveLocalFallbackSub(exId, row) {
        try {
            const map = loadLocalFallbackSubs();
            map[exId] = row;
            localStorage.setItem(getLocalSubStoreKey(), JSON.stringify(map));
        } catch (e) {}
    }

    function loadDraftAnswers(exId) {
        try {
            const raw = localStorage.getItem(getDraftKey(exId));
            return raw ? JSON.parse(raw) : {};
        } catch (e) {
            return {};
        }
    }

    function saveDraftAnswers(exId, answersObj) {
        draftSaver.schedule(getDraftKey(exId), JSON.stringify(answersObj || {}));
        const hintEl = document.getElementById('ws-autosave-hint');
        if (hintEl) {
            hintEl.textContent = 'Đã lưu nháp ✓';
            clearTimeout(hintEl._t);
            hintEl._t = setTimeout(() => {
                hintEl.textContent = 'Tự động lưu nháp';
            }, 1400);
        }
    }

    function getCloudSub(exId) {
        return (authState.submissionsByExId && authState.submissionsByExId[exId]) || null;
    }

    // ========================================================================
    // 2. SPEECH SYNTHESIS (WORD PRONUNCIATION + MISSING TRACK 62 FALLBACK)
    // ========================================================================
    function speakEnglish(text, rate = 0.95) {
        if (!('speechSynthesis' in window) || !text) return;
        try {
            window.speechSynthesis.cancel();
            const utter = new SpeechSynthesisUtterance(text);
            utter.lang = 'en-GB';
            utter.rate = rate;
            const voices = window.speechSynthesis.getVoices();
            const preferred = voices.find(v => /en-GB|en_GB/i.test(v.lang)) || voices.find(v => /^en/i.test(v.lang));
            if (preferred) utter.voice = preferred;
            window.speechSynthesis.speak(utter);
        } catch (e) {}
    }

    // ========================================================================
    // 3. STUDIO AUDIO PLAYER + A-B LOOP + TTS DIALOGUE FALLBACK (EX 10)
    // ========================================================================
    const audioEl = document.getElementById('studio-audio-el');
    const playBtn = document.getElementById('audio-play-btn');
    const playIcon = document.getElementById('audio-play-icon');
    const backBtn = document.getElementById('audio-back-btn');
    const fwdBtn = document.getElementById('audio-fwd-btn');
    const trackNameEl = document.getElementById('audio-track-name');
    const seekGroupEl = document.getElementById('audio-seek-group');
    const seekSlider = document.getElementById('audio-seek-slider');
    const curTimeEl = document.getElementById('audio-cur-time');
    const durTimeEl = document.getElementById('audio-dur-time');
    const abMarkersEl = document.getElementById('audio-ab-markers');
    const abBtn = document.getElementById('audio-ab-btn');
    const abLabelEl = document.getElementById('audio-ab-label');
    const muteBtn = document.getElementById('audio-mute-btn');
    const muteIcon = document.getElementById('audio-mute-icon');
    const ttsStatusEl = document.getElementById('audio-tts-status');
    const ttsProgressEl = document.getElementById('audio-tts-progress');

    const audioState = {
        rate: 1,
        pointA: null,
        pointB: null,
        useTtsFallback: false,
        ttsPlaying: false,
        ttsIndex: 0
    };

    function formatClock(sec) {
        if (!isFinite(sec) || sec < 0) return '00:00';
        const m = Math.floor(sec / 60).toString().padStart(2, '0');
        const s = Math.floor(sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    function stopTtsPlayback() {
        audioState.ttsPlaying = false;
        if ('speechSynthesis' in window) {
            try { window.speechSynthesis.cancel(); } catch (e) {}
        }
        updatePlayIcon(false);
    }

    function stopAllAudio() {
        stopTtsPlayback();
        if (audioEl) {
            try { audioEl.pause(); } catch (e) {}
        }
        updatePlayIcon(false);
    }

    function updatePlayIcon(isPlaying) {
        if (playIcon) {
            playIcon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
        }
        if (playBtn) {
            playBtn.classList.toggle('playing', isPlaying);
        }
    }

    function resetAbLoop() {
        audioState.pointA = null;
        audioState.pointB = null;
        if (abBtn) abBtn.classList.remove('active');
        if (abLabelEl) abLabelEl.textContent = 'A-B';
        if (abMarkersEl) abMarkersEl.innerHTML = '';
    }

    function renderAbOverlay() {
        if (!abMarkersEl || !audioEl || !audioEl.duration) return;
        const dur = audioEl.duration;
        if (audioState.pointA !== null && audioState.pointB !== null) {
            const leftPct = (audioState.pointA / dur) * 100;
            const widthPct = Math.max(1, ((audioState.pointB - audioState.pointA) / dur) * 100);
            abMarkersEl.innerHTML = `<div class="il-ab-highlight" style="left:${leftPct}%;width:${widthPct}%;"></div>`;
        } else if (audioState.pointA !== null) {
            const leftPct = (audioState.pointA / dur) * 100;
            abMarkersEl.innerHTML = `<div class="il-ab-highlight" style="left:${leftPct}%;width:2px;"></div>`;
        } else {
            abMarkersEl.innerHTML = '';
        }
    }

    function activateTtsFallbackForExercise(ex) {
        audioState.useTtsFallback = true;
        audioState.ttsIndex = 0;
        audioState.ttsPlaying = false;
        if (seekGroupEl) seekGroupEl.style.display = 'none';
        if (ttsStatusEl) ttsStatusEl.style.display = 'flex';
        if (abBtn) abBtn.style.display = 'none';
        if (ttsProgressEl) {
            ttsProgressEl.textContent = `Sẵn sàng đọc ${ex.tapescript.length} lượt thoại (bấm Play ▶)`;
        }
        updatePlayIcon(false);
    }

    function playTtsFromIndex(ex, idx) {
        if (!('speechSynthesis' in window)) {
            if (ttsProgressEl) ttsProgressEl.textContent = 'Trình duyệt không hỗ trợ Web Speech TTS.';
            return;
        }
        if (!ex || !ex.tapescript || idx >= ex.tapescript.length) {
            audioState.ttsPlaying = false;
            audioState.ttsIndex = 0;
            if (ttsProgressEl) ttsProgressEl.textContent = 'Đã đọc xong toàn bộ hội thoại — bấm Play để nghe lại.';
            updatePlayIcon(false);
            return;
        }

        audioState.ttsPlaying = true;
        audioState.ttsIndex = idx;
        updatePlayIcon(true);

        const turn = ex.tapescript[idx];
        if (ttsProgressEl) {
            ttsProgressEl.textContent = `Đang đọc lượt ${idx + 1}/${ex.tapescript.length} (${turn.speaker}): ${turn.en.slice(0, 58)}...`;
        }

        const utter = new SpeechSynthesisUtterance(turn.en);
        utter.lang = 'en-GB';
        utter.rate = audioState.rate;
        utter.pitch = turn.speaker === 'A' ? 0.92 : 1.12;
        const voices = window.speechSynthesis.getVoices();
        const enVoices = voices.filter(v => /^en/i.test(v.lang));
        if (enVoices.length > 0) {
            utter.voice = turn.speaker === 'A' ? enVoices[0] : (enVoices[1] || enVoices[0]);
        }

        utter.onend = () => {
            if (audioState.ttsPlaying && currentExerciseId === ex.id) {
                playTtsFromIndex(ex, idx + 1);
            }
        };
        utter.onerror = () => {
            audioState.ttsPlaying = false;
            updatePlayIcon(false);
        };

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utter);
    }

    function loadAudioForExercise(ex) {
        stopAllAudio();
        resetAbLoop();
        audioState.useTtsFallback = false;
        audioState.ttsIndex = 0;

        if (trackNameEl) trackNameEl.textContent = ex.trackLabel;
        if (seekGroupEl) seekGroupEl.style.display = 'flex';
        if (ttsStatusEl) ttsStatusEl.style.display = 'none';
        if (abBtn) abBtn.style.display = 'inline-flex';
        if (curTimeEl) curTimeEl.textContent = '00:00';
        if (durTimeEl) durTimeEl.textContent = ex.duration.includes(':') ? ex.duration : '00:00';
        if (seekSlider) seekSlider.value = 0;

        if (audioEl) {
            audioEl.src = `./${ex.trackFile}`;
            audioEl.playbackRate = audioState.rate;
            audioEl.load();
        }
    }

    if (audioEl) {
        audioEl.addEventListener('loadedmetadata', () => {
            audioState.useTtsFallback = false;
            if (durTimeEl) durTimeEl.textContent = formatClock(audioEl.duration);
            if (seekSlider) {
                seekSlider.max = audioEl.duration || 100;
                seekSlider.value = 0;
            }
        });

        audioEl.addEventListener('timeupdate', () => {
            if (audioState.useTtsFallback) return;
            const t = audioEl.currentTime || 0;
            if (curTimeEl) curTimeEl.textContent = formatClock(t);
            if (seekSlider) seekSlider.value = t;
            if (audioState.pointA !== null && audioState.pointB !== null && t >= audioState.pointB) {
                audioEl.currentTime = audioState.pointA;
            }
        });

        audioEl.addEventListener('play', () => updatePlayIcon(true));
        audioEl.addEventListener('pause', () => updatePlayIcon(false));
        audioEl.addEventListener('ended', () => {
            if (audioState.pointA !== null && audioState.pointB !== null) {
                audioEl.currentTime = audioState.pointA;
                audioEl.play().catch(() => {});
            } else {
                updatePlayIcon(false);
            }
        });

        audioEl.addEventListener('error', () => {
            const ex = DATA.byId[currentExerciseId];
            if (ex) activateTtsFallbackForExercise(ex);
        });
    }

    if (playBtn) {
        playBtn.addEventListener('click', () => {
            const ex = DATA.byId[currentExerciseId];
            if (!ex) return;
            if (audioState.useTtsFallback) {
                if (audioState.ttsPlaying) {
                    stopTtsPlayback();
                } else {
                    playTtsFromIndex(ex, audioState.ttsIndex || 0);
                }
                return;
            }
            if (audioEl.paused) {
                audioEl.playbackRate = audioState.rate;
                audioEl.play().catch(() => {
                    activateTtsFallbackForExercise(ex);
                    playTtsFromIndex(ex, 0);
                });
            } else {
                audioEl.pause();
            }
        });
    }

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            const ex = DATA.byId[currentExerciseId];
            if (audioState.useTtsFallback) {
                const nextIdx = Math.max(0, audioState.ttsIndex - 1);
                if (ex) playTtsFromIndex(ex, nextIdx);
                return;
            }
            if (audioEl) audioEl.currentTime = Math.max(0, (audioEl.currentTime || 0) - 5);
        });
    }

    if (fwdBtn) {
        fwdBtn.addEventListener('click', () => {
            const ex = DATA.byId[currentExerciseId];
            if (audioState.useTtsFallback) {
                const nextIdx = Math.min((ex ? ex.tapescript.length - 1 : 0), audioState.ttsIndex + 1);
                if (ex) playTtsFromIndex(ex, nextIdx);
                return;
            }
            if (audioEl && audioEl.duration) {
                audioEl.currentTime = Math.min(audioEl.duration, (audioEl.currentTime || 0) + 5);
            }
        });
    }

    if (seekSlider) {
        seekSlider.addEventListener('input', () => {
            if (!audioState.useTtsFallback && audioEl) {
                audioEl.currentTime = parseFloat(seekSlider.value) || 0;
            }
        });
    }

    if (abBtn) {
        abBtn.addEventListener('click', () => {
            if (audioState.useTtsFallback || !audioEl || !audioEl.duration) return;
            if (audioState.pointA === null) {
                audioState.pointA = audioEl.currentTime || 0;
                abBtn.classList.add('active');
                if (abLabelEl) abLabelEl.textContent = `A: ${formatClock(audioState.pointA)}`;
                renderAbOverlay();
            } else if (audioState.pointB === null) {
                const b = audioEl.currentTime || 0;
                if (b <= audioState.pointA + 0.5) {
                    resetAbLoop();
                    return;
                }
                audioState.pointB = b;
                if (abLabelEl) abLabelEl.textContent = `${formatClock(audioState.pointA)}–${formatClock(audioState.pointB)}`;
                renderAbOverlay();
                audioEl.currentTime = audioState.pointA;
            } else {
                resetAbLoop();
            }
        });
    }

    document.querySelectorAll('[data-audio-rate]').forEach(btn => {
        btn.addEventListener('click', () => {
            const r = parseFloat(btn.getAttribute('data-audio-rate')) || 1;
            audioState.rate = r;
            if (audioEl) audioEl.playbackRate = r;
            document.querySelectorAll('[data-audio-rate]').forEach(b => b.classList.toggle('active', b === btn));
        });
    });

    if (muteBtn && audioEl) {
        muteBtn.addEventListener('click', () => {
            audioEl.muted = !audioEl.muted;
            if (muteIcon) muteIcon.className = audioEl.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
        });
    }

    // Spacebar Play/Pause shortcut inside Listening Studio (when not typing)
    document.addEventListener('keydown', (e) => {
        const studioTab = document.getElementById('listening-studio');
        if (!studioTab || !studioTab.classList.contains('active')) return;
        const tag = (document.activeElement && document.activeElement.tagName) || '';
        if (['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(tag)) return;
        if (e.code === 'Space') {
            e.preventDefault();
            if (playBtn) playBtn.click();
        }
    });

    // ========================================================================
    // 4. SPLIT RESIZER, COUNTDOWN TIMER, FONT SIZE & HIGHLIGHT PEN
    // ========================================================================
    function attachSplitResizer(resizerEl, workspaceEl, minPct, maxPct) {
        if (!resizerEl || !workspaceEl) return;
        let rafId = null;
        let latestX = 0;

        const applyWidth = () => {
            rafId = null;
            const rect = workspaceEl.getBoundingClientRect();
            if (rect.width <= 0) return;
            let pct = ((latestX - rect.left) / rect.width) * 100;
            pct = Math.max(minPct, Math.min(maxPct, pct));
            workspaceEl.style.setProperty('--left-pane-width', `${pct.toFixed(1)}%`);
        };

        const onMouseMove = (e) => {
            latestX = e.clientX;
            if (!rafId) rafId = requestAnimationFrame(applyWidth);
        };

        const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
            resizerEl.classList.remove('dragging');
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };

        resizerEl.addEventListener('mousedown', (e) => {
            e.preventDefault();
            resizerEl.classList.add('dragging');
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
        });
    }

    attachSplitResizer(
        document.getElementById('listening-split-resizer'),
        document.getElementById('listening-split-workspace'),
        28,
        70
    );

    // Countdown Timer
    const timerBtn = document.getElementById('studio-timer-btn');
    const timerDisplay = document.getElementById('studio-timer-display');
    let timerSeconds = 300;
    let timerDefaultSeconds = 300;
    let timerInterval = null;

    function renderTimerDisplay() {
        if (!timerDisplay) return;
        const m = Math.floor(timerSeconds / 60).toString().padStart(2, '0');
        const s = (timerSeconds % 60).toString().padStart(2, '0');
        timerDisplay.textContent = `${m}:${s}`;
    }

    function resetStudioTimer(defaultSec) {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        timerDefaultSeconds = defaultSec || 300;
        timerSeconds = timerDefaultSeconds;
        if (timerBtn) timerBtn.classList.remove('running', 'warning');
        renderTimerDisplay();
    }

    if (timerBtn) {
        timerBtn.addEventListener('click', () => {
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
                timerBtn.classList.remove('running');
                return;
            }
            if (timerSeconds <= 0) {
                timerSeconds = timerDefaultSeconds;
                timerBtn.classList.remove('warning');
            }
            timerBtn.classList.add('running');
            timerInterval = setInterval(() => {
                if (timerSeconds > 0) {
                    timerSeconds--;
                    renderTimerDisplay();
                    if (timerSeconds <= 60) {
                        timerBtn.classList.remove('running');
                        timerBtn.classList.add('warning');
                    }
                } else {
                    clearInterval(timerInterval);
                    timerInterval = null;
                    if (timerDisplay) timerDisplay.textContent = 'Hết giờ!';
                }
            }, 1000);
        });
    }

    // Font Size Controls
    const wsBodyEl = document.getElementById('ws-body-container');
    function applyWsFontSize() {
        if (wsBodyEl) wsBodyEl.style.setProperty('--ws-font-size', `${wsFontSize}px`);
    }
    const btnFontDec = document.getElementById('btn-font-dec');
    const btnFontReset = document.getElementById('btn-font-reset');
    const btnFontInc = document.getElementById('btn-font-inc');
    if (btnFontDec) btnFontDec.onclick = () => { wsFontSize = Math.max(12, wsFontSize - 1); applyWsFontSize(); };
    if (btnFontReset) btnFontReset.onclick = () => { wsFontSize = 15; applyWsFontSize(); };
    if (btnFontInc) btnFontInc.onclick = () => { wsFontSize = Math.min(22, wsFontSize + 1); applyWsFontSize(); };

    // Highlight Pen Tool (matches VSTEP Writing)
    const highlightBtn = document.getElementById('btn-highlight-toggle');
    if (highlightBtn) {
        highlightBtn.addEventListener('click', () => {
            isHighlightModeActive = !isHighlightModeActive;
            highlightBtn.classList.toggle('active', isHighlightModeActive);
            document.body.classList.toggle('highlight-mode-active', isHighlightModeActive);
        });
    }

    document.addEventListener('mouseup', () => {
        if (!isHighlightModeActive) return;
        const sel = window.getSelection();
        if (!sel || sel.isCollapsed || !sel.rangeCount) return;
        const range = sel.getRangeAt(0);
        const container = range.commonAncestorContainer.nodeType === 1
            ? range.commonAncestorContainer
            : range.commonAncestorContainer.parentNode;
        if (!container || (!container.closest('#ws-body-container') && !container.closest('#left-pane-script'))) {
            return;
        }
        try {
            const mark = document.createElement('mark');
            mark.className = 'custom-highlight';
            range.surroundContents(mark);
            sel.removeAllRanges();
        } catch (e) {}
    });

    document.addEventListener('click', (e) => {
        if (!isHighlightModeActive) return;
        const mark = e.target.closest('mark.custom-highlight');
        if (mark && mark.parentNode) {
            const parent = mark.parentNode;
            while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
            parent.removeChild(mark);
            parent.normalize();
        }
    });

    // ========================================================================
    // 5. NAVIGATION, SIDEBAR, FOCUS LESSON MODE & QUICK SEARCH (⌘K)
    // ========================================================================
    const appLayout = document.getElementById('main-app-layout');
    const tabContents = document.querySelectorAll('.tab-content');
    const sidebarCollapseBtn = document.getElementById('ej-sidebar-collapse-btn');
    const mobileMenuBtn = document.getElementById('ej-mobile-menu-btn');
    const sidebarBackdrop = document.getElementById('ej-sidebar-backdrop');
    const topbarSearchWrap = document.getElementById('ej-topbar-search-wrap');
    const focusNavGroup = document.getElementById('ej-focus-nav-group');
    const dashboardCrumbEl = document.getElementById('vs-dashboard-crumb');
    const topbarBackBtn = document.getElementById('topbar-back-btn');
    const topbarBackText = document.getElementById('topbar-back-text');
    const brandTagEl = document.getElementById('topbar-brand-tag');
    const brandTitleEl = document.getElementById('topbar-brand-title');
    const contextDividerEl = document.getElementById('topbar-context-divider');
    const contextLabelEl = document.getElementById('topbar-context-label');
    const quickSearchInput = document.getElementById('ej-quick-search-input');
    const quickSearchDropdown = document.getElementById('ej-search-dropdown');

    const DASHBOARD_SIDEBAR_VIEWS = new Set([
        'home-dashboard',
        'section1-hub',
        'section2-hub',
        'my-submissions',
        'vocab-bank'
    ]);

    const VIEW_META = {
        'home-dashboard': { mode: 'home', label: '', parent: null },
        'section1-hub': { mode: 'sec1', label: 'Phần 1 · Tình huống Đời sống', parent: 'home-dashboard' },
        'section2-hub': { mode: 'sec2', label: 'Phần 2 · Văn hóa & Học thuật', parent: 'home-dashboard' },
        'my-submissions': { mode: 'home', label: 'Bài nghe đã nộp', parent: 'home-dashboard' },
        'vocab-bank': { mode: 'home', label: 'Kho Từ vựng Survival English', parent: 'home-dashboard' },
        'ly-thuyet': { mode: 'sec1', label: 'Chiến thuật Nghe & Mục lục 15 Bài', parent: 'section1-hub' },
        'listening-studio': { mode: 'studio', label: '', parent: 'section1-hub' }
    };

    const viewHistory = ['home-dashboard'];

    function closeMobileSidebar() {
        if (appLayout) appLayout.classList.remove('mobile-sidebar-open');
    }

    try {
        if (appLayout && localStorage.getItem('ielts_listen_sidebar_collapsed') === '1') {
            appLayout.classList.add('sidebar-collapsed');
        }
    } catch (e) {}

    if (sidebarCollapseBtn && appLayout) {
        sidebarCollapseBtn.addEventListener('click', () => {
            const collapsed = appLayout.classList.toggle('sidebar-collapsed');
            try { localStorage.setItem('ielts_listen_sidebar_collapsed', collapsed ? '1' : '0'); } catch (e) {}
        });
    }

    if (mobileMenuBtn && appLayout) {
        mobileMenuBtn.addEventListener('click', () => appLayout.classList.toggle('mobile-sidebar-open'));
    }
    if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeMobileSidebar);

    document.querySelectorAll('[data-sb-toggle]').forEach(toggleBtn => {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const cardEl = document.getElementById(toggleBtn.getAttribute('data-sb-toggle'));
            if (!cardEl) return;
            const collapsed = cardEl.classList.toggle('collapsed');
            toggleBtn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
        });
    });

    function updateTopbarForView(viewId) {
        const meta = VIEW_META[viewId] || VIEW_META['home-dashboard'];
        const isDashboardView = DASHBOARD_SIDEBAR_VIEWS.has(viewId);

        if (appLayout) {
            appLayout.classList.toggle('focus-lesson-mode', !isDashboardView);
            appLayout.classList.toggle('split-tab-active', viewId === 'listening-studio');
        }
        if (topbarSearchWrap) topbarSearchWrap.style.display = isDashboardView ? 'flex' : 'none';
        if (focusNavGroup) focusNavGroup.style.display = isDashboardView ? 'none' : 'flex';

        if (dashboardCrumbEl) {
            if (viewId === 'section1-hub') dashboardCrumbEl.textContent = 'Phần 1 · Ex 01 – 08';
            else if (viewId === 'section2-hub') dashboardCrumbEl.textContent = 'Phần 2 · Ex 09 – 15';
            else if (viewId === 'my-submissions') dashboardCrumbEl.textContent = 'Bài nghe đã nộp';
            else if (viewId === 'vocab-bank') dashboardCrumbEl.textContent = 'Kho Từ vựng & IPA';
            else dashboardCrumbEl.textContent = 'Tổng quan · 15 Bài nghe';
        }

        document.querySelectorAll('.ej-sb-item[data-sb-view]').forEach(item => {
            item.classList.toggle('active', item.getAttribute('data-sb-view') === viewId);
        });

        const ex = DATA.byId[currentExerciseId];
        if (brandTagEl && brandTitleEl) {
            if (viewId === 'listening-studio' && ex) {
                brandTagEl.textContent = `UNIT THREE · ${ex.trackLabel}`;
                brandTitleEl.textContent = `Exercise ${ex.num}`;
            } else {
                brandTagEl.textContent = 'BASIC IELTS LISTENING · UNIT 3';
                brandTitleEl.textContent = 'Survival English';
            }
        }

        const contextText = viewId === 'listening-studio' && ex
            ? `${ex.title} — ${ex.ieltsPart} · ${ex.shortType}`
            : meta.label;

        if (contextDividerEl && contextLabelEl) {
            const showContext = !isDashboardView && Boolean(contextText);
            contextDividerEl.style.display = showContext ? 'inline-block' : 'none';
            contextLabelEl.style.display = showContext ? 'inline-block' : 'none';
            contextLabelEl.textContent = showContext ? contextText : '';
        }

        if (topbarBackBtn) {
            topbarBackBtn.style.display = isDashboardView ? 'none' : 'inline-flex';
            if (topbarBackText) {
                if (viewId === 'listening-studio' && ex) {
                    topbarBackText.textContent = ex.sectionGroup === 'section2' ? 'Phần 2 (Ex 09–15)' : 'Phần 1 (Ex 01–08)';
                } else {
                    const prevView = viewHistory.length > 1
                        ? viewHistory[viewHistory.length - 2]
                        : 'home-dashboard';
                    if (prevView === 'section1-hub') topbarBackText.textContent = 'Phần 1 (Ex 01–08)';
                    else if (prevView === 'section2-hub') topbarBackText.textContent = 'Phần 2 (Ex 09–15)';
                    else if (prevView === 'my-submissions') topbarBackText.textContent = 'Bài đã nộp';
                    else if (prevView === 'home-dashboard') topbarBackText.textContent = 'Tổng quan';
                    else topbarBackText.textContent = 'Quay lại';
                }
            }
        }
    }

    function navigateToView(targetView, options = {}) {
        if (!targetView) return;
        const { fromBack = false } = options;
        closeMobileSidebar();

        if (targetView !== 'listening-studio') {
            stopAllAudio();
        }

        if (!fromBack) {
            if (targetView === 'home-dashboard') {
                viewHistory.length = 0;
                viewHistory.push('home-dashboard');
            } else if (viewHistory[viewHistory.length - 1] !== targetView) {
                viewHistory.push(targetView);
            }
        }

        updateTopbarForView(targetView);

        tabContents.forEach(tc => tc.classList.remove('active'));
        const activeEl = document.getElementById(targetView);
        if (activeEl) activeEl.classList.add('active');

        if (targetView === 'my-submissions') renderMySubmissionsView();
        if (targetView === 'vocab-bank') renderVocabBankGrid();

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function openExercise(exId, opts = {}) {
        const ex = DATA.byId[exId];
        if (!ex) return;
        currentExerciseId = ex.id;
        currentLeftTab = opts.leftTab || 'pre';
        renderExerciseStudio(ex);
        navigateToView('listening-studio');
        markFeedbackAsSeen(ex.id);
    }

    function goBackView() {
        const curView = viewHistory[viewHistory.length - 1];
        if (curView === 'listening-studio') {
            const ex = DATA.byId[currentExerciseId];
            const targetHub = ex && ex.sectionGroup === 'section2' ? 'section2-hub' : 'section1-hub';
            viewHistory.length = 0;
            viewHistory.push('home-dashboard', targetHub);
            navigateToView(targetHub, { fromBack: true });
            return;
        }
        if (viewHistory.length > 1) {
            viewHistory.pop();
            navigateToView(viewHistory[viewHistory.length - 1], { fromBack: true });
            return;
        }
        navigateToView('home-dashboard', { fromBack: true });
    }

    if (topbarBackBtn) topbarBackBtn.addEventListener('click', goBackView);

    document.addEventListener('click', (e) => {
        const openViewBtn = e.target.closest('[data-open-view]');
        if (openViewBtn) {
            navigateToView(openViewBtn.getAttribute('data-open-view'));
            return;
        }
        const openExBtn = e.target.closest('[data-open-exercise]');
        if (openExBtn) {
            openExercise(openExBtn.getAttribute('data-open-exercise'));
        }
    });

    // Quick Search (⌘K / Ctrl+K)
    function normalizeSearchText(str) {
        return String(str || '')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd');
    }

    const SEARCH_ITEMS = [
        { title: 'Chiến thuật Nghe IELTS & Mục lục 15 Bài', sub: 'Quy trình 3 bước, 7 dạng câu hỏi & lưu ý tránh bẫy', tag: 'Lý thuyết', view: 'ly-thuyet' },
        { title: 'Kho Từ vựng Survival English & Phát âm IPA', sub: '150+ cụm từ Pre-Listening & Script kèm chế độ ẩn nghĩa', tag: 'Từ vựng', view: 'vocab-bank' },
        ...EXERCISES.map(ex => ({
            title: `Ex ${ex.num}: ${ex.title} (${ex.trackLabel})`,
            sub: `${ex.titleVi} · ${ex.ieltsPart} · ${ex.shortType}`,
            tag: ex.trackLabel,
            exerciseId: ex.id,
            extra: ex.wordBank.map(w => `${w.word} ${w.vi}`).join(' ')
        }))
    ];

    function renderQuickSearchResults(query) {
        if (!quickSearchDropdown) return;
        const normQ = normalizeSearchText(query).trim();
        const matches = normQ
            ? SEARCH_ITEMS.filter(item =>
                normalizeSearchText(`${item.title} ${item.sub} ${item.tag} ${item.extra || ''}`).includes(normQ)
            )
            : SEARCH_ITEMS.slice(0, 9);

        if (matches.length === 0) {
            quickSearchDropdown.innerHTML = `<div class="ej-search-empty">Không tìm thấy bài nghe khớp với “${esc(query)}”.</div>`;
        } else {
            quickSearchDropdown.innerHTML = matches.map((item, idx) => `
                <button type="button" class="ej-search-result-btn" data-qs-idx="${idx}">
                    <div>
                        <div class="ej-search-res-title">${esc(item.title)}</div>
                        <div class="ej-search-res-sub">${esc(item.sub)}</div>
                    </div>
                    <span class="ej-search-res-tag">${esc(item.tag)}</span>
                </button>
            `).join('');

            quickSearchDropdown.querySelectorAll('[data-qs-idx]').forEach(btn => {
                btn.onclick = () => {
                    const chosen = matches[parseInt(btn.getAttribute('data-qs-idx'), 10)];
                    if (!chosen) return;
                    quickSearchDropdown.style.display = 'none';
                    if (quickSearchInput) quickSearchInput.value = '';
                    if (chosen.exerciseId) openExercise(chosen.exerciseId);
                    else if (chosen.view) navigateToView(chosen.view);
                };
            });
        }
        quickSearchDropdown.style.display = 'block';
    }

    if (quickSearchInput && quickSearchDropdown) {
        quickSearchInput.addEventListener('focus', () => renderQuickSearchResults(quickSearchInput.value));
        quickSearchInput.addEventListener('input', () => renderQuickSearchResults(quickSearchInput.value));
        quickSearchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                quickSearchDropdown.style.display = 'none';
                quickSearchInput.blur();
            } else if (e.key === 'Enter') {
                const firstBtn = quickSearchDropdown.querySelector('.ej-search-result-btn');
                if (firstBtn) { e.preventDefault(); firstBtn.click(); }
            }
        });
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#ej-topbar-search-wrap')) {
                quickSearchDropdown.style.display = 'none';
            }
        });
        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                if (topbarSearchWrap && topbarSearchWrap.style.display !== 'none') {
                    e.preventDefault();
                    quickSearchInput.focus();
                    renderQuickSearchResults(quickSearchInput.value);
                }
            }
        });
    }

    // ========================================================================
    // 6. POPULATE SIDEBAR, HUB GRIDS, OVERVIEW TABLE & VOCABULARY BANK
    // ========================================================================
    function buildStaticAndDynamicCatalogs() {
        const sbSec1 = document.getElementById('sb-list-sec1');
        const sbSec2 = document.getElementById('sb-list-sec2');
        const exSelect = document.getElementById('studio-ex-select');
        const vocabFilterEx = document.getElementById('vocab-filter-ex');
        const overviewTbody = document.getElementById('theory-track-overview-tbody');

        if (sbSec1) {
            const theoryBtn = `<button type="button" class="vs-sb-lesson-btn" data-open-view="ly-thuyet"><span class="vs-sb-num">00</span><span>Chiến thuật &amp; Mục lục</span></button>`;
            sbSec1.innerHTML = theoryBtn + EXERCISES.filter(e => e.sectionGroup === 'section1').map(ex => `
                <button type="button" class="vs-sb-lesson-btn" data-open-exercise="${ex.id}" data-sb-lesson-id="${ex.id}">
                    <span class="vs-sb-num">${ex.num}</span>
                    <span>${esc(ex.title)}</span>
                </button>
            `).join('');
        }

        if (sbSec2) {
            sbSec2.innerHTML = EXERCISES.filter(e => e.sectionGroup === 'section2').map(ex => `
                <button type="button" class="vs-sb-lesson-btn" data-open-exercise="${ex.id}" data-sb-lesson-id="${ex.id}">
                    <span class="vs-sb-num">${ex.num}</span>
                    <span>${esc(ex.title)}</span>
                </button>
            `).join('');
        }

        if (exSelect) {
            exSelect.innerHTML = EXERCISES.map(ex => `
                <option value="${ex.id}">Ex ${ex.num} · ${esc(ex.title)} (${ex.trackLabel})</option>
            `).join('');
            exSelect.onchange = () => openExercise(exSelect.value);
        }

        if (vocabFilterEx) {
            vocabFilterEx.innerHTML = `<option value="all">Tất cả 15 bài nghe</option>` + EXERCISES.map(ex => `
                <option value="${ex.id}">Ex ${ex.num} · ${esc(ex.title)} (${ex.trackLabel})</option>
            `).join('');
        }

        if (overviewTbody) {
            overviewTbody.innerHTML = EXERCISES.map(ex => `
                <tr>
                    <td style="font-family:'JetBrains Mono',monospace;font-weight:800;">Ex ${ex.num}</td>
                    <td>
                        <div style="font-weight:800;color:#18181B;">${esc(ex.title)}</div>
                        <div style="font-size:12px;color:#71717A;">${esc(ex.titleVi)}</div>
                    </td>
                    <td><span class="class-badge-pill">${esc(ex.ieltsPart)}</span></td>
                    <td>${esc(ex.questionType)}</td>
                    <td style="font-family:'JetBrains Mono',monospace;font-weight:700;">${ex.trackLabel}</td>
                    <td>
                        <button type="button" class="draft-mini-btn" data-open-exercise="${ex.id}">
                            Vào nghe →
                        </button>
                    </td>
                </tr>
            `).join('');
        }

        renderHubCards();
    }

    function renderExerciseCardHtml(ex) {
        const sub = getCloudSub(ex.id);
        const badgeHtml = sub && sub.is_submitted
            ? `<span class="nb-status-badge status-done">✓ ${sub.correct_count}/${sub.total_questions} (${sub.score_percent}%) · ${esc(sub.estimated_band || '')}</span>`
            : `<span class="nb-status-badge status-ready">${esc(ex.trackLabel)} · ${ex.questions.length} câu</span>`;

        return `
            <button type="button" class="nb-unit-card" data-open-exercise="${ex.id}">
                <div class="nb-card-top">
                    <span class="nb-unit-num">${ex.num}</span>
                    ${badgeHtml}
                </div>
                <h3 class="nb-card-title">${esc(ex.title)}</h3>
                <div class="nb-card-vi">${esc(ex.titleVi)}</div>
                <p class="nb-card-desc">${esc(ex.ieltsPart)} · <strong>${esc(ex.questionType)}</strong>. Gồm ${ex.wordBank.length} từ vựng Pre-Listening, bài tập tương tác, Tapescript dịch nghĩa từng câu và Đáp án giải thích.</p>
                <div class="nb-card-footer">
                    <div class="nb-card-meta">
                        <span><i class="fas fa-headphones"></i> ${esc(ex.trackLabel)} (${esc(ex.duration)})</span>
                        <span><i class="far fa-check-square"></i> ${ex.questions.length} câu</span>
                    </div>
                    <span class="nb-card-cta">${sub && sub.is_submitted ? 'Nghe lại' : 'Vào học'} <i class="fas fa-arrow-right"></i></span>
                </div>
            </button>
        `;
    }

    function renderHubCards() {
        const sec1Grid = document.getElementById('section1-cards-grid');
        const sec2Grid = document.getElementById('section2-cards-grid');

        if (sec1Grid) {
            const theoryCard = `
                <button type="button" class="nb-unit-card" data-open-view="ly-thuyet">
                    <div class="nb-card-top">
                        <span class="nb-unit-num num-muted">00</span>
                        <span class="nb-status-badge status-ready">Nền tảng</span>
                    </div>
                    <h3 class="nb-card-title">Listening Strategy &amp; Track Overview</h3>
                    <div class="nb-card-vi">Chiến thuật Nghe 3 Bước &amp; Mục lục 15 Bài</div>
                    <p class="nb-card-desc">Tổng hợp quy trình Pre–While–Post Listening, 7 dạng câu hỏi IELTS Listening trọng tâm và các quy tắc tránh mất điểm chính tả/bẫy đổi ý.</p>
                    <div class="nb-card-footer">
                        <div class="nb-card-meta">
                            <span><i class="fas fa-compass"></i> 3 bước chuẩn</span>
                            <span><i class="fas fa-list-ol"></i> 15 Tracks</span>
                        </div>
                        <span class="nb-card-cta">Xem lý thuyết <i class="fas fa-arrow-right"></i></span>
                    </div>
                </button>
            `;
            sec1Grid.innerHTML = theoryCard + EXERCISES.filter(e => e.sectionGroup === 'section1').map(renderExerciseCardHtml).join('');
        }

        if (sec2Grid) {
            sec2Grid.innerHTML = EXERCISES.filter(e => e.sectionGroup === 'section2').map(renderExerciseCardHtml).join('');
        }
    }

    // Vocabulary Bank
    const ALL_VOCAB = [];
    EXERCISES.forEach(ex => {
        const seen = new Set();
        ex.wordBank.forEach(w => {
            const key = w.word.toLowerCase();
            seen.add(key);
            ALL_VOCAB.push({ exId: ex.id, exNum: ex.num, exTitle: ex.title, word: w.word, ipa: w.ipa, pos: 'Word Bank', vi: w.vi });
        });
        (ex.scriptVocab || []).forEach(w => {
            const key = w.word.toLowerCase();
            if (!seen.has(key)) {
                ALL_VOCAB.push({ exId: ex.id, exNum: ex.num, exTitle: ex.title, word: w.word, ipa: '', pos: w.pos || 'Script', vi: w.vi });
            }
        });
    });

    const sbVocabCountEl = document.getElementById('sb-vocab-count');
    if (sbVocabCountEl) sbVocabCountEl.textContent = String(ALL_VOCAB.length);

    let vocabHideVi = false;
    function renderVocabBankGrid() {
        const gridEl = document.getElementById('vocab-bank-grid');
        const labelEl = document.getElementById('vocab-bank-count-label');
        const searchInp = document.getElementById('vocab-search-input');
        const filterSel = document.getElementById('vocab-filter-ex');
        if (!gridEl) return;

        const q = normalizeSearchText(searchInp ? searchInp.value : '').trim();
        const exFilter = filterSel ? filterSel.value : 'all';

        const filtered = ALL_VOCAB.filter(v => {
            if (exFilter !== 'all' && v.exId !== exFilter) return false;
            if (!q) return true;
            return normalizeSearchText(`${v.word} ${v.vi} ex ${v.exNum} ${v.exTitle}`).includes(q);
        });

        if (labelEl) labelEl.textContent = `Đang hiển thị ${filtered.length} / ${ALL_VOCAB.length} từ vựng`;
        gridEl.classList.toggle('hide-vi', vocabHideVi);

        if (filtered.length === 0) {
            gridEl.innerHTML = `<div class="ej-history-empty" style="grid-column:1/-1;">Không có từ vựng nào khớp bộ lọc.</div>`;
            return;
        }

        gridEl.innerHTML = filtered.map((v, i) => `
            <div class="il-vocab-card" data-vc-word="${esc(v.word)}" data-vc-idx="${i}">
                <div class="il-vc-top">
                    <span class="il-vc-ex-tag">Ex ${v.exNum} · ${esc(v.pos)}</span>
                    <i class="fas fa-volume-up" style="color:#52525B;font-size:13px;"></i>
                </div>
                <div class="il-vc-word">${esc(v.word)}</div>
                ${v.ipa ? `<div class="il-vc-ipa">${esc(v.ipa)}</div>` : ''}
                <div class="il-vc-vi">${esc(v.vi)}</div>
            </div>
        `).join('');

        gridEl.querySelectorAll('.il-vocab-card').forEach(card => {
            card.onclick = () => {
                speakEnglish(card.getAttribute('data-vc-word'));
                if (vocabHideVi) card.classList.toggle('revealed');
            };
        });
    }

    const vocabSearchInp = document.getElementById('vocab-search-input');
    const vocabFilterSel = document.getElementById('vocab-filter-ex');
    const btnToggleHideVi = document.getElementById('btn-toggle-hide-vi');
    if (vocabSearchInp) vocabSearchInp.oninput = renderVocabBankGrid;
    if (vocabFilterSel) vocabFilterSel.onchange = renderVocabBankGrid;
    if (btnToggleHideVi) {
        btnToggleHideVi.onclick = () => {
            vocabHideVi = !vocabHideVi;
            btnToggleHideVi.classList.toggle('active', vocabHideVi);
            btnToggleHideVi.innerHTML = vocabHideVi
                ? `<i class="far fa-eye"></i><span>Đang ẩn nghĩa (Bấm thẻ để lật)</span>`
                : `<i class="far fa-eye-slash"></i><span>Chế độ ôn tập: Ẩn nghĩa</span>`;
            renderVocabBankGrid();
        };
    }

    // ========================================================================
    // 7. LEFT PANE RENDERERS (PRE-LISTENING, TAPESCRIPT, ANSWER KEY)
    // ========================================================================
    function switchLeftTab(tabKey) {
        currentLeftTab = tabKey;
        document.querySelectorAll('[data-left-tab]').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-left-tab') === tabKey);
        });
        const preEl = document.getElementById('left-pane-pre');
        const scriptEl = document.getElementById('left-pane-script');
        const keyEl = document.getElementById('left-pane-key');
        if (preEl) preEl.style.display = tabKey === 'pre' ? 'block' : 'none';
        if (scriptEl) scriptEl.style.display = tabKey === 'script' ? 'block' : 'none';
        if (keyEl) keyEl.style.display = tabKey === 'key' ? 'block' : 'none';
    }

    document.querySelectorAll('[data-left-tab]').forEach(btn => {
        btn.addEventListener('click', () => switchLeftTab(btn.getAttribute('data-left-tab')));
    });

    function decorateScriptText(enText, scriptVocab, evidenceList) {
        let html = esc(enText);

        // Highlight Answer Evidence first with placeholder tokens
        const evidenceTokens = [];
        if (Array.isArray(evidenceList) && evidenceList.length > 0) {
            evidenceList.forEach(ev => {
                if (!ev) return;
                const safeEv = esc(ev);
                const re = new RegExp(safeEv.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
                html = html.replace(re, (m) => {
                    const idx = evidenceTokens.length;
                    evidenceTokens.push(`<span class="il-evidence-mark">${m}</span>`);
                    return `__EV_TOK_${idx}__`;
                });
            });
        }

        // Highlight Underlined Vocabulary (matches PDF Part 2)
        if (Array.isArray(scriptVocab) && scriptVocab.length > 0) {
            scriptVocab.forEach(v => {
                const needle = esc(v.match || v.word);
                if (!needle) return;
                const re = new RegExp(`(${needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'i');
                const gloss = `${v.pos ? `(${v.pos}) ` : ''}${v.vi}`;
                html = html.replace(re, `<span class="il-vocab-underline" title="${esc(gloss)}">$1<span class="il-vocab-pop">${esc(gloss)}</span></span>`);
            });
        }

        evidenceTokens.forEach((tokHtml, idx) => {
            html = html.replace(`__EV_TOK_${idx}__`, tokHtml);
        });

        return html;
    }

    function renderLeftPanes(ex) {
        const sub = getCloudSub(ex.id);
        const isSubmitted = Boolean(sub && sub.is_submitted);
        if (isSubmitted) {
            unlockedScriptSet.add(ex.id);
            unlockedKeySet.add(ex.id);
        }

        // --- TAB 1: PRE-LISTENING WORD BANK & TIPS ---
        const preEl = document.getElementById('left-pane-pre');
        if (preEl) {
            preEl.innerHTML = `
                <div class="il-theme-banner" style="background:${ex.themeColor || '#FFE55C'};">
                    <div class="il-theme-left">
                        <div class="il-theme-ico"><i class="fas ${ex.icon || 'fa-headphones'}"></i></div>
                        <div>
                            <div class="il-theme-kicker">${esc(ex.themeBadge)} · ${esc(ex.trackLabel)}</div>
                            <div class="il-theme-title">Exercise ${ex.num}: ${esc(ex.title)}</div>
                            <div class="il-theme-vi">${esc(ex.titleVi)}</div>
                        </div>
                    </div>
                </div>

                <div class="il-card-box">
                    <div class="il-card-box-head">
                        <span class="il-card-box-title"><i class="fas fa-lightbulb" style="color:#D97706;"></i> Pre-Listening Word Bank &amp; Pronunciation</span>
                        <span class="il-card-box-sub">Bấm vào từng từ để nghe phát âm · Đọc to 2–3 lần</span>
                    </div>
                    <div class="il-wordbank-chips">
                        ${ex.wordBank.map(w => `
                            <button type="button" class="il-wb-chip" data-speak-word="${esc(w.word)}">
                                <i class="fas fa-volume-up il-wb-speak"></i>
                                <span class="il-wb-word">${esc(w.word)}</span>
                                <span class="il-wb-ipa">${esc(w.ipa)}</span>
                                <span class="il-wb-vi">· ${esc(w.vi)}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>

                <div class="il-card-box amber">
                    <div class="il-card-box-head">
                        <span class="il-card-box-title"><i class="fas fa-bullseye" style="color:#B45309;"></i> Chiến thuật &amp; Bẫy cần tránh (${esc(ex.shortType)})</span>
                    </div>
                    <ul class="il-tips-list">
                        ${(ex.tips || []).map(t => `<li>${esc(t)}</li>`).join('')}
                    </ul>
                </div>
            `;

            preEl.querySelectorAll('[data-speak-word]').forEach(btn => {
                btn.onclick = () => speakEnglish(btn.getAttribute('data-speak-word'));
            });
        }

        // --- TAB 2: TAPESCRIPT & UNDERLINED VOCABULARY ---
        const scriptEl = document.getElementById('left-pane-script');
        if (scriptEl) {
            const unlocked = unlockedScriptSet.has(ex.id);
            const showAllVi = showAllViSet.has(ex.id);
            const showEv = showEvidenceSet.has(ex.id);

            if (!unlocked) {
                scriptEl.innerHTML = `
                    <div class="il-script-guard">
                        <div style="font-size:28px;margin-bottom:8px;">🎧</div>
                        <h3>Lời thoại (Tapescript) đang được ẩn</h3>
                        <p>Hãy nghe audio và hoàn thành phiếu bài tập ở khung bên phải trước để rèn phản xạ nghe thực tế. Tapescript sẽ tự động mở sau khi bạn nộp bài, hoặc bạn có thể bấm nút bên dưới để xem ngay.</p>
                        <button type="button" class="nb-back-btn" id="btn-unlock-script">
                            <i class="fas fa-eye"></i> Mở xem Tapescript &amp; Từ vựng
                        </button>
                    </div>
                `;
                const btn = document.getElementById('btn-unlock-script');
                if (btn) btn.onclick = () => { unlockedScriptSet.add(ex.id); renderLeftPanes(ex); };
            } else {
                scriptEl.innerHTML = `
                    <div class="il-script-controls">
                        <div style="font-size:12.5px;font-weight:800;color:#18181B;">
                            <i class="fas fa-file-alt"></i> Tapescript · ${esc(ex.trackLabel)}
                        </div>
                        <div style="display:flex;gap:6px;flex-wrap:wrap;">
                            <button type="button" class="draft-mini-btn ${showEv ? 'active' : ''}" id="btn-toggle-evidence" style="${showEv ? 'background:#DCFCE7;border-color:#16A34A;color:#166534;' : ''}">
                                <i class="fas fa-highlighter"></i> ${showEv ? 'Đang hiện dẫn chứng' : 'Hiện dẫn chứng đáp án'}
                            </button>
                            <button type="button" class="draft-mini-btn" id="btn-toggle-all-vi" style="${showAllVi ? 'background:#FFE55C;' : ''}">
                                <i class="fas fa-language"></i> ${showAllVi ? 'Ẩn dịch tiếng Việt' : 'Dịch toàn bộ'}
                            </button>
                            <button type="button" class="draft-mini-btn" id="btn-lock-script" title="Ẩn lại lời thoại">
                                <i class="fas fa-eye-slash"></i>
                            </button>
                        </div>
                    </div>

                    <p style="font-size:12px;color:#71717A;margin-bottom:10px;">
                        💡 Bấm vào các <span style="border-bottom:2px solid #D97706;background:#FEF3C7;padding:0 4px;font-weight:700;color:#92400E;">từ gạch chân màu vàng</span> để xem nghĩa nhanh, hoặc bấm <strong>Dịch</strong> / <strong>🔊</strong> trên từng lượt thoại.
                    </p>

                    <div class="il-script-lines ${showEv ? 'il-show-evidence' : ''}">
                        ${ex.tapescript.map((turn, idx) => `
                            <div class="il-script-turn ${showAllVi ? 'show-vi' : ''}" data-turn-idx="${idx}">
                                <div class="il-script-turn-head">
                                    <span class="il-speaker-tag">${esc(turn.speaker)}</span>
                                    <div class="il-turn-actions">
                                        <button type="button" class="il-turn-mini-btn" data-speak-turn="${idx}" title="Nghe đọc lượt này">🔊 Nghe</button>
                                        <button type="button" class="il-turn-mini-btn" data-toggle-vi="${idx}">Dịch</button>
                                    </div>
                                </div>
                                <div>${decorateScriptText(turn.en, ex.scriptVocab, turn.evidence)}</div>
                                <div class="il-script-vi">🇻🇳 ${esc(turn.vi)}</div>
                            </div>
                        `).join('')}
                    </div>

                    ${(ex.scriptVocab && ex.scriptVocab.length > 0) ? `
                        <div class="il-card-box">
                            <div class="il-card-box-head">
                                <span class="il-card-box-title"><i class="fas fa-bookmark" style="color:#D97706;"></i> ${esc(ex.scriptVocabTitle || 'Từ vựng trong Script')}</span>
                            </div>
                            <div class="ej-table-wrap">
                                <table class="ej-vocab-table">
                                    <thead>
                                        <tr>
                                            <th>Từ / Cụm từ</th>
                                            <th style="width:74px;">Từ loại</th>
                                            <th>Nghĩa tiếng Việt</th>
                                            <th style="width:52px;">Nghe</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${ex.scriptVocab.map(v => `
                                            <tr>
                                                <td style="font-weight:800;color:#92400E;">${esc(v.word)}</td>
                                                <td style="font-family:'JetBrains Mono',monospace;font-size:12px;color:#52525B;">${esc(v.pos || '')}</td>
                                                <td>${esc(v.vi)}</td>
                                                <td style="text-align:center;">
                                                    <button type="button" class="il-turn-mini-btn" data-speak-sv="${esc(v.word)}">🔊</button>
                                                </td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ` : ''}
                `;

                const btnEv = document.getElementById('btn-toggle-evidence');
                if (btnEv) btnEv.onclick = () => {
                    if (showEvidenceSet.has(ex.id)) showEvidenceSet.delete(ex.id);
                    else showEvidenceSet.add(ex.id);
                    renderLeftPanes(ex);
                };
                const btnAllVi = document.getElementById('btn-toggle-all-vi');
                if (btnAllVi) btnAllVi.onclick = () => {
                    if (showAllViSet.has(ex.id)) showAllViSet.delete(ex.id);
                    else showAllViSet.add(ex.id);
                    renderLeftPanes(ex);
                };
                const btnLock = document.getElementById('btn-lock-script');
                if (btnLock) btnLock.onclick = () => {
                    unlockedScriptSet.delete(ex.id);
                    renderLeftPanes(ex);
                };

                scriptEl.querySelectorAll('[data-toggle-vi]').forEach(btn => {
                    btn.onclick = () => {
                        const turnEl = btn.closest('.il-script-turn');
                        if (turnEl) turnEl.classList.toggle('show-vi');
                    };
                });
                scriptEl.querySelectorAll('[data-speak-turn]').forEach(btn => {
                    btn.onclick = () => {
                        const idx = parseInt(btn.getAttribute('data-speak-turn'), 10);
                        if (ex.tapescript[idx]) speakEnglish(ex.tapescript[idx].en, audioState.rate);
                    };
                });
                scriptEl.querySelectorAll('[data-speak-sv]').forEach(btn => {
                    btn.onclick = () => speakEnglish(btn.getAttribute('data-speak-sv'));
                });
                scriptEl.querySelectorAll('.il-vocab-underline').forEach(span => {
                    span.onclick = (e) => {
                        e.stopPropagation();
                        span.classList.toggle('open');
                    };
                });
            }
        }

        // --- TAB 3: ANSWER KEY & EXPLANATIONS ---
        const keyEl = document.getElementById('left-pane-key');
        if (keyEl) {
            const unlocked = unlockedKeySet.has(ex.id);
            if (!unlocked) {
                keyEl.innerHTML = `
                    <div class="il-script-guard">
                        <div style="font-size:28px;margin-bottom:8px;">🔑</div>
                        <h3>Đáp án đối chiếu (Answer Key) đang được ẩn</h3>
                        <p>Hoàn thành bài tập và bấm <strong>Kiểm tra &amp; Nộp bài</strong> để tự động chấm điểm và mở khóa đáp án giải thích chi tiết từng câu.</p>
                        <button type="button" class="nb-back-btn" id="btn-unlock-key">
                            <i class="fas fa-key"></i> Mở xem Đáp án ngay
                        </button>
                    </div>
                `;
                const btn = document.getElementById('btn-unlock-key');
                if (btn) btn.onclick = () => { unlockedKeySet.add(ex.id); renderLeftPanes(ex); };
            } else {
                keyEl.innerHTML = `
                    <div class="il-card-box">
                        <div class="il-card-box-head">
                            <span class="il-card-box-title"><i class="fas fa-check-double" style="color:#16A34A;"></i> Answer Key &amp; Giải thích · Ex ${ex.num}</span>
                            <span class="il-card-box-sub">${ex.questions.length} mục chấm điểm</span>
                        </div>
                        <div class="ej-table-wrap">
                            <table class="ej-vocab-table">
                                <thead>
                                    <tr>
                                        <th style="width:96px;">Câu</th>
                                        <th style="width:165px;">Đáp án chuẩn</th>
                                        <th>Giải thích / Dẫn chứng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${ex.questions.map(q => `
                                        <tr>
                                            <td style="font-family:'JetBrains Mono',monospace;font-weight:800;">${esc(q.label)}</td>
                                            <td style="font-weight:800;color:#166534;">${esc(q.answerDisplay)}</td>
                                            <td style="font-size:13px;color:#3F3F46;">${esc(q.explanation || '')}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;
            }
        }
    }

    // ========================================================================
    // 8. RIGHT PANE INTERACTIVE WORKSHEET RENDERER (ALL 15 EXERCISES)
    // ========================================================================
    function expandBlanksInHtml(templateHtml, answersObj) {
        return templateHtml.replace(/\{\{([a-zA-Z0-9_-]+)\}\}/g, (_, qId) => {
            const val = (answersObj && answersObj[qId]) || '';
            const badgeText = qId.replace(/[ab]$/, '');
            return `<span class="il-blank-wrap" data-blank-wrap="${qId}"><span class="il-q-badge">${badgeText}</span><input type="text" class="il-blank-input" data-q-input="${qId}" value="${esc(val)}" autocomplete="off" spellcheck="false" aria-label="Câu ${qId}" /><span class="il-inline-correction" data-q-corr="${qId}" style="display:none;"></span></span>`;
        });
    }

    function renderCampusMapSvg(answersObj) {
        const pickedLetters = new Set(Object.values(answersObj || {}).map(v => String(v || '').trim().toUpperCase()).filter(Boolean));
        const slot = (letter, x, y, w, h, lx, ly) => {
            const isPicked = pickedLetters.has(letter);
            return `
                <g class="il-map-slot ${isPicked ? 'picked' : ''}" data-map-letter="${letter}">
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#FFFFFF" stroke="#18181B" stroke-width="1.8" rx="3"/>
                    <text x="${lx}" y="${ly}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="13" font-weight="800" fill="#1D4ED8">${letter}</text>
                </g>
            `;
        };

        return `
            <svg class="il-map-svg" viewBox="0 0 430 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="University Campus Map">
                <!-- Outer Campus Boundary -->
                <rect x="6" y="6" width="418" height="328" fill="#FAFAFA" stroke="#18181B" stroke-width="2" rx="4"/>

                <!-- Top Row: I, Library, J -->
                ${slot('I', 20, 18, 66, 30, 53, 38)}
                <rect x="108" y="18" width="102" height="30" fill="#F4F1EA" stroke="#18181B" stroke-width="1.8" rx="3"/>
                <text x="159" y="38" text-anchor="middle" font-family="Be Vietnam Pro, sans-serif" font-size="12" font-weight="700" fill="#18181B">Library</text>
                ${slot('J', 230, 18, 66, 30, 263, 38)}

                <!-- Left Recreation Centre Block (D, E, F) -->
                <rect x="20" y="62" width="66" height="144" fill="#F4F4F5" stroke="#18181B" stroke-width="1.8" rx="4"/>
                ${slot('D', 33, 72, 40, 26, 53, 90)}
                ${slot('E', 33, 104, 40, 26, 53, 122)}
                ${slot('F', 33, 136, 40, 26, 53, 154)}
                <text x="53" y="180" text-anchor="middle" font-family="Be Vietnam Pro, sans-serif" font-size="10.5" font-weight="700" fill="#18181B">Recreation</text>
                <text x="53" y="194" text-anchor="middle" font-family="Be Vietnam Pro, sans-serif" font-size="10.5" font-weight="700" fill="#18181B">Centre</text>

                <!-- Bottom Left: A -->
                ${slot('A', 20, 226, 46, 86, 43, 274)}

                <!-- Center Sports Centre Box -->
                <rect x="108" y="62" width="166" height="140" fill="#F4F4F5" stroke="#18181B" stroke-width="1.8" rx="4"/>
                ${slot('G', 118, 70, 44, 34, 140, 92)}
                <!-- Swimming Pool -->
                <ellipse cx="144" cy="144" rx="28" ry="24" fill="#DBEAFE" stroke="#18181B" stroke-width="1.6"/>
                <text x="144" y="141" text-anchor="middle" font-family="Be Vietnam Pro, sans-serif" font-size="9.5" font-weight="700" fill="#18181B">Swimming</text>
                <text x="144" y="153" text-anchor="middle" font-family="Be Vietnam Pro, sans-serif" font-size="9.5" font-weight="700" fill="#18181B">Pool</text>
                <!-- Playground Oval -->
                <ellipse cx="228" cy="92" rx="32" ry="22" fill="#DCFCE7" stroke="#18181B" stroke-width="1.6"/>
                <text x="228" y="95" text-anchor="middle" font-family="Be Vietnam Pro, sans-serif" font-size="9" font-weight="700" fill="#166534">Playground</text>
                <!-- H -->
                ${slot('H', 206, 124, 42, 62, 227, 160)}
                <text x="148" y="191" text-anchor="middle" font-family="Be Vietnam Pro, sans-serif" font-size="10.5" font-weight="700" fill="#18181B">Sports Centre</text>

                <!-- Gymnasium & Students Union -->
                <rect x="116" y="216" width="102" height="36" fill="#F4F1EA" stroke="#18181B" stroke-width="1.8" rx="3"/>
                <text x="167" y="238" text-anchor="middle" font-family="Be Vietnam Pro, sans-serif" font-size="11.5" font-weight="700" fill="#18181B">Gymnasium</text>

                <rect x="128" y="270" width="90" height="34" fill="#F4F1EA" stroke="#18181B" stroke-width="1.8" rx="3"/>
                <text x="173" y="291" text-anchor="middle" font-family="Be Vietnam Pro, sans-serif" font-size="11" font-weight="700" fill="#18181B">Students Union</text>

                <!-- Entrance Label -->
                <rect x="138" y="314" width="76" height="18" fill="#FFE55C" stroke="#18181B" stroke-width="1.5" rx="3"/>
                <text x="176" y="327" text-anchor="middle" font-family="Be Vietnam Pro, sans-serif" font-size="10.5" font-weight="800" fill="#18181B">Entrance</text>

                <!-- Right Column: K, Cinema, C, B -->
                ${slot('K', 340, 26, 62, 58, 371, 60)}
                <rect x="340" y="102" width="62" height="72" fill="#F4F1EA" stroke="#18181B" stroke-width="1.8" rx="3"/>
                <text x="371" y="142" text-anchor="middle" font-family="Be Vietnam Pro, sans-serif" font-size="11.5" font-weight="700" fill="#18181B">Cinema</text>
                ${slot('C', 360, 192, 32, 50, 376, 222)}
                ${slot('B', 364, 258, 30, 52, 379, 289)}
            </svg>
        `;
    }

    function renderWorksheetBody(ex, answersObj) {
        const ws = ex.worksheet;
        if (!ws) return '';

        if (ws.kind === 'cloze') {
            return ws.blocks.map(b => `<p class="il-cloze-para">${expandBlanksInHtml(b.html, answersObj)}</p>`).join('');
        }

        if (ws.kind === 'sentences') {
            return `
                <div class="il-sentences-list">
                    ${ws.items.map(it => `
                        <div class="il-sentence-row">
                            <span class="il-sentence-num">${it.num}.</span>
                            <div>${expandBlanksInHtml(it.html, answersObj)}</div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        if (ws.kind === 'form-grid') {
            return `
                <div class="il-form-grid">
                    ${ws.fields.map(f => `
                        <div class="il-form-item">
                            <label for="ws-form-${f.id}">${esc(f.label)}:</label>
                            <input type="text" id="ws-form-${f.id}" class="il-blank-input" data-q-input="${f.id}" value="${esc(answersObj[f.id] || '')}" placeholder="${esc(f.placeholder || '')}" autocomplete="off" />
                            <span class="il-inline-correction" data-q-corr="${f.id}" style="display:none;"></span>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        if (ws.kind === 'menu-matrix') {
            const ticks = answersObj.ticks || {};
            return `
                <div class="il-ws-table-wrap">
                    <table class="il-ws-table">
                        <thead>
                            <tr>
                                <th colspan="2">Dinner Menu</th>
                                <th style="text-align:center;">Wife</th>
                                <th style="text-align:center;">Husband</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${ws.categories.map(cat => cat.items.map((item, idx) => {
                                const wKey = `wife-${item}`;
                                const hKey = `husband-${item}`;
                                return `
                                    <tr>
                                        ${idx === 0 ? `<td class="il-cat-cell" rowspan="${cat.items.length}">${esc(cat.name)}</td>` : ''}
                                        <td>${esc(item)}</td>
                                        <td class="il-check-cell">
                                            <button type="button" class="il-tick-btn ${ticks[wKey] ? 'checked' : ''}" data-menu-tick="${esc(wKey)}" aria-label="Wife ${esc(item)}">${ticks[wKey] ? '✓' : ''}</button>
                                        </td>
                                        <td class="il-check-cell">
                                            <button type="button" class="il-tick-btn ${ticks[hKey] ? 'checked' : ''}" data-menu-tick="${esc(hKey)}" aria-label="Husband ${esc(item)}">${ticks[hKey] ? '✓' : ''}</button>
                                        </td>
                                    </tr>
                                `;
                            }).join('')).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }

        if (ws.kind === 'campus-map') {
            return `
                <div class="il-map-layout">
                    <div class="il-map-box">
                        <div style="font-size:12px;font-weight:700;color:#52525B;margin-bottom:8px;">
                            🗺️ Bấm trực tiếp chữ cái <strong>A–K</strong> trên bản đồ để điền nhanh vào câu đang chọn!
                        </div>
                        <div id="campus-map-svg-wrap">${renderCampusMapSvg(answersObj)}</div>
                    </div>
                    <div class="il-map-answers">
                        <div style="font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:800;color:#18181B;letter-spacing:0.06em;">WRITE THE LETTERS (A–K)</div>
                        ${ws.places.map(p => `
                            <div class="il-map-ans-row ${activeMapTargetId === p.id ? 'active-target' : ''}" data-map-row="${p.id}">
                                <span style="font-weight:700;font-size:14px;">${p.num}. ${esc(p.name)}</span>
                                <div style="display:flex;align-items:center;gap:6px;">
                                    <input type="text" maxlength="1" class="il-blank-input il-map-letter-input" data-q-input="${p.id}" value="${esc(answersObj[p.id] || '')}" placeholder="?" autocomplete="off" />
                                    <span class="il-inline-correction" data-q-corr="${p.id}" style="display:none;"></span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        if (ws.kind === 'landlady-table') {
            return `
                <div class="il-ws-table-wrap">
                    <table class="il-ws-table">
                        <thead>
                            <tr>
                                <th style="width:28%;">Items</th>
                                <th style="width:20%;text-align:center;">Not allowed</th>
                                <th>Allowed under certain conditions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="font-weight:700;">${esc(ws.exampleRow.item)}</td>
                                <td style="text-align:center;color:#A1A1AA;">—</td>
                                <td style="color:#B45309;font-weight:700;font-style:italic;">${esc(ws.exampleRow.condition)} <span style="font-size:11px;color:#71717A;">(Ví dụ)</span></td>
                            </tr>
                            ${ws.rows.map(r => {
                                const val = answersObj[r.id] || '';
                                const isDisallowed = val === 'not_allowed';
                                const textVal = isDisallowed ? '' : val;
                                return `
                                    <tr>
                                        <td style="font-weight:700;">${esc(r.item)}</td>
                                        <td style="text-align:center;">
                                            <button type="button" class="il-cross-btn ${isDisallowed ? 'active' : ''}" data-ll-cross="${r.id}">
                                                ${isDisallowed ? '✗ Not allowed' : 'Đánh dấu ✗'}
                                            </button>
                                        </td>
                                        <td>
                                            <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                                                <input type="text" class="il-blank-input" style="flex:1;min-width:170px;" data-ll-text="${r.id}" value="${esc(textVal)}" placeholder="${isDisallowed ? 'Đã chọn: Không cho phép (✗)' : esc(r.placeholder || 'Nhập điều kiện nếu được phép...')}" ${isDisallowed ? 'disabled' : ''} autocomplete="off" />
                                                <span class="il-inline-correction" data-q-corr="${r.id}" style="display:none;"></span>
                                            </div>
                                        </td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }

        if (ws.kind === 'news-mixed') {
            const picked = Array.isArray(answersObj.headlines) ? answersObj.headlines : [];
            return `
                <div class="il-ws-subhead">Question 1</div>
                <p style="font-size:13.5px;color:#52525B;margin-bottom:8px;">${esc(ws.headlinesTitle)}</p>
                <div class="il-ws-table-wrap" style="margin-bottom:16px;">
                    ${ws.headlines.map(h => {
                        const sel = picked.includes(h.key);
                        return `
                            <div class="il-pick-row ${sel ? 'selected' : ''}" data-headline-key="${h.key}">
                                <span><strong>${h.key}.</strong> ${esc(h.text)}</span>
                                <span class="il-tick-btn ${sel ? 'checked' : ''}">${sel ? '✓' : ''}</span>
                            </div>
                        `;
                    }).join('')}
                </div>
                <div style="margin-bottom:14px;">
                    <span class="il-inline-correction" data-q-corr="1" style="display:none;"></span>
                </div>

                <div class="il-ws-subhead">Questions 2–14</div>
                <p style="font-size:13.5px;color:#52525B;margin-bottom:10px;">${esc(ws.clozeTitle)}</p>
                ${ws.blocks.map(b => `<p class="il-cloze-para">${expandBlanksInHtml(b.html, answersObj)}</p>`).join('')}
            `;
        }

        if (ws.kind === 'mcq-cloze') {
            return `
                <div class="il-ws-subhead">Questions 1–3</div>
                <p style="font-size:13.5px;color:#52525B;margin-bottom:10px;">${esc(ws.mcqTitle)}</p>
                ${ws.mcqs.map(m => `
                    <div class="il-mcq-card" data-mcq-id="${m.id}">
                        <div class="il-mcq-q">${m.num}. ${esc(m.question)} <span class="il-inline-correction" data-q-corr="${m.id}" style="display:none;margin-left:6px;"></span></div>
                        <div class="il-mcq-opts">
                            ${m.options.map(opt => {
                                const isSel = String(answersObj[m.id] || '').toUpperCase() === opt.key;
                                return `
                                    <button type="button" class="il-mcq-opt ${isSel ? 'selected' : ''}" data-mcq-pick="${m.id}" data-mcq-val="${opt.key}">
                                        <span class="il-mcq-key">${opt.key}</span>
                                        <span>${esc(opt.text)}</span>
                                    </button>
                                `;
                            }).join('')}
                        </div>
                    </div>
                `).join('')}

                <div class="il-ws-subhead">Questions 4–12</div>
                <p style="font-size:13.5px;color:#52525B;margin-bottom:10px;">${esc(ws.clozeTitle)}</p>
                ${ws.blocks.map(b => `<p class="il-cloze-para">${expandBlanksInHtml(b.html, answersObj)}</p>`).join('')}
            `;
        }

        if (ws.kind === 'notes-and-table') {
            return `
                ${ws.notesBlocks.map(b => `<p class="il-cloze-para">${expandBlanksInHtml(b.html, answersObj)}</p>`).join('')}
                <div class="il-ws-subhead">${esc(ws.tableTitle)}</div>
                <div class="il-ws-table-wrap">
                    <table class="il-ws-table">
                        <thead>
                            <tr>${ws.headers.map(h => `<th>${esc(h)}</th>`).join('')}</tr>
                        </thead>
                        <tbody>
                            ${ws.rows.map(row => `<tr>${row.map(cell => `<td>${expandBlanksInHtml(cell, answersObj)}</td>`).join('')}</tr>`).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }

        if (ws.kind === 'tv-radio-mixed') {
            return `
                <div class="il-cloze-para">
                    ${ws.introBlocks.map(b => `<div style="margin-bottom:6px;">${expandBlanksInHtml(b.html, answersObj)}</div>`).join('')}
                </div>
                <div class="il-ws-table-wrap" style="margin:14px 0;">
                    <table class="il-ws-table">
                        <thead>
                            <tr>${ws.tableHeaders.map(h => `<th>${esc(h)}</th>`).join('')}</tr>
                        </thead>
                        <tbody>
                            ${ws.tableRows.map(row => `<tr>${row.map(cell => `<td>${expandBlanksInHtml(cell, answersObj)}</td>`).join('')}</tr>`).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="il-sentences-list">
                    ${ws.sentences.map(s => `
                        <div class="il-sentence-row">
                            <span class="il-sentence-num">${s.num}.</span>
                            <div>${expandBlanksInHtml(s.html, answersObj)}</div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        if (ws.kind === 'sports-mixed') {
            return `
                <div class="il-ws-subhead">Questions 1–10</div>
                <p style="font-size:13.5px;color:#52525B;margin-bottom:8px;">${esc(ws.tableTitle)}</p>
                <div class="il-ws-table-wrap" style="margin-bottom:18px;">
                    <table class="il-ws-table">
                        <thead>
                            <tr>${ws.headers.map(h => `<th>${esc(h)}</th>`).join('')}</tr>
                        </thead>
                        <tbody>
                            ${ws.rows.map(row => `<tr>${row.map(cell => `<td>${expandBlanksInHtml(cell, answersObj)}</td>`).join('')}</tr>`).join('')}
                        </tbody>
                    </table>
                </div>

                <div class="il-ws-subhead">Questions 11–16</div>
                <p style="font-size:13.5px;color:#52525B;margin-bottom:10px;">${esc(ws.tfTitle)}</p>
                ${ws.statements.map(st => {
                    const cur = String(answersObj[st.id] || '').toUpperCase();
                    return `
                        <div class="il-tf-row" data-tf-id="${st.id}">
                            <span><strong>${st.num}.</strong> ${esc(st.text)} <span class="il-inline-correction" data-q-corr="${st.id}" style="display:none;margin-left:6px;"></span></span>
                            <div class="il-tf-btns">
                                <button type="button" class="il-tf-btn ${cur === 'T' ? 'selected' : ''}" data-tf-pick="${st.id}" data-tf-val="T">T</button>
                                <button type="button" class="il-tf-btn ${cur === 'F' ? 'selected' : ''}" data-tf-pick="${st.id}" data-tf-val="F">F</button>
                            </div>
                        </div>
                    `;
                }).join('')}
            `;
        }

        return '';
    }

    function collectAnswersFromDom(ex) {
        const answers = {};
        if (!wsBodyEl || !ex) return answers;

        wsBodyEl.querySelectorAll('[data-q-input]').forEach(inp => {
            answers[inp.getAttribute('data-q-input')] = inp.value;
        });

        if (ex.worksheet.kind === 'menu-matrix') {
            const ticks = {};
            wsBodyEl.querySelectorAll('[data-menu-tick].checked').forEach(btn => {
                ticks[btn.getAttribute('data-menu-tick')] = true;
            });
            answers.ticks = ticks;
        }

        if (ex.worksheet.kind === 'landlady-table') {
            ex.worksheet.rows.forEach(r => {
                const crossBtn = wsBodyEl.querySelector(`[data-ll-cross="${r.id}"]`);
                const textInp = wsBodyEl.querySelector(`[data-ll-text="${r.id}"]`);
                if (crossBtn && crossBtn.classList.contains('active')) {
                    answers[r.id] = 'not_allowed';
                } else if (textInp) {
                    answers[r.id] = textInp.value;
                }
            });
        }

        if (ex.worksheet.kind === 'news-mixed') {
            const picked = [];
            wsBodyEl.querySelectorAll('[data-headline-key].selected').forEach(row => {
                picked.push(row.getAttribute('data-headline-key'));
            });
            answers.headlines = picked.sort();
        }

        if (ex.worksheet.kind === 'mcq-cloze') {
            wsBodyEl.querySelectorAll('[data-mcq-pick].selected').forEach(btn => {
                answers[btn.getAttribute('data-mcq-pick')] = btn.getAttribute('data-mcq-val');
            });
        }

        if (ex.worksheet.kind === 'sports-mixed') {
            wsBodyEl.querySelectorAll('[data-tf-pick].selected').forEach(btn => {
                answers[btn.getAttribute('data-tf-pick')] = btn.getAttribute('data-tf-val');
            });
        }

        return answers;
    }

    function countAnswered(ex, answers) {
        if (!ex) return 0;
        if (ex.worksheet.kind === 'menu-matrix') {
            return Object.keys(answers.ticks || {}).length;
        }
        let count = 0;
        ex.questions.forEach(q => {
            if (q.kind === 'multi-pick') {
                if (Array.isArray(answers.headlines) && answers.headlines.length > 0) count++;
            } else if (String(answers[q.id] || '').trim() !== '') {
                count++;
            }
        });
        return count;
    }

    function updateAnsweredStatus(ex) {
        const statusEl = document.getElementById('ws-answered-status');
        if (!statusEl || !ex) return;
        const answers = collectAnswersFromDom(ex);
        const answered = countAnswered(ex, answers);
        const total = ex.questions.length;
        if (ex.worksheet.kind === 'menu-matrix') {
            statusEl.textContent = `Đã tích ${answered} món (đáp án chuẩn gồm ${total} mục)`;
            statusEl.classList.toggle('ready', answered >= total);
        } else {
            statusEl.textContent = `Đã điền ${answered}/${total} câu`;
            statusEl.classList.toggle('ready', answered >= total);
        }
    }

    function bindWorksheetInteractions(ex) {
        if (!wsBodyEl) return;

        const onAnyChange = () => {
            const ans = collectAnswersFromDom(ex);
            saveDraftAnswers(ex.id, ans);
            updateAnsweredStatus(ex);
        };

        wsBodyEl.querySelectorAll('[data-q-input]').forEach(inp => {
            inp.addEventListener('input', () => {
                inp.classList.remove('is-correct', 'is-wrong');
                if (ex.worksheet.kind === 'campus-map') {
                    inp.value = inp.value.toUpperCase().replace(/[^A-K]/g, '').slice(0, 1);
                    refreshCampusMapVisual(ex);
                }
                onAnyChange();
            });
            inp.addEventListener('focus', () => {
                if (ex.worksheet.kind === 'campus-map') {
                    activeMapTargetId = inp.getAttribute('data-q-input');
                    wsBodyEl.querySelectorAll('[data-map-row]').forEach(r => {
                        r.classList.toggle('active-target', r.getAttribute('data-map-row') === activeMapTargetId);
                    });
                }
            });
        });

        // Ex 3 Menu Matrix
        wsBodyEl.querySelectorAll('[data-menu-tick]').forEach(btn => {
            btn.onclick = () => {
                btn.classList.remove('res-correct', 'res-wrong', 'res-missed');
                const checked = btn.classList.toggle('checked');
                btn.textContent = checked ? '✓' : '';
                onAnyChange();
            };
        });

        // Ex 8 Interactive SVG Map clicks
        if (ex.worksheet.kind === 'campus-map') {
            bindCampusMapClicks(ex, onAnyChange);
        }

        // Ex 10 Landlady Table
        wsBodyEl.querySelectorAll('[data-ll-cross]').forEach(btn => {
            btn.onclick = () => {
                const rid = btn.getAttribute('data-ll-cross');
                const active = btn.classList.toggle('active');
                btn.textContent = active ? '✗ Not allowed' : 'Đánh dấu ✗';
                const txt = wsBodyEl.querySelector(`[data-ll-text="${rid}"]`);
                if (txt) {
                    txt.disabled = active;
                    if (active) txt.value = '';
                    txt.placeholder = active ? 'Đã chọn: Không cho phép (✗)' : 'Nhập điều kiện nếu được phép...';
                }
                onAnyChange();
            };
        });

        wsBodyEl.querySelectorAll('[data-ll-text]').forEach(inp => {
            inp.addEventListener('input', () => {
                const rid = inp.getAttribute('data-ll-text');
                const crossBtn = wsBodyEl.querySelector(`[data-ll-cross="${rid}"]`);
                if (inp.value.trim() && crossBtn && crossBtn.classList.contains('active')) {
                    crossBtn.classList.remove('active');
                    crossBtn.textContent = 'Đánh dấu ✗';
                }
                onAnyChange();
            });
        });

        // Ex 11 Pick 3 Headlines
        wsBodyEl.querySelectorAll('[data-headline-key]').forEach(row => {
            row.onclick = () => {
                const sel = row.classList.toggle('selected');
                const box = row.querySelector('.il-tick-btn');
                if (box) {
                    box.classList.toggle('checked', sel);
                    box.textContent = sel ? '✓' : '';
                }
                onAnyChange();
            };
        });

        // Ex 12 MCQ
        wsBodyEl.querySelectorAll('[data-mcq-pick]').forEach(btn => {
            btn.onclick = () => {
                const qid = btn.getAttribute('data-mcq-pick');
                wsBodyEl.querySelectorAll(`[data-mcq-pick="${qid}"]`).forEach(b => {
                    b.classList.remove('selected', 'is-correct', 'is-wrong');
                });
                btn.classList.add('selected');
                onAnyChange();
            };
        });

        // Ex 15 True/False
        wsBodyEl.querySelectorAll('[data-tf-pick]').forEach(btn => {
            btn.onclick = () => {
                const qid = btn.getAttribute('data-tf-pick');
                wsBodyEl.querySelectorAll(`[data-tf-pick="${qid}"]`).forEach(b => {
                    b.classList.remove('selected', 'is-correct', 'is-wrong');
                });
                btn.classList.add('selected');
                onAnyChange();
            };
        });
    }

    function bindCampusMapClicks(ex, onAnyChange) {
        const wrap = document.getElementById('campus-map-svg-wrap');
        if (!wrap) return;
        wrap.querySelectorAll('[data-map-letter]').forEach(g => {
            g.onclick = () => {
                const letter = g.getAttribute('data-map-letter');
                const targetInp = wsBodyEl.querySelector(`[data-q-input="${activeMapTargetId}"]`);
                if (targetInp) {
                    targetInp.value = letter;
                    targetInp.classList.remove('is-correct', 'is-wrong');
                    // Auto-advance to next place
                    const nextNum = parseInt(activeMapTargetId, 10) + 1;
                    if (nextNum <= 5) {
                        activeMapTargetId = String(nextNum);
                        wsBodyEl.querySelectorAll('[data-map-row]').forEach(r => {
                            r.classList.toggle('active-target', r.getAttribute('data-map-row') === activeMapTargetId);
                        });
                    }
                    refreshCampusMapVisual(ex);
                    onAnyChange();
                }
            };
        });
    }

    function refreshCampusMapVisual(ex) {
        const wrap = document.getElementById('campus-map-svg-wrap');
        if (!wrap) return;
        const answers = collectAnswersFromDom(ex);
        wrap.innerHTML = renderCampusMapSvg(answers);
        bindCampusMapClicks(ex, () => {
            saveDraftAnswers(ex.id, collectAnswersFromDom(ex));
            updateAnsweredStatus(ex);
        });
    }

    // ========================================================================
    // 9. SMART IELTS GRADING ENGINE + VISUAL FEEDBACK + CLOUD SYNC
    // ========================================================================
    function normalizeAnswerText(str) {
        return String(str || '')
            .trim()
            .toLowerCase()
            .replace(/[–—]/g, '-')
            .replace(/\s+/g, ' ')
            .replace(/[.!?]+$/g, '');
    }

    function checkSingleAnswer(q, rawValue) {
        const raw = String(rawValue || '').trim();
        if (!raw) return false;
        const norm = normalizeAnswerText(raw);

        if (q.matcher === 'regex' && q.pattern) {
            try {
                const re = new RegExp(q.pattern, 'i');
                if (re.test(norm)) return true;
            } catch (e) {}
        }

        const accepted = Array.isArray(q.accepted) ? q.accepted : [];
        return accepted.some(a => normalizeAnswerText(a) === norm);
    }

    function gradeExercise(ex, answers) {
        const results = [];
        let correctCount = 0;

        if (ex.worksheet.kind === 'menu-matrix') {
            const ticks = answers.ticks || {};
            const expectedSet = new Set();
            ex.questions.forEach(q => expectedSet.add(q.id));

            const extraWrongTicks = Object.keys(ticks).filter(k => ticks[k] && !expectedSet.has(k));

            ex.questions.forEach(q => {
                const ticked = Boolean(ticks[q.id]);
                if (ticked) correctCount++;
                results.push({
                    id: q.id,
                    label: q.label,
                    userAnswer: ticked ? `✓ ${q.answerDisplay}` : '(Chưa tích)',
                    expected: q.answerDisplay,
                    isCorrect: ticked
                });
            });

            extraWrongTicks.forEach(wrongKey => {
                const [who, item] = wrongKey.split('-');
                results.push({
                    id: wrongKey,
                    label: `${who === 'wife' ? 'Wife' : 'Husband'} · Chọn thừa`,
                    userAnswer: `✗ ${item}`,
                    expected: 'Không gọi món này',
                    isCorrect: false
                });
            });

            // Penalize extra false ticks so selecting all boxes can't score 100%
            const adjustedCorrect = Math.max(0, correctCount - extraWrongTicks.length);
            const total = ex.questions.length;
            const pct = Math.round((adjustedCorrect / total) * 100);
            return {
                correctCount: adjustedCorrect,
                totalQuestions: total,
                scorePercent: pct,
                estimatedBand: CLOUD ? CLOUD.estimateIeltsBand(adjustedCorrect, total) : '',
                results,
                extraWrongTicks
            };
        }

        ex.questions.forEach(q => {
            if (q.kind === 'multi-pick') {
                const picked = Array.isArray(answers.headlines) ? [...answers.headlines].sort() : [];
                const expected = [...(q.expectedSet || [])].sort();
                const isCorrect = picked.length === expected.length && picked.every((v, i) => v === expected[i]);
                if (isCorrect) correctCount++;
                results.push({
                    id: q.id,
                    label: q.label,
                    userAnswer: picked.length ? picked.join(', ') : '(Chưa chọn)',
                    expected: q.answerDisplay,
                    isCorrect
                });
                return;
            }

            if (q.kind === 'landlady-disallow') {
                const userVal = answers[q.id] || '';
                const isCorrect = userVal === 'not_allowed';
                if (isCorrect) correctCount++;
                results.push({
                    id: q.id,
                    label: q.label,
                    userAnswer: isCorrect ? 'Not allowed (✗)' : (userVal || '(Bỏ trống)'),
                    expected: q.answerDisplay,
                    isCorrect
                });
                return;
            }

            const userVal = String(answers[q.id] || '').trim();
            const isCorrect = checkSingleAnswer(q, userVal);
            if (isCorrect) correctCount++;
            results.push({
                id: q.id,
                label: q.label,
                userAnswer: userVal === 'not_allowed' ? 'Not allowed (✗)' : (userVal || '(Bỏ trống)'),
                expected: q.answerDisplay,
                isCorrect
            });
        });

        const total = ex.questions.length;
        const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;
        return {
            correctCount,
            totalQuestions: total,
            scorePercent: pct,
            estimatedBand: CLOUD ? CLOUD.estimateIeltsBand(correctCount, total) : '',
            results
        };
    }

    function applyInlineGradingMarks(ex, gradeRes, answers) {
        if (!wsBodyEl || !ex || !gradeRes) return;

        if (ex.worksheet.kind === 'menu-matrix') {
            const ticks = answers.ticks || {};
            const expectedSet = new Set(ex.questions.map(q => q.id));
            wsBodyEl.querySelectorAll('[data-menu-tick]').forEach(btn => {
                const key = btn.getAttribute('data-menu-tick');
                btn.classList.remove('res-correct', 'res-wrong', 'res-missed');
                if (ticks[key] && expectedSet.has(key)) {
                    btn.classList.add('res-correct');
                } else if (ticks[key] && !expectedSet.has(key)) {
                    btn.classList.add('res-wrong');
                    btn.textContent = '✗';
                } else if (!ticks[key] && expectedSet.has(key)) {
                    btn.classList.add('res-missed');
                    btn.textContent = '✓';
                }
            });
            return;
        }

        const resById = {};
        gradeRes.results.forEach(r => { resById[r.id] = r; });

        ex.questions.forEach(q => {
            const r = resById[q.id];
            if (!r) return;
            const inp = wsBodyEl.querySelector(`[data-q-input="${q.id}"], [data-ll-text="${q.id}"]`);
            if (inp) {
                inp.classList.toggle('is-correct', r.isCorrect);
                inp.classList.toggle('is-wrong', !r.isCorrect);
            }

            if (ex.worksheet.kind === 'mcq-cloze' && ['1', '2', '3'].includes(q.id)) {
                const expectedKey = (q.accepted[0] || '').toUpperCase();
                wsBodyEl.querySelectorAll(`[data-mcq-pick="${q.id}"]`).forEach(btn => {
                    const val = btn.getAttribute('data-mcq-val');
                    btn.classList.remove('is-correct', 'is-wrong');
                    if (val === expectedKey) btn.classList.add('is-correct');
                    else if (btn.classList.contains('selected') && val !== expectedKey) btn.classList.add('is-wrong');
                });
            }

            if (ex.worksheet.kind === 'sports-mixed' && parseInt(q.id, 10) >= 11) {
                const expectedVal = (q.accepted[0] || '').toUpperCase();
                wsBodyEl.querySelectorAll(`[data-tf-pick="${q.id}"]`).forEach(btn => {
                    const val = btn.getAttribute('data-tf-val');
                    btn.classList.remove('is-correct', 'is-wrong');
                    if (val === expectedVal) btn.classList.add('is-correct');
                    else if (btn.classList.contains('selected') && val !== expectedVal) btn.classList.add('is-wrong');
                });
            }

            const corrEl = wsBodyEl.querySelector(`[data-q-corr="${q.id}"]`);
            if (corrEl) {
                corrEl.style.display = 'inline-flex';
                corrEl.className = `il-inline-correction ${r.isCorrect ? 'ok' : 'bad'}`;
                corrEl.textContent = r.isCorrect ? '✓' : `→ ${q.answerDisplay}`;
            }
        });
    }

    function renderResultAndFeedbackBoxes(ex, gradeRes, cloudSub, cloudSyncNote) {
        const scoreBox = document.getElementById('ws-result-summary-box');
        const fbBox = document.getElementById('ws-teacher-feedback-box');

        if (scoreBox) {
            if (!gradeRes) {
                scoreBox.style.display = 'none';
                scoreBox.innerHTML = '';
            } else {
                const bandClass = CLOUD ? CLOUD.getBandColorClass(gradeRes.scorePercent) : 'band-mid';
                scoreBox.innerHTML = `
                    <div class="il-score-card">
                        <div class="il-score-top">
                            <div>
                                <div style="font-size:15.5px;font-weight:900;color:#18181B;">
                                    🎯 Kết quả Exercise ${ex.num}: ${esc(ex.title)}
                                </div>
                                <div style="font-size:12.5px;color:#52525B;margin-top:2px;">
                                    ${cloudSyncNote ? esc(cloudSyncNote) : 'Đã chấm điểm tự động và mở khóa Tapescript + Đáp án giải thích.'}
                                </div>
                            </div>
                            <div class="il-score-pills">
                                <span class="il-band-pill ${bandClass}">${gradeRes.correctCount}/${gradeRes.totalQuestions} (${gradeRes.scorePercent}%)</span>
                                <span class="il-band-pill ${bandClass}">${esc(gradeRes.estimatedBand)}</span>
                                <button type="button" class="draft-mini-btn" id="btn-jump-script-evidence">
                                    <i class="fas fa-highlighter"></i> Xem dẫn chứng Script
                                </button>
                            </div>
                        </div>
                        ${CLOUD ? CLOUD.renderResultsBreakdownHtml(gradeRes.results) : ''}
                    </div>
                `;
                scoreBox.style.display = 'block';
                const jumpBtn = document.getElementById('btn-jump-script-evidence');
                if (jumpBtn) {
                    jumpBtn.onclick = () => {
                        unlockedScriptSet.add(ex.id);
                        showEvidenceSet.add(ex.id);
                        renderLeftPanes(ex);
                        switchLeftTab('script');
                        const leftScroll = document.getElementById('studio-left-scroll');
                        if (leftScroll) leftScroll.scrollTo({ top: 0, behavior: 'smooth' });
                    };
                }
            }
        }

        if (fbBox) {
            if (!cloudSub || !cloudSub.is_submitted) {
                fbBox.style.display = 'none';
                fbBox.innerHTML = '';
                return;
            }
            const hasTeacher = Boolean((cloudSub.teacher_score && cloudSub.teacher_score.trim()) || (cloudSub.teacher_feedback && cloudSub.teacher_feedback.trim()));
            if (hasTeacher) {
                fbBox.innerHTML = `
                    <div class="writing-teacher-feedback-box">
                        <div class="writing-tf-head">
                            <span class="writing-tf-title">👨‍🏫 Nhận xét từ Giáo viên · Nộp lúc ${esc(fmtTime(cloudSub.submitted_at || cloudSub.updated_at))}</span>
                            ${cloudSub.teacher_score ? `<span class="writing-tf-score">Điểm GV: ${esc(cloudSub.teacher_score)}</span>` : ''}
                        </div>
                        ${cloudSub.teacher_feedback ? `<p class="writing-tf-comment">${esc(cloudSub.teacher_feedback)}</p>` : ''}
                    </div>
                `;
                fbBox.style.display = 'block';
            } else {
                fbBox.innerHTML = `
                    <div class="writing-teacher-feedback-box" style="background:#FFFBEB;border-color:#D97706;color:#78350F;">
                        <div class="writing-tf-head">
                            <span class="writing-tf-title" style="color:#92400E;">✓ Đã lưu bài nộp lúc ${esc(fmtTime(cloudSub.submitted_at || cloudSub.updated_at))}</span>
                            <span class="writing-tf-score" style="background:#FFE55C;border-color:#18181B;color:#18181B;">Lần nộp #${cloudSub.attempts_count || 1}</span>
                        </div>
                        <p class="writing-tf-comment">Kết quả bài nghe đã được ghi nhận vào hồ sơ học tập. Khi Giáo viên thêm nhận xét, thông báo sẽ hiện ở biểu tượng chuông 🔔 trên góc phải.</p>
                    </div>
                `;
                fbBox.style.display = 'block';
            }
        }
    }

    async function submitExerciseToCloud(ex, answers, gradeRes) {
        const nowIso = new Date().toISOString();
        const existing = getCloudSub(ex.id);
        const nextAttempts = existing ? (existing.attempts_count || 1) + 1 : 1;

        const rowId = currentAccount ? `${currentAccount.id}__${ex.id}` : `local__${ex.id}`;
        const localRow = {
            id: rowId,
            user_id: currentAccount ? currentAccount.id : 'local',
            section_group: ex.sectionGroup,
            exercise_id: ex.id,
            exercise_title: `Ex ${ex.num} · ${ex.title} (${ex.trackLabel})`,
            track_name: ex.trackLabel,
            answers_json: answers,
            results_json: gradeRes.results,
            correct_count: gradeRes.correctCount,
            total_questions: gradeRes.totalQuestions,
            score_percent: gradeRes.scorePercent,
            estimated_band: gradeRes.estimatedBand,
            attempts_count: nextAttempts,
            is_submitted: true,
            submitted_at: nowIso,
            updated_at: nowIso,
            teacher_score: existing ? (existing.teacher_score || '') : '',
            teacher_feedback: existing ? (existing.teacher_feedback || '') : ''
        };

        saveLocalFallbackSub(ex.id, localRow);
        authState.submissionsByExId[ex.id] = localRow;

        const client = CLOUD ? CLOUD.getClient() : null;
        if (!client || !currentAccount || authState.localPreviewMode) {
            return { ok: true, cloudSynced: false, row: localRow, note: 'Đã lưu kết quả trên trình duyệt (chế độ xem thử).' };
        }

        try {
            const payload = {
                id: rowId,
                user_id: currentAccount.id,
                section_group: ex.sectionGroup,
                exercise_id: ex.id,
                exercise_title: localRow.exercise_title,
                track_name: ex.trackLabel,
                answers_json: answers,
                results_json: gradeRes.results,
                correct_count: gradeRes.correctCount,
                total_questions: gradeRes.totalQuestions,
                score_percent: gradeRes.scorePercent,
                estimated_band: gradeRes.estimatedBand,
                attempts_count: nextAttempts,
                is_submitted: true,
                submitted_at: nowIso,
                updated_at: nowIso
            };

            const { data, error } = await client
                .from('ielts_listening_submissions')
                .upsert(payload, { onConflict: 'id' })
                .select('*')
                .maybeSingle();

            if (error) {
                return {
                    ok: true,
                    cloudSynced: false,
                    row: localRow,
                    note: 'Đã chấm điểm & lưu trên máy (chạy file supabase-setup.sql để bật đồng bộ Supabase Cloud cho Giáo viên).'
                };
            }

            try {
                await client.from('profiles').update({ last_active_at: nowIso }).eq('id', currentAccount.id);
            } catch (e) {}

            const savedRow = { ...localRow, ...(data || {}) };
            authState.submissionsByExId[ex.id] = savedRow;
            saveLocalFallbackSub(ex.id, savedRow);
            return { ok: true, cloudSynced: true, row: savedRow, note: 'Đã chấm điểm tức thì & đồng bộ kết quả lên Supabase Cloud cho Giáo viên!' };
        } catch (err) {
            return { ok: true, cloudSynced: false, row: localRow, note: 'Đã chấm điểm & lưu cục bộ (mất kết nối mạng).' };
        }
    }

    function renderExerciseStudio(ex) {
        if (!ex) return;

        const exSelect = document.getElementById('studio-ex-select');
        if (exSelect) exSelect.value = ex.id;

        const partPill = document.getElementById('studio-part-pill');
        const typeHeading = document.getElementById('studio-type-heading');
        const wsExNum = document.getElementById('ws-ex-num');
        const wsExTitle = document.getElementById('ws-ex-title');
        const wsExInst = document.getElementById('ws-ex-instruction');
        const wsWordLimit = document.getElementById('ws-word-limit');

        if (partPill) partPill.textContent = ex.ieltsPart;
        if (typeHeading) typeHeading.textContent = ex.questionType;
        if (wsExNum) wsExNum.textContent = `EX ${ex.num}`;
        if (wsExTitle) wsExTitle.textContent = `${ex.title} (${ex.trackLabel})`;
        if (wsExInst) wsExInst.textContent = ex.instruction;
        if (wsWordLimit) {
            if (ex.wordLimit) {
                wsWordLimit.textContent = ex.wordLimit;
                wsWordLimit.style.display = 'inline-block';
            } else {
                wsWordLimit.style.display = 'none';
            }
        }

        // Load audio & timer
        loadAudioForExercise(ex);
        resetStudioTimer(ex.sectionGroup === 'section2' ? 480 : 300);

        // Load saved answers (prefer cloud/local submission if no newer draft)
        const cloudSub = getCloudSub(ex.id);
        let draftAns = loadDraftAnswers(ex.id);
        if (Object.keys(draftAns).length === 0 && cloudSub && cloudSub.answers_json) {
            draftAns = cloudSub.answers_json;
        }

        activeMapTargetId = '1';
        if (wsBodyEl) {
            wsBodyEl.innerHTML = renderWorksheetBody(ex, draftAns);
            applyWsFontSize();
            bindWorksheetInteractions(ex);
        }

        renderLeftPanes(ex);
        switchLeftTab(currentLeftTab);
        updateAnsweredStatus(ex);

        if (cloudSub && cloudSub.is_submitted) {
            const gradeRes = {
                correctCount: cloudSub.correct_count || 0,
                totalQuestions: cloudSub.total_questions || ex.questions.length,
                scorePercent: cloudSub.score_percent || 0,
                estimatedBand: cloudSub.estimated_band || '',
                results: Array.isArray(cloudSub.results_json) ? cloudSub.results_json : []
            };
            applyInlineGradingMarks(ex, gradeRes, draftAns);
            renderResultAndFeedbackBoxes(ex, gradeRes, cloudSub);
        } else {
            renderResultAndFeedbackBoxes(ex, null, null);
        }

        // Prev / Next buttons
        const idx = EXERCISES.findIndex(item => item.id === ex.id);
        const prevBtn = document.getElementById('ws-prev-btn');
        const nextBtn = document.getElementById('ws-next-btn');
        if (prevBtn) {
            prevBtn.disabled = idx <= 0;
            prevBtn.onclick = () => { if (idx > 0) openExercise(EXERCISES[idx - 1].id); };
        }
        if (nextBtn) {
            nextBtn.disabled = idx < 0 || idx >= EXERCISES.length - 1;
            nextBtn.onclick = () => { if (idx < EXERCISES.length - 1) openExercise(EXERCISES[idx + 1].id); };
        }

        const leftScroll = document.getElementById('studio-left-scroll');
        const rightScroll = document.getElementById('studio-right-scroll');
        if (leftScroll) leftScroll.scrollTop = 0;
        if (rightScroll) rightScroll.scrollTop = 0;
    }

    // Submit & Reset Worksheet Buttons
    const wsSubmitBtn = document.getElementById('ws-submit-btn');
    const wsResetBtn = document.getElementById('ws-reset-btn');

    if (wsSubmitBtn) {
        wsSubmitBtn.addEventListener('click', async () => {
            const ex = DATA.byId[currentExerciseId];
            if (!ex || authState.isSubmitting) return;
            authState.isSubmitting = true;
            wsSubmitBtn.disabled = true;
            wsSubmitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Đang chấm &amp; lưu...`;

            const answers = collectAnswersFromDom(ex);
            saveDraftAnswers(ex.id, answers);
            draftSaver.flush();

            const gradeRes = gradeExercise(ex, answers);
            applyInlineGradingMarks(ex, gradeRes, answers);

            // Unlock Script & Answer Key after submitting
            unlockedScriptSet.add(ex.id);
            unlockedKeySet.add(ex.id);
            showEvidenceSet.add(ex.id);
            renderLeftPanes(ex);

            const syncRes = await submitExerciseToCloud(ex, answers, gradeRes);
            renderResultAndFeedbackBoxes(ex, gradeRes, syncRes.row, syncRes.note);
            refreshProgressAndHistoryUI();

            authState.isSubmitting = false;
            wsSubmitBtn.disabled = false;
            wsSubmitBtn.innerHTML = `<i class="fas fa-check-circle"></i> Kiểm tra &amp; Nộp lại`;

            const scoreBox = document.getElementById('ws-result-summary-box');
            if (scoreBox) scoreBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }

    if (wsResetBtn) {
        wsResetBtn.addEventListener('click', () => {
            const ex = DATA.byId[currentExerciseId];
            if (!ex) return;
            if (!confirm(`Xóa toàn bộ câu trả lời hiện tại của Exercise ${ex.num} để nghe làm lại từ đầu?`)) return;
            try { localStorage.removeItem(getDraftKey(ex.id)); } catch (e) {}
            if (wsBodyEl) {
                wsBodyEl.innerHTML = renderWorksheetBody(ex, {});
                bindWorksheetInteractions(ex);
            }
            updateAnsweredStatus(ex);
            const scoreBox = document.getElementById('ws-result-summary-box');
            if (scoreBox) { scoreBox.style.display = 'none'; scoreBox.innerHTML = ''; }
        });
    }

    // ========================================================================
    // 10. PROGRESS, HISTORY VIEW & TEACHER FEEDBACK NOTIFICATIONS
    // ========================================================================
    function refreshProgressAndHistoryUI() {
        const subs = Object.values(authState.submissionsByExId || {})
            .filter(s => s && s.is_submitted)
            .sort((a, b) => new Date(b.submitted_at || b.updated_at || 0).getTime() - new Date(a.submitted_at || a.updated_at || 0).getTime());

        const totalEx = EXERCISES.length || 15;
        const pct = Math.min(100, Math.round((subs.length / totalEx) * 100));

        const ratioEl = document.getElementById('sb-progress-ratio');
        const fillEl = document.getElementById('sb-progress-fill');
        const sbCountEl = document.getElementById('sb-submissions-count');

        if (ratioEl) ratioEl.textContent = `${subs.length}/${totalEx}`;
        if (fillEl) fillEl.style.width = `${pct}%`;
        if (sbCountEl) {
            sbCountEl.textContent = String(subs.length);
            sbCountEl.style.display = subs.length > 0 ? 'inline-block' : 'none';
        }

        document.querySelectorAll('[data-sb-lesson-id]').forEach(btn => {
            const lid = btn.getAttribute('data-sb-lesson-id');
            const isSub = Boolean(lid && authState.submissionsByExId[lid] && authState.submissionsByExId[lid].is_submitted);
            btn.classList.toggle('submitted', isSub);
        });

        // Home Dashboard Stats
        const homeCompletedEl = document.getElementById('home-stat-completed');
        const homeAvgEl = document.getElementById('home-stat-avg');
        const sec1Badge = document.getElementById('home-sec1-badge');
        const sec2Badge = document.getElementById('home-sec2-badge');

        if (homeCompletedEl) homeCompletedEl.textContent = `${subs.length} / ${totalEx} bài`;
        if (homeAvgEl) {
            if (subs.length === 0) {
                homeAvgEl.textContent = 'Chưa có bài';
            } else {
                const avgPct = Math.round(subs.reduce((acc, s) => acc + (s.score_percent || 0), 0) / subs.length);
                const band = CLOUD ? CLOUD.estimateIeltsBand(avgPct, 100) : '';
                homeAvgEl.textContent = `${avgPct}% · ${band}`;
            }
        }
        const sec1Done = subs.filter(s => s.section_group === 'section1').length;
        const sec2Done = subs.filter(s => s.section_group === 'section2').length;
        if (sec1Badge) sec1Badge.textContent = `${sec1Done}/8 đã nộp`;
        if (sec2Badge) sec2Badge.textContent = `${sec2Done}/7 đã nộp`;

        renderHubCards();
        renderMySubmissionsView();
        renderNotificationBell();
    }

    function renderMySubmissionsView() {
        const listEl = document.getElementById('my-submissions-list');
        const headingEl = document.getElementById('my-submissions-heading');
        const subs = Object.values(authState.submissionsByExId || {})
            .filter(s => s && s.is_submitted)
            .sort((a, b) => new Date(b.submitted_at || b.updated_at || 0).getTime() - new Date(a.submitted_at || a.updated_at || 0).getTime());

        if (headingEl) headingEl.textContent = `Bài nghe đã nộp · ${subs.length} bài`;
        if (!listEl) return;

        if (subs.length === 0) {
            listEl.innerHTML = `
                <div class="ej-history-empty">
                    <p style="font-size:15.5px;font-weight:800;color:#18181B;margin-bottom:6px;">Bạn chưa nộp bài nghe nào.</p>
                    <p style="font-size:13.5px;margin-bottom:16px;">Hãy mở một bài nghe ở Phần 1 hoặc Phần 2, điền đáp án và bấm <strong>Kiểm tra &amp; Nộp bài</strong> nhé!</p>
                    <button type="button" class="nb-back-btn" data-open-exercise="ex-01">Bắt đầu Exercise 01 →</button>
                </div>
            `;
            return;
        }

        listEl.innerHTML = subs.map(sub => {
            const ex = DATA.byId[sub.exercise_id];
            const title = ex ? `Ex ${ex.num} · ${ex.title} (${ex.trackLabel})` : (sub.exercise_title || sub.exercise_id);
            const hasTeacher = Boolean((sub.teacher_score && sub.teacher_score.trim()) || (sub.teacher_feedback && sub.teacher_feedback.trim()));
            const isSec1 = sub.section_group === 'section1';
            const secStyle = isSec1
                ? 'background:#FEF3C7;color:#92400E;border:1px solid #F59E0B;'
                : 'background:#EEF2FF;color:#3730A3;border:1px solid #818CF8;';

            return `
                <div class="ej-history-card">
                    <div class="ej-history-left">
                        <div class="ej-history-badges">
                            <span style="font-size:11px;font-weight:800;padding:2px 8px;${secStyle}">${isSec1 ? 'Phần 1' : 'Phần 2'}</span>
                            <span style="font-family:'JetBrains Mono',monospace;font-size:11.5px;font-weight:800;padding:2px 8px;background:#DCFCE7;color:#166534;border:1px solid #86EFAC;">
                                ${sub.correct_count || 0}/${sub.total_questions || 0} (${sub.score_percent || 0}%) · ${esc(sub.estimated_band || '')}
                            </span>
                            ${hasTeacher ? `<span class="notif-item-tag">👨‍🏫 GV đã nhận xét${sub.teacher_score ? ` (${esc(sub.teacher_score)})` : ''}</span>` : ''}
                        </div>
                        <div class="ej-history-title">${esc(title)}</div>
                        <div class="ej-history-meta">Đã nộp lúc ${esc(fmtTime(sub.submitted_at || sub.updated_at))} · Lần nộp #${sub.attempts_count || 1}</div>
                    </div>
                    <button type="button" class="nb-back-btn" data-open-exercise="${esc(sub.exercise_id)}">
                        <span>Mở bài &amp; Tapescript</span>
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            `;
        }).join('');
    }

    // Notification Bell (Alerts when teacher writes feedback/score)
    const topbarNotifWrap = document.getElementById('topbar-notif-wrap');
    const topbarNotifBtn = document.getElementById('topbar-notif-btn');
    const topbarNotifBadge = document.getElementById('topbar-notif-badge');
    const topbarNotifDropdown = document.getElementById('topbar-notif-dropdown');
    const topbarNotifList = document.getElementById('topbar-notif-list');

    async function markFeedbackAsSeen(exId) {
        const sub = getCloudSub(exId);
        if (!sub || sub.student_seen_feedback_at) return;
        const hasTeacher = Boolean((sub.teacher_score && sub.teacher_score.trim()) || (sub.teacher_feedback && sub.teacher_feedback.trim()));
        if (!hasTeacher) return;
        sub.student_seen_feedback_at = new Date().toISOString();
        renderNotificationBell();
        const client = CLOUD ? CLOUD.getClient() : null;
        if (client && !authState.localPreviewMode) {
            try { await client.rpc('mark_listening_feedback_seen', { p_submission_id: sub.id }); } catch (e) {}
        }
    }

    function renderNotificationBell() {
        if (!topbarNotifWrap || !topbarNotifBtn || !topbarNotifBadge || !topbarNotifList) return;
        if (!currentAccount) {
            topbarNotifWrap.style.display = 'none';
            return;
        }
        topbarNotifWrap.style.display = 'inline-flex';

        const teacherNotifs = Object.values(authState.submissionsByExId || {})
            .filter(s => s && ((s.teacher_score && s.teacher_score.trim()) || (s.teacher_feedback && s.teacher_feedback.trim())))
            .sort((a, b) => new Date(b.teacher_updated_at || b.updated_at || 0).getTime() - new Date(a.teacher_updated_at || a.updated_at || 0).getTime());

        const unreadCount = teacherNotifs.filter(s => !s.student_seen_feedback_at).length;

        topbarNotifBtn.classList.toggle('has-unread', unreadCount > 0);
        topbarNotifBadge.style.display = unreadCount > 0 ? 'inline-flex' : 'none';
        topbarNotifBadge.textContent = String(unreadCount);

        if (teacherNotifs.length === 0) {
            topbarNotifList.innerHTML = `<div class="notif-empty-state">Chưa có nhận xét mới từ Giáo viên.<br/>Khi Giáo viên chấm hoặc nhận xét bài nghe của bạn, thông báo sẽ hiện tại đây.</div>`;
            return;
        }

        topbarNotifList.innerHTML = teacherNotifs.map(sub => {
            const isUnread = !sub.student_seen_feedback_at;
            return `
                <button type="button" class="notif-item-btn ${isUnread ? 'unread' : ''}" data-notif-ex="${esc(sub.exercise_id)}">
                    <div class="notif-item-top">
                        <span class="notif-item-tag ${isUnread ? 'new-dot' : ''}">${isUnread ? 'Mới · GV nhận xét' : '👨‍🏫 Đã xem'}</span>
                        <span class="notif-item-time">${esc(fmtTime(sub.teacher_updated_at || sub.updated_at))}</span>
                    </div>
                    <div style="font-size:13px;font-weight:800;color:#18181B;">${esc(sub.exercise_title || sub.exercise_id)}</div>
                    <div style="font-size:12px;color:#52525B;">${sub.teacher_score ? `Điểm: ${esc(sub.teacher_score)} · ` : ''}${esc((sub.teacher_feedback || '').slice(0, 75))}</div>
                </button>
            `;
        }).join('');

        topbarNotifList.querySelectorAll('[data-notif-ex]').forEach(btn => {
            btn.onclick = () => {
                authState.notifOpen = false;
                topbarNotifDropdown.style.display = 'none';
                openExercise(btn.getAttribute('data-notif-ex'));
            };
        });
    }

    if (topbarNotifBtn && topbarNotifDropdown) {
        topbarNotifBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            authState.notifOpen = !authState.notifOpen;
            topbarNotifDropdown.style.display = authState.notifOpen ? 'block' : 'none';
            topbarNotifBtn.setAttribute('aria-expanded', authState.notifOpen ? 'true' : 'false');
        });
        document.addEventListener('click', (e) => {
            if (authState.notifOpen && !e.target.closest('#topbar-notif-wrap')) {
                authState.notifOpen = false;
                topbarNotifDropdown.style.display = 'none';
            }
        });
    }

    // ========================================================================
    // 11. SUPABASE AUTH GATE & MANDATORY PROFILE SETUP (MATCHES VSTEP WRITING)
    // ========================================================================
    const authGateEl = document.getElementById('listening-auth-gate');
    const topbarTeacherLink = document.getElementById('topbar-teacher-link');
    const topbarAccountPill = document.getElementById('topbar-account-pill');
    const topbarUserInitials = document.getElementById('topbar-user-initials');
    const topbarUserName = document.getElementById('topbar-user-name');

    function syncTopbarAccountUI() {
        if (!currentAccount) {
            if (topbarTeacherLink) topbarTeacherLink.style.display = 'none';
            if (topbarNotifWrap) topbarNotifWrap.style.display = 'none';
            if (topbarAccountPill) topbarAccountPill.style.display = 'none';
            return;
        }
        if (topbarTeacherLink) topbarTeacherLink.style.display = authState.isTeacher ? 'inline-flex' : 'none';
        if (topbarAccountPill) topbarAccountPill.style.display = 'inline-flex';
        if (topbarUserInitials && CLOUD) topbarUserInitials.textContent = CLOUD.getInitials(currentAccount.name);
        if (topbarUserName) topbarUserName.textContent = currentAccount.name || currentAccount.email;
        refreshProgressAndHistoryUI();
    }

    async function handleSignOut(askConfirm = false) {
        if (askConfirm && !confirm('Bạn có muốn đăng xuất khỏi tài khoản hiện tại?')) return;
        stopAllAudio();
        draftSaver.flush();
        const client = CLOUD ? CLOUD.getClient() : null;
        if (client && !authState.localPreviewMode) {
            try { await client.auth.signOut(); } catch (e) {}
        }
        currentAccount = null;
        authState.localPreviewMode = false;
        authState.isTeacher = false;
        authState.needsProfileSetup = false;
        authState.submissionsByExId = {};
        authState.authMode = 'login';
        authState.authError = '';
        authState.authInfo = '';
        authState.authLoading = false;
        navigateToView('home-dashboard');
        renderAuthGate();
    }

    if (topbarAccountPill) {
        topbarAccountPill.addEventListener('click', () => handleSignOut(true));
    }

    function renderAuthCardHtml() {
        const isReg = authState.authMode === 'register';
        return `
            <div class="auth-wrapper">
                <div class="auth-card-box">
                    <div style="margin-bottom:10px;">
                        <span class="auth-badge-tag">IELTS LISTENING · TÀI KHOẢN HỌC VIÊN</span>
                    </div>

                    <h1 style="font-size:22px;font-weight:900;color:#18181B;margin-bottom:6px;">
                        ${isReg ? 'Tạo tài khoản học viên' : 'Đăng nhập học tập'}
                    </h1>
                    <p style="font-size:13.5px;color:#52525B;line-height:1.5;margin-bottom:16px;">
                        ${isReg
                            ? 'Đăng nhập nhanh bằng Google hoặc tạo tài khoản để luyện trọn bộ 15 bài nghe Survival English và lưu điểm gửi cho Giáo viên.'
                            : 'Đăng nhập bằng tài khoản Google hoặc email của bạn để tiếp tục luyện IELTS Listening (Tracks 53–67) và xem điểm số.'}
                    </p>

                    <button type="button" class="google-auth-btn" id="btn-google-login" ${authState.authLoading ? 'disabled' : ''}>
                        ${CLOUD ? CLOUD.renderGoogleIconSvg(19) : ''}
                        <span>${authState.authLoading ? 'Đang kết nối tới Google...' : 'Tiếp tục với Google'}</span>
                    </button>

                    <div class="auth-or-divider"><span>Hoặc dùng tài khoản Email</span></div>

                    <div class="auth-tabs-row">
                        <button type="button" class="auth-tab ${!isReg ? 'active' : ''}" id="btn-tab-login">Đăng nhập</button>
                        <button type="button" class="auth-tab ${isReg ? 'active' : ''}" id="btn-tab-register">Tạo tài khoản mới</button>
                    </div>

                    ${authState.authError ? `<div style="padding:8px 12px;border:1.5px solid #DC2626;background:#FEF2F2;color:#B91C1C;font-size:12.5px;font-weight:700;margin-bottom:12px;">⚠️ ${esc(authState.authError)}</div>` : ''}
                    ${authState.authInfo ? `<div style="padding:8px 12px;border:1.5px solid #16A34A;background:#F0FDF4;color:#166534;font-size:12.5px;font-weight:700;margin-bottom:12px;">✓ ${esc(authState.authInfo)}</div>` : ''}

                    <form id="auth-form" onsubmit="return false;">
                        ${isReg ? `
                            <div class="form-field">
                                <label class="form-label" for="inp-auth-name">Họ và tên đầy đủ</label>
                                <input type="text" id="inp-auth-name" class="form-input" placeholder="Ví dụ: Nguyễn Minh Tùng" required />
                            </div>
                            <div class="form-field">
                                <label class="form-label">Chọn lớp học của bạn *</label>
                                <div class="class-select-grid">
                                    ${(CLOUD ? CLOUD.CLASS_LIST : ['ONB204', 'CB221']).map(cls => `
                                        <button type="button" class="class-option-btn ${authState.regSelectedClass === cls ? 'active' : ''}" data-reg-class="${cls}">Lớp ${cls}</button>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}

                        <div class="form-field">
                            <label class="form-label" for="inp-auth-email">Email</label>
                            <input type="email" id="inp-auth-email" class="form-input" placeholder="Nhập email của bạn..." required />
                        </div>

                        <div class="form-field">
                            <label class="form-label" for="inp-auth-pass">Mật khẩu</label>
                            <input type="password" id="inp-auth-pass" class="form-input" placeholder="Nhập mật khẩu..." required />
                        </div>

                        <button type="submit" class="form-submit-btn" ${authState.authLoading ? 'disabled' : ''}>
                            ${isReg ? 'Tạo tài khoản &amp; Vào học →' : 'Đăng nhập →'}
                        </button>
                    </form>
                </div>
            </div>
        `;
    }

    function renderProfileSetupHtml() {
        return `
            <div class="auth-wrapper">
                <div class="auth-card-box">
                    <div style="margin-bottom:10px;">
                        <span class="auth-badge-tag">THÔNG TIN HỌC VIÊN · BẮT BUỘC</span>
                    </div>
                    <h1 style="font-size:21px;font-weight:900;color:#18181B;margin-bottom:6px;">Hoàn tất thông tin học viên</h1>
                    <p style="font-size:13.5px;color:#52525B;line-height:1.5;margin-bottom:16px;">
                        Vui lòng nhập đầy đủ <strong>Họ và tên</strong> và chọn đúng <strong>Lớp</strong> của bạn để Giáo viên nhận diện và theo dõi kết quả bài nghe chính xác.
                    </p>

                    ${authState.isTeacher ? `
                        <div style="margin-bottom:14px;">
                            <a href="./teacher.html" class="top-pill-btn teacher-nav-pill" style="width:100%;justify-content:center;height:38px;">
                                👨‍🏫 Vào thẳng Trang Giáo viên →
                            </a>
                        </div>
                    ` : ''}

                    ${authState.profileFormError ? `<div style="padding:8px 12px;border:1.5px solid #DC2626;background:#FEF2F2;color:#B91C1C;font-size:12.5px;font-weight:700;margin-bottom:12px;">⚠️ ${esc(authState.profileFormError)}</div>` : ''}

                    <form id="profile-setup-form" onsubmit="return false;">
                        <div class="form-field">
                            <label class="form-label" for="inp-setup-fullname">Họ và tên đầy đủ *</label>
                            <input type="text" id="inp-setup-fullname" class="form-input" placeholder="Ví dụ: Nguyễn Văn An" value="${esc(authState.profileFormName)}" required />
                        </div>
                        <div class="form-field" style="margin-bottom:16px;">
                            <label class="form-label">Chọn lớp của bạn *</label>
                            <div class="class-select-grid">
                                ${(CLOUD ? CLOUD.CLASS_LIST : ['ONB204', 'CB221']).map(cls => `
                                    <button type="button" class="class-option-btn ${authState.profileFormClass === cls ? 'active' : ''}" data-setup-class="${cls}">Lớp ${cls}</button>
                                `).join('')}
                            </div>
                        </div>
                        <button type="submit" class="form-submit-btn" ${authState.profileSaving ? 'disabled' : ''}>
                            ${authState.profileSaving ? 'Đang lưu thông tin...' : 'Lưu thông tin &amp; Vào học →'}
                        </button>
                        <button type="button" id="btn-logout-account" style="width:100%;height:36px;margin-top:8px;border:none;background:transparent;color:#71717A;font-weight:600;font-size:12.5px;cursor:pointer;">
                            Đăng xuất tài khoản khác
                        </button>
                    </form>
                </div>
            </div>
        `;
    }

    function bindAuthGateEvents() {
        const btnLogin = document.getElementById('btn-tab-login');
        if (btnLogin) btnLogin.onclick = () => { authState.authMode = 'login'; authState.authError = ''; renderAuthGate(); };

        const btnReg = document.getElementById('btn-tab-register');
        if (btnReg) btnReg.onclick = () => { authState.authMode = 'register'; authState.authError = ''; renderAuthGate(); };

        const btnGoogle = document.getElementById('btn-google-login');
        if (btnGoogle) {
            btnGoogle.onclick = async () => {
                authState.authError = '';
                authState.authInfo = '';
                authState.authLoading = true;
                renderAuthGate();
                const { error } = await CLOUD.signInWithGoogle();
                if (error) {
                    authState.authLoading = false;
                    authState.authError = 'Không thể mở đăng nhập Google: ' + (error.message || 'Lỗi kết nối');
                    renderAuthGate();
                }
            };
        }

        document.querySelectorAll('[data-reg-class]').forEach(btn => {
            btn.onclick = () => {
                authState.regSelectedClass = btn.getAttribute('data-reg-class');
                document.querySelectorAll('[data-reg-class]').forEach(b => b.classList.toggle('active', b === btn));
            };
        });

        document.querySelectorAll('[data-setup-class]').forEach(btn => {
            btn.onclick = () => {
                authState.profileFormClass = btn.getAttribute('data-setup-class');
                document.querySelectorAll('[data-setup-class]').forEach(b => b.classList.toggle('active', b === btn));
            };
        });

        const authForm = document.getElementById('auth-form');
        if (authForm) {
            authForm.onsubmit = async e => {
                e.preventDefault();
                const client = CLOUD ? CLOUD.getClient() : null;
                if (!client) {
                    authState.authError = 'Chưa cấu hình kết nối Supabase.';
                    renderAuthGate();
                    return;
                }
                const nameEl = document.getElementById('inp-auth-name');
                const email = (document.getElementById('inp-auth-email').value || '').trim().toLowerCase();
                const password = (document.getElementById('inp-auth-pass').value || '').trim();
                const name = (nameEl ? nameEl.value : '').trim();
                const chosenClass = authState.regSelectedClass || CLOUD.CLASS_LIST[0];

                if (!email || !password) {
                    authState.authError = 'Vui lòng nhập đầy đủ Email và Mật khẩu.';
                    renderAuthGate();
                    return;
                }

                authState.authLoading = true;
                authState.authError = '';
                authState.authInfo = '';
                renderAuthGate();

                if (authState.authMode === 'register') {
                    if (!name) {
                        authState.authLoading = false;
                        authState.authError = 'Vui lòng nhập đầy đủ họ và tên của bạn.';
                        renderAuthGate();
                        return;
                    }
                    if (password.length < 6) {
                        authState.authLoading = false;
                        authState.authError = 'Mật khẩu cần tối thiểu 6 ký tự.';
                        renderAuthGate();
                        return;
                    }
                    const { data, error } = await client.auth.signUp({
                        email,
                        password,
                        options: {
                            data: { full_name: CLOUD.formatStoredFullName(name, chosenClass), class_name: chosenClass },
                            emailRedirectTo: CLOUD.getRedirectUrl()
                        }
                    });
                    authState.authLoading = false;
                    if (error) {
                        authState.authError = error.message || 'Không thể tạo tài khoản.';
                        renderAuthGate();
                        return;
                    }
                    if (data && data.session && data.user) {
                        await loadCloudStudentData(data.user);
                    } else {
                        authState.authInfo = "Đăng ký thành công! Vui lòng kiểm tra Email để xác nhận, hoặc bấm 'Tiếp tục với Google' để vào học ngay.";
                        authState.authMode = 'login';
                        renderAuthGate();
                    }
                } else {
                    const { data, error } = await client.auth.signInWithPassword({ email, password });
                    authState.authLoading = false;
                    if (error) {
                        authState.authError = 'Email hoặc mật khẩu chưa đúng (hoặc tài khoản chưa xác nhận email).';
                        renderAuthGate();
                        return;
                    }
                    if (data && data.user) {
                        await loadCloudStudentData(data.user);
                    }
                }
            };
        }

        const profileForm = document.getElementById('profile-setup-form');
        if (profileForm) {
            profileForm.onsubmit = async e => {
                e.preventDefault();
                const client = CLOUD ? CLOUD.getClient() : null;
                if (!client || !currentAccount) return;
                const nameInp = document.getElementById('inp-setup-fullname');
                const cleanName = (nameInp ? nameInp.value : authState.profileFormName).trim();
                const chosenClass = String(authState.profileFormClass || '').trim().toUpperCase();

                authState.profileFormName = cleanName;
                if (!cleanName) {
                    authState.profileFormError = 'Vui lòng nhập đầy đủ họ và tên của bạn.';
                    renderAuthGate();
                    return;
                }
                if (!CLOUD.CLASS_LIST.includes(chosenClass)) {
                    authState.profileFormError = 'Vui lòng chọn lớp của bạn (ONB204 hoặc CB221).';
                    renderAuthGate();
                    return;
                }

                const storedFullName = CLOUD.formatStoredFullName(cleanName, chosenClass);
                authState.profileSaving = true;
                authState.profileFormError = '';
                renderAuthGate();

                const { error: profErr } = await client.from('profiles').upsert({
                    id: currentAccount.id,
                    email: currentAccount.email,
                    full_name: storedFullName,
                    last_active_at: new Date().toISOString()
                }, { onConflict: 'id' });

                authState.profileSaving = false;
                if (profErr) {
                    authState.profileFormError = 'Không lưu được thông tin: ' + profErr.message;
                    renderAuthGate();
                    return;
                }
                try {
                    await client.auth.updateUser({ data: { full_name: storedFullName, class_name: chosenClass } });
                } catch (err) {}

                currentAccount.name = cleanName;
                currentAccount.className = chosenClass;
                authState.needsProfileSetup = false;
                renderAuthGate();
            };
        }

        const btnLogout = document.getElementById('btn-logout-account');
        if (btnLogout) btnLogout.onclick = () => handleSignOut(false);
    }

    function renderAuthGate() {
        if (!authGateEl || !appLayout) return;
        if (!CLOUD) {
            authGateEl.style.display = 'none';
            appLayout.style.display = '';
            return;
        }
        if (currentAccount && !authState.needsProfileSetup) {
            authGateEl.style.display = 'none';
            authGateEl.innerHTML = '';
            appLayout.style.display = '';
            syncTopbarAccountUI();
            return;
        }
        appLayout.style.display = 'none';
        authGateEl.style.display = 'block';
        authGateEl.innerHTML = currentAccount && authState.needsProfileSetup
            ? renderProfileSetupHtml()
            : renderAuthCardHtml();
        bindAuthGateEvents();
    }

    async function loadCloudStudentData(sessionUser) {
        const client = CLOUD ? CLOUD.getClient() : null;
        if (!client || !sessionUser) return;

        const uid = sessionUser.id;
        const email = String(sessionUser.email || '').trim().toLowerCase();
        const wantsPracticeMode = new URLSearchParams(window.location.search).get('mode') === 'practice';
        const isPrimaryTeacherEmail = email === 'mtung0208@gmail.com';

        if (isPrimaryTeacherEmail && !wantsPracticeMode) {
            setTimeout(() => {
                window.location.replace('./teacher.html');
            }, 120);
            return;
        }

        const meta = sessionUser.user_metadata || {};
        const appMeta = sessionUser.app_metadata || {};
        const fallbackName = String(meta.full_name || meta.name || '').trim() ||
            email.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

        authState.authLoading = true;
        renderAuthGate();

        const [profileRes, subsRes, teacherRes] = await Promise.all([
            client.from('profiles').select('*').eq('id', uid).maybeSingle(),
            client.from('ielts_listening_submissions').select('*').eq('user_id', uid),
            client.rpc('is_teacher')
        ]);

        authState.isTeacher = Boolean(teacherRes && !teacherRes.error && teacherRes.data === true) || isPrimaryTeacherEmail;
        if (authState.isTeacher && !wantsPracticeMode) {
            window.location.replace('./teacher.html');
            return;
        }

        const rawStoredName = (profileRes && profileRes.data && profileRes.data.full_name) || fallbackName;
        const parsed = CLOUD.parseFullNameAndClass(rawStoredName);
        const metaClass = String(meta.class_name || '').trim().toUpperCase();
        const resolvedClass = parsed.className || (CLOUD.CLASS_LIST.includes(metaClass) ? metaClass : '');
        const resolvedName = parsed.fullName || fallbackName;
        const storedFullName = CLOUD.formatStoredFullName(resolvedName, resolvedClass);

        try {
            await client.from('profiles').upsert({
                id: uid,
                email: email,
                full_name: storedFullName,
                avatar_url: meta.avatar_url || meta.picture || '',
                auth_provider: appMeta.provider || 'email',
                last_active_at: new Date().toISOString()
            }, { onConflict: 'id' });
        } catch (e) {}

        currentAccount = { id: uid, name: resolvedName, className: resolvedClass, email };

        const subsMap = { ...loadLocalFallbackSubs() };
        if (Array.isArray(subsRes.data)) {
            subsRes.data.forEach(row => {
                if (row && row.exercise_id) subsMap[row.exercise_id] = row;
            });
        }

        authState.submissionsByExId = subsMap;
        authState.needsProfileSetup = !resolvedClass && !authState.isTeacher;
        authState.profileFormName = resolvedName;
        authState.profileFormClass = resolvedClass || CLOUD.CLASS_LIST[0];
        authState.authLoading = false;

        renderAuthGate();
        refreshProgressAndHistoryUI();
    }

    // ========================================================================
    // 12. BOOTSTRAP
    // ========================================================================
    buildStaticAndDynamicCatalogs();
    updateTopbarForView('home-dashboard');

    (async function bootstrapListeningApp() {
        // Localhost-only preview param strictly for local UI inspection
        const params = new URLSearchParams(window.location.search);
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        if (isLocalhost && params.get('preview') === 'student') {
            authState.localPreviewMode = true;
            currentAccount = { id: 'preview-local', name: 'Nguyễn Văn An', className: 'ONB204', email: 'hocvien@demo.local' };
            authState.submissionsByExId = loadLocalFallbackSubs();
            renderAuthGate();
            refreshProgressAndHistoryUI();
            return;
        }

        if (!CLOUD) {
            renderAuthGate();
            return;
        }
        const client = CLOUD.getClient();
        if (!client) {
            authState.authError = 'Chưa cấu hình kết nối Supabase.';
            renderAuthGate();
            return;
        }

        let authLoadInFlight = false;
        async function handleSessionUser(sessionUser) {
            if (!sessionUser || authLoadInFlight) return;
            if (currentAccount && currentAccount.id === sessionUser.id) return;
            authLoadInFlight = true;
            try {
                await loadCloudStudentData(sessionUser);
            } finally {
                authLoadInFlight = false;
            }
        }

        const oauthErr = CLOUD.extractOAuthErrorFromUrl ? CLOUD.extractOAuthErrorFromUrl() : '';
        if (oauthErr) {
            authState.authError = 'Đăng nhập Google không thành công: ' + oauthErr;
        } else if (CLOUD.hasAuthCallbackParams && CLOUD.hasAuthCallbackParams()) {
            authState.authLoading = true;
        }

        renderAuthGate();

        // Register listener BEFORE getSession() and defer async Supabase calls out of lock
        client.auth.onAuthStateChange((event, session) => {
            if ((event === 'INITIAL_SESSION' || event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session && session.user) {
                setTimeout(() => {
                    handleSessionUser(session.user);
                }, 0);
            } else if (event === 'SIGNED_OUT') {
                currentAccount = null;
                authState.isTeacher = false;
                authState.needsProfileSetup = false;
                authState.submissionsByExId = {};
                authState.authLoading = false;
                renderAuthGate();
            } else if (event === 'INITIAL_SESSION' && !session) {
                if (authState.authLoading) {
                    authState.authLoading = false;
                    renderAuthGate();
                }
            }
        });

        const { data, error: sessErr } = await client.auth.getSession();
        if (sessErr && !authState.authError) {
            authState.authError = 'Lỗi phiên đăng nhập: ' + sessErr.message;
            authState.authLoading = false;
            renderAuthGate();
        } else if (data && data.session && data.session.user) {
            await handleSessionUser(data.session.user);
        } else if (authState.authLoading && !(CLOUD.hasAuthCallbackParams && CLOUD.hasAuthCallbackParams())) {
            authState.authLoading = false;
            renderAuthGate();
        }
    })();
});
