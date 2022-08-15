const productosContainer = document.querySelector('.store-section__cards')
fetch('../json/fotoProductos.json').then(response => response.json())
.then(productos => {
    inner(productos)
})
function inner(productos) {
    productos.forEach((fotoProducto) => {
        productosContainer.innerHTML += `
        <div class="store-section__card">
            <div>
                <img src="../images/${fotoProducto.imagen}" class="fotos--tienda">
            </div>
            <div>
                <h3>
                ${fotoProducto.nombre}
                </h3>
            </div>
            
            <div>
                <p>
                ${fotoProducto.descripcion}
                </p>
            </div>
            <div>
                <!-- <p> Tamaños: ${fotoProducto.tamaño}  </p> -->
                <!-- <p>${fotoProducto.stock} disponibles </p> -->
                <p>$${fotoProducto.precio.toLocaleString()}</p> <!-- toLocalString para que el numero salga con punto cuando es mil -->
            </div>
            
            <div class="btn--container" <!-- onclick="addToCart(${fotoProducto.id}) -->">
                <button class="btn" type="button">Agregar al carrito</button>
            </div>
        </div>
        ` 
    })
}