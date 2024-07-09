// cart.js

const contenedorTarjetas = document.getElementById("palos-container");
const unidadesElement = document.getElementById("unidades");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const reiniciarCarritoElement = document.getElementById("reiniciar");

function crearTarjetasProductosInicio(palos) {
    contenedorTarjetas.innerHTML = ""; 

    palos.forEach(palo => {
        const nuevoPalo = crearTarjetaProducto(palo);
        contenedorTarjetas.appendChild(nuevoPalo);
    });

    actualizarTotales(); 
    actualizarEstadoCarrito(); 
}

function crearTarjetaProducto(palo) {
    const tarjetaProducto = document.createElement("div");
    tarjetaProducto.classList.add("tarjeta-producto");

    tarjetaProducto.innerHTML = `
        <div class="image">
            <img src="${palo.img}" alt="palo ${palo.nombre}">
        </div>
        <div class="content">
            <h2>${palo.nombre}</h2>
            <p>Precio: €${palo.precio} EUR</p>
            <div>
                <button class="restar" data-id="${palo.id}">-</button>
                <span class="cantidad">${palo.cantidad}</span>
                <button class="sumar" data-id="${palo.id}">+</button>
            </div>
        </div>
    `;

    tarjetaProducto.querySelector(".restar").addEventListener("click", () => {
        restarAlCarrito(palo);
    });

    tarjetaProducto.querySelector(".sumar").addEventListener("click", () => {
        agregarAlCarrito(palo);
    });

    return tarjetaProducto;
}

function actualizarTotales() {
    const productos = JSON.parse(localStorage.getItem("palos")) || [];
    let unidades = 0;
    let precio = 0;

    productos.forEach(palo => {
        unidades += palo.cantidad;
        precio += palo.precio * palo.cantidad;
    });

    unidadesElement.innerText = unidades;
    precioElement.innerText = `€${precio} EUR`;
}

function actualizarEstadoCarrito() {
    const productos = JSON.parse(localStorage.getItem("palos")) || [];

    if (productos.length === 0) {
        carritoVacioElement.style.display = 'block'; 
    } else {
        carritoVacioElement.style.display = 'none'; 
    }

   
    let unidades = 0;
    let precio = 0;

    productos.forEach(palo => {
        unidades += palo.cantidad;
        precio += palo.precio * palo.cantidad;
    });

    unidadesElement.innerText = unidades;
    precioElement.innerText = `€${precio} EUR`;
}

reiniciarCarritoElement.addEventListener("click", () => {
    localStorage.removeItem("palos");
    crearTarjetasProductosInicio([]);
    actualizarEstadoCarrito(); 
});

function agregarAlCarrito(palo) {
    const productos = JSON.parse(localStorage.getItem("palos")) || [];
    const index = productos.findIndex(item => item.id === palo.id);

    if (index !== -1) {
        productos[index].cantidad++;
    }

    localStorage.setItem("palos", JSON.stringify(productos));
    crearTarjetasProductosInicio(productos);
    actualizarEstadoCarrito(); 
}

function restarAlCarrito(palo) {
    const productos = JSON.parse(localStorage.getItem("palos")) || [];
    const index = productos.findIndex(item => item.id === palo.id);

    if (index !== -1 && productos[index].cantidad > 0) {
        productos[index].cantidad--;

        if (productos[index].cantidad === 0) {
            productos.splice(index, 1); 
        }
    }

    localStorage.setItem("palos", JSON.stringify(productos));
    crearTarjetasProductosInicio(productos);
    actualizarEstadoCarrito(); 
}

document.addEventListener("DOMContentLoaded", () => {
    const productos = JSON.parse(localStorage.getItem("palos")) || [];
    crearTarjetasProductosInicio(productos);
});
