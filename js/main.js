/* =========================================================
   FarmaRed - main.js
   JavaScript vanilla: menu movil, carrusel de promociones,
   vitrina de productos y validacion basica del formulario.
   ========================================================= */

(function () {
  'use strict';

  /* ---------------------------------------------------------
     CONFIGURACION CENTRAL DE WHATSAPP
     Reemplazar el valor de WHATSAPP_NUMBER por el numero real
     (formato internacional, solo digitos, ej. "593987654321")
     antes de publicar el sitio. Todos los botones de WhatsApp
     del sitio arman su enlace a partir de esta unica constante.
     --------------------------------------------------------- */
  var WHATSAPP_NUMBER = '000000000000'; // PLACEHOLDER: reemplazar antes de publicar

  var MENSAJE_RECETA =
    'Hola, me gustaria solicitar informacion sobre la siguiente receta:';

  function construirEnlaceWhatsApp(mensaje) {
    var texto = mensaje || MENSAJE_RECETA;
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(texto);
  }

  /* ---------------------------------------------------------
     CATALOGO DE PRODUCTOS (vitrina, sin precios ni compra)
     Para agregar/editar un producto basta con modificar este
     array; no es necesario tocar el HTML de productos.html.
     --------------------------------------------------------- */
  var PRODUCTOS = [
    {
      id: 'bebe-panales',
      categoria: 'bebe',
      categoriaEtiqueta: 'Cuidado del bebe',
      nombre: 'Panales etapa recien nacido',
      descripcion: 'Panales suaves e hipoalergenicos para los primeros meses.',
      imagen: 'img/productos/icon-bebe.svg'
    },
    {
      id: 'bebe-toallitas',
      categoria: 'bebe',
      categoriaEtiqueta: 'Cuidado del bebe',
      nombre: 'Toallitas humedas sin fragancia',
      descripcion: 'Limpieza delicada para la piel sensible del bebe.',
      imagen: 'img/productos/icon-bebe.svg'
    },
    {
      id: 'bebe-formula',
      categoria: 'bebe',
      categoriaEtiqueta: 'Cuidado del bebe',
      nombre: 'Leche de formula etapa 1',
      descripcion: 'Formula infantil de inicio, disponible en presentacion 900g.',
      imagen: 'img/productos/icon-bebe.svg'
    },
    {
      id: 'vitaminas-multivitaminico',
      categoria: 'vitaminas',
      categoriaEtiqueta: 'Suplementos y vitaminas',
      nombre: 'Multivitaminico A-Z',
      descripcion: 'Complejo diario de vitaminas y minerales esenciales.',
      imagen: 'img/productos/icon-vitaminas.svg'
    },
    {
      id: 'vitaminas-c',
      categoria: 'vitaminas',
      categoriaEtiqueta: 'Suplementos y vitaminas',
      nombre: 'Vitamina C 1000mg',
      descripcion: 'Refuerzo para el sistema inmunologico, tabletas masticables.',
      imagen: 'img/productos/icon-vitaminas.svg'
    },
    {
      id: 'vitaminas-complejo-b',
      categoria: 'vitaminas',
      categoriaEtiqueta: 'Suplementos y vitaminas',
      nombre: 'Complejo B',
      descripcion: 'Apoyo para energia y sistema nervioso, caja x30 capsulas.',
      imagen: 'img/productos/icon-vitaminas.svg'
    },
    {
      id: 'higiene-jabon',
      categoria: 'higiene',
      categoriaEtiqueta: 'Cuidado personal e higiene',
      nombre: 'Jabon liquido antibacterial',
      descripcion: 'Limpieza profunda para manos, presentacion 250ml.',
      imagen: 'img/productos/icon-higiene.svg'
    },
    {
      id: 'higiene-shampoo',
      categoria: 'higiene',
      categoriaEtiqueta: 'Cuidado personal e higiene',
      nombre: 'Shampoo suave uso diario',
      descripcion: 'Formula suave apta para todo tipo de cabello.',
      imagen: 'img/productos/icon-higiene.svg'
    },
    {
      id: 'higiene-alcohol',
      categoria: 'higiene',
      categoriaEtiqueta: 'Cuidado personal e higiene',
      nombre: 'Alcohol antiseptico 70%',
      descripcion: 'Desinfectante de uso topico, presentacion 500ml.',
      imagen: 'img/productos/icon-higiene.svg'
    }
  ];

  /* ---------------------------------------------------------
     Utilidades
     --------------------------------------------------------- */
  function alEstarListo(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  function escaparHtml(texto) {
    var div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
  }

  /* ---------------------------------------------------------
     Boton flotante de WhatsApp + enlaces con data-whatsapp-msg
     --------------------------------------------------------- */
  function inicializarEnlacesWhatsApp() {
    var flotante = document.querySelector('[data-whatsapp-flotante]');
    if (flotante) {
      flotante.setAttribute('href', construirEnlaceWhatsApp(MENSAJE_RECETA));
    }

    var enlaces = document.querySelectorAll('[data-whatsapp-msg]');
    enlaces.forEach(function (enlace) {
      var mensaje = enlace.getAttribute('data-whatsapp-msg') || MENSAJE_RECETA;
      enlace.setAttribute('href', construirEnlaceWhatsApp(mensaje));
      enlace.setAttribute('target', '_blank');
      enlace.setAttribute('rel', 'noopener noreferrer');
    });
  }

  /* ---------------------------------------------------------
     Menu movil
     --------------------------------------------------------- */
  function inicializarMenuMovil() {
    var boton = document.querySelector('.navbar__toggle');
    var menu = document.querySelector('.navbar__menu');
    if (!boton || !menu) return;

    boton.addEventListener('click', function () {
      var abierto = menu.classList.toggle('esta-abierto');
      boton.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    });

    menu.querySelectorAll('a').forEach(function (enlace) {
      enlace.addEventListener('click', function () {
        menu.classList.remove('esta-abierto');
        boton.setAttribute('aria-expanded', 'false');
      });
    });

    // Marcar el enlace de la pagina actual para navegacion por teclado/lectores de pantalla
    var rutaActual = window.location.pathname.split('/').pop() || 'index.html';
    menu.querySelectorAll('a[href]').forEach(function (enlace) {
      var href = enlace.getAttribute('href');
      if (href === rutaActual) {
        enlace.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ---------------------------------------------------------
     Carrusel de promociones
     --------------------------------------------------------- */
  function inicializarCarrusel() {
    var pista = document.querySelector('.carrusel__pista');
    if (!pista) return;

    var anterior = document.querySelector('[data-carrusel-anterior]');
    var siguiente = document.querySelector('[data-carrusel-siguiente]');

    function desplazar(direccion) {
      var tarjeta = pista.querySelector('.tarjeta-promo');
      var distancia = tarjeta ? tarjeta.getBoundingClientRect().width + 20 : 280;
      pista.scrollBy({ left: direccion * distancia, behavior: 'smooth' });
    }

    if (anterior) anterior.addEventListener('click', function () { desplazar(-1); });
    if (siguiente) siguiente.addEventListener('click', function () { desplazar(1); });
  }

  /* ---------------------------------------------------------
     Vitrina de productos (productos.html)
     --------------------------------------------------------- */
  function crearTarjetaProducto(producto) {
    var mensaje = 'Hola, me gustaria consultar disponibilidad de: ' + producto.nombre;
    return (
      '<article class="tarjeta-producto" data-categoria="' + producto.categoria + '">' +
        '<img class="tarjeta-producto__img" src="' + producto.imagen + '" alt="' + escaparHtml(producto.nombre) + '" loading="lazy">' +
        '<div class="tarjeta-producto__cuerpo">' +
          '<span class="tarjeta-producto__categoria">' + escaparHtml(producto.categoriaEtiqueta) + '</span>' +
          '<h3>' + escaparHtml(producto.nombre) + '</h3>' +
          '<p class="tarjeta-producto__descripcion">' + escaparHtml(producto.descripcion) + '</p>' +
          '<a class="boton boton--outline" data-whatsapp-msg="' + escaparHtml(mensaje) + '">Consultar disponibilidad</a>' +
        '</div>' +
      '</article>'
    );
  }

  function inicializarVitrinaProductos() {
    var contenedor = document.querySelector('[data-grid-productos]');
    if (!contenedor) return;

    contenedor.innerHTML = PRODUCTOS.map(crearTarjetaProducto).join('');
    inicializarEnlacesWhatsApp();

    var filtros = document.querySelectorAll('.filtro-categoria');
    var aviso = document.querySelector('[data-aviso-sin-resultados]');

    function aplicarFiltro(categoria) {
      var tarjetas = contenedor.querySelectorAll('.tarjeta-producto');
      var visibles = 0;
      tarjetas.forEach(function (tarjeta) {
        var coincide = categoria === 'todos' || tarjeta.getAttribute('data-categoria') === categoria;
        tarjeta.style.display = coincide ? '' : 'none';
        if (coincide) visibles += 1;
      });
      if (aviso) {
        aviso.classList.toggle('esta-visible', visibles === 0);
      }
    }

    filtros.forEach(function (filtro) {
      filtro.addEventListener('click', function () {
        filtros.forEach(function (f) { f.classList.remove('esta-activo'); });
        filtro.classList.add('esta-activo');
        aplicarFiltro(filtro.getAttribute('data-categoria'));
      });
    });
  }

  /* ---------------------------------------------------------
     Formulario de contacto: validacion basica
     --------------------------------------------------------- */
  function inicializarFormularioContacto() {
    var formulario = document.querySelector('[data-formulario-contacto]');
    if (!formulario) return;

    var mensajeExito = formulario.querySelector('.mensaje-formulario');

    function mostrarError(campo, texto) {
      var contenedorError = formulario.querySelector('[data-error-para="' + campo.name + '"]');
      if (contenedorError) contenedorError.textContent = texto || '';
    }

    function validarCampo(campo) {
      campo.setAttribute('data-tocado', 'true');
      if (campo.validity.valueMissing) {
        mostrarError(campo, 'Este campo es obligatorio.');
        return false;
      }
      if (campo.type === 'email' && campo.validity.typeMismatch) {
        mostrarError(campo, 'Ingresa un correo electronico valido.');
        return false;
      }
      mostrarError(campo, '');
      return true;
    }

    var campos = formulario.querySelectorAll('input[required], textarea[required]');
    campos.forEach(function (campo) {
      campo.addEventListener('blur', function () { validarCampo(campo); });
    });

    formulario.addEventListener('submit', function (evento) {
      evento.preventDefault();
      var esValido = true;
      campos.forEach(function (campo) {
        if (!validarCampo(campo)) esValido = false;
      });

      if (!esValido) return;

      /* -----------------------------------------------------
         Este formulario no tiene backend propio (sitio estatico
         sin servidor). Para activarlo, conectar un servicio como
         Formspree (https://formspree.io/) o Web3Forms
         (https://web3forms.com/): normalmente basta con cambiar
         el atributo "action" del <form> en contacto.html a la URL
         que entrega el servicio y quitar este preventDefault /
         mensaje simulado.
         ----------------------------------------------------- */
      formulario.reset();
      campos.forEach(function (campo) { campo.removeAttribute('data-tocado'); });
      if (mensajeExito) mensajeExito.classList.add('esta-visible');
    });
  }

  alEstarListo(function () {
    inicializarEnlacesWhatsApp();
    inicializarMenuMovil();
    inicializarCarrusel();
    inicializarVitrinaProductos();
    inicializarFormularioContacto();

    var anioActual = document.querySelector('[data-anio-actual]');
    if (anioActual) anioActual.textContent = String(new Date().getFullYear());
  });
})();
