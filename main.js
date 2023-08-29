//Crear Constructor 
class Colchon {
    constructor(id, tipo, medida, precio, marca) {
        this.id = id;
        this.tipo = tipo;
        this.medida = medida;
        this.precio = precio;
        this.marca = marca;
    }
}

// Crear un array de objetos Colchon
const colchones = [
    new Colchon(1, "Espuma De Alta Densidad", "1 plaza", 10000, "Cannon"),
    new Colchon(2, "Resosrtes Continuos", "1 plaza", 12000, "Maxiking"),
    new Colchon(3, "Resosrtes Continuos", "1 plaza", 188000, "Super Descanso"),
    new Colchon(4, "Espuma De Alta Densidad", "1 plaza", 120600, "Elegante"),
    new Colchon(5, "Espuma De Alta Densidad", "1 plaza y media", 15200, "Sueño Dorado"),
    new Colchon(6, "Espuma De Alta Densidad", "1 plaza y media", 150000, "Maxiking"),
    new Colchon(7, "Espuma De Alta Densidad", "1 plaza y media", 207000, "Elegante"),
    new Colchon(8, "Espuma De Alta Densidad", "1 plaza y media", 81000, "Cannon"),
    new Colchon(9, "Resosrtes Continuos", "1 plaza y media", 18000, "Super Descanso"),
    new Colchon(10, "Espuma De Alta Densidad", "2 plazas", 70000, "Maxiking"),
    new Colchon(11, "Espuma De Alta Densidad", "2 plazas", 112000, "Elegante"),
    new Colchon(12, "Espuma De Alta Densidad", "2 plazas", 200000, "Sueño Dorado"),
    new Colchon(13, "Resosrtes Continuos", "2 plazas", 240000, "Super Descanso"),
    new Colchon(14, "Espuma De Alta Densidad", "Queen", 350000, "Super Descanso"),
    new Colchon(15, "Espuma De Alta Densidad", "Queen", 450000, "Sueño Dorado"),
    new Colchon(16, "Espuma De Alta Densidad", "Queen", 650000, "Cannon"),
    new Colchon(17, "Resosrtes Continuos", "Queen", 380000, "Elegante"),
    new Colchon(18, "Espuma De Alta Densidad", "King", 500000, "Cannon"),
    new Colchon(19,"Resosrtes Continuos","King" ,536000,"Maxiking" ),
    new Colchon(20,"Resosrtes Continuos","King" ,836000,"Super Descanso" ),
    new Colchon(21,"Resosrtes Continuos","King" ,636000,"Elegante" ),
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
    if (medida === "todas") {
        return colchones;
    } else {
        return colchones.filter(colchon => colchon.medida.toLowerCase() === medida);
    }
}
// Función para mostrar colchones en el DOM
function mostrarColchonesEnDOM(colchonesMostrados) {
    colchonesList.innerHTML = ""; // Limpiar la lista antes de mostrar los colchones

    if (colchonesMostrados.length > 0) {
        colchonesMostrados.forEach(colchon => {
            const colchonDiv = document.createElement("div");
            colchonDiv.classList.add("colchon");

            const titulo = document.createElement("p");
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

// Función para actualizar el carrito con los precios según los artículos que agregue
function actualizarCarrito() {
    carritoList.innerHTML = ""; // Limpiar la lista antes de mostrar los productos
    let total = 0;
    
    // Crear un objeto para contar la cantidad de cada producto en el carrito
    const cantidadProductos = {};
    carrito.forEach(colchon => {
        if (cantidadProductos[colchon.id]) {
            cantidadProductos[colchon.id]++;
        } else {
            cantidadProductos[colchon.id] = 1;
        }
    });
    
    // Mostrar cada producto en el carrito con su cantidad y precio
    Object.keys(cantidadProductos).forEach(id => {
        const colchon = colchones.find(colchon => colchon.id === parseInt(id));
        
        const colchonCarritoDiv = document.createElement("div");
        colchonCarritoDiv.classList.add("colchon-carrito");

        const titulo = document.createElement("p");
        titulo.textContent = colchon.tipo;

        const cantidad = document.createElement("p");
        cantidad.textContent = `Cantidad: ${cantidadProductos[id]}`;

        const precio = document.createElement("p");
        precio.textContent = `$${colchon.precio}`;

        const aumentarBtn = document.createElement("button");
        aumentarBtn.textContent = "+";
        aumentarBtn.addEventListener("click", () => {
            agregarAlCarrito(colchon);
        });

        const disminuirBtn = document.createElement("button");
        disminuirBtn.textContent = "-";
        disminuirBtn.addEventListener("click", () => {
            quitarDelCarrito(colchon);
        });

        colchonCarritoDiv.appendChild(titulo);
        colchonCarritoDiv.appendChild(cantidad);
        colchonCarritoDiv.appendChild(precio);
        colchonCarritoDiv.appendChild(aumentarBtn);
        colchonCarritoDiv.appendChild(disminuirBtn);

        carritoList.appendChild(colchonCarritoDiv);

        total += colchon.precio * cantidadProductos[id];
    });
    
    localStorage.setItem("carrito", JSON.stringify(carrito));

    totalElement.textContent = `Total: $${total}`;
    
    // Mostrar u ocultar el botón de finalizar compra según si hay productos en el carrito
    if (carrito.length > 0) {
        finalizarBtn.style.display = "block";
    } else {
        finalizarBtn.style.display = "none";
    }
}

// Función para agregar un colchón al carrito
function agregarAlCarrito(colchon) {
    carrito.push(colchon);
    actualizarCarrito();
}

// Función para quitar un colchón del carrito
function quitarDelCarrito(colchon) {
    const index = carrito.findIndex(item => item.id === colchon.id);
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

// Recuperar el carrito de localStorage al cargar la página
window.addEventListener("load", () => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito.push(...JSON.parse(carritoGuardado));
        actualizarCarrito();
    }
});
// Obtener referencia al botón de finalizar compra
const finalizarBtn = document.getElementById("finalizarBtn");

// Manejador de evento para el botón de finalizar compra
finalizarBtn.addEventListener("click", () => {
    alert("¡Muchas gracias por tu compra!");
    carrito.length = 0; // Vaciar el carrito
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Guardar el carrito vacío en el almacenamiento local
    location.reload();
});