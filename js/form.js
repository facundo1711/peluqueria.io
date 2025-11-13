// form.js - Bootstrap custom validation and Modal handling for forms

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // =========================================================
  // 1. LÓGICA DEL MODAL DE BIENVENIDA (Para index.html)
  // =========================================================
  const modalBienvenidaElement = document.getElementById('modalBienvenida');
  if (modalBienvenidaElement) {
    // Usamos sessionStorage para asegurar que el modal se muestre solo una vez por sesión
    if (sessionStorage.getItem('modalBienvenidaShown') !== 'true') {
      const modalBienvenida = new bootstrap.Modal(modalBienvenidaElement);
      modalBienvenida.show();
      sessionStorage.setItem('modalBienvenidaShown', 'true');
    }
  }


  // =========================================================
  // 2. LÓGICA DE VALIDACIÓN DE FORMULARIOS Y MODALS DE CONFIRMACIÓN
  // (Para Sacar Turnos.html y contacto.html)
  // =========================================================
  const forms = document.querySelectorAll('.needs-validation');

  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        // Detener el envío por defecto del formulario
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity()) {
          // Si el formulario es válido:
          
          let modalToShowId;
          
          if (form.id === 'form-turnos') {
            modalToShowId = 'modalTurnoReservado';
          } else if (form.id === 'form-contacto') {
            modalToShowId = 'modalMensajeEnviado';
          }
          
          if (modalToShowId) {
            const modalElement = document.getElementById(modalToShowId);
            const modalInstance = new bootstrap.Modal(modalElement);
            
            // Mostrar el modal y resetear el formulario
            modalInstance.show();
            form.reset();
            form.classList.remove('was-validated');
          }

        } else {
          // Si no es válido, solo aplica la clase de validación
          form.classList.add('was-validated');
        }
      }, false)
    })
});