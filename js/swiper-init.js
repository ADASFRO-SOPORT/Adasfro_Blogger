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
      const allEntries = data.feed.entry || [];
      const entries = allEntries.slice(0, 10);
      const container = document.getElementById("blog-posts");

      if (!container) {
        console.warn('Contenedor #blog-posts no encontrado');
        return;
      }

      if (entries.length === 0) {
        container.innerHTML = '<div style="padding:24px;color:#64748B;text-align:center">No hay entradas publicadas aún.</div>';
        return;
      }

      entries.forEach(entry => {
        const title = entry.title.$t;
        const link  = entry.link.find(l => l.rel === "alternate").href;
        const date  = new Date(entry.published.$t).toLocaleDateString('es-CR', { day:'2-digit', month:'short', year:'numeric' });

        // Imagen de mayor resolución
        let img = "https://placehold.co/400x200/00695C/FFFFFF?text=ADASFRO";
        if (entry.media$thumbnail) {
          img = entry.media$thumbnail.url.replace(/\/s\d+(-c)?\//, '/s400/');
        }

        // Extracto: preferir summary, si no, primeros 120 caracteres del contenido sin HTML
        let excerpt = '';
        if (entry.summary && entry.summary.$t) {
          excerpt = entry.summary.$t.replace(/<[^>]+>/g, '').trim().slice(0, 120);
        } else if (entry.content && entry.content.$t) {
          excerpt = entry.content.$t.replace(/<[^>]+>/g, '').trim().slice(0, 120);
        }
        if (excerpt.length === 120) excerpt += '…';

        const slide = document.createElement("div");
        slide.className = "swiper-slide";
        slide.innerHTML = `
          <a href="${link}" class="swiper-slide-inner">
            <img src="${img}" alt="${title}">
            <div class="swiper-slide-body">
              <p class="swiper-slide-date">${date}</p>
              <h4>${title}</h4>
              ${excerpt ? `<p class="swiper-slide-excerpt">${excerpt}</p>` : ''}
            </div>
          </a>
        `;
        container.appendChild(slide);
      });

      // Loop solo si hay suficientes slides (al menos el doble del máximo slidesPerView)
      const totalSlides = entries.length;
      const enableLoop = totalSlides >= 6;

      new Swiper(".swiper", {
        slidesPerView: 1,
        spaceBetween: 16,
        loop: enableLoop,
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
            spaceBetween: 16,
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
