# 🎨 ADASFRO - Sistema de Diseño Oficial 2025

**Asociación Agencia para el Desarrollo Accesible Sin Fronteras**

Guía completa de identidad visual basada en los colores del logo

---

## 📐 Filosofía de Diseño

### Principios Core

1. **Accesibilidad Universal** - WCAG 2.2 AAA en todo momento
2. **Fidelidad al Logo** - Colores oficiales de ADASFRO
3. **Profesionalismo Legal** - Imagen seria de una ONG que litiga
4. **Inclusión Visual** - Diseño que funciona para todos
5. **Claridad Comunicativa** - Información fácil de entender

---

## 🎨 Paleta de Colores Oficial

### Colores Primarios (Del Logo)

```css
/* Teal Oscuro - Color Principal */
--primary:
  #00695c ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ HEX: #00695c RGB: 0, 105, 92 CMYK: 100,
  0, 12, 59 Pantone: 568 C Uso: Logo, headers, enlaces principales,
  menú Significado: Confianza, estabilidad,
  naturaleza /* Teal Claro - Variante Interactiva */ --primary-light: #4db6ac
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ HEX: #4db6ac RGB: 77,
  182, 172 Uso: Hover states, fondos sutiles, badges;
```

### Color Secundario (Del Logo)

```css
/* Azul Marino - Institucional */
--secondary:
  #1a237e ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ HEX: #1a237e RGB: 26, 35, 126 CMYK: 79,
  72, 0, 51 Pantone: 2768 C Uso: Títulos, footer,
  elementos legales Significado: Autoridad, profesionalismo, derechos;
```

### Color de Acción (Del Logo)

```css
/* Naranja/Ámbar - Call to Action */
--accent:
  #ff8f00 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ HEX: #ff8f00 RGB: 255, 143, 0 CMYK: 0,
  44, 100, 0 Pantone: 144 C Uso: Botón DONAR, CTAs urgentes,
  destacados Significado: Acción, energía, cambio social Variante Hover: #ffa000;
```

### Colores Semánticos (Del Logo)

```css
/* Rojo - Denuncias y Alertas */
--danger:
  #d32f2f ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Uso: Botones de denuncia,
  alertas críticas Icono: ⚠️ 🚨 /* Verde - Éxito y Confirmación */
    --success: #2e7d32 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Uso: Mensajes de éxito,
  logros,
  confirmaciones Icono: ✅ 🎉 /* Azul Info - Información */ --info: #0288d1
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Uso: Tooltips,
  mensajes informativos,
  ayudas Icono: ℹ️ 💡 /* Morado - Inclusión */ --purple: #7b1fa2
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Uso: Secciones de inclusión,
  misión, valores Icono: ♿ 🤝;
```

---

## 🖤 Colores Neutros

```css
/* Fondo Principal */
--bg-body:
  #f8fafc ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Slate 50 - Gris muy claro azulado
    Uso: Fondo general de la página /* Superficie Blanca */
    --bg-surface: #ffffff ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Blanco puro Uso: Cards,
  widgets,
  contenedores /* Texto Principal */ --text-main: #1e293b
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Slate 800 Uso: Texto de párrafos,
  contenido principal /* Texto Secundario */ --text-light: #64748b
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Slate 500 Uso: Metadatos,
  subtítulos,
  texto terciario /* Bordes */ --border: #e2e8f0 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    Slate 200 Uso: Bordes de cards,
  separadores visuales;
```

---

## ✅ Ratios de Contraste WCAG

### Texto Normal (16px)

| Combinación           | Ratio  | WCAG     | Uso                 |
| --------------------- | ------ | -------- | ------------------- |
| #00695C sobre #FFFFFF | 6.4:1  | ✅ AAA   | Texto principal     |
| #1A237E sobre #FFFFFF | 14.2:1 | ✅ AAA   | Títulos             |
| #FF8F00 sobre #FFFFFF | 2.9:1  | ❌ Falla | Solo iconos grandes |
| #FF8F00 sobre #1E293B | 8.2:1  | ✅ AAA   | Texto en botones    |
| #D32F2F sobre #FFFFFF | 5.5:1  | ✅ AAA   | Alertas             |
| #1E293B sobre #FFFFFF | 15.8:1 | ✅ AAA   | Texto párrafos      |

### Recomendaciones

✅ **Aprobado para texto:**

- Teal Oscuro #00695C sobre blanco
- Azul Marino #1A237E sobre blanco
- Gris Slate #1E293B sobre blanco

