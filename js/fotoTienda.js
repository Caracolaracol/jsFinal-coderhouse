const productosContainer = document.querySelector('.store-section__cards')
const btnBackTienda = document.querySelector('.store-section__back-btn')
const carrito = document.querySelector('.store-section__cart')

const cartItems = document.querySelector('.cart__products')
const cartTotal = document.querySelector('.cart__total')
// localStorage
let cart
if(JSON.parse(localStorage.getItem('cart'))) { // si existe la clave carrito en el storage
    cart = JSON.parse(localStorage.getItem('cart')) // asignar dicho valor en la variable carrito
} else { // si no existe
    localStorage.setItem('cart', JSON.stringify([])) // seteado el local storage
    cart = JSON.parse(localStorage.getItem('cart')) // a la variable carrito quiero que sea lo que setié en el localStorage
}

pedirProductos()
updateCart()
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
                <p>desde $${fotoProducto.precio[0].toLocaleString()}</p> <!-- toLocalString para que el numero salga con punto cuando es mil -->
                </div>
            </div>
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
                const form = document.querySelectorAll('.apart-section__select')
                let precioProducto
                let index = 0
                let length = form.length
                for(index; index < length; index++) {
                    form[index].addEventListener('click', function() {
                        const selectSize = document.getElementById('size')
                        const selectMarco = document.getElementById('marco')
                        const sectionPrice = document.querySelector('.apart-section__price')
                        let sizeUser = selectSize.value
                        let marcoUser = selectMarco.value
                        

                        // GET CORRECT INDEX FOR THE PRICE OF THE PRODUCT GIVEN A SIZE AND TYPE WITH A FOR CYCLE
                        let x = 0
                        for(x; x < 9; x++){
                            let a
                            let b = 0
                            if (x == 0 || x == 1 || x == 2) {
                                a = 0
                            } else if (x == 3 || x == 4 || x == 5){
                                a = 1
                            } else if (x == 6 || x == 7 || x == 8){
                                a = 2
                            }
                            if (x == 3 || x == 4 || x == 5) {
                                b = 3
                            } else if (x == 6 || x == 7 || x == 8) {
                                b = 6
                            }
                            console.log(x)
                            console.log(a)
                            console.log(b)
                            if (sizeUser == productoEncontrado.tamaño[a] && marcoUser == productoEncontrado.enmarcado[x - b]) {
                                precioProducto = productoEncontrado.precio[x]
                            }
                            
                        }
                        
                        sectionPrice.innerHTML = `
                            <h2 class="${productoEncontrado.id}">$${precioProducto}</h2>
                        `
                    })
                }
            })
        })
    }
}

