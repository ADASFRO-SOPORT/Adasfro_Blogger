/**
 * ADASFRO — JavaScript Principal
 */

// ── Formulario de denuncia ────────────────────────────────────
function initDenunciaForm() {
  var form = document.getElementById('denuncia-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var campos = ['d-nombre','d-cedula','d-correo','d-telefono',
                  'd-institucion','d-fecha','d-descripcion'];
    var vals = {};
    campos.forEach(function(id) {
      var el = document.getElementById(id);
      vals[id] = el ? el.value : '';
    });

    var asunto = encodeURIComponent('Denuncia Ley 7600 — ' + vals['d-institucion']);
    var cuerpo = encodeURIComponent(
      'DATOS DEL DENUNCIANTE\n' +
      'Nombre: ' + vals['d-nombre'] + '\n' +
      'Cédula: ' + vals['d-cedula'] + '\n' +
      'Correo: ' + vals['d-correo'] + '\n' +
      'Teléfono: ' + vals['d-telefono'] + '\n\n' +
      'DATOS DE LA DENUNCIA\n' +
      'Institución denunciada: ' + vals['d-institucion'] + '\n' +
      'Artículo Ley 7600: ' + vals['d-articulo'] + '\n' +
      'Fecha del incidente: ' + vals['d-fecha'] + '\n\n' +
      'DESCRIPCIÓN DE LOS HECHOS:\n' + vals['d-descripcion']
    );

    window.location.href = 'mailto:comunicacion@adasfro.ong?subject=' + asunto + '&body=' + cuerpo;

    var conf = document.getElementById('denuncia-confirmacion');
    if (conf) {
      conf.style.display = 'flex';
      setTimeout(function () { conf.style.display = 'none'; }, 8000);
    }
  });
}

// ── Carrusel de aliados: botón de pausa (WCAG 2.2 SC 2.2.2) ────
// El scroll automático también se detiene con hover/foco (CSS) y
// con prefers-reduced-motion (regla global), pero SC 2.2.2 pide
// además un control persistente que no dependa del mouse.
function initAliadosMarquee() {
  var marquee = document.getElementById('aliados-marquee');
  var button  = document.getElementById('aliados-pause');
  if (!marquee || !button) return;

  button.addEventListener('click', function () {
    var paused = marquee.classList.toggle('is-paused');
    button.setAttribute('aria-pressed', String(paused));
    button.setAttribute('aria-label', paused ? 'Reanudar desplazamiento de aliados' : 'Pausar desplazamiento de aliados');
    button.querySelector('i').className = paused ? 'fas fa-play' : 'fas fa-pause';
  });
}

// ── Menú móvil ────────────────────────────────────────────────
function initMobileMenu() {
  var toggle = document.getElementById('mobile-menu-toggle');
  var list   = document.getElementById('nav-list');
  if (!toggle || !list) return;

  toggle.addEventListener('click', function () {
    var open = !list.classList.contains('mobile-open');
    list.classList.toggle('mobile-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.menu-icon').className = 'menu-icon fas ' + (open ? 'fa-times' : 'fa-bars');
  });

  // Cerrar al navegar
  list.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      list.classList.remove('mobile-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.querySelector('.menu-icon').className = 'menu-icon fas fa-bars';
    }
  });
}

// ── Overflow del menú: ítems que no caben colapsan en "Más" ────
// El botón "Denunciar" (data-pin) nunca se colapsa: es el acceso
// más urgente del nav (apoyo legal). Solo corre en desktop; en
// móvil el menú hamburguesa ya apila todos los ítems.
function initNavOverflow() {
  var list       = document.getElementById('nav-list');
  var moreItem   = document.getElementById('nav-more-item');
  var moreToggle = document.getElementById('nav-more-toggle');
  var moreMenu   = document.getElementById('nav-more-menu');
  if (!list || !moreItem || !moreToggle || !moreMenu) return;

  var MOBILE_BREAKPOINT = 768;
  function isMobile() { return window.innerWidth <= MOBILE_BREAKPOINT; }

  function resetOverflow() {
    while (moreMenu.firstChild) {
      list.insertBefore(moreMenu.firstChild, moreItem);
    }
    moreItem.style.display = 'none';
    moreMenu.classList.remove('open');
    moreToggle.setAttribute('aria-expanded', 'false');
  }

  function collapse() {
    resetOverflow();
    if (isMobile()) return;

    var guard = 0;
    while (list.scrollWidth > list.clientWidth && guard < 30) {
      var candidate = moreItem.previousElementSibling;
      while (candidate && candidate.hasAttribute('data-pin')) {
        candidate = candidate.previousElementSibling;
      }
      if (!candidate) break;
      moreMenu.insertBefore(candidate, moreMenu.firstChild);
      moreItem.style.display = '';
      guard++;
    }
  }

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(collapse, 150);
  });

  collapse();

  moreToggle.addEventListener('click', function () {
    var open = moreMenu.classList.toggle('open');
    moreToggle.setAttribute('aria-expanded', String(open));
  });

  document.addEventListener('click', function (e) {
    if (!moreItem.contains(e.target)) {
      moreMenu.classList.remove('open');
      moreToggle.setAttribute('aria-expanded', 'false');
    }
  });

  moreItem.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      moreMenu.classList.remove('open');
      moreToggle.setAttribute('aria-expanded', 'false');
      moreToggle.focus();
    }
  });
}

// ── Sticky nav ────────────────────────────────────────────────
function initStickyNav() {
  var nav = document.getElementById('main-nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 100);
  });
}

// ── Indicador de sección activa (scrollspy) ─────────────────────
// Reemplaza a breadcrumbs: el sitio es de una sola página con
// navegación por anclas, así que se resalta en el menú la sección
// visible en vez de fingir una jerarquía de páginas que no existe.
function initScrollSpy() {
  // Se usa link.hash (no el atributo href crudo) porque "Inicio" apunta a
  // data:blog.homepageUrl + "#inicio", no a un anchor puro "#inicio".
  var navLinks = Array.prototype.filter.call(
    document.querySelectorAll('#nav-list a'),
    function (link) { return !!link.hash; }
  );
  if (!navLinks.length || !('IntersectionObserver' in window)) return;

  var moreToggle = document.getElementById('nav-more-toggle');
  var moreMenu   = document.getElementById('nav-more-menu');

  var linkByTarget = {};
  var targets = [];
  navLinks.forEach(function (link) {
    var id = link.hash.slice(1);
    var el = document.getElementById(id);
    if (!el || linkByTarget[id]) return;
    // Evita observar targets anidados uno dentro del otro (ej. "#mv-title"
    // dentro de "#inicio"): ambos disparándose independiente rompe el
    // resaltado, el chico se queda pegado como activo y nunca se despega
    // porque el observer solo reacciona a entradas, no a salidas.
    var nested = targets.some(function (t) { return t !== el && (t.contains(el) || el.contains(t)); });
    if (nested) return;
    linkByTarget[id] = link;
    targets.push(el);
  });
  if (!targets.length) return;

  function setActive(id) {
    navLinks.forEach(function (link) { link.classList.remove('nav-active'); });
    var link = linkByTarget[id];
    if (link) link.classList.add('nav-active');
    if (moreToggle && moreMenu) {
      moreToggle.classList.toggle('has-active', !!link && moreMenu.contains(link));
    }
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  targets.forEach(function (el) { observer.observe(el); });
}

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  initDenunciaForm();
  initAliadosMarquee();
  initMobileMenu();
  initNavOverflow();
  initStickyNav();
  initScrollSpy();
});