⚠️ **Solo para elementos grandes:**

- Naranja #FF8F00 (usar en botones con texto blanco/oscuro)

❌ **Evitar:**

- Teal Claro #4DB6AC en texto pequeño (usar solo en fondos/iconos)

---

## 🔤 Tipografía

### Familia Primaria: Open Sans

```
Google Fonts:
fonts.googleapis.com/css?family=Open+Sans:400,600,700

Pesos:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
400 - Regular    → Texto de párrafos, cuerpo
600 - SemiBold   → Destacados, navegación
700 - Bold       → Énfasis fuerte, labels

Características:
- Diseñada para máxima legibilidad
- Neutral y profesional
- Excelente para grandes bloques de texto
- Humanista (cálida pero formal)
```

**Uso:** Texto principal, párrafos, formularios, navegación, metadatos

### Familia Secundaria: Montserrat

```
Google Fonts:
fonts.googleapis.com/css?family=Montserrat:400,700,900

Pesos:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
400 - Regular    → Subtítulos secundarios
700 - Bold       → Títulos H2, H3, H4
900 - Black      → Títulos H1, Hero, Logo

Características:
- Geométrica y moderna
- Inspirada en señalética urbana
- Excelente para títulos impactantes
- Alta jerarquía visual
```

**Uso:** Títulos (H1-H6), nombres de secciones, logo type, destacados

---

## 📏 Sistema de Espaciado

### Escala 8-Point Grid

```css
Base: 8px

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
--spacing-xs:   8px
--spacing-sm:   16px
--spacing-md:   24px
--spacing-lg:   40px
--spacing-xl:   64px
```

**Aplicaciones:**

- **xs (8px)**: Gap entre iconos, padding micro
- **sm (16px)**: Margen entre párrafos, padding de botones
- **md (24px)**: Padding de cards, separación menor
- **lg (40px)**: Separación entre secciones principales
- **xl (64px)**: Padding de hero, espacios dramáticos

---

## 📐 Bordes y Radios

```css
--radius-sm:
  4px → Badges, pills pequeños --radius-md: 8px → Botones, inputs,
  cards estándar --radius-lg: 16px → Cards grandes,
  contenedores hero --radius-full: 999px → Botones redondos (DONAR);
```

### Grosor de Bordes

```css
Fino:       1px     → Separadores, cards normales
Mediano:    2px     → Inputs en focus, botones outline
```

---

## 💫 Sombras

```css
--shadow-sm:
  0 1px 2px 0 rgba(0, 0, 0, 0.05) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    Uso: Separación sutil,
  cards en reposo --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
  0 2px 4px -1px rgba(0, 0, 0, 0.06) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    Uso: Cards normales,
  botones --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
  0 4px 6px -2px rgba(0, 0, 0, 0.05) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    Uso: Cards en hover,
  modales, dropdowns;
```

---

## 🎯 Componentes

### Botón Primario (DONAR)

```css
/* Estilo Oficial */
background: #FF8F00
color: #FFFFFF
border-radius: 999px (pill)
padding: 12px 28px
font-weight: 700
text-transform: uppercase
letter-spacing: 0.5px
box-shadow: var(--shadow-md)

/* Hover */
background: #FFA000
transform: translateY(-2px)
box-shadow: var(--shadow-lg)
```

**HTML:**

```html
<button class="btn-primary">💛 Donar Ahora</button>
```

### Botón Secundario (Acciones principales)

```css
background: #00695C
color: #FFFFFF
border-radius: 8px
padding: 12px 24px
font-weight: 600

/* Hover */
background: #4DB6AC
```

### Botón Outline (Acciones terciarias)

```css
background: transparent
border: 2px solid #00695C
color: #00695C
border-radius: 8px
padding: 8px 20px
font-weight: 600

/* Hover */
background: #00695C
color: #FFFFFF
```

### Botón de Denuncia (Urgente)

```css
background: #D32F2F
color: #FFFFFF
border-radius: 8px
padding: 14px 28px
font-weight: 700

/* Hover */
background: #C62828
transform: translateY(-2px)
```

---

## 🎨 Gradientes Oficiales

### Gradiente Hero (Teal)

```css
background: linear-gradient(135deg, #00695c 0%, #004d40 100%);
```

**Uso:** Hero sections, headers destacados

### Gradiente Footer (Azul Marino)

```css
background: linear-gradient(135deg, #1a237e 0%, #0d1642 100%);
```

