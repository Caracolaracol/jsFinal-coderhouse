const productosContainer = document.querySelector('.store-section__cards')
fetch('../json/fotoProductos.json').then(response => response.json())
.then(productos => {
    inner(productos)
})
function inner(productos) {
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
}



const btnVerProducto = document.querySelectorAll('.store-section__card')
const apartSection = document.querySelector('.apart-section')
const cardsSection = document.querySelector('.store-section__cards')
btnVerProducto.addEventListener('click', function(){
    apartSection.style.display = 'block'
    cardsSection.style.display = 'none'
    
})