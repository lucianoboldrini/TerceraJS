// Definir la clase Colchon
class Colchon {
    constructor(tipo, medida, precio, marca) {
        this.tipo = tipo;
        this.medida = medida;
        this.precio = precio;
        this.marca = marca;
    }
}

// Crear un array de objetos Colchon
const colchones = [
    new Colchon("Espuma De Alta Densidad", "1 plaza", 10000, "Cannon"),
    new Colchon("Resosrtes Continuos", "1 plaza", 12000, "Maxiking"),
    new Colchon("Resosrtes Continuos", "1 plaza", 188000, "Super Descanso"),
    new Colchon("Espuma De Alta Densidad", "1 plaza", 120600, "Super Descanso"),
    new Colchon("Espuma De Alta Densidad", "1 plaza y media", 15000, "Sueño Dorado"),
    new Colchon("Espuma De Alta Densidad", "1 plaza y media", 15000, "Cannon"),
    new Colchon("Resosrtes Continuos", "1 plaza y media", 18000, "Super Descanso"),
    new Colchon("Espuma De Alta Densidad", "2 plazas", 20000, "Cannon"),
    new Colchon("Resosrtes Continuos", "2 plazas", 24000, "Maxiking"),
    new Colchon("Espuma De Alta Densidad", "Queen", 25000, "Super Descanso"),
    new Colchon("Resosrtes Continuos", "Queen", 30000, "Super Descanso"),
    new Colchon("Espuma De Alta Densidad", "King", 30000, "Cannon"),
    new Colchon("Resosrtes Continuos", "King", 36000, "Maxiking")
];

// Obtener referencias a elementos del DOM
const medidaSelect = document.getElementById("medida");
const buscarBtn = document.getElementById("buscarBtn");
const colchonesList = document.getElementById("colchonesList");
const carritoList = document.getElementById("carritoList");
const totalElement = document.getElementById("total");

// Inicializar el carrito de compras
const carrito = [];

// Función para filtrar colchones por medida
function filtrarColchonesPorMedida(medida) {
    return colchones.filter(colchon => colchon.medida.toLowerCase() === medida);
}

// Función para mostrar colchones en el DOM
function mostrarColchonesEnDOM(colchonesMostrados) {
    colchonesList.innerHTML = ""; // Limpiar la lista antes de mostrar los colchones

    if (colchonesMostrados.length > 0) {
        colchonesMostrados.forEach(colchon => {
            const colchonDiv = document.createElement("div");
            colchonDiv.classList.add("colchon");

            const titulo = document.createElement("h2");
            titulo.textContent = colchon.tipo;

            const medida = document.createElement("p");
            medida.textContent = `Medida: ${colchon.medida}`;

            const precio = document.createElement("p");
            precio.textContent = `Precio: $${colchon.precio}`;

            const marca = document.createElement("p");
            marca.textContent = `Marca: ${colchon.marca}`;

            const agregarBtn = document.createElement("button");
            agregarBtn.textContent = "Agregar al Carrito";
            agregarBtn.addEventListener("click", () => agregarAlCarrito(colchon));

            colchonDiv.appendChild(titulo);
            colchonDiv.appendChild(medida);
            colchonDiv.appendChild(precio);
            colchonDiv.appendChild(marca);
            colchonDiv.appendChild(agregarBtn);

            colchonesList.appendChild(colchonDiv);
        });
    } else {
        colchonesList.textContent = "No se encontraron colchones con esa medida.";
    }
}

// Función para agregar un colchón al carrito
function agregarAlCarrito(colchon) {
    carrito.push(colchon);
    actualizarCarrito();
}

// Función para actualizar la lista del carrito en el DOM
function actualizarCarrito() {
    carritoList.innerHTML = ""; // Limpiar la lista antes de mostrar los productos

    let total = 0;

    carrito.forEach(colchon => {
        const colchonCarritoDiv = document.createElement("div");
        colchonCarritoDiv.classList.add("colchon-carrito");

        const titulo = document.createElement("p");
        titulo.textContent = colchon.tipo;

        const precio = document.createElement("p");
        precio.textContent = `$${colchon.precio}`;

        const quitarBtn = document.createElement("button");
        quitarBtn.textContent = "Quitar del Carrito";
        quitarBtn.addEventListener("click", () => quitarDelCarrito(colchon));

        colchonCarritoDiv.appendChild(titulo);
        colchonCarritoDiv.appendChild(precio);
        colchonCarritoDiv.appendChild(quitarBtn);

        carritoList.appendChild(colchonCarritoDiv);

        total += colchon.precio;
    });

    totalElement.textContent = `Total: $${total}`;
}

// Función para quitar un colchón del carrito
function quitarDelCarrito(colchon) {
    const index = carrito.indexOf(colchon);
    if (index !== -1) {
        carrito.splice(index, 1);
        actualizarCarrito();
    }
}

// Manejador de evento para el botón de búsqueda
buscarBtn.addEventListener("click", () => {
    const medidaSeleccionada = medidaSelect.value.toLowerCase();
    const colchonesFiltrados = filtrarColchonesPorMedida(medidaSeleccionada);
    mostrarColchonesEnDOM(colchonesFiltrados);
});

// Mostrar todos los colchones en el DOM al cargar la página
window.addEventListener("load", () => {
    mostrarColchonesEnDOM(colchones);
});