**Uso:** Footer, secciones legales

### Gradiente Misión (Morado)

```css
background: linear-gradient(135deg, #7b1fa2 0%, #6a1b9a 100%);
```

**Uso:** Bloque de misión, valores, inclusión

### Gradiente Acción (Naranja)

```css
background: linear-gradient(135deg, #ff8f00 0%, #ffa000 100%);
```

**Uso:** Botones de donación, CTAs urgentes

---

## 📊 Uso en Secciones

### Header / Navegación

```
Fondo: Gradiente Teal (#00695C → #004D40)
Texto: Blanco #FFFFFF
Enlaces: Blanco con opacity 0.9
Hover: opacity 1 + translateY(-1px)
```

### Hero Section

```
Fondo: Gradiente Teal
Título: Montserrat 900, 48-60px, Blanco
Descripción: Open Sans 400, 18-20px, Blanco 90%
CTA: Botón blanco con texto Teal
```

### Cards / Widgets

```
Fondo: Blanco #FFFFFF
Borde: 1px solid #E2E8F0
Border-radius: 16px
Padding: 24-32px
Shadow: var(--shadow-md)
Hover: Shadow lg + translateY(-4px)
```

### Footer

```
Fondo: Gradiente Azul Marino (#1A237E → #0D1642)
Texto: Blanco rgba(255,255,255,0.8)
Enlaces: Blanco con hover en opacity
Títulos: Blanco con underline Naranja
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
Base: < 768px (una columna)

/* Tablet */
@media (min-width: 768px) {
  /* Layout de 2 columnas */
}

/* Desktop */
@media (min-width: 1024px) {
  /* Layout completo, sidebar */
}

/* Large Desktop */
@media (min-width: 1200px) {
  /* Contenedor max-width: 1200px */
}
```

---

## ✨ Animaciones y Transiciones

### Transición Base

```css
transition: all 0.3s ease;
```

**Aplicar a:**

- Botones (hover, active)
- Cards (hover)
- Enlaces (hover)
- Inputs (focus)

### Animaciones Específicas

**Botones:**

```css
/* Hover */
transform: translateY(-2px);
box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);

/* Active */
transform: translateY(0);
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
```

**Cards:**

```css
/* Hover */
transform: translateY(-4px);
box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
```

---

## 🎯 Casos de Uso

### Página de Inicio

- Hero: Gradiente Teal + CTA Naranja
- Noticias: Cards blancas con shadow
- Misión: Card con gradiente Morado
- Donación: Widget con botón Naranja pill

### Página de Denuncia

- Header: Rojo #D32F2F
- Formulario: Inputs con borde Teal en focus
- Botón Submit: Rojo con texto blanco

### Página de Transparencia

- Gráficos: Usar colores Teal + Naranja + Verde
- Números: Montserrat 900 en Azul Marino
- Cards de métricas: Fondos sutiles con gradientes

---

## 📋 Checklist de Implementación

### Antes de Publicar

- [ ] Todos los textos tienen contraste mínimo 7:1 (AAA)
- [ ] Botones tienen estados hover/focus/active
- [ ] Imágenes tienen `max-width: 100%`
- [ ] No hay scroll horizontal en ningún dispositivo
- [ ] Gradientes usan colores oficiales
- [ ] Tipografía es Montserrat + Open Sans
- [ ] Espaciado usa escala de 8px
- [ ] Border-radius usa valores oficiales
- [ ] Sombras usan variables CSS
- [ ] Responsive funciona en 320px - 1920px

---

## 🔗 Recursos

### Google Fonts CDN

```html
<link
  href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&family=Open+Sans:wght@400;600;700&display=swap"
  rel="stylesheet"
/>
```

### Paleta en Figma/Adobe

**Archivo de colores:**

```
Teal Oscuro:    #00695C
Teal Claro:     #4DB6AC
Azul Marino:    #1A237E
Naranja:        #FF8F00
Rojo:           #D32F2F
Verde:          #2E7D32
Morado:         #7B1FA2
```

### Herramientas Útiles

- **Contrast Checker**: webaim.org/resources/contrastchecker
- **Color Picker**: coolors.co
- **Gradient Generator**: cssgradient.io
- **Shadow Generator**: shadows.brumm.af

---

**Versión:** 1.0  
**Fecha:** Enero 2025  
**Mantenido por:** Equipo Digital ADASFRO

🎨 **Sistema de Diseño basado en los colores oficiales del logo de ADASFRO**
