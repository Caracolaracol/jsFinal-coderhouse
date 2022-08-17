const productosContainer = document.querySelector('.store-section__cards')
fetch('../json/fotoProductos.json').then(response => response.json())
.then(productos => {
    showProducts(productos)
})


function showProducts(productos) {
    productos.forEach((fotoProducto) => {
        productosContainer.innerHTML += `
        <div class="store-section__card" id="${fotoProducto.id}">
            <div class="store-section__image-container">
                <img src="../images/${fotoProducto.imagen}" class="store-section__image">
            </div>
            <div>
                <h3>
                ${fotoProducto.nombre}
                </h3>
            </div>
            <div>
                <!-- <p> Tamaños: ${fotoProducto.tamaño}  </p> -->
                <!-- <p>${fotoProducto.stock} disponibles </p> -->
                <p>desde $${fotoProducto.precio.toLocaleString()}</p> <!-- toLocalString para que el numero salga con punto cuando es mil -->
            </div>
            <!-- BTN AÑADIR AL CARRITO
            <div class="btn--container" onclick="addToCart(${fotoProducto.id})">
                <button class="btn" type="button">Agregar al carrito</button>
            </div>
            -->
        </div>
        ` 
    })
    showProduct()
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
            console.log(this.id)
            let productoEncontrado
            fetch('../json/fotoProductos.json').then(response => response.json()).then(async productos => {
                console.log(productos)
                productoEncontrado = await productos.find((fotoProd) => fotoProd.id == this.id)
                console.log(productoEncontrado.nombre)
                apartSection.innerHTML = `
                    <div class="apart-section__card">
                        <div class="apart-section__container-image">
                            <img class="apart-section__image" src="../images/print1.jpg" alt="">
                        </div>
                        <div class="apart-section__container-data">
                            <div class="apart-section__title">
                                <h1>${productoEncontrado.nombre}</h1>
                            </div>
                            <div class="apart-section__data">
                                <p class="apart-section__description">Chinita bailando cha cha chá sobre una amatista morada.</p>
                            </div>
                            <form>
                                <label for="size">Seleccione el tamaño</label>
                                <select name="size" id="">
                                    <option value="30x40cm">30x40cm</option>
                                    <option value="30x40cm">40x60cm</option>
                                    <option value="30x40cm">50x60cm</option>
                                </select>
                            </form>
                            <div class="apart-section__price">
                                <h2>$20000</h2>
                            </div>
                            <div class="apart-section__onclick">
                                <button class="apart-section__btn-add" type="submit">Agregar al carrito</button>
                            </div>
                        </div>
                    </div>
                `
            })
        })
    }
}





