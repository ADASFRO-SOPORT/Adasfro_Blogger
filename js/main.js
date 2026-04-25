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
                  'd-institucion','d-articulo','d-fecha','d-descripcion'];
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
  var list   = document.getElementById('nav-list');
  if (!toggle || !list) return;

  toggle.addEventListener('click', function () {
    var open = list.classList.toggle('mobile-open');
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

// ── Sticky nav ────────────────────────────────────────────────
function initStickyNav() {
  var nav = document.getElementById('main-nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 100);
  });
}

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  initDenunciaForm();
  initConveniosFilter();
  initMobileMenu();
  initStickyNav();
});
