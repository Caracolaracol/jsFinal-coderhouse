const productosContainer = document.querySelector('.store-section__cards')
const btnBackTienda = document.querySelector('.store-section__back-btn')
const carrito = document.querySelector('.store-section__cart')

// localStorage
let cart
if(JSON.parse(localStorage.getItem('cart'))) { // si existe la clave carrito en el storage
    cart = JSON.parse(localStorage.getItem('cart')) // asignar dicho valor en la variable carrito
} else { // si no existe
    localStorage.setItem('cart', JSON.stringify([])) // seteado el local storage
    cart = JSON.parse(localStorage.getItem('cart')) // a la variable carrito quiero que sea lo que setié en el localStorage
}

pedirProductos()

// GO BACK TO THE STORE
btnBackTienda.addEventListener('click', function(){
    const apartSection = document.querySelector('.apart-section')
    const cardsSection = document.querySelector('.store-section__cards')
    btnBackTienda.style.display = 'none'
    apartSection.style.display = 'none'
    cardsSection.style.display = 'flex'
    productSections.style.display = 'block'
    verCarritoBtn.style.display = 'block'
    carrito.style.display = 'none'
})

// SHOW CART
const verCarritoBtn = document.querySelector('#store-section__cart-btn')
const productSections = document.querySelector('.store-section__products')
verCarritoBtn.addEventListener('click', function(){
    verCarritoBtn.style.display = 'none'
    carrito.style.display = 'flex'
    carrito.style.flexDirection = 'column'
    productSections.style.display = 'none'
    btnBackTienda.style.display = 'block'
    //

})

// FETCH FOTOPRODUCTOS
function pedirProductos(){
    fetch('../json/fotoProductos.json').then(response => response.json())
.then(productos => {
    showProducts(productos)
    showProduct()
})
}

// FUNCTION FOR SHOW PRODUCTS
function showProducts(productos) {
    productos.forEach((fotoProducto) => {
        productosContainer.innerHTML += `
        <div class="store-section__card" id="${fotoProducto.id}">
            <div class="store-section__image-container">
                <img src="../images/${fotoProducto.imagen}" class="store-section__image">
            </div>
            <div class="store-section__body-card">
                <div>
                    <h3 class="store-section__name">${fotoProducto.nombre}</h3>
                </div>
                <div>
                <!-- <p> Tamaños: ${fotoProducto.tamaño}  </p> -->
                <!-- <p>${fotoProducto.stock} disponibles </p> -->
                <p>desde $${fotoProducto.precio[0].toLocaleString()}</p> <!-- toLocalString para que el numero salga con punto cuando es mil -->
                </div>
            </div>
            
            <!-- BTN AÑADIR AL CARRITO
            <div class="btn--container" onclick="addToCart(${fotoProducto.id})">
                <button class="btn" type="button">Agregar al carrito</button>
            </div>
            -->
        </div>
        ` 
    })
    
}


