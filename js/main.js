/**
 * ADASFRO - JavaScript Principal
 * Funciones principales del sitio
 */

// Función para mostrar posts recientes (carousel superior)
function showRecentPosts(json) {
  const posts = json.feed.entry;
  let html = '';

  for (let i = 0; i < posts.length; i++) {
    const title = posts[i].title.$t;
    const link = posts[i].link[0].href;
    const img = posts[i].media$thumbnail
      ? posts[i].media$thumbnail.url
      : 'https://via.placeholder.com/250x150';

    html += `
      <li>
        <a href="${link}">
          <img src="${img}" alt="${title}">
          <h4>${title}</h4>
        </a>
      </li>
    `;
  }

  document.getElementById("recent-posts").innerHTML = html;
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
  console.log('ADASFRO Theme cargado correctamente');

  // Aquí puedes agregar más funcionalidades
  initSmoothScroll();
  initMobileMenu();
});

// Scroll suave para enlaces internos
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

// Menú móvil (placeholder para futura implementación)
function initMobileMenu() {
  // Implementar lógica de menú hamburguesa si es necesario
  console.log('Mobile menu initialized');
}
