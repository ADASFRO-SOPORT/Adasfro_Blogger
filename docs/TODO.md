# TODO — ADASFRO Blogger

Tareas identificadas para implementar a futuro (no urgentes para la tarea en curso). Se agregan acá durante el trabajo normal, según la regla de "Registro de tareas futuras" de `CLAUDE.md`.

> La sección "Problemas Conocidos / Deuda Técnica" de `CLAUDE.md` conserva el historial de deuda técnica anterior al 2026-08-30; desde esa fecha, los ítems nuevos se registran acá.

## Pendientes

- [ ] **`GEMINI.md` desactualizado** — sigue referenciando `swiper-fixes.css`, `donation-widget.js` y `swiper-init.js`, archivos ya eliminados del repo (Swiper y el widget de donaciones se retiraron, ver `CLAUDE.md` § Deuda Técnica). Actualizar para reflejar el estado actual (`theme.xml` + `neo-brutalist.css` + `blogger-fixes.css` + `accessibility-bar.css`/`.js` + `main.js`).
- [ ] **Archivos que superan el límite de 500 líneas** (restricción agregada 2026-08-30): `css/neo-brutalist.css`, `theme.xml`, `css/accessibility-bar.css`. Evaluar cómo modularizar sin romper el flujo de carga (un único XML de Blogger, CSS servido desde GitHub Pages). El includable propio de `Blog1` (2026-08-30) sumó ~65 líneas a `theme.xml`, agravando esto.
- [ ] **Verificar en Blogger real el includable propio de `Blog1`** (2026-08-30, `theme.xml` ~837-904): no se pudo probar contra el editor de Blogger, solo se validó la sintaxis XML por análisis. Antes de dar por cerrada la vista de Publicaciones en cards, confirmar en el preview de Blogger: (1) `data:post.featuredImage` y `resizeImage(...)` devuelven la imagen recortada esperada, (2) el badge de la primera etiqueta se ve bien cuando el post tiene varias, (3) `<b:include data='post' name='comments'/>` sigue mostrando/permitiendo comentarios en un post individual, (4) el paginador `nextprev` funciona en `/search`.

## Completados

_(vacío por ahora)_