// FUNCTION FOR SHOW PRODUCT AT THE APART SECTION
async function showProduct (){
    const btnVerProducto = document.querySelectorAll('.store-section__card')
    const apartSection = document.querySelector('.apart-section')
    const cardsSection = document.querySelector('.store-section__cards')
    carrito.style.display = 'none'
    let i = 0
    let length = btnVerProducto.length
    for(i; i < length; i++) {
        btnVerProducto[i].addEventListener('click', function(){
            apartSection.style.display = 'block'
            cardsSection.style.display = 'none'
            btnBackTienda.style.display = 'block'
            fetch('../json/fotoProductos.json').then(response => response.json()).then(async productos => {
                let productoEncontrado = await productos.find((fotoProd) => fotoProd.id == this.id)
                apartSection.innerHTML = `
                    <div class="apart-section__card">
                        <div class="apart-section__container-image">
                            <img class="apart-section__image" src="../images/${productoEncontrado.imagen}" alt="">
                        </div>
                        <div class="apart-section__container-data">
                            <div class="apart-section__title">
                                <h1>${productoEncontrado.nombre}</h1>
                            </div>
                            <div class="apart-section__data">
                                <p class="apart-section__description">${productoEncontrado.descripcion}</p>
                            </div>
                            <form id="form">
                                <label for="size">Seleccione el tamaño</label>
                                <select class="apart-section__select" name="size" id="size">
                                    <option value="${productoEncontrado.tamaño[0]}">${productoEncontrado.tamaño[0]}</option>
                                    <option value="${productoEncontrado.tamaño[1]}">${productoEncontrado.tamaño[1]}</option>
                                    <option value="${productoEncontrado.tamaño[2]}">${productoEncontrado.tamaño[2]}</option>
                                </select>
                                <label for="marco">y el tipo de marco</label>
                                <select class="apart-section__select" name="marco" id="marco">
                                    <option value="${productoEncontrado.enmarcado[0]}">${productoEncontrado.enmarcado[0]}</option>
                                    <option value="${productoEncontrado.enmarcado[1]}">${productoEncontrado.enmarcado[1]}</option>
                                    <option value="${productoEncontrado.enmarcado[2]}">${productoEncontrado.enmarcado[2]}</option>
                                </select>
                                <div>
                                    <h2>
                                    Precio total:
                                    </h2>
                                </div>
                                <div class="apart-section__price">
                                    <h2 id="price">$${productoEncontrado.precio[0]}</h2>
                                </div>
                                <div class="apart-section__onclick">
                                    <button class="btn apart-section__btn-add" type="button" onclick="addToCart(${productoEncontrado.id})">Agregar al carrito</button>
                                </div>
                            </form>
                        </div>
                    </div>
                `

                // SHOW PRODUCT PRICE
                const form = document.getElementById('form')
                let precioProducto
                form.addEventListener('click', function() {
                    const selectSize = document.getElementById('size')
                    const selectMarco = document.getElementById('marco')
                    const sectionPrice = document.querySelector('.apart-section__price')
                    let sizeUser = selectSize.value
                    let marcoUser = selectMarco.value
                    if (sizeUser == productoEncontrado.tamaño[0] && marcoUser == productoEncontrado.enmarcado[0]) {
                        precioProducto = productoEncontrado.precio[0]
                    }
                    if (sizeUser == productoEncontrado.tamaño[0] && marcoUser == productoEncontrado.enmarcado[1]) {
                        precioProducto = productoEncontrado.precio[1]
                    }
                    if (sizeUser == productoEncontrado.tamaño[0] && marcoUser == productoEncontrado.enmarcado[2]) {
                        precioProducto = productoEncontrado.precio[2]
                    }
                    if (sizeUser == productoEncontrado.tamaño[1] && marcoUser == productoEncontrado.enmarcado[0]) {
                        precioProducto = productoEncontrado.precio[3]
                    }
                    if (sizeUser == productoEncontrado.tamaño[1] && marcoUser == productoEncontrado.enmarcado[1]) {
                        precioProducto = productoEncontrado.precio[4]
                    }
                    if (sizeUser == productoEncontrado.tamaño[1] && marcoUser == productoEncontrado.enmarcado[2]) {
                        precioProducto = productoEncontrado.precio[5]
                    }
                    if (sizeUser == productoEncontrado.tamaño[2] && marcoUser == productoEncontrado.enmarcado[0]) {
                        precioProducto = productoEncontrado.precio[6]
                    }
                    if (sizeUser == productoEncontrado.tamaño[2] && marcoUser == productoEncontrado.enmarcado[1]) {
                        precioProducto = productoEncontrado.precio[7]
                    }
                    if (sizeUser == productoEncontrado.tamaño[2] && marcoUser == productoEncontrado.enmarcado[2]) {
                        precioProducto = productoEncontrado.precio[8]
                    }
                    
                    sectionPrice.innerHTML = `
                    <h2>$${precioProducto}</h2>
                    `
                })
                
            })
        })
    }
}

// ADD TO CART
async function addToCart(id) {
    fetch('../json/fotoProductos.json').then(response => response.json()).then(async productos => {
        let arrayProducts = await productos
    if(cart.some((item) => item.id === id)) { // si el producto que quiero agregar ya existe en el carrito:
        const itemFound = arrayProducts.find((fotoProd) => fotoProd.id == id) // find para saber que producto le corresponde el id, osea que fotoProd.id sea igual a lo que dice idBoton
        const enCarrito = cart.find((fotoProd) => fotoProd.id == itemFound.id)
        const carritoFiltrado = cart.filter(fotoProd => fotoProd.id != enCarrito.id) // filtrado de productos para traer los productos que no están en el carrito.
        cart = [...carritoFiltrado, {...enCarrito, cantidad: enCarrito.cantidad + 1}] //agregar todos los productos(propiedad por propiedad) menos el que yo encontré en el carrito. agregar la cantidad que yo tenía en el carrito del producto +
        const {nombre, enStock} = itemFound
        console.log(`El producto ${nombre} tiene ${enStock} unidades en stock`)
    } else {
        const itemFound = arrayProducts.find((producto) => producto.id === id )
        cart.push({...itemFound, cantidad: 1})
        const {nombre, enStock} = itemFound
        console.log(`El producto ${nombre} tiene ${enStock} unidades en stock`)
    }
    updateCart()
    //contarProductos()
    })
}

//UPDATE CART
function updateCart(){
    //showCartItems()
    localStorage.setItem('cart', JSON.stringify(cart)) //actualizar el localstorage
    /* const vaciarCarrito = document.querySelector('.btn--vaciar--carrito')
    vaciarCarrito.addEventListener('click', function(e){
        e.preventDefault
        contador = 0
        contadorProductos.innerHTML = `
                <p>${contador}</p>
                `
        borrarCarrito()
        contarProductos()
    }) */
}

// MOSTRAR ITEMS AL GRID CARRITO
const cartItems = document.querySelector('.cart__products')
function showCartItems(){
    cart.forEach((item) => {
        cartItems.innerHTML += `
            <div class="cart-item">
                <div class="cart-item__image-box">
                    <img src=${item.imagen} class="imagen--carrito" alt="">
                </div>
                <div class="cart-item__name-box">
                    <h3 class="nombre--producto">${item.nombre}</h3>
                </div>
                <div class="cart-item__quantity-box">
                    <p>${item.cantidad}</p>
                </div>
                <div class="cart-item__price-box">
                    <p>$${(item.precio * item.cantidad).toLocaleString()}</p>
                </div>
                <div class="cart-item__remove">
                    <button class="btn--quitar--producto" onclick="removeItemFromCart(${item.id})" >Quitar producto</button>
                </div>
            </div>
            `
})
}