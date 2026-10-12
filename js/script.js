const formulario = document.getElementById("formularioRegistro");

  // Comprobar si el usuario está logueado

  const usuarioLogueado = localStorage.getItem("sesionActiva");

  if (!usuarioLogueado) {
      window.location.href = "login.html";
  }

  
  /////////////// Crear cuenta

if (formulario) {
    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const contrasena = document.getElementById("contrasena").value;
        const confirmacion = document.getElementById("confirmar_contrasena").value;

        limpiarErrores();

        let formularioValido = true;

        if (nombre.length < 2) {
            mostrarError("errorNombre", "Ingresa un nombre válido.");
            formularioValido = false;
        }

        if (apellido.length < 2) {
            mostrarError("errorApellido", "Ingresa un apellido válido.");
            formularioValido = false;
        }

        if (!validarCorreo(correo)) {
            mostrarError("errorCorreo", "Ingresa un correo válido.");
            formularioValido = false;
        }

        if (contrasena.length < 8) {
            mostrarError(
                "errorContrasena",
                "La contraseña debe tener mínimo 8 caracteres."
            );
            formularioValido = false;
        }

        if (contrasena !== confirmacion) {
            mostrarError(
                "errorConfirmacion",
                "Las contraseñas no coinciden."
            );
            formularioValido = false;
        }

        if (formularioValido) {
            formulario.submit();
        }
    });
}

function validarCorreo(correo) {
    const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresion.test(correo);
}

function mostrarError(id, mensaje) {
    document.getElementById(id).textContent = mensaje;
}

function limpiarErrores() {
    const errores = document.querySelectorAll(".mensaje-error");

    errores.forEach(function (error) {
        error.textContent = "";
    });
}