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

btnMostrar.addEventListener("click", function () {
  const oculta = clave.type === "password";
  clave.type = oculta ? "text" : "password";
  btnMostrar.textContent = oculta ? "Ocultar" : "Mostrar";
});

formLogin.addEventListener("submit", function (evento) {
  evento.preventDefault();
  errorCorreo.textContent = "";
  errorClave.textContent = "";
  mensaje.textContent = "";
  mensaje.className = "mensaje";

  let valido = true;

  if (correo.value.trim() === "") {
    errorCorreo.textContent = "Ingresa tu correo.";
    valido = false;
  }

  if (clave.value === "") {
    errorClave.textContent = "Ingresa tu contraseña.";
    valido = false;
  }

  if (!valido) return;

  if (correo.value.trim() === CORREO_DEMO && clave.value === CLAVE_DEMO) {
    mensaje.textContent = "Inicio de sesión de demostración correcto.";
    mensaje.classList.add("ok");
  } else {
    mensaje.textContent = "Correo o contraseña incorrectos.";
    mensaje.classList.add("fallo");
  }
});