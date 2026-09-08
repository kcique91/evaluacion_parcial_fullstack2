// Lee el usuario a editar desde localStorage (índice que pone editarUsuario() en admin-usuarios.js)
// y precarga el formulario con sus datos actuales

const indice = localStorage.getItem("indiceUsuarioEditar");
const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

if (indice === null || !usuarios[indice]) {
    alert("No se encontró el usuario a editar");
    window.location.href = "usuarios.html";
} else {
    const u = usuarios[indice];

    document.getElementById("run").value = u.run || "";
    document.getElementById("nombre").value = u.nombre || "";
    document.getElementById("apellidos").value = u.apellidos || "";
    document.getElementById("correo").value = u.correo || "";
    document.getElementById("fechaNacimiento").value = u.fechaNacimiento || "";
    document.getElementById("tipoUsuario").value = u.tipoUsuario || "";
    document.getElementById("region").value = u.region || "";

    // La comuna depende de la región, así que la cargamos con la función del HTML
    cargarComunas(u.region || "", u.comuna || "");

    document.getElementById("direccion").value = u.direccion || "";
    // La contraseña se deja en blanco a propósito, no se precarga
}
function validarNombreEditar() {
    const valor = document.getElementById("nombre").value.trim();
    if (valor.length === 0) {
        mostrarError("errorNombre", "El nombre es obligatorio.");
        return false;
    }
    if (valor.length > 50) {
        mostrarError("errorNombre", "El nombre no puede superar los 50 caracteres.");
        return false;
    }
    limpiarError("errorNombre");
    return true;
}

function validarApellidosEditar() {
    const valor = document.getElementById("apellidos").value.trim();
    if (valor.length === 0) {
        mostrarError("errorApellidos", "Los apellidos son obligatorios.");
        return false;
    }
    if (valor.length > 100) {
        mostrarError("errorApellidos", "Los apellidos no pueden superar los 100 caracteres.");
        return false;
    }
    limpiarError("errorApellidos");
    return true;
}

function validarCorreoEditar() {
    const valor = document.getElementById("correo").value.trim().toLowerCase();
    if (valor.length === 0 || valor.length > 100) {
        mostrarError("errorCorreo", "El correo es obligatorio (máx. 100 caracteres).");
        return false;
    }
    if (!/@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(valor)) {
        mostrarError("errorCorreo", "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.");
        return false;
    }
    limpiarError("errorCorreo");
    return true;
}

function validarPasswordEditar() {
    const valor = document.getElementById("password").value;
    // Opcional al editar: si está vacío, se mantiene la contraseña actual
    if (valor !== "" && (valor.length < 4 || valor.length > 10)) {
        mostrarError("errorPassword", "La contraseña debe tener entre 4 y 10 caracteres.");
        return false;
    }
    limpiarError("errorPassword");
    return true;
}

function validarFechaNacimientoEditar() {
    const valor = document.getElementById("fechaNacimiento").value;
    if (valor !== "" && new Date(valor) > new Date()) {
        mostrarError("errorFechaNacimiento", "La fecha de nacimiento no puede ser futura.");
        return false;
    }
    limpiarError("errorFechaNacimiento");
    return true;
}

function validarTipoUsuarioEditar() {
    const valor = document.getElementById("tipoUsuario").value;
    if (valor === "") {
        mostrarError("errorTipoUsuario", "Debes seleccionar un tipo de usuario.");
        return false;
    }
    limpiarError("errorTipoUsuario");
    return true;
}

function validarRegionEditar() {
    const valor = document.getElementById("region").value;
    if (valor === "") {
        mostrarError("errorRegion", "Debes seleccionar una región.");
        return false;
    }
    limpiarError("errorRegion");
    return true;
}

function validarComunaEditar() {
    const valor = document.getElementById("comuna").value;
    if (valor === "") {
        mostrarError("errorComuna", "Debes seleccionar una comuna.");
        return false;
    }
    limpiarError("errorComuna");
    return true;
}

function validarDireccionEditar() {
    const valor = document.getElementById("direccion").value.trim();
    if (valor.length === 0) {
        mostrarError("errorDireccion", "La dirección es obligatoria.");
        return false;
    }
    if (valor.length > 300) {
        mostrarError("errorDireccion", "La dirección no puede superar los 300 caracteres.");
        return false;
    }
    limpiarError("errorDireccion");
    return true;
}

document.getElementById("formUsuarioEditar").addEventListener("submit", function (e) {
    e.preventDefault();

    const nombreValido = validarNombreEditar();
    const apellidosValidos = validarApellidosEditar();
    const correoValido = validarCorreoEditar();
    const passwordValida = validarPasswordEditar();
    const fechaValida = validarFechaNacimientoEditar();
    const tipoValido = validarTipoUsuarioEditar();
    const regionValida = validarRegionEditar();
    const comunaValida = validarComunaEditar();
    const direccionValida = validarDireccionEditar();

    const formularioValido = nombreValido && apellidosValidos && correoValido &&
        passwordValida && fechaValida && tipoValido && regionValida &&
        comunaValida && direccionValida;

    if (!formularioValido) return;

    if (indice === null || !usuarios[indice]) {
        alert("No se pudo actualizar: el usuario ya no existe.");
        window.location.href = "usuarios.html";
        return;
    }

    usuarios[indice].nombre = document.getElementById("nombre").value.trim();
    usuarios[indice].apellidos = document.getElementById("apellidos").value.trim();
    usuarios[indice].correo = document.getElementById("correo").value.trim().toLowerCase();
    usuarios[indice].fechaNacimiento = document.getElementById("fechaNacimiento").value;
    usuarios[indice].tipoUsuario = document.getElementById("tipoUsuario").value;
    usuarios[indice].region = document.getElementById("region").value;
    usuarios[indice].comuna = document.getElementById("comuna").value;
    usuarios[indice].direccion = document.getElementById("direccion").value.trim();

    const nuevaPassword = document.getElementById("password").value;
    if (nuevaPassword !== "") {
        usuarios[indice].password = nuevaPassword;
    }

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuario actualizado correctamente.");
    window.location.href = "usuarios.html";
});