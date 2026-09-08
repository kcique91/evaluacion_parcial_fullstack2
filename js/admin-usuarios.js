var usuarios = [];

try{
    var g = localStorage.getItem("usuarios");
    if(g!= null){
        var temp = JSON.parse(g);
        if(temp && temp.length > 0) usuarios = temp;
    }
}catch(e){
    usuarios = [];
}

function mostrarUsuarios(){
    var cuerpo = document.getElementById("cuerpoUsuarios");
    if(cuerpo == null) return;
    cuerpo.innerHTML = "";
    for(var i=0; i < usuarios.length; i++){
        var u = usuarios[i];
        var run = u.run || "-";
        var nombre = (u.nombre || "") + " " + (u.apellidos || "");
        var correo = u.correo || "";
        var tipo = u.tipoUsuario || "Cliente";
        cuerpo.innerHTML += "<tr><td>"+run+"</td><td>"+nombre.trim()+"</td><td>"+correo+"</td><td>"+tipo+"</td><td><button class='btn-editar' onclick='editarUsuario("+i+")'>Editar</button> <button class='btn-eliminar' onclick='eliminarUsuario("+i+")'>Eliminar</button></td></tr>";
    }
}

function editarUsuario(i){
    localStorage.setItem("indiceUsuarioEditar", i);
    window.location.href = "usuario-editar.html";
}

function eliminarUsuario(i){
    if(usuarios[i].correo == "admin@duoc.cl"){
        alert("No se puede eliminar admin principal");
        return;
    }
    if(confirm("¿Eliminar "+usuarios[i].correo+"?")){
        usuarios.splice(i,1);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        mostrarUsuarios();
    }
}

mostrarUsuarios();