// ADD TO CART
async function addToCart(id) {
    fetch('../json/fotoProductos.json').then(response => response.json()).then(async productos => {
        let arrayProducts = await productos
        if(cart.some((item) => item.id === id)) { // si el producto que quiero agregar ya existe en el carrito:
            const itemFound = arrayProducts.find((fotoProd) => fotoProd.id == id) // find para saber que producto le corresponde el id, osea que fotoProd.id sea igual a lo que dice el id del button
            
            // GET VALUE OF PROPERTY precioElegido
            const selectSize = document.getElementById('size')
            const selectMarco = document.getElementById('marco')
            let sizeUser = selectSize.value
            let marcoUser = selectMarco.value
            let precioFinalProducto
            if (sizeUser == itemFound.tamaño[0] && marcoUser == itemFound.enmarcado[0]) {
                precioFinalProducto = itemFound.precio[0]
            }
            if (sizeUser == itemFound.tamaño[0] && marcoUser == itemFound.enmarcado[1]) {
                precioFinalProducto = itemFound.precio[1]
            }
            if (sizeUser == itemFound.tamaño[0] && marcoUser == itemFound.enmarcado[2]) {
                precioFinalProducto = itemFound.precio[2]
            }
            if (sizeUser == itemFound.tamaño[1] && marcoUser == itemFound.enmarcado[0]) {
                precioFinalProducto = itemFound.precio[3]
            }
            if (sizeUser == itemFound.tamaño[1] && marcoUser == itemFound.enmarcado[1]) {
                precioFinalProducto = itemFound.precio[4]
            }
            if (sizeUser == itemFound.tamaño[1] && marcoUser == itemFound.enmarcado[2]) {
                precioFinalProducto = itemFound.precio[5]
            }
            if (sizeUser == itemFound.tamaño[2] && marcoUser == itemFound.enmarcado[0]) {
                precioFinalProducto = itemFound.precio[6]
            }
            if (sizeUser == itemFound.tamaño[2] && marcoUser == itemFound.enmarcado[1]) {
                precioFinalProducto = itemFound.precio[7]
            }
            if (sizeUser == itemFound.tamaño[2] && marcoUser == itemFound.enmarcado[2]) {
                precioFinalProducto = itemFound.precio[8]
            }
            const enCarrito = cart.find((fotoProd) => fotoProd.id == itemFound.id) //primer producto en el carrito que encuentra con el mismo id


            //
            const enCarritoMulti = cart.filter((fotoProd) => fotoProd.id == itemFound.id) // array de los productos con el mismo id, que ya están en el carrito
            console.log(enCarritoMulti)
            
            //
            console.log(enCarrito)
            const carritoFiltrado = cart.filter(fotoProd => fotoProd.id != enCarrito.id) // filtrado de productos para traer los productos que no están en el carrito.
            console.log(carritoFiltrado)

            //
            // TEST CODE, FUNCI´¿ONA MIERDAAA
            // si el precioElegido del producto que quiero agregar es distinto al precioElegido del mismo producto que ya está en el carrito entonces pushéalo como otro producto.
            if (precioFinalProducto !== enCarrito.precioElegido || sizeUser !== enCarrito.sizeChosen || marcoUser !== enCarrito.marcoChosen){
                cart.push({...itemFound, cantidad: 1, precioElegido: precioFinalProducto, sizeChosen: sizeUser, marcoChosen: marcoUser})
            } else {
                enCarritoMulti.splice(0,1) // quitar el producto al que a continuacion añadiré con su cantidad en +1
                cart = [...carritoFiltrado, ...enCarritoMulti, {...enCarrito, cantidad: enCarrito.cantidad + 1}] //agregar todos los productos(propiedad por propiedad) menos el que yo encontré en el carrito. agregar la cantidad que yo tenía en el carrito del producto +
                const {nombre, enStock} = itemFound
                console.log(`El producto ${nombre} tiene ${enStock} unidades en stock`)
            }
            //
            //
            //
        } else {
            const itemFound = arrayProducts.find((producto) => producto.id === id )

            // GET VALUE OF THE PROPERTY precioElegido BEFORE PUSHING PRODUCT TO THE CART
            const selectSize = document.getElementById('size')
            const selectMarco = document.getElementById('marco')
            let sizeUser = selectSize.value
            let marcoUser = selectMarco.value
            
            let precioFinalProducto
            if (sizeUser == itemFound.tamaño[0] && marcoUser == itemFound.enmarcado[0]) {
                precioFinalProducto = itemFound.precio[0]
            }
            if (sizeUser == itemFound.tamaño[0] && marcoUser == itemFound.enmarcado[1]) {
                precioFinalProducto = itemFound.precio[1]
            }
            if (sizeUser == itemFound.tamaño[0] && marcoUser == itemFound.enmarcado[2]) {
                precioFinalProducto = itemFound.precio[2]
            }
            if (sizeUser == itemFound.tamaño[1] && marcoUser == itemFound.enmarcado[0]) {
                precioFinalProducto = itemFound.precio[3]
            }
            if (sizeUser == itemFound.tamaño[1] && marcoUser == itemFound.enmarcado[1]) {
                precioFinalProducto = itemFound.precio[4]
            }
            if (sizeUser == itemFound.tamaño[1] && marcoUser == itemFound.enmarcado[2]) {
                precioFinalProducto = itemFound.precio[5]
            }
            if (sizeUser == itemFound.tamaño[2] && marcoUser == itemFound.enmarcado[0]) {
                precioFinalProducto = itemFound.precio[6]
            }
            if (sizeUser == itemFound.tamaño[2] && marcoUser == itemFound.enmarcado[1]) {
                precioFinalProducto = itemFound.precio[7]
            }
            if (sizeUser == itemFound.tamaño[2] && marcoUser == itemFound.enmarcado[2]) {
                precioFinalProducto = itemFound.precio[8]
            }
            console.log(precioFinalProducto)
            //
            cart.push({...itemFound, cantidad: 1, precioElegido: precioFinalProducto, sizeChosen: sizeUser, marcoChosen: marcoUser})
            const {nombre, enStock} = itemFound
            console.log(`El producto ${nombre} tiene ${enStock} unidades en stock`)
        }
        console.log(cart)
        
        
        updateCart()
        alertCompra()
        Toastify({
            text: "Producto agregado al carrito 🛒 ",
            duration: 3000,
            //destination: "https://github.com/apvarun/toastify-js",
            newWindow: false,
            close: false,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
            display: "inline-block",
            background: "linear-gradient(to top, rgba(5, 5, 5, 1.0), rgba(30, 18, 71, 0.7))",
            position: "fixed",
            padding: "12px 20px",
            transition: "all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1)",
            animation : "aparecer 250ms ease-in",
            left : "88%",
            zIndex : "99",
            borderRadius: "8px",
            backdropFilter: "blur(8.9px)"
            /* Created with https://www.css-gradient.com */
            },
            onClick: function(){} // Callback after click
        }).showToast();
        //contarProductos()
        })
}

