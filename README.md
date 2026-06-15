# Centro de Capacitación – Gerdau Planta Ludueña

## Estructura de archivos

```
gerdau-capacitaciones/
├── index.html                    ← Pantalla principal (mapa nodal)
├── admin.html                    ← Administración de módulos
├── css/
│   └── main.css                  ← Todos los estilos (único archivo)
├── js/
│   ├── data.js                   ← ✏️ DATOS: módulos y casos iniciales
│   ├── nodal.js                  ← Mapa interactivo SVG
│   ├── main.js                   ← Lógica pantalla principal
│   └── training.js               ← Lógica páginas internas
├── capacitaciones/
│   ├── espacios-confinados.html
│   ├── proteccion-respiratoria.html
│   ├── proteccion-auditiva.html
│   ├── trabajo-altura.html
│   ├── apr-permisos.html
│   ├── puentes-grua.html
│   ├── soldadura.html
│   ├── oxicorte.html
│   ├── sbc.html
│   ├── emergencias.html
│   ├── epp.html
│   └── investigacion-incidentes.html
└── assets/                       ← Logos e imágenes estáticas
```

## Cómo usar

### Abrir la plataforma
Abrí `index.html` directamente en el navegador (Chrome recomendado).
No requiere servidor ni instalación.

### Agregar un nuevo módulo
1. Copiá cualquier archivo de `capacitaciones/` y renombralo con el ID nuevo.
2. Cambiá `data-module-id`, el título y el icono en el HTML copiado.
3. Agregá la entrada en `js/data.js` dentro de `TRAINING_MODULES`.

### Cargar una presentación
Abrí el módulo → sección "Presentación" → botón "Cargar PowerPoint".
Para reemplazarla, usá "Reemplazar PPT" en la barra superior.

### Agregar videos
Abrí el módulo → sección "Videos" → pegá URL de YouTube o ruta de archivo local.

### Agregar casos reales (Solvace)
Abrí el módulo → sección "Casos Reales" → completá el formulario.
Los datos se guardan automáticamente en el navegador.

### Persistencia de datos
Todos los datos (videos, casos, galería) se guardan en localStorage del navegador.
Para exportar la configuración de módulos, usá admin.html → "Exportar configuración".

## Identidad visual
- Rojo Gerdau: #E30613
- Azul Navy: #1A1A2E
- Dorado acento: #FFB800
- Tipografía: Inter (Google Fonts)
