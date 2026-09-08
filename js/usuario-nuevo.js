// Validación y guardado del formulario "Nuevo Usuario"

function validarRun() {
    const valor = document.getElementById("run").value.trim().toUpperCase();
    // TODO: reemplazar esta verificación básica por validarRUN(valor) de B (js/validacion-run.js)
    // cuando esté lista — este es solo un chequeo de formato mientras tanto.
    if (!/^[0-9]{6,8}[0-9K]$/.test(valor)) {
        mostrarError("errorRun", "RUN inválido. Formato: sin puntos ni guion, ej. 19011022K.");
        return false;
    }
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    if (usuarios.some(u => (u.run || "").toUpperCase() === valor)) {
        mostrarError("errorRun", "Ya existe un usuario registrado con ese RUN.");
        return false;
    }
    limpiarError("errorRun");
    return true;
}

function validarNombre() {
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

function validarApellidos() {
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

function validarCorreo() {
    const valor = document.getElementById("correo").value.trim().toLowerCase();
    if (valor.length === 0 || valor.length > 100) {
        mostrarError("errorCorreo", "El correo es obligatorio (máx. 100 caracteres).");
        return false;
    }
    if (!/@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(valor)) {
        mostrarError("errorCorreo", "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.");
        return false;
    }
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    if (usuarios.some(u => (u.correo || "").toLowerCase() === valor)) {
        mostrarError("errorCorreo", "Ya existe un usuario registrado con ese correo.");
        return false;
    }
    limpiarError("errorCorreo");
    return true;
}

function validarPassword() {
    const valor = document.getElementById("password").value;
    if (valor.length < 4 || valor.length > 10) {
        mostrarError("errorPassword", "La contraseña debe tener entre 4 y 10 caracteres.");
        return false;
    }
    limpiarError("errorPassword");
    return true;
}

function validarFechaNacimiento() {
    const valor = document.getElementById("fechaNacimiento").value;
    if (valor !== "" && new Date(valor) > new Date()) {
        mostrarError("errorFechaNacimiento", "La fecha de nacimiento no puede ser futura.");
        return false;
    }
    limpiarError("errorFechaNacimiento");
    return true;
}

function validarTipoUsuario() {
    const valor = document.getElementById("tipoUsuario").value;
    if (valor === "") {
        mostrarError("errorTipoUsuario", "Debes seleccionar un tipo de usuario.");
        return false;
    }
    limpiarError("errorTipoUsuario");
    return true;
}

function validarRegion() {
    const valor = document.getElementById("region").value;
    if (valor === "") {
        mostrarError("errorRegion", "Debes seleccionar una región.");
        return false;
    }
    limpiarError("errorRegion");
    return true;
}

function validarComuna() {
    const valor = document.getElementById("comuna").value;
    if (valor === "") {
        mostrarError("errorComuna", "Debes seleccionar una comuna.");
        return false;
    }
    limpiarError("errorComuna");
    return true;
}

function validarDireccion() {
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

document.getElementById("formUsuarioNuevo").addEventListener("submit", function (e) {
    e.preventDefault();

    const runValido = validarRun();
    const nombreValido = validarNombre();
    const apellidosValidos = validarApellidos();
    const correoValido = validarCorreo();
    const passwordValida = validarPassword();
    const fechaValida = validarFechaNacimiento();
    const tipoValido = validarTipoUsuario();
    const regionValida = validarRegion();
    const comunaValida = validarComuna();
    const direccionValida = validarDireccion();

    const formularioValido = runValido && nombreValido && apellidosValidos &&
        correoValido && passwordValida && fechaValida && tipoValido &&
        regionValida && comunaValida && direccionValida;

    if (!formularioValido) return;

    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

    const nuevoUsuario = {
        run: document.getElementById("run").value.trim().toUpperCase(),
        nombre: document.getElementById("nombre").value.trim(),
        apellidos: document.getElementById("apellidos").value.trim(),
        correo: document.getElementById("correo").value.trim().toLowerCase(),
        password: document.getElementById("password").value,
        fechaNacimiento: document.getElementById("fechaNacimiento").value,
        tipoUsuario: document.getElementById("tipoUsuario").value,
        region: document.getElementById("region").value,
        comuna: document.getElementById("comuna").value,
        direccion: document.getElementById("direccion").value.trim()
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuario guardado correctamente.");
    window.location.href = "usuarios.html";
});