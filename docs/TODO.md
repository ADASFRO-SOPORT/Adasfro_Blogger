# TODO — ADASFRO Blogger

Tareas identificadas para implementar a futuro (no urgentes para la tarea en curso). Se agregan acá durante el trabajo normal, según la regla de "Registro de tareas futuras" de `CLAUDE.md`.

> La sección "Problemas Conocidos / Deuda Técnica" de `CLAUDE.md` conserva el historial de deuda técnica anterior al 2026-08-30; desde esa fecha, los ítems nuevos se registran acá.

## Pendientes

- [ ] **`GEMINI.md` desactualizado** — sigue referenciando `swiper-fixes.css`, `donation-widget.js` y `swiper-init.js`, archivos ya eliminados del repo (Swiper y el widget de donaciones se retiraron, ver `CLAUDE.md` § Deuda Técnica). Actualizar para reflejar el estado actual (`theme.xml` + `neo-brutalist.css` + `blogger-fixes.css` + `accessibility-bar.css`/`.js` + `main.js`).
- [ ] **Archivos que superan el límite de 500 líneas** (restricción agregada 2026-08-30): `css/neo-brutalist.css`, `theme.xml`, `css/accessibility-bar.css`. Evaluar cómo modularizar sin romper el flujo de carga (un único XML de Blogger, CSS servido desde GitHub Pages). El includable propio de `Blog1` (2026-08-30) sumó ~65 líneas a `theme.xml`, agravando esto.
- [ ] **Confirmar datos reales de los 15 convenios nuevos** (`theme.xml` `#convenios-tabla`, agregados 2026-08-30): PANI, Municipalidad de Buenos Aires, CONACIDA, CONAPDIS, UCR, TEC, MICITT, Cruz Roja Costarricense, Municipalidad de Belén, FUNIBER, Fundación Clarissa Martínez Castillo, Municipalidad de Upala, Municipalidad de Heredia, Universidad Hispanoamericana (UH), MTSS. Se publicaron con **año 2026, estado "vigente" y tipo inferido por el tipo de entidad — no confirmados por ADASFRO** (el usuario no dio esos datos; se avisó explícitamente y se procedió con placeholder tras no objetar en 3 fases consecutivas del plan). Reemplazar `data-anio`/`data-estado`/`data-tipo` y el texto genérico "Convenio de cooperación institucional" de cada `<tr>` por los datos reales antes de considerar esto cerrado.
- [ ] **Logos reales de "Aliados y colaboradores"** (`theme.xml` `.aliados-grid`, `#convenios`): las 15 organizaciones se muestran con placeholders de texto (`.aliados-logo`), sin logos de imagen. Reemplazar por `<img>` cuando ADASFRO provea los assets (o autorización de uso de cada logo institucional).
- [ ] **Verificar en Blogger real el includable propio de `Blog1`** (2026-08-30, `theme.xml` ~837-904): no se pudo probar contra el editor de Blogger, solo se validó la sintaxis XML por análisis. Antes de dar por cerrada la vista de Publicaciones en cards, confirmar en el preview de Blogger: (1) `data:post.featuredImage` y `resizeImage(...)` devuelven la imagen recortada esperada, (2) el badge de la primera etiqueta se ve bien cuando el post tiene varias, (3) `<b:include data='post' name='comments'/>` sigue mostrando/permitiendo comentarios en un post individual, (4) el paginador `nextprev` funciona en `/search`.

## Completados

_(vacío por ahora)_
