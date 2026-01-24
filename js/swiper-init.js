const feedUrl = "https://www.adasfro.org/feeds/posts/default?alt=json";

function initBlogSwiper() {

  fetch(feedUrl)
    .then(response = response.json())
    .then(data => {
      const entries = data.feed.entry.slice(0, 5); // últimas 5 publicaciones
      const container = document.getElementById("blog - posts");

      entries.forEach(entry => {
        const title = entry.title.$t;
        const link = entry.link.find(l => l.rel === "alternate").href;
        const date = entry.published.$t.substring(0, 10);

        // Buscar imagen (si existe en el contenido)
        let img = "";
        if (entry.media$thumbnail) {
          img = entry.media$thumbnail.url;
        }

        // Crear slide
        const slide = document.createElement("div");
        slide.className = "swiper - slide";
        slide.innerHTML = `
          <a href='${link}'>
            <img alt='${title}' src='${img}'/>
            <h4>${title}</h4>
            <p>${date}</p>
          </a>
        `;
        container.appendChild(slide);
      });

      // Inicializar Swiper
      new Swiper(".swiper", {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        pagination: {
          el: ".swiper - pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper - button - next ",
          prevEl: ".swiper - button - prev",
        },
      });
    });
}

