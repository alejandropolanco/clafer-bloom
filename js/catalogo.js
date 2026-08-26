// ========== CARGAR PRODUCTOS ==========
const catalogoGrid = document.getElementById('catalogo-grid');

function cargarProductos() {
  const productos = window.PRODUCTOS;
  if (!productos || !productos.length) {
    catalogoGrid.innerHTML = '<p style="text-align:center;grid-column:1/-1;color:var(--text-light);">Error al cargar el catálogo.</p>';
    return;
  }
  renderizarProductos(productos);
}

function renderizarProductos(productos) {
  catalogoGrid.innerHTML = '';

  productos.forEach((producto, index) => {
    const precio = producto.precio_mostrar
      ? `<span>${producto.precio_mostrar}</span>`
      : `<span>Desde </span>${formatPrice(producto.precio_desde)}`;

    const card = document.createElement('div');
    card.className = `product-card reveal delay-${index + 1}`;
    card.innerHTML = `
      <div class="product-card__image-placeholder">
        <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
      </div>
      <div class="product-card__body">
        <h3 class="product-card__name">${producto.nombre}</h3>
        <p class="product-card__price">${precio}</p>
        <div class="product-card__actions">
          <a href="producto.html?id=${producto.id}" class="product-card__btn product-card__btn--detail">Ver detalle</a>
          <a href="${getWhatsAppUrl(producto.msg_whatsapp)}" class="product-card__btn product-card__btn--whatsapp" target="_blank" rel="noopener">WhatsApp</a>
        </div>
      </div>
    `;

    catalogoGrid.appendChild(card);
  });

  // Reiniciar scroll reveal para los nuevos elementos
  initScrollReveal();
}

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', cargarProductos);
