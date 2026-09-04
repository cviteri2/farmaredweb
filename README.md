# FarmaRed - Sitio web informativo

Sitio web informativo para **FarmaRed** ("Tu farmacia de confianza"), farmacia ecuatoriana.
Es un sitio **puramente informativo**: no tiene carrito de compra ni pagos en línea. Toda
intención de compra se deriva a WhatsApp mediante enlaces con mensaje prellenado.

## Stack

HTML5 + CSS3 + JavaScript vanilla. Sin frameworks, sin paso de build, sin backend ni base de
datos. Se puede desplegar tal cual en cualquier hosting estático (GoDaddy vía FTP/cPanel,
Netlify, Vercel, GitHub Pages, etc.).

## Estructura

```
farmared-web/
├── README.md
├── .gitignore
├── robots.txt
├── sitemap.xml
├── index.html              # Home
├── nosotros.html
├── productos.html          # vitrina de productos, sin compra
├── contacto.html
├── politica-privacidad.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── img/
    ├── logo.svg
    ├── promos/
    └── productos/
```

## Antes de publicar

1. **Número de WhatsApp**: en `js/main.js`, reemplazar la constante `WHATSAPP_NUMBER`
   (actualmente un placeholder) por el número real, en formato internacional sin signos
   (ej. `593987654321`). Todos los botones de WhatsApp del sitio arman su enlace a partir
   de esa única constante.
2. **Dominio**: en `sitemap.xml` y `robots.txt` reemplazar `https://www.farmared.com.ec`
   por el dominio real una vez asignado.
3. **Mapa de contacto**: en `contacto.html`, reemplazar el `src` del iframe de Google Maps
   por la ubicación real de la farmacia.
4. **Textos placeholder**: los textos de "Nuestra historia", misión/valores, horarios,
   cobertura y política de privacidad son contenido editable de ejemplo — reemplazarlos
   con la información validada del negocio.
5. **Formulario de contacto**: el formulario no tiene backend propio. Hay un comentario en
   `contacto.html` indicando dónde conectar un servicio como
   [Formspree](https://formspree.io/) o [Web3Forms](https://web3forms.com/) si se decide
   activarlo.

## Previsualizar en local

No requiere instalación de dependencias. Dos formas:

**Opción A — abrir directamente:**
Abrir `index.html` con doble clic o desde el navegador (`file:///ruta/al/proyecto/index.html`).

**Opción B — servidor estático simple** (recomendado, evita restricciones de `file://` en
algunos navegadores para el iframe del mapa):

```bash
# Con Python 3 (viene preinstalado en Mac/Linux)
python3 -m http.server 8000
# Abrir http://localhost:8000 en el navegador
```

```bash
# Alternativa con Node.js
npx serve .
```

## Desplegar por FTP/cPanel en GoDaddy

1. Ingresar al panel de GoDaddy → cPanel → **Administrador de archivos** (o usar un cliente
   FTP como FileZilla con las credenciales FTP del hosting).
2. Ubicar la carpeta pública del sitio (normalmente `public_html/`).
3. Subir **todo el contenido** de este repositorio (no la carpeta raíz `farmared-web/`, sino
   los archivos y carpetas que están dentro de ella) directamente dentro de `public_html/`.
4. Verificar que `index.html` quede en la raíz de `public_html/` para que cargue en
   `https://tudominio.com/`.
5. Confirmar que las rutas relativas (`css/`, `js/`, `img/`) se subieron completas y con la
   misma estructura de carpetas.

## Desplegar en Netlify o Vercel (para pruebas rápidas con URL pública)

**Netlify (arrastrar y soltar):**
1. Ir a [app.netlify.com/drop](https://app.netlify.com/drop).
2. Arrastrar la carpeta completa del proyecto a la zona indicada.
3. Netlify genera una URL pública (`https://algo-random.netlify.app`) en segundos.

**Netlify o Vercel (conectando el repo de Git):**
1. Subir este repositorio a GitHub/GitLab/Bitbucket.
2. En Netlify o Vercel, elegir "Importar proyecto" / "New Project" y conectar el repositorio.
3. Como es un sitio estático sin build, dejar el *build command* vacío y el *publish/output
   directory* como `.` (raíz del proyecto).
4. Desplegar: la plataforma entrega una URL pública para pruebas antes de tener el dominio
   definitivo.
