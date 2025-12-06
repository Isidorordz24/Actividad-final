function agregarProducto() {
  const producto = document.getElementById("producto");
  const cantidad = document.getElementById("cantidad").value;
  const tbody = document.querySelector("#tabla tbody");

  const nombre = producto.value;
  const precio = producto.selectedOptions[0]?.dataset.precio;

  if (!nombre) {
    alert("Por favor elija un suplemento");
    return;
  }
  if (!cantidad || cantidad <= 0) {
    alert("Por favor ingrese una cantidad válida");
    return;
  }

  const fila = document.createElement("tr");

  fila.innerHTML = `
    <td>${nombre}</td>
    <td>$${precio}</td>
    <td>${cantidad}</td>
    <td>$${precio * cantidad}</td>
    <td>
      <button onclick="editarFila(this)">Editar</button>
      <button onclick="eliminarFila(this)">Eliminar</button>
    </td>
  `;

  tbody.appendChild(fila);
  calcularTotales();
}

function editarFila(btn) {
  const fila = btn.closest("tr");
  const cantidad = prompt("Nueva cantidad:", fila.cells[2].textContent);

  if (cantidad && cantidad > 0) {
    const precio = parseFloat(fila.cells[1].textContent.replace("$", ""));
    fila.cells[2].textContent = cantidad;
    fila.cells[3].textContent = "$" + (precio * cantidad);
    calcularTotales();
  } else {
    alert("Cantidad inválida");
  }
}

function eliminarFila(btn) {
  btn.closest("tr").remove();
  calcularTotales();
}

function calcularTotales() {
  let subtotal = 0;
  document.querySelectorAll("#tabla tbody tr").forEach(fila => {
    const total = parseFloat(fila.cells[3].textContent.replace("$", ""));
    subtotal += total;
  });

  const iva = subtotal * 0.16;
  const total = subtotal + iva;

  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("iva").textContent = iva.toFixed(2);
  document.getElementById("total").textContent = total.toFixed(2);
}
