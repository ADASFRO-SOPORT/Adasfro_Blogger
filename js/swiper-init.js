/**
 * ADASFRO - Inicialización de Swiper
 * Carga las últimas publicaciones del blog en un carrusel
 */

// URL del feed JSON de tu Blogger
const feedUrl = "https://www.adasfro.org/feeds/posts/default?alt=json";

// Función para inicializar el carrusel de posts
function initBlogSwiper() {
  fetch(feedUrl)
    .then(response => response.json())
    .then(data => {
      const entries = data.feed.entry.slice(0, 5); // Últimas 5 publicaciones
      const container = document.getElementById("blog-posts");

      if (!container) {
        console.warn('Contenedor #blog-posts no encontrado');
        return;
      }

      entries.forEach(entry => {
        const title = entry.title.$t;
        const link = entry.link.find(l => l.rel === "alternate").href;
        const date = entry.published.$t.substring(0, 10);

        // Buscar imagen — reemplaza el tamaño de miniatura de Blogger (s72) por s640
        let img = "https://placehold.co/640x360/00695C/FFFFFF?text=ADASFRO";
        if (entry.media$thumbnail) {
          img = entry.media$thumbnail.url.replace(/\/s\d+(-c)?\//,  '/s640/');
        }

        // Crear slide
        const slide = document.createElement("div");
        slide.className = "swiper-slide";
        slide.innerHTML = `
          <a href="${link}">
            <img src="${img}" alt="${title}">
            <h4>${title}</h4>
            <p>${date}</p>
          </a>
        `;
        container.appendChild(slide);
      });

      // Inicializar Swiper después de cargar los posts
      new Swiper(".swiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        },
      });
    })
    .catch(error => {
      console.error('Error cargando el feed del blog:', error);
    });
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBlogSwiper);
} else {
  initBlogSwiper();
}
