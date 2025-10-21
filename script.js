const lightbox = document.getElementById('lightbox');
const imagenAmpliada = document.getElementById('imagenAmpliada');
const cerrar = document.getElementById('cerrar');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

let imagenesActuales = [];
let indiceActual = 0;

// --- Abrir galería correspondiente ---
document.querySelectorAll('.trabajo img').forEach(img => {
  img.addEventListener('click', e => {
    const trabajo = e.target.closest('.trabajo');
    const galeria = trabajo.querySelectorAll('.galeria-oculta img');

    imagenesActuales = Array.from(galeria).map(i => i.src);
    indiceActual = 0;

    mostrarImagenActual();
    lightbox.classList.add('active');
  });
});

function mostrarImagenActual() {
  imagenAmpliada.src = imagenesActuales[indiceActual];
}

// --- Navegación con botones ---
next.addEventListener('click', () => {
  indiceActual = (indiceActual + 1) % imagenesActuales.length;
  mostrarImagenActual();
});

prev.addEventListener('click', () => {
  indiceActual = (indiceActual - 1 + imagenesActuales.length) % imagenesActuales.length;
  mostrarImagenActual();
});

// --- Cerrar con botón o clic fuera ---
cerrar.addEventListener('click', () => {
  lightbox.classList.remove('active');
});

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
  }
});

// --- Navegación con teclado ---
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('active')) return; // si no está abierto, ignorar

  switch (e.key) {
    case 'ArrowRight':
      indiceActual = (indiceActual + 1) % imagenesActuales.length;
      mostrarImagenActual();
      break;
    case 'ArrowLeft':
      indiceActual = (indiceActual - 1 + imagenesActuales.length) % imagenesActuales.length;
      mostrarImagenActual();
      break;
    case 'Escape':
      lightbox.classList.remove('active');
      break;
  }
});
