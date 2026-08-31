# Convención de Commits — ADASFRO Blogger

Basada en [Conventional Commits](https://www.conventionalcommits.org/), adaptada a la arquitectura de este proyecto (tema de Blogger en `theme.xml` + CSS/JS estáticos servidos desde GitHub Pages).

## Formato

```
<tipo>(<alcance opcional>): <short description in English, lowercase, imperative mood>
```

**Los mensajes de commit van en inglés** (cambio de convención, 2026-08-30 — antes eran en español). El resto de esta documentación se mantiene en español.

Si el motivo del cambio no es obvio a partir del diff, agregar cuerpo: línea en blanco + explicación del **por qué** (no del qué — eso ya lo dice el diff).

## Tipos

| Tipo       | Uso                                                                 |
|------------|----------------------------------------------------------------------|
| `feat`     | Nueva funcionalidad o componente                                    |
| `fix`      | Corrección de un bug                                                 |
| `ui`       | Cambios visuales/CSS que no alteran funcionalidad (tamaños, colores, espaciado, layout) |
| `a11y`     | Cambios específicos de accesibilidad (WCAG, TTS, contraste, lectores de pantalla) |
| `content`  | Cambios de copy/contenido en páginas o textos                        |
| `refactor` | Reestructuración de código sin cambiar comportamiento externo        |
| `docs`     | Cambios en documentación (`CLAUDE.md`, `design_system.md`, `GEMINI.md`, `/docs`) |
| `chore`    | Mantenimiento, limpieza de archivos, configuración                   |
| `perf`     | Mejoras de rendimiento (carga, tamaño de imágenes, etc.)              |

## Alcances típicos de este proyecto

El alcance (`scope`) entre paréntesis es opcional y nombra el componente/archivo afectado:

- **`theme.xml`**: `header`, `nav`, `hero`, `convenios`, `lesco`, `footer`, `denuncia-form`, `publicaciones`
- **CSS**: `neo-brutalist`, `blogger-fixes`, `accessibility-bar`
- **JS**: `main`, `accessibility-bar`, `scrollspy`, `convenios-filter`, `mobile-menu`
- **Documentación/proceso**: `docs`, `todo`, `plan`

## Regla de recomendación (vinculante para Claude/IA)

Después de cada tarea **completada** que introdujo un cambio al proyecto, se debe proponer el nombre/mensaje de commit siguiendo esta convención — nunca ejecutar el commit (ver restricción de operaciones git en `CLAUDE.md`). El usuario decide cuándo y cómo confirmarlo.

## Ejemplos

```
fix(carousel): fix thumbnail resolution to high quality
feat(convenios): add filters by year, status, and type
a11y(accessibility-bar): persist contrast preference in localStorage
docs(todo): log tech debt for files over 500 lines
docs(plan): add phased plan for interactive sitemap
```
