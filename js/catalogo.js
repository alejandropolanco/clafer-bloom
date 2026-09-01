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
      <div class="product-card__image">
        <img src="${producto.imagen}" alt="${producto.nombre}" class="product-card__img">
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
