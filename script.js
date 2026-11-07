const formLogin = document.getElementById("formLogin");
const correo = document.getElementById("correo");
const clave = document.getElementById("clave");
const btnMostrar = document.getElementById("btnMostrar");
const errorCorreo = document.getElementById("errorCorreo");
const errorClave = document.getElementById("errorClave");
const mensaje = document.getElementById("mensaje");

// Datos de DEMOSTRACIÓN (no es seguridad real)
const CORREO_DEMO = "demo@ejemplo.com";
const CLAVE_DEMO = "12345678";

const MIN_CLAVE = 8;
const PATRON_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function mostrarError(campo, elementoError, texto) {
  elementoError.textContent = texto;
  campo.setAttribute("aria-invalid", "true");
}

function limpiarError(campo, elementoError) {
  elementoError.textContent = "";
  campo.removeAttribute("aria-invalid");
}

function validarCorreo() {
  const valor = correo.value.trim();
  if (valor === "") {
    mostrarError(correo, errorCorreo, "Ingresa tu correo.");
    return false;
  }
  if (!PATRON_CORREO.test(valor)) {
    mostrarError(correo, errorCorreo, "El correo no tiene un formato válido (ejemplo: nombre@dominio.com).");
    return false;
  }
  limpiarError(correo, errorCorreo);
  return true;
}

function validarClave() {
  if (clave.value === "") {
    mostrarError(clave, errorClave, "Ingresa tu contraseña.");
    return false;
  }
  if (clave.value.length < MIN_CLAVE) {
    mostrarError(clave, errorClave, "La contraseña debe tener al menos " + MIN_CLAVE + " caracteres.");
    return false;
  }
  limpiarError(clave, errorClave);
  return true;
}

function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = "mensaje " + tipo;
}

// Mostrar / ocultar contraseña
btnMostrar.addEventListener("click", function () {
  const oculta = clave.type === "password";
  clave.type = oculta ? "text" : "password";
  btnMostrar.textContent = oculta ? "Ocultar" : "Mostrar";
});

// Validación al salir de cada campo
correo.addEventListener("blur", validarCorreo);
clave.addEventListener("blur", validarClave);

formLogin.addEventListener("submit", function (evento) {
  evento.preventDefault();
  mensaje.textContent = "";
  mensaje.className = "mensaje";

  const correoValido = validarCorreo();
  const claveValida = validarClave();

  // Si hay errores, no se envía el formulario y se informa al usuario
  if (!correoValido || !claveValida) {
    mostrarMensaje("Corrige los errores marcados para continuar.", "fallo");
    (!correoValido ? correo : clave).focus();
    return;
  }

  if (correo.value.trim() === CORREO_DEMO && clave.value === CLAVE_DEMO) {
    mostrarMensaje("Inicio de sesión de demostración correcto.", "ok");
  } else {
    mostrarMensaje("Correo o contraseña incorrectos.", "fallo");
  }
});