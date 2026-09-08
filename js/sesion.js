/**
 * js/sesion.js
 *
 * Revisa si hay una sesion activa (localStorage.usuarioActivo, la guarda
 * login.js al iniciar sesion) y, si la hay, reemplaza los botones
 * "Iniciar sesion" / "Registrar usuario" del header por una cajita con el
 * nombre del usuario y un boton para cerrar sesion.
 *
 * Si no hay sesion activa, no hace nada: el header queda tal como esta en
 * el HTML (Iniciar sesion / Registrar usuario).

 */

document.addEventListener("DOMContentLoaded", function () {
    var acciones = document.querySelector(".acciones-usuario");
    if (!acciones) return;

    var activo = null;
    try {
        activo = JSON.parse(localStorage.getItem("usuarioActivo"));
    } catch (e) {
        activo = null;
    }

    if (!activo || !activo.nombre) return;

    var linkLogin = acciones.querySelector('a[href="login.html"]');
    var linkRegistro = acciones.querySelector('a[href="registro.html"]');

    var primerNombre = activo.nombre.split(" ")[0];

    // Si es Administrador o Vendedor, agregar un acceso directo al panel de admin
    if (activo.rol === "Administrador" || activo.rol === "Vendedor") {
        var linkAdmin = document.createElement("a");
        linkAdmin.href = "admin/home.html";
        linkAdmin.textContent = "Ir a Admin";
        linkAdmin.classList.add("btn-ir-admin");
        acciones.insertBefore(linkAdmin, acciones.firstChild);
    }

    if (linkLogin) {
        linkLogin.textContent = "👤 " + primerNombre;
        linkLogin.removeAttribute("href");
        linkLogin.classList.add("badge-usuario");
    }

    if (linkRegistro) {
        linkRegistro.textContent = "Cerrar sesión";
        linkRegistro.setAttribute("href", "#");
        linkRegistro.classList.add("btn-cerrar-sesion");
        linkRegistro.addEventListener("click", function (e) {
            e.preventDefault();
            localStorage.removeItem("usuarioActivo");
            window.location.href = "index.html";
        });
    }
});