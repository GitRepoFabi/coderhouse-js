let productos = [];  // Aquí almacenaremos los productos cargados del archivo JSON
let carrito = [];

// Cargamos los productos desde el archivo JSON
async function cargar_productos_desde_json() {
    try {
        const resultado = await fetch("db/productos.json");
        const datos = await resultado.json();
        productos = datos; // Guardamos los productos en la variable global
        mostrar_productos(); // Muestro los productos traidos desde el JSON
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
}

//Llamo a la función para cargar los productos desde el JSON
cargar_productos_desde_json();

//Código que selecciona los productos y por cada click que se haga al elemento llama a la función "comprar_producto" 
//para comprar dicho producto pasándole como parámetro el nombre del producto.
const producto_click = document.querySelectorAll("#productos");
producto_click.forEach((pr) => {
    pr.addEventListener("click", (evet) => {
        comprar_producto(event.target.textContent);
    })
});

//Código que selecciona los productos y por cada click que se haga al elemento llama a la función "vender_producto" 
//para vender dicho producto pasándole como parámetro el nombre del producto .
const producto_a_vender = document.querySelectorAll("#inventario");
producto_a_vender.forEach((pr) => {
    pr.addEventListener("click", (evet) => {
        vender_producto(event.target.textContent);
    })
});

// Recargar el carrito desde localStorage
if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    mostrarCarrito(); // Mostrar el carrito si ya hay productos
}

function comprar_producto(item) {
    const productoEncontrado = productos.find(producto => producto.producto === item);
    if (productoEncontrado) {
        carrito.push(item);
        Toastify({
            text: "¡Has comprado " + item + "!",
            duration: 3000
        }).showToast();

        const index = productos.findIndex(producto => producto.producto === item);
        productos.splice(index, 1);
        mostrar_productos();

        guardarCarrito();
        mostrarCarrito();
    }
}

function vender_producto(item) {
    const index = carrito.indexOf(item);

    if (index !== -1) {
        carrito.splice(index, 1);
        productos.push({ "producto": item });

        Toastify({
            //text: "¡El item " + item + " se ha vendido!",
            text: "¡Se ha vendido " + item + "!",
            duration: 3000
        }).showToast();

        guardarCarrito();
        mostrar_productos();
        mostrarCarrito();
    }
}

function mostrar_productos() {
    const productoDiv = document.getElementById('productos');
    productoDiv.innerHTML = ''; // Limpiar cualquier contenido previo

    // Filtrar los productos que no están en el carrito
    const productosDisponibles = productos.filter(item => !carrito.includes(item.producto));

    // Crear la lista de productos
    const ul = document.createElement('ul');
    productosDisponibles.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.producto;
        ul.appendChild(li);
    });

    productoDiv.appendChild(ul);
}

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarCarrito() {
    let carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
    const inventarioDiv = document.getElementById('inventario');
    inventarioDiv.innerHTML = '';

    const ul = document.createElement('ul');
    carritoGuardado.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
    });

    inventarioDiv.appendChild(ul);
}