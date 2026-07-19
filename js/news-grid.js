/**
 * ADASFRO - Grilla de últimas noticias
 * Carga las últimas publicaciones del blog en una cuadrícula estática
 * (reemplaza al carrusel Swiper, que atrapaba el foco de teclado)
 */

// URL del feed JSON de tu Blogger
const feedUrl = "https://www.adasfro.org/feeds/posts/default?alt=json";

function initNewsGrid() {
  fetch(feedUrl)
    .then(response => response.json())
    .then(data => {
      const allEntries = data.feed.entry || [];
      const entries = allEntries.slice(0, 9);
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
        const title = (entry.title && entry.title.$t) ? entry.title.$t : 'Sin título';
        const linkObj = entry.link ? entry.link.find(l => l.rel === "alternate") : null;
        const link  = linkObj ? linkObj.href : '#';
        const date  = entry.published ? new Date(entry.published.$t).toLocaleDateString('es-CR', { day:'2-digit', month:'short', year:'numeric' }) : '';

        // Imagen: Intentar obtener una versión de alta resolución
        let img = "https://placehold.co/640x300/00695C/FFFFFF?text=ADASFRO";
        if (entry.media$thumbnail) {
          // Reemplaza los formatos de miniatura de Blogger por alta resolución (s1600)
          img = entry.media$thumbnail.url
            .replace(/\/s\d+(-c)?\//, "/s1600/") // Formato /s72-c/
            .replace(/[=]s\d+(-c)?/, "=s1600")    // Formato =s72-c
            .replace(/[=]w\d+-h\d+(-[a-z])?/, "=s1600") // Formato =w72-h72-p
            .replace("http://", "https://");     // Asegurar HTTPS
        }

        // Extracto: preferir summary, si no, primeros 120 caracteres del contenido sin HTML
        let excerpt = '';
        if (entry.summary && entry.summary.$t) {
          excerpt = entry.summary.$t.replace(/<[^>]+>/g, '').trim().slice(0, 120);
        } else if (entry.content && entry.content.$t) {
          excerpt = entry.content.$t.replace(/<[^>]+>/g, '').trim().slice(0, 120);
        }
        if (excerpt.length === 120) excerpt += '…';

        const card = document.createElement("a");
        card.className = "news-card";
        card.href = link;
        card.innerHTML = `
          <img src="${img}" alt="${title}">
          <div class="news-card-body">
            <p class="news-card-date">${date}</p>
            <h4>${title}</h4>
            ${excerpt ? `<p class="news-card-excerpt">${excerpt}</p>` : ''}
          </div>
        `;
        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error cargando el feed del blog:', error);
    });
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNewsGrid);
} else {
  initNewsGrid();
}
