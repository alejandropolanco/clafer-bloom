// ========== TEMPORADA DE GRADOS: INICIALIZACIÓN ==========
// Orquesta el render de las tarjetas y la apertura del modal.
document.addEventListener('DOMContentLoaded', function () {
  var grid = document.getElementById('grados-grid');
  var productos = window.GRADOS_PRODUCTOS || [];

  if (!grid || !productos.length) return;
  if (!window.GradosRender || !window.GradosModal) return;

  // Cada página define desde dónde se resuelven las imágenes.
  window.GradosRender.configure({
    imageBase: grid.getAttribute('data-img-base') || ''
  });

  window.GradosRender.render(grid, productos, {
    onOpen: function (producto, trigger) {
      window.GradosModal.open(producto, trigger);
    }
  });

  // Las tarjetas se crean después del primer init de main.js,
  // por eso reiniciamos el observer para animarlas al hacer scroll.
  if (typeof window.initScrollReveal === 'function') {
    window.initScrollReveal();
  }
});
