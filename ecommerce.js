let productos = [
    { "producto": "Televisión" },
    { "producto": "Celular" },
    { "producto": "Sillón" },
    { "producto": "Monitor" },
    { "producto": "Teclado" },
    { "producto": "Mouse" }
];

let carrito = [];


if (localStorage.getItem("carrito")){
    
    //Recupero los valores del carrito
    carrito = JSON.parse(localStorage.getItem("carrito"));

    //Muestro el carrito si tengo algo en el LocalStorage
    mostrarCarrito();
}

/// Funciones básicas //

//Función onlick botón "Comprar Producto"
function comprar_prompt() {
    const productoPromp = prompt("¿Qué producto desea comprar?");
    if (productoPromp !== null) {
        comprar_producto(productoPromp);
    } else {
        console.log("Usted presionó la tecla ESC");
    }
}

//Función onlick botón "Vender Producto"
function vender_prompt(){
    const productoPromp = prompt("¿Qué producto desea vender?");

    if (productoPromp !== null){
        vender_producto(productoPromp);
    } else {
        console.log("Usted presionó la tecla ESC"); 
    }
    
}

//Función onlick botón "Mi Carrito"
function mi_carrito(){
    if (carrito.length !== 0){
        console.log("Carrito actual: ");

        for (let indice=0; indice < carrito.length;indice++){
            console.log(carrito[indice]);
        }
    } else {
        console.log("El carrito esta vacío");
    }   
}

function comprar_producto(item) {

    const productoEncontrado = productos.find(producto => producto.producto === item);
    if (productoEncontrado) {

        //Agrego el item al carrito
        carrito.push(item);
        console.log("El item "+item+ " se ha agregado al carrito");

        // Busco el índice del producto en el array
        const index = productos.findIndex(producto => producto.producto === item);

        // Eliminamos el elemento del array de productos y refrescamos la visual con lo nuevo
        productos.splice(index, 1);
        mostrar_productos();    

        // Guardar el carrito en localStorage
        guardarCarrito();  
        
        //Muestro actualizado el carrito
        mostrarCarrito();    
    } else {
        console.error("No tengo nada de '" + item + "' disponible a la compra.");
    }

}

function vender_producto(item) {
    // Encuentra el índice del producto a eliminar
    const index = carrito.indexOf(item);

    if (index !== -1) {
        //Elimino del carrito el item que quiero vender para que esté disponible nuevamente
        carrito.splice(index, 1);

        //Añadimos el producto de vuelta a los productos disponibles
        productos.push({"producto": item});        

        //Actualiza el localStorage
        guardarCarrito();

        //Muestro los productos
        mostrar_productos();
        
        // Muestra el carrito actualizado
        mostrarCarrito();
    } else {
        console.log("El item '" + item + "' no se encuentra en el carrito.");
    }
}

// Función para mostrar los productos en el HTML
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

    productoDiv.appendChild(ul); // Agregar el listado al div
}

mostrar_productos();

// Función para guardar el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para mostrar los productos del carrito agregados al localStorage
function mostrarCarrito() {
    //Traigo los elementos del localStorage
    let carritoGuardado = JSON.parse(localStorage.getItem("carrito"));

    //Obtengo el div donde vamos a mostrar los productos
    const inventarioDiv = document.getElementById('inventario');

    // Limpio el contenido previamente
    inventarioDiv.innerHTML = ''; 

    // Crear la lista de productos
    const ul = document.createElement('ul');
    carritoGuardado.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
    });

    // Agregar la lista de productos al div 'inventario'
    inventarioDiv.appendChild(ul);
}