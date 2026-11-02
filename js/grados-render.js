// ========== TEMPORADA DE GRADOS: RENDER ==========
// Responsable de construir el HTML de las tarjetas y de los medios
// (foto real o placeholder elegante). No maneja eventos de modal.
(function () {
  'use strict';

  // Prefijo para resolver las imágenes desde la página actual.
  // Se configura con GradosRender.configure({ imageBase: '../' }).
  var imageBase = '';

  // Iconos decorativos para los placeholders (viewBox 0 0 64 64).
  var ICONS = {
    figura:
      '<circle cx="27" cy="19" r="7"/>' +
      '<path d="M27 26v13"/>' +
      '<path d="M17 32l10 4 10-4"/>' +
      '<path d="M21 54l6-15 6 15"/>' +
      '<circle cx="48" cy="39" r="5"/>' +
      '<path d="M43.5 34.5l-3-3M52.5 43.5l3 3M43.5 43.5l-3 3M52.5 34.5l3-3"/>',
    peluche:
      '<circle cx="18" cy="20" r="6"/>' +
      '<circle cx="46" cy="20" r="6"/>' +
      '<circle cx="32" cy="34" r="15"/>' +
      '<circle cx="27" cy="31" r="2" fill="currentColor" stroke="none"/>' +
      '<circle cx="37" cy="31" r="2" fill="currentColor" stroke="none"/>' +
      '<ellipse cx="32" cy="40" rx="6" ry="4.5"/>' +
      '<path d="M32 39v3"/>' +
      '<path d="M29 43c1.5 1.4 4.5 1.4 6 0"/>',
    ramo:
      '<circle cx="21" cy="17" r="5"/>' +
      '<circle cx="32" cy="13" r="5"/>' +
      '<circle cx="43" cy="17" r="5"/>' +
      '<path d="M21 22l6 15M32 18v19M43 22l-6 15"/>' +
      '<path d="M18 38c4.5 3.5 9 5 14 5s9.5-1.5 14-5"/>' +
      '<path d="M24 45l8 13 8-13"/>' +
      '<path d="M28 50h8"/>',
    endulzada:
      '<circle cx="32" cy="25" r="14"/>' +
      '<path d="M32 25a4 4 0 1 0 4-4 8 8 0 1 1-8 8"/>' +
      '<path d="M32 39v14"/>' +
      '<path d="M28 53h8"/>',
    caja:
      '<rect x="17" y="28" width="30" height="25" rx="3"/>' +
      '<rect x="13" y="20" width="38" height="8" rx="2"/>' +
      '<path d="M32 20v33"/>' +
      '<path d="M32 20c-5-9-15-7-13-1 2 4 9 2 13 1z"/>' +
      '<path d="M32 20c5-9 15-7 13-1-2 4-9 2-13 1z"/>',
    vaso:
      '<path d="M19 22h26l-3 30a5 5 0 0 1-5 4H27a5 5 0 0 1-5-4z"/>' +
      '<path d="M17 19h30"/>' +
      '<path d="M38 19l5-11"/>' +
      '<circle cx="27" cy="16" r="3"/>' +
      '<circle cx="37" cy="12" r="3"/>'
  };

  var CAP_ICON =
    '<path d="M2 9l10-5 10 5-10 5L2 9z"/>' +
    '<path d="M6 11v4c0 2 2.7 3 6 3s6-1 6-3v-4"/>' +
    '<path d="M22 9v5"/>';

  var WHATSAPP_ICON =
    'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z';

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function whatsappUrl(message) {
    if (typeof window.getWhatsAppUrl === 'function') {
      return window.getWhatsAppUrl(message);
    }
    return 'https://wa.me/573167460230?text=' + encodeURIComponent(message);
  }

  function configure(options) {
    if (options && typeof options.imageBase === 'string') {
      imageBase = options.imageBase;
    }
  }

  // Devuelve el HTML del área visual: foto real si existe, o placeholder.
  function mediaMarkup(producto, lazy) {
    if (producto.imagen) {
      return (
        '<img src="' + escapeHtml(imageBase + producto.imagen) + '" alt="' + escapeHtml(producto.nombre) + '"' +
        ' class="grado-media__img"' + (lazy === false ? '' : ' loading="lazy"') + '>'
      );
    }

    var icon = ICONS[producto.icono] || ICONS.caja;
    var variant = ICONS[producto.icono] ? producto.icono : 'caja';

    return (
      '<div class="grado-ph grado-ph--' + variant + '" aria-hidden="true">' +
        '<svg class="grado-ph__cap" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + CAP_ICON + '</svg>' +
        '<svg class="grado-ph__icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">' + icon + '</svg>' +
        '<span class="grado-ph__label">' + escapeHtml(producto.etiqueta) + '</span>' +
      '</div>'
    );
  }

  function cardMarkup(producto, index) {
    var delay = (index % 3) + 1;

    return (
      '<article class="grado-card reveal delay-' + delay + '">' +
        '<div class="grado-card__media">' + mediaMarkup(producto) + '</div>' +
        '<div class="grado-card__body">' +
          '<h3 class="grado-card__name">' + escapeHtml(producto.nombre) + '</h3>' +
          '<p class="grado-card__desc">' + escapeHtml(producto.descripcion) + '</p>' +
          '<p class="grado-card__price">' + escapeHtml(producto.precio_mostrar || producto.precio || 'A consultar') + '</p>' +
          '<div class="grado-card__actions">' +
            '<button type="button" class="grado-card__btn grado-card__btn--detail" data-grado-id="' + escapeHtml(producto.id) + '">Ver más</button>' +
            '<a href="' + escapeHtml(whatsappUrl(producto.msg_whatsapp)) + '" class="grado-card__btn grado-card__btn--whatsapp" target="_blank" rel="noopener" aria-label="Cotizar ' + escapeHtml(producto.nombre) + ' por WhatsApp">' +
              '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + WHATSAPP_ICON + '" fill="currentColor"/></svg>' +
              'WhatsApp' +
            '</a>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  // Pinta las tarjetas y delega el clic de "Ver más" en el callback onOpen.
  function render(container, productos, handlers) {
    if (!container || !productos || !productos.length) return;

    container.innerHTML = productos.map(cardMarkup).join('');

    container.addEventListener('click', function (event) {
      var trigger = event.target.closest('[data-grado-id]');
      if (!trigger || !container.contains(trigger)) return;

      var producto = productos.find(function (item) {
        return item.id === trigger.getAttribute('data-grado-id');
      });

      if (producto && handlers && typeof handlers.onOpen === 'function') {
        handlers.onOpen(producto, trigger);
      }
    });
  }

  window.GradosRender = {
    configure: configure,
    render: render,
    mediaMarkup: mediaMarkup
  };
})();
