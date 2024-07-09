const contenedorTarjetas = document.getElementById("palos-container");

function crearTarjetasProductosInicio(palos) {
    palos.forEach(palo => {
        const nuevoPalo = document.createElement('div');
        nuevoPalo.classList = "tarjeta-palos";
        nuevoPalo.innerHTML = `
            <div class="card">
                <div class="image">
                    <img src="${palo.img}" alt="palo ${palo.nombre}">
                </div>
                <div class="content">
                    <h2 class="title">${palo.nombre}</h2>
                    <p class="desc">€${palo.precio}EUR</p>
                    <button>Agregar al carrito</button>
                </div>
            </div>
        `;
        contenedorTarjetas.appendChild(nuevoPalo);
        nuevoPalo.getElementsByTagName("button")[0].addEventListener("click", () => {
            agregarAlCarrito(palo);
        });
    });
}

crearTarjetasProductosInicio(palos);
