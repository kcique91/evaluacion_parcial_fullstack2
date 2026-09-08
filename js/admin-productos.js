// Recorre el catálogo de productos (PRODUCTOS, que viene de productos-data.js y ya lee
// desde localStorage si hay cambios guardados) y pinta una fila por cada producto en la
// tabla del panel de administración
function mostrarProductosAdmin() {
  const cuerpo = document.getElementById("cuerpoProductosAdmin");
  if (!cuerpo) return;

  let filas = "";

  PRODUCTOS.forEach(function (producto) {
    filas += `
      <tr>
        <td>${producto.codigo}</td>
        <td>${producto.nombre}</td>
        <td>${producto.categoria}</td>
        <td>$${producto.precioResidencial}</td>
        <td>${producto.stock}</td>
        <td>
          <button type="button" class="btn-editar" onclick="editarProducto('${producto.codigo}')">Editar</button>
          <button type="button" class="btn-eliminar" onclick="eliminarProducto('${producto.codigo}')">Eliminar</button>
        </td>
      </tr>
    `;
  });

  cuerpo.innerHTML = filas;
}

// Guarda el código del producto a editar y redirige al formulario de edición
function editarProducto(codigo) {
  localStorage.setItem("codigoProductoEditar", codigo);
  window.location.href = "producto-editar.html";
}

// Elimina un producto del catálogo buscándolo por su código (no por su posición en el
// arreglo, para que no se desordene), actualiza localStorage y vuelve a pintar la tabla
function eliminarProducto(codigo) {
  if (!confirm("¿Eliminar este producto?")) return;

  PRODUCTOS = PRODUCTOS.filter(function (p) {
    return p.codigo !== codigo;
  });

  localStorage.setItem("productos", JSON.stringify(PRODUCTOS));
  mostrarProductosAdmin();
}

mostrarProductosAdmin();