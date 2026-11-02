// ========== TEMPORADA DE GRADOS: MODAL ==========
// Construye y controla el modal de detalle. El efecto visual (revelado
// de izquierda a derecha + nitidez progresiva) vive en grados-modal.css.
(function () {
  'use strict';

  var modal = null;
  var panel = null;
  var media = null;
  var titleEl = null;
  var priceEl = null;
  var descEl = null;
  var ctaEl = null;
  var closeBtn = null;
  var lastTrigger = null;

  var WHATSAPP_PATH =
    'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z';

  function build() {
    modal = document.createElement('div');
    modal.className = 'grado-modal';
    modal.setAttribute('aria-hidden', 'true');
    modal.inert = true;
    modal.innerHTML =
      '<div class="grado-modal__backdrop" data-grado-close></div>' +
      '<div class="grado-modal__panel" role="dialog" aria-modal="true" aria-labelledby="grado-modal-title" aria-describedby="grado-modal-desc">' +
        '<button type="button" class="grado-modal__close" data-grado-close aria-label="Cerrar detalle">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
        '</button>' +
        '<div class="grado-modal__media"></div>' +
        '<div class="grado-modal__info">' +
          '<span class="grado-modal__badge">Temporada de grados</span>' +
          '<h2 class="grado-modal__title" id="grado-modal-title"></h2>' +
          '<p class="grado-modal__price"></p>' +
          '<p class="grado-modal__desc" id="grado-modal-desc"></p>' +
          '<a class="btn btn--whatsapp grado-modal__cta" href="#" target="_blank" rel="noopener">' +
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + WHATSAPP_PATH + '" fill="currentColor"/></svg>' +
            'Cotizar por WhatsApp' +
          '</a>' +
        '</div>' +
      '</div>';

    document.body.appendChild(modal);

    panel = modal.querySelector('.grado-modal__panel');
    media = modal.querySelector('.grado-modal__media');
    titleEl = modal.querySelector('.grado-modal__title');
    priceEl = modal.querySelector('.grado-modal__price');
    descEl = modal.querySelector('.grado-modal__desc');
    ctaEl = modal.querySelector('.grado-modal__cta');
    closeBtn = modal.querySelector('.grado-modal__close');

    modal.querySelectorAll('[data-grado-close]').forEach(function (el) {
      el.addEventListener('click', close);
    });

    document.addEventListener('keydown', onKeydown);
  }

  function onKeydown(event) {
    if (!modal || !modal.classList.contains('is-open')) return;

    if (event.key === 'Escape') {
      close();
      return;
    }

    if (event.key !== 'Tab') return;

    // Trampa de foco simple dentro del modal.
    var focusables = panel.querySelectorAll('a[href], button:not([disabled])');
    if (!focusables.length) return;

    var first = focusables[0];
    var last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function open(producto, trigger) {
    if (!modal) build();

    lastTrigger = trigger || document.activeElement;

    media.innerHTML = window.GradosRender.mediaMarkup(producto, false);
    titleEl.textContent = producto.nombre;
    priceEl.textContent = producto.precio_mostrar || producto.precio || 'A consultar';
    descEl.textContent = producto.descripcion;
    ctaEl.href = typeof window.getWhatsAppUrl === 'function'
      ? window.getWhatsAppUrl(producto.msg_whatsapp)
      : 'https://wa.me/573167460230?text=' + encodeURIComponent(producto.msg_whatsapp);

    // Reinicia el efecto de revelado antes de abrir.
    modal.classList.remove('is-open');
    modal.inert = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('grado-modal-open');

    void modal.offsetWidth;

    window.requestAnimationFrame(function () {
      modal.classList.add('is-open');

      // Enfoca el cierre cuando el modal ya es visible.
      window.setTimeout(function () {
        if (closeBtn && !modal.contains(document.activeElement)) {
          closeBtn.focus({ preventScroll: true });
        }
      }, 50);
    });
  }

  function close() {
    if (!modal) return;

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('grado-modal-open');

    if (lastTrigger && typeof lastTrigger.focus === 'function') {
      lastTrigger.focus();
    }

    window.setTimeout(function () {
      if (modal && !modal.classList.contains('is-open')) {
        modal.inert = true;
      }
    }, 350);
  }

  window.GradosModal = {
    open: open,
    close: close
  };
})();
