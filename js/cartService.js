function agregarAlCarrito(producto) {
    const memoria = JSON.parse(localStorage.getItem("palos"));
    console.log(memoria);

    let cuenta = 0;
    if (!memoria) {
        const nuevoProducto = getNuevoProductoParaMemoria(producto);
        localStorage.setItem("palos", JSON.stringify([nuevoProducto]));
        cuenta = 1;
    } 
    else {
        const indiceProducto = memoria.findIndex(palo => palo.id === producto.id);
        console.log(indiceProducto);
        const nuevaMemoria = memoria;
        if (indiceProducto === -1) {
            nuevaMemoria.push(getNuevoProductoParaMemoria(producto));
            cuenta = 1;
        } 
        else {
            nuevaMemoria[indiceProducto].cantidad++;
            cuenta = nuevaMemoria[indiceProducto].cantidad;
        }
        localStorage.setItem("palos", JSON.stringify(nuevaMemoria));
    }
    actualizarNumeroDelCarrito();
    return cuenta;
}

function restarAlCarrito(producto) {
    const memoria = JSON.parse(localStorage.getItem("palos"));
    const indiceProducto = memoria.findIndex(palo => palo.id === palo.id);
    if (memoria[indiceProducto].cantidad === 1) {
        memoria.splice(indiceProducto, 1);
    } 
    else {
        memoria[indiceProducto].cantidad--;
    }
    localStorage.setItem("palos", JSON.stringify(nuevaMemoria));
    actualizarNumeroDelCarrito();
}

function getNuevoProductoParaMemoria (producto) {
    const nuevoProducto = producto;
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
}

const cuentaCarritoElement = document.getElementById("cuenta-carrito")

function actualizarNumeroDelCarrito () {
    const memoria = JSON.parse(localStorage.getItem("palos"));
    if (memoria && memoria.length > 0) {
        const cuenta = memoria.reduce ((acu, current) => acu + current.cantidad, 0);
        cuentaCarritoElement.innerText = cuenta;
    }
    else {
    cuentaCarritoElement.innerText = 0;
    }
}

actualizarNumeroDelCarrito();