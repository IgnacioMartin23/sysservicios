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

// --- Formulario de Contacto por AJAX (FormSubmit) ---
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const formStatus = document.getElementById('form-status');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Evita la recarga o redirección

    // Cambiar estado del botón
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Enviando...</span>';
    submitBtn.disabled = true;

    // Obtener los datos del formulario
    const formData = new FormData(contactForm);

    // Enviar datos por Fetch API
    fetch('https://formsubmit.co/ajax/sys-serviciossrl@hotmail.com', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Ocultar formulario y mostrar mensaje de éxito
        contactForm.classList.add('hidden');
        document.querySelector('.form-header').classList.add('hidden');
        formStatus.classList.remove('hidden');
      } else {
        alert('Hubo un problema al enviar el mensaje. Inténtalo nuevamente.');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    })
    .catch(error => {
      alert('Error de conexión. Inténtalo nuevamente.');
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    });
  });
}

// --- Header Transparente a Sólido ---
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
