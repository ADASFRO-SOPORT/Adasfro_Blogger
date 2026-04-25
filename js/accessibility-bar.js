/**
 * ADASFRO — Panel de Accesibilidad
 * WCAG 2.1 AA | Persistencia con localStorage
 * Icono universal de accesibilidad (ISA) — votación comunitaria pendiente
 */

(function () {
  'use strict';

  // ── Configura aquí el número de WhatsApp real de ADASFRO ──
  // Formato: código de país sin "+" + número sin espacios ni guiones
  // Costa Rica: 506 + 8 dígitos. Ejemplo: '50688887777'
  var WHATSAPP_NUMBER = '50625742048';

  var ATKINSON_FONT_URL = 'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&display=swap';
  var STORAGE_KEY = 'adasfro_a11y_v1';

  var defaults = {
    fontSize: 'normal',     // 'normal' | 'large' | 'xlarge'
    contrast: false,
    dyslexiaFont: false,
    lowStimulation: false,
  };

  var state = Object.assign({}, defaults);
  var panelOpen = false;
  var isSpeaking = false;

  // ── Persistencia ─────────────────────────────────────────────
  function loadPrefs() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved) state = Object.assign({}, defaults, JSON.parse(saved));
    } catch (e) {}
  }

  function savePrefs() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  // ── Inyección de HTML ─────────────────────────────────────────
  function injectHTML() {
    // Botón trigger (icono universal de accesibilidad)
    var trigger = document.createElement('button');
    trigger.id = 'a11y-trigger';
    trigger.setAttribute('aria-label', 'Abrir panel de accesibilidad');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', 'a11y-panel');
    trigger.innerHTML = '<i class="fas fa-wheelchair" aria-hidden="true"></i>';
    document.body.appendChild(trigger);

    // Overlay
    var overlay = document.createElement('div');
    overlay.id = 'a11y-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlay);

    // Panel
    var panel = document.createElement('div');
    panel.id = 'a11y-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Panel de accesibilidad');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-hidden', 'true');
    panel.innerHTML = buildPanelHTML();
    document.body.appendChild(panel);

    // Botón flotante WhatsApp se agrega directamente en el HTML del tema
  }

  function buildPanelHTML() {
    return [
      '<div class="a11y-panel-header">',
        '<span><i class="fas fa-universal-access" aria-hidden="true"></i> Accesibilidad</span>',
        '<button id="a11y-close" aria-label="Cerrar panel de accesibilidad">',
          '<i class="fas fa-times" aria-hidden="true"></i>',
        '</button>',
      '</div>',

      // Tamaño de letra
      '<div class="a11y-section">',
        '<h3 id="a11y-font-label">Tamaño de letra</h3>',
        '<div class="a11y-btn-group" role="group" aria-labelledby="a11y-font-label">',
          '<button class="a11y-btn" data-action="font-normal" aria-pressed="true" title="Tamaño normal">',
            '<span style="font-size:14px">A</span>',
          '</button>',
          '<button class="a11y-btn" data-action="font-large" aria-pressed="false" title="Tamaño +25%">',
            '<span style="font-size:18px">A</span>',
          '</button>',
          '<button class="a11y-btn" data-action="font-xlarge" aria-pressed="false" title="Tamaño +50%">',
            '<span style="font-size:22px">A</span>',
          '</button>',
        '</div>',
        '<div style="display:flex;gap:6px;margin-top:6px;padding:0 2px">',
          '<span style="font-size:11px;color:#64748B;flex:1;text-align:center">Normal</span>',
          '<span style="font-size:11px;color:#64748B;flex:1;text-align:center">+25%</span>',
          '<span style="font-size:11px;color:#64748B;flex:1;text-align:center">+50%</span>',
        '</div>',
      '</div>',

      // Contraste
      '<div class="a11y-section">',
        '<h3>Contraste</h3>',
        '<div class="a11y-btn-group">',
          '<button class="a11y-btn a11y-toggle" data-action="contrast" aria-pressed="false">',
            '<i class="fas fa-adjust" aria-hidden="true"></i> Alto contraste',
          '</button>',
        '</div>',
      '</div>',

      // Tipografía
      '<div class="a11y-section">',
        '<h3>Tipografía</h3>',
        '<div class="a11y-btn-group">',
          '<button class="a11y-btn a11y-toggle" data-action="dyslexia-font" aria-pressed="false">',
            '<i class="fas fa-font" aria-hidden="true"></i> Fuente para dislexia',
          '</button>',
        '</div>',
        '<p>Atkinson Hyperlegible — diseñada para máxima legibilidad</p>',
      '</div>',

      // Baja estimulación
      '<div class="a11y-section">',
        '<h3>Estimulación visual</h3>',
        '<div class="a11y-btn-group">',
          '<button class="a11y-btn a11y-toggle" data-action="low-stimulation" aria-pressed="false">',
            '<i class="fas fa-leaf" aria-hidden="true"></i> Baja estimulación',
          '</button>',
        '</div>',
        '<p>Elimina animaciones, reduce colores y efectos visuales</p>',
      '</div>',

      // Lectura en voz alta
      '<div class="a11y-section">',
        '<h3>Lectura</h3>',
        '<div class="a11y-btn-group">',
          '<button class="a11y-btn a11y-toggle" data-action="tts" aria-pressed="false" id="a11y-tts-btn">',
            '<i class="fas fa-volume-up" aria-hidden="true"></i> Leer en voz alta',
          '</button>',
        '</div>',
        '<p>Lee el contenido principal de esta página</p>',
      '</div>',

      // Restablecer
      '<div class="a11y-reset">',
        '<button class="a11y-btn a11y-btn-reset" data-action="reset">',
          '<i class="fas fa-undo" aria-hidden="true"></i> Restablecer configuración',
        '</button>',
      '</div>',
    ].join('');
  }

  // ── Apertura / cierre del panel ───────────────────────────────
  function openPanel() {
    var panel = document.getElementById('a11y-panel');
    var overlay = document.getElementById('a11y-overlay');
    var trigger = document.getElementById('a11y-trigger');

    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    overlay.classList.add('active');
    trigger.setAttribute('aria-expanded', 'true');
    panelOpen = true;

    // Focus trap: mover foco al botón cerrar
    var closeBtn = document.getElementById('a11y-close');
    if (closeBtn) setTimeout(function () { closeBtn.focus(); }, 50);
  }

  function closePanel() {
    var panel = document.getElementById('a11y-panel');
    var overlay = document.getElementById('a11y-overlay');
    var trigger = document.getElementById('a11y-trigger');

    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('active');
    trigger.setAttribute('aria-expanded', 'false');
    panelOpen = false;

    trigger.focus();
  }

  // ── Aplicar estado al DOM ─────────────────────────────────────
  function applyState() {
    var html = document.documentElement;

    // Tamaño de letra
    html.classList.remove('font-large', 'font-xlarge');
    if (state.fontSize === 'large') html.classList.add('font-large');
    if (state.fontSize === 'xlarge') html.classList.add('font-xlarge');

    // Alto contraste
    html.classList.toggle('high-contrast', !!state.contrast);

    // Fuente dislexia
    html.classList.toggle('dyslexia-font', !!state.dyslexiaFont);
    if (state.dyslexiaFont) loadAtkinsonFont();

    // Baja estimulación
    html.classList.toggle('low-stimulation', !!state.lowStimulation);

    syncButtonStates();
    savePrefs();
  }

  function syncButtonStates() {
    // Tamaño de letra
    ['normal', 'large', 'xlarge'].forEach(function (size) {
      var btn = document.querySelector('[data-action="font-' + size + '"]');
      if (btn) btn.setAttribute('aria-pressed', String(state.fontSize === size));
    });

    // Toggles
    var toggles = {
      'contrast': state.contrast,
      'dyslexia-font': state.dyslexiaFont,
      'low-stimulation': state.lowStimulation,
    };

    Object.keys(toggles).forEach(function (action) {
      var btn = document.querySelector('[data-action="' + action + '"]');
      if (btn) btn.setAttribute('aria-pressed', String(!!toggles[action]));
    });
  }

  // ── Fuente Atkinson Hyperlegible ──────────────────────────────
  function loadAtkinsonFont() {
    if (document.getElementById('a11y-atkinson-font')) return;
    var link = document.createElement('link');
    link.id = 'a11y-atkinson-font';
    link.rel = 'stylesheet';
    link.href = ATKINSON_FONT_URL;
    document.head.appendChild(link);
  }

  // ── Texto a voz (TTS) ─────────────────────────────────────────
  function setTTSIdle(btn) {
    isSpeaking = false;
    if (btn) {
      btn.setAttribute('aria-pressed', 'false');
      btn.innerHTML = '<i class="fas fa-volume-up" aria-hidden="true"></i> Leer en voz alta';
    }
  }

  function setTTSActive(btn) {
    isSpeaking = true;
    if (btn) {
      btn.setAttribute('aria-pressed', 'true');
      btn.innerHTML = '<i class="fas fa-stop-circle" aria-hidden="true"></i> Detener lectura';
    }
  }

  function speakText(text, btn) {
    // Cancela cualquier síntesis colgada (bug conocido de Chrome)
    window.speechSynthesis.cancel();

    var utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;

    // Busca una voz en español; si no, usa la primera disponible
    var voices = window.speechSynthesis.getVoices();
    var voice = voices.find(function (v) { return v.lang.startsWith('es'); })
              || voices.find(function (v) { return v.default; })
              || voices[0];
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = 'es';
    }

    utterance.onend   = function () { setTTSIdle(btn); };
    utterance.onerror = function () { setTTSIdle(btn); };

    window.speechSynthesis.speak(utterance);
    setTTSActive(btn);

    // Workaround: Chrome pausa la síntesis en páginas largas
    var keepAlive = setInterval(function () {
      if (!window.speechSynthesis.speaking) { clearInterval(keepAlive); return; }
      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
    }, 10000);

    utterance.onend = function () {
      clearInterval(keepAlive);
      setTTSIdle(btn);
    };
    utterance.onerror = function () {
      clearInterval(keepAlive);
      setTTSIdle(btn);
    };
  }

  function toggleTTS() {
    var btn = document.getElementById('a11y-tts-btn');

    if (!window.speechSynthesis) {
      alert('Tu navegador no soporta la lectura en voz alta.\nPrueba con Chrome, Edge o Safari en escritorio.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setTTSIdle(btn);
      return;
    }

    var contentEl = document.getElementById('main-content') || document.body;
    var text = (contentEl.innerText || contentEl.textContent || '')
                 .replace(/\s+/g, ' ').trim().slice(0, 6000);

    if (!text) return;

    // Chrome carga voces de forma asíncrona; esperar si aún no están listas
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = function () {
        window.speechSynthesis.onvoiceschanged = null;
        speakText(text, btn);
      };
    } else {
      speakText(text, btn);
    }
  }

  // ── Eventos ───────────────────────────────────────────────────
  function attachEvents() {
    document.getElementById('a11y-trigger').addEventListener('click', function () {
      panelOpen ? closePanel() : openPanel();
    });

    document.getElementById('a11y-close').addEventListener('click', closePanel);
    document.getElementById('a11y-overlay').addEventListener('click', closePanel);

    // Cerrar con Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panelOpen) closePanel();
    });

    // Acciones del panel (delegación de eventos)
    document.getElementById('a11y-panel').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-action]');
      if (!btn) return;

      switch (btn.dataset.action) {
        case 'font-normal':   state.fontSize = 'normal';                         break;
        case 'font-large':    state.fontSize = 'large';                          break;
        case 'font-xlarge':   state.fontSize = 'xlarge';                         break;
        case 'contrast':      state.contrast = !state.contrast;                  break;
        case 'dyslexia-font': state.dyslexiaFont = !state.dyslexiaFont;          break;
        case 'low-stimulation': state.lowStimulation = !state.lowStimulation;    break;
        case 'tts':           toggleTTS(); return;
        case 'reset':
          if (isSpeaking) window.speechSynthesis.cancel();
          isSpeaking = false;
          state = Object.assign({}, defaults);
          break;
      }

      applyState();
    });

    // Detener TTS al navegar fuera
    window.addEventListener('beforeunload', function () {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    });
  }

  // ── Inicializar ───────────────────────────────────────────────
  function init() {
    loadPrefs();
    injectHTML();
    applyState();
    attachEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
