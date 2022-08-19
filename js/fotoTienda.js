const productosContainer = document.querySelector('.store-section__cards')
const btnBackTienda = document.querySelector('.store-section__back-btn')
pedirProductos()

btnBackTienda.addEventListener('click', function(){
    const apartSection = document.querySelector('.apart-section')
    const cardsSection = document.querySelector('.store-section__cards')
    btnBackTienda.style.display = 'none'
    apartSection.style.display = 'none'
    cardsSection.style.display = 'flex'
    pedirProductos()
})


function pedirProductos(){
    fetch('../json/fotoProductos.json').then(response => response.json())
.then(productos => {
    showProducts(productos)
    showProduct()
})
}

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

async function showProduct (){
    const btnVerProducto = document.querySelectorAll('.store-section__card')
    const apartSection = document.querySelector('.apart-section')
    const cardsSection = document.querySelector('.store-section__cards')
    
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
                            <form>
                                <label for="size">Seleccione el tamaño</label>
                                <select class="apart-section__select" name="size" id="">
                                    <option value="30x40cm">${productoEncontrado.tamaño[0]}</option>
                                    <option value="30x40cm">${productoEncontrado.tamaño[1]}</option>
                                    <option value="30x40cm">${productoEncontrado.tamaño[2]}</option>
                                </select>

                                <label for="marco">y el tipo de marco</label>
                                <select class="apart-section__select" name="marco" id="">
                                    <option value="30x40cm">${productoEncontrado.enmarcado[0]}</option>
                                    <option value="30x40cm">${productoEncontrado.enmarcado[1]}</option>
                                    <option value="30x40cm">${productoEncontrado.enmarcado[2]}</option>
                                </select>

                                <div class="apart-section__onclick">
                                    <button class="btn apart-section__btn-add" type="button">Agregar al carrito</button>
                                </div>
                            </form>
                            <div class="apart-section__price">
                                <h2>$20000</h2>
                            </div>
                            
                        </div>
                    </div>
                `
            })
        })
    }
    
}





