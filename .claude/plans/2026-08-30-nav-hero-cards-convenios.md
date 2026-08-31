# Plan: Nav en pestañas, hero, cards de publicaciones, convenios

Fecha: 2026-08-30
Estado: propuesto — pendiente de validación del usuario antes de tocar código (excepto Fase 0, ya aplicada).

## Contexto

Batch de pedidos del usuario en una sola sesión, todos dentro de la página única actual (no se separa en Páginas de Blogger todavía — eso se hace después, manualmente, cuando el usuario lo decida). Cambio grande por reglas de `CLAUDE.md`: toca nav/estructura, accesibilidad de foco/scroll, y 3+ archivos (`theme.xml`, `css/neo-brutalist.css`, posiblemente `js/main.js`).

## Fase 0 — Bug "Inicio" (ya aplicada, fix aislado, no requería plan)

`theme.xml:82` el link "Inicio" usaba `href='#inicio'`, que solo funciona en la portada. Cambiado a `expr:href='data:blog.homepageUrl + "#inicio"'` para que funcione desde `/search` y posts individuales.

## Fase 1 — Rediseño de navegación (pestañas, verde, dropdown "Más") ✅ HECHA (2026-08-30)

Une tres pedidos del usuario que apuntan a lo mismo: "arreglar menu inicial", "sistema de pestañas" (listó *todos* los items de `#nav-list` + `#nav-list-secondary`), y "el menú de opciones que sea verde como el topbar, las que no caben en un dropdown tipo Más".

- Unificar visualmente `#nav-list` y `#nav-list-secondary` en una sola barra estilo pestañas (tab-like), con el verde del `header-top-menu` (`--primary` / `--primary-light`) en vez del estilo actual.
- Mantener el estado activo por scroll (`.nav-active`, `initScrollSpy()` en `js/main.js`) — no se toca esa lógica, solo el contenedor visual.
- Los ítems que no quepan en una fila (en desktop probablemente `Ley 7600`, `Guías`, `LESCO`, `Denunciar` u otros al final) colapsan en un botón dropdown "Más ▾", con teclado accesible (`aria-expanded`, `Escape` para cerrar, foco visible).
- En móvil se mantiene el menú hamburguesa existente (`initMobileMenu()`), ajustado si el dropdown "Más" cambia el HTML de las listas.
- Archivos: `theme.xml` (líneas ~73-108), `css/neo-brutalist.css` (líneas ~274-340, ~857-970), `js/main.js` (`initMobileMenu`, posible nuevo `initNavOverflow()` o similar).

**Punto abierto:** el corte exacto de qué queda visible vs. qué entra al "Más" depende del ancho real disponible (depende del logo, que ya es grande) — se decide con overflow dinámico vía JS (medir qué no cabe) en vez de un corte fijo hardcodeado, para que no se rompa si cambia el zoom de texto (barra de accesibilidad permite +25%/+50%).

## Fase 2 — Proporción del hero banner ✅ HECHA (2026-08-30)

`El banner "Accesibilidad Universal: Un Derecho, No un Privilegio"` se ve demasiado grande respecto a logo/header/menú.

- Reducir tamaño de fuente / padding en `.hero-section h2`, `.hero-section p` y el padding vertical de `.hero-section` (`css/neo-brutalist.css:382-428`).
- Mantener contraste y legibilidad (WCAG AAA ya documentado) — solo se ajusta escala, no color ni texto.

## Fase 3 — Publicaciones como grid de cards (ref. `ui-ux_example/publicaciones.png`) ✅ HECHA (2026-08-30, pendiente de verificación en Blogger real — ver `docs/TODO.md`)

Confirmado por el usuario: "arreglar cards" = mostrar los posts de Blogger como cards (badge de categoría verde arriba-izquierda, imagen, título, byline "ADASFRO" con ícono), igual a la imagen de referencia.

- El widget `Blog1` (`theme.xml:834`) está `locked='true'` sin includable propio — no se puede reescribir su HTML desde cero, solo restylear vía CSS lo que Blogger ya renderiza por defecto (`.post-outer`, `.post-thumbnail`, `.post-title`, `.post-labels`, `.post-author`, etc.) más `display:grid` en el wrapper (`.post-list-wrapper`).
- **Riesgo técnico a validar en Blogger real** (no se puede probar 100% en local): que el post tenga imagen destacada y al menos una etiqueta (label) asignada depende de cada entrada — si un post no tiene imagen o label, la card se ve incompleta. Esto no es algo que el CSS pueda arreglar por sí solo.
- Alcance: CSS grid de 3 columnas (1 en móvil, 2 en tablet, como el resto del sitio), badge = primera label del post, thumbnail recortado a proporción fija, título truncado a 2-3 líneas, byline con ícono + "ADASFRO" (nombre del blog vía `data:blog.title` si Blogger lo expone en el post por defecto, si no, texto fijo).
- Archivos: `css/neo-brutalist.css` (sección `.post-list-wrapper` existente).

## Fase 4 — Convenios: banda de aliados + 15 organizaciones nuevas (ref. `ui-ux_example/convenios.jpeg`) ✅ HECHA (2026-08-30, con datos placeholder — ver `docs/TODO.md`)

- Nueva sección "Aliados y colaboradores" **encima** de la tabla filtrable actual (`#convenios-tabla`): grid de logos en placeholder (recuadro gris con texto/inicial de la organización — el usuario confirmó "usa placeholders para las imágenes/logos por ahora") + link "Ver todos los aliados →" que hace scroll/expande hacia la tabla completa con filtros (que se mantiene, ya funciona y está documentada).
- Se agregan las 15 organizaciones nuevas tanto al grid de logos como a las filas de `#convenios-tabla`:
  PANI, Municipalidad de Buenos Aires, CONACIDA, CONAPDIS, Universidad de Costa Rica (UCR), Instituto Tecnológico de Costa Rica (TEC), MICITT, Cruz Roja Costarricense, Municipalidad de Belén, FUNIBER, Fundación Clarissa Martínez Castillo, Municipalidad de Upala, Municipalidad de Heredia, Universidad Hispanoamericana (UH), Ministerio de Trabajo y Seguridad Social (MTSS).
- **Punto abierto sin resolver del todo:** el usuario no dio año/estado/tipo real por convenio (necesarios para `data-anio`/`data-estado`/`data-tipo` del filtro existente). Se propone: marcar las 15 como `data-estado='vigente'`, año 2026, y `data-tipo` inferido por tipo de entidad (universidades/TEC/UCR/UH/FUNIBER → `academico`; PANI/municipalidades/CONAPDIS/MICITT/MTSS/Cruz Roja → `publico`; CONACIDA y fundaciones → `sociedad`), y registrar en `docs/TODO.md` que son placeholders pendientes de confirmar con datos reales. **Si el usuario prefiere no publicar estado "vigente" sin confirmar, avisar antes de implementar esta fase.**
- Archivos: `theme.xml` (`#convenios-tabla` ~447-507), `css/neo-brutalist.css` (nueva sección `.aliados-*`).

## Fase 5 — Documentación y cierre

- Actualizar `CLAUDE.md` (Componentes Principales: nav, hero, convenios, publicaciones) y `docs/TODO.md` (datos placeholder de convenios pendientes, logos placeholder pendientes de assets reales).
- Proponer commits siguiendo `docs/COMMITS.md` (probable: uno por fase — `ui(nav)`, `ui(hero)`, `feat(publicaciones)`, `feat(convenios)`, `docs`).
- Borrar este archivo de plan al completar todas las fases, dejando el resumen en `CLAUDE.md`/`docs/TODO.md`.
