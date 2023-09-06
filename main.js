// Clase para representar un colchón
class Colchon {
    constructor(id, tipo, medida, precio, marca, imagen) {
        this.id = id;
        this.tipo = tipo;
        this.medida = medida;
        this.precio = precio;
        this.marca = marca;
        this.imagen = imagen; // Ruta de la imagen del colchón
    }
}

let colchones = []; // Array que almacenará los colchones cargados desde el JSON

window.addEventListener('load', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            colchones = data; // Cargar los colchones desde el JSON
            mostrarColchonesEnDOM(colchones);
        })
        .catch(error => console.error('Error cargando data.json', error));
});

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

            const imagen = document.createElement("img"); // Agregar la imagen
            imagen.src = colchon.imagen; // Ruta de la imagen
            imagen.alt = colchon.tipo; // Texto alternativo para la imagen

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

            colchonDiv.appendChild(imagen); // Agregar la imagen al div del colchón
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

// Función para actualizar el carrito con los precios según los artículos que se agregaron
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
// Utilizo Sweet Alert2 para mostrar una alerta de "Gracias por su compra"
finalizarBtn.addEventListener("click", () => {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: '¡Muchas Gracias Por Su Compra!',
        showConfirmButton: false,
        timer: 2500
    });

    carrito.length = 0; // Vaciar el carrito
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Guardar el carrito vacío en el almacenamiento local
    setTimeout(() => {
        location.reload(); // Recargar la página después de 1 segundo más que la alerta
    }, 2501);
});
