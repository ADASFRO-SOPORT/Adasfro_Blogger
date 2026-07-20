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

// ── Filtros de convenios ──────────────────────────────────────
function initConveniosFilter() {
  var tabla = document.getElementById('convenios-tabla');
  if (!tabla) return;

  function filtrar() {
    var anio  = document.getElementById('f-anio').value;
    var estado = document.getElementById('f-estado').value;
    var tipo  = document.getElementById('f-tipo').value;
    var filas = tabla.querySelectorAll('tbody tr');
    filas.forEach(function (fila) {
      var ok = true;
      if (anio   && fila.dataset.anio   !== anio)   ok = false;
      if (estado && fila.dataset.estado !== estado)  ok = false;
      if (tipo   && fila.dataset.tipo   !== tipo)    ok = false;
      fila.style.display = ok ? '' : 'none';
    });
  }

  ['f-anio','f-estado','f-tipo'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('change', filtrar);
  });
}

// ── Menú móvil ────────────────────────────────────────────────
function initMobileMenu() {
  var toggle = document.getElementById('mobile-menu-toggle');
  var lists  = [document.getElementById('nav-list'), document.getElementById('nav-list-secondary')].filter(Boolean);
  if (!toggle || !lists.length) return;

  toggle.addEventListener('click', function () {
    var open = !lists[0].classList.contains('mobile-open');
    lists.forEach(function (list) { list.classList.toggle('mobile-open', open); });
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.menu-icon').className = 'menu-icon fas ' + (open ? 'fa-times' : 'fa-bars');
  });

  // Cerrar al navegar
  lists.forEach(function (list) {
    list.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        lists.forEach(function (l) { l.classList.remove('mobile-open'); });
        toggle.setAttribute('aria-expanded', 'false');
        toggle.querySelector('.menu-icon').className = 'menu-icon fas fa-bars';
      }
    });
  });
}

// ── Filtro de búsqueda del mapa del sitio ────────────────────────
function initSitemapFilter() {
  var input = document.getElementById('sitemap-filter');
  var grid  = document.getElementById('sitemap-grid');
  var noResults = document.getElementById('sitemap-no-results');
  if (!input || !grid) return;

  var links = grid.querySelectorAll('a');

  input.addEventListener('input', function () {
    var term = input.value.trim().toLowerCase();
    var visibleCount = 0;

    links.forEach(function (link) {
      var match = !term || link.textContent.toLowerCase().indexOf(term) !== -1;
      link.style.display = match ? '' : 'none';
      if (match) visibleCount++;
    });

    grid.querySelectorAll('.sitemap-col').forEach(function (col) {
      var hasVisible = Array.prototype.some.call(
        col.querySelectorAll('a'),
        function (a) { return a.style.display !== 'none'; }
      );
      col.style.display = hasVisible ? '' : 'none';
    });

    if (noResults) noResults.style.display = visibleCount === 0 ? 'block' : 'none';
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
  var navLinks = document.querySelectorAll('#nav-list a[href^="#"], #nav-list-secondary a[href^="#"]');
  if (!navLinks.length || !('IntersectionObserver' in window)) return;

  var linkByTarget = {};
  var targets = [];
  navLinks.forEach(function (link) {
    var id = link.getAttribute('href').slice(1);
    var el = document.getElementById(id);
    if (el && !linkByTarget[id]) {
      linkByTarget[id] = link;
      targets.push(el);
    }
  });
  if (!targets.length) return;

  function setActive(id) {
    navLinks.forEach(function (link) { link.classList.remove('nav-active'); });
    var link = linkByTarget[id];
    if (link) link.classList.add('nav-active');
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
  initConveniosFilter();
  initSitemapFilter();
  initMobileMenu();
  initStickyNav();
  initScrollSpy();
});
