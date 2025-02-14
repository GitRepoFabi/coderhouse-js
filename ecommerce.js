let productos = [
    { "producto": "Televisión" },
    { "producto": "Celular" },
    { "producto": "Sillón" },
    { "producto": "Monitor" },
    { "producto": "Teclado" },
    { "producto": "Mouse" }
];

let carrito = [];

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
    } else {
        console.error("No tengo nada de '" + item + "' disponible a la compra.");
    }

}

function vender_producto(item) {

    // Busco el índice del producto a vender en el array
    //const index = carrito.findIndex(producto => producto.producto === item);
    const productoEncontrado = carrito.find(carrito => carrito === item);

    if (productoEncontrado) {
        carrito.splice(productoEncontrado,1);
        productos.push({"producto":`${item}`});        
        console.log("El item "+item+ " se ha vendido del carrito");
        mostrar_productos();
    } else {
        console.log("El item "+item+ " que usted escribió no se encuentra en el carrito. Carrito actual: " + carrito);
        
    }
}

// Función para mostrar los productos en el HTML
function mostrar_productos() {
    const productoDiv = document.getElementById('productos');
    productoDiv.innerHTML = ''; // Limpiar cualquier contenido previo

    // Crear la lista de productos
    const ul = document.createElement('ul');
    productos.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.producto;
        ul.appendChild(li);
    });

    productoDiv.appendChild(ul); // Agregar el listado al div
}

mostrar_productos();