//UPDATE CART
function updateCart(){
    showCartItems()
    localStorage.setItem('cart', JSON.stringify(cart)) //actualizar el localstorage
}

// MOSTRAR ITEMS AL GRID CARRITO

function showCartItems(){
    console.log(cart)
    cartItems.innerHTML = ` `
    if(cart.length == 0) {
        cartItems.innerHTML = `
        <div>
            <h1>No hay productos en el carrito</h1>
        </div>
    `
        cartTotal.innerHTML = ` `
    } else {    
        cartTotal.innerHTML = `
            <div id="c">
                <div id="c1">
                
                </div>
                <div id="c2">
                    
                </div>
                <div id="c3">
                    <h2>
                        Total:
                    </h2>
                </div>
                <div id="c4">
                    <h2>
                        $${totalCarrito().toLocaleString()}
                    </h2>
                </div>
                <div id="vaciar--carrito">
                    <button class="btn btn--vaciar--carrito">Vaciar carrito</button>
                </div>
                <div id="realizar--compra">
                    <button class="btn btn--realizar--compra">Realizar compra</button>
                </div>
            </div>
        `
        cart.forEach((item) => {
            if (item.cantidad == 0){
                cartItems.innerHTML = ` `
            } else {
                cartItems.innerHTML += `
                <div class="cart-item">
                    <div class="cart-item__image-box">
                        <img src="../images/${item.imagen}" class="imagen--carrito" alt="">
                    </div>
                    <div class="cart-item__name-box">
                        <h3 class="nombre--producto">${item.nombre} (${item.sizeChosen})</h3>
                    </div>
                    <div class="cart-item__quantity-box">
                        <p>${item.cantidad}</p>
                    </div>
                    <div class="cart-item__price-box">
                        <p>$${(item.precioElegido * item.cantidad).toLocaleString()}</p>
                    </div>
                    <div class="cart-item__remove">
                        <button class="btn btn--quitar--producto" onclick="removeItemFromCart(${item.id}, ${item.precioElegido})" >Quitar producto</button>
                    </div>
                </div>
                `
            }
            
        })
        const vaciarCarritoBtn = document.querySelector('.btn--vaciar--carrito')
        vaciarCarritoBtn.addEventListener('click', function(e){
            e.preventDefault
            borrarCarrito()
        })
    }
}

//BORRAR CARRITO
async function borrarCarrito(){
    fetch('../json/fotoProductos.json').then(response => response.json()).then(async productos => {
    let arrayProducts = await productos
    cart = cart.filter((item) => item.cantidad !== 0)
    for (const obj of arrayProducts) {
        if (obj.cantidad !== 0) {
            obj.cantidad = 0;
            break;
        }
    }
    
    for (const obj of cart) {
        if (obj.cantidad !== 0) {
            obj.cantidad = 0;
        }
    }

    cartTotal.innerHTML = ` `
    cartItems.innerHTML = `
        <div>
            <h1>No hay productos en el carrito</h1>
        </div>
    `
    })
    localStorage.removeItem('cart')
}

// REMOVE ITEM FROM CART
function removeItemFromCart(id, precio){
    cart = cart.filter( (item) => item.id !== id && item.precio !== precio) // filtrar el array quitando el producto con el id que quiero eliminar
    updateCart()
}

// GET TOTAL CART PRICE
function totalCarrito(){ // funcion para que de el total del carrito
    return cart.reduce((acumulador, fotoProd) => acumulador + fotoProd.precioElegido * fotoProd.cantidad, 0) //recurrer el producto. acumulador + el precio del producto multiplicado por la cantidad (la cantidad propiedad ya va a estar creada)
}

// BUY ALERT
function alertCompra() {
    const btnComprar = document.querySelector('.btn--realizar--compra')
    btnComprar.addEventListener('click', () => {
        Swal.fire({
            title: 'Compra realizada',
            text:'Gracias por su compra',
            confirmButtonText: 'Save',
            background: 'rgba(54, 36, 113, 0.8)'
            })
        borrarCarrito()
        //contarProductos()
    })
}