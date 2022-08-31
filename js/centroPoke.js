/*
Script del centro pokemon privatizado, juego simulador de centro pokemon privatizado ( osea te cobra!), el usuario debe recordar los ID de paciente de sus pokemon para retirarlos.
*/
let select1 = document.getElementById('select__Poke1')
let select2 = document.getElementById('select__Poke2')
let select3 = document.getElementById('select__Poke3')
let select4 = document.getElementById('select__Poke4')
let select5 = document.getElementById('select__Poke5')
let select6 = document.getElementById('select__Poke6')
let pPoke = document.querySelector('#div-btn-poke')
// traer los datos de la api de pokemon a los select del formulario del html
fetch("https://pokeapi.co/api/v2/pokemon?limit=150&offset=0") // api de los primeros 150 pokemon
.then(response => response.json())
.then(data => {
    let arrayPkm = data.results // pido sólo lo que contiene la propiedad results(el array con los 150 pokemon)
    arrayPkm.forEach(poke => {
        select1.innerHTML += `
        <option value="${poke.name}">${poke.name}</option>
    `
        select2.innerHTML += `
        <option value="${poke.name}">${poke.name}</option>
    `
        select3.innerHTML += `
        <option value="${poke.name}">${poke.name}</option>
    `
        select4.innerHTML += `
        <option value="${poke.name}">${poke.name}</option>
    `
        select5.innerHTML += `
        <option value="${poke.name}">${poke.name}</option>
    `
        select6.innerHTML += `
        <option value="${poke.name}">${poke.name}</option>
    `
    });
    
})
//Arrays vacios
let ids = []
let pokemones = []
//variables vacias creadas
let numero
let hp1, hp2, hp3, hp4, hp5, hp6
let nombre1, nombre2, nombre3, nombre4, nombre5, nombre6
let nivel1, nivel2, nivel3, nivel4, nivel5, nivel6
let posicion1, posicion2, posicion3, posicion4, posicion5, posicion6
let id1, id2, id3, id4, id5, id6
let idABuscar1, idABuscar2, idABuscar3, idABuscar4, idABuscar5, idABuscar6
let pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6
let repetir = true
let validador = false
let validadorMostrarFormPoke = false
let validadorId = false
let final = document.querySelector('#div-final')
let idEncontrado1, idEncontrado2, idEncontrado3, idEncontrado4, idEncontrado5, idEncontrado6
//contenedor de las cards de cada pokemon en el html
let container1 = document.querySelector('.card--1')
let container2 = document.querySelector('.card--2')
let container3 = document.querySelector('.card--3')
let container4 = document.querySelector('.card--4')
let container5 = document.querySelector('.card--5')
let container6 = document.querySelector('.card--6')

// clase pokemon
class Pokemon {
    constructor(nombre, nivel, posicion, id){
        this.nombre = nombre
        this.nivel = nivel
        this.posicion = posicion
        this.id = id
    }
}

//uso de innerHTML
let nombreUsuario
let divNombre = document.querySelector('#nombre--usuario')
const formName = document.querySelector('#form--name')
const mainSubtitle = document.querySelector('.main-subtitle')
const mainDiv = document.querySelector('#main-div')

formName.addEventListener('submit', function(e){
    e.preventDefault()
    mostrarOcultar()
})

function mostrarOcultar() {
    nombreUsuario = document.querySelector('#ask--name').value
    formName.style.display = 'none'
    mainSubtitle.style.display = 'flex'
    mainDiv.style.display = 'grid'
    divNombre.innerHTML = `<h3> Hola <i>${nombreUsuario}</i> como estas? soy la enfermera Joy!, Bienvenidx al centro pokemon.</h3>`
}


let divThx = document.querySelector('#div--gracias')
let btnCurar = document.querySelector('.btn--curar')
// Boton para iniciar simulador
btnCurar.addEventListener('click', function(){
    pPoke.style.display = 'block';
    btnCurar.style.display = 'none'
})

//click y aparecerá el div input--hidden
const formHidden = document.querySelector('#input--hidden')
document.querySelector('.btn--poke').addEventListener('click', (event) => {
    event.preventDefault()
    formHidden.style.display = 'block';
})


const form = document.querySelector('#form--poke')
const formNombrar = document.querySelector('#form--nombrar')
// mostrar input para los pokemon del usuario
const mostrarInputPoke1 = document.querySelectorAll('.input--poke1')
const mostrarInputPoke2 = document.querySelectorAll('.input--poke2')
const mostrarInputPoke3 = document.querySelectorAll('.input--poke3')
const mostrarInputPoke4 = document.querySelectorAll('.input--poke4')
const mostrarInputPoke5 = document.querySelectorAll('.input--poke5')
const mostrarInputPoke6 = document.querySelectorAll('.input--poke6')
const mostrarInputId1 = document.querySelectorAll('.input3--poke1')
const mostrarInputId2 = document.querySelectorAll('.input3--poke2')
const mostrarInputId3 = document.querySelectorAll('.input3--poke3')
const mostrarInputId4 = document.querySelectorAll('.input3--poke4')
const mostrarInputId5 = document.querySelectorAll('.input3--poke5')
const mostrarInputId6 = document.querySelectorAll('.input3--poke6')
// mostrar input de hp para los pokemon del usuario
const mostrarInputHp1 = document.querySelectorAll('.input2--poke1')
const mostrarInputHp2 = document.querySelectorAll('.input2--poke2')
const mostrarInputHp3 = document.querySelectorAll('.input2--poke3')
const mostrarInputHp4 = document.querySelectorAll('.input2--poke4')
const mostrarInputHp5 = document.querySelectorAll('.input2--poke5')
const mostrarInputHp6 = document.querySelectorAll('.input2--poke6')

form.addEventListener('submit', validarForm1)
function mostrarFormPokes(){
    formNombrar.style.display = 'block';
}
// funcion para mostrar los inputs dependiendo del numero de pokemones a curar
function mostrarFormPoke(){
    for (i = 1; i <= numero; i++) {
        if (i === 1) {
            mostrarInputPoke1.forEach(input => {
                input.style.display = 'block'
            })
            if(validadorMostrarFormPoke){
                mostrarInputHp1.forEach(input => {
                    input.style.display = 'block'
                    input.innerHTML = `
                    A tu <b>${pokemones[0].nombre}</b> le asignaremos la id de paciente = <b>${pokemones[0].id}</b>. ¿cuánto HP le falta?
                    `
                })
            }
            
            mostrarInputId1.forEach(input => {
                input.style.display = 'block'
            })
        }
        if (i === 2){
            mostrarInputPoke2.forEach(input => {
                input.style.display = 'block'
            })
            if(validadorMostrarFormPoke){
                mostrarInputHp2.forEach(input => {
                    input.style.display = 'block'
                    input.innerHTML = `
                    A tu <b>${pokemones[1].nombre}</b> le asignaremos la id de paciente = <b>${pokemones[1].id}</b>. ¿cuánto HP le falta?
                    `
                })
            }
            
            mostrarInputId2.forEach(input => {
                input.style.display = 'block'
            })
        }
        if (i === 3){
            mostrarInputPoke3.forEach(input => {
                input.style.display = 'block'
            })
            if(validadorMostrarFormPoke){
                mostrarInputHp3.forEach(input => {
                    input.style.display = 'block'
                    input.innerHTML = `
                    A tu <b>${pokemones[2].nombre}</b> le asignaremos la id de paciente = <b>${pokemones[2].id}</b>. ¿cuánto HP le falta?
                    `
                })
            }
            
            mostrarInputId3.forEach(input => {
                input.style.display = 'block'
            })
        }
        if (i === 4){
            mostrarInputPoke4.forEach(input => {
                input.style.display = 'block'
            })
            if(validadorMostrarFormPoke){
                mostrarInputHp4.forEach(input => {
                    input.style.display = 'block'
                    input.innerHTML = `
                    A tu <b>${pokemones[3].nombre}</b> le asignaremos la id de paciente = <b>${pokemones[3].id}</b>. ¿cuánto HP le falta?
                    `
                    
                })
            }
            mostrarInputId4.forEach(input => {
                input.style.display = 'block'
            })
        }
        if (i === 5){
            mostrarInputPoke5.forEach(input => {
                input.style.display = 'block'
            })
            if(validadorMostrarFormPoke){
                mostrarInputHp5.forEach(input => {
                    input.style.display = 'block'
                    input.innerHTML = `
                    A tu <b>${pokemones[4].nombre}</b> le asignaremos la id de paciente = <b>${pokemones[4].id}</b>. ¿cuánto HP le falta?
                    `
                })
            }
            mostrarInputId5.forEach(input => {
                input.style.display = 'block'
            })
        }
        if (i === 6){
            mostrarInputPoke6.forEach(input => {
                input.style.display = 'block'
            })
            if(validadorMostrarFormPoke){
                mostrarInputHp6.forEach(input => {
                    input.style.display = 'block'
                    input.innerHTML = `
                    A tu <b>${pokemones[5].nombre}</b> le asignaremos la id de paciente = <b>${pokemones[5].id}</b>. ¿cuánto HP le falta?
                    `
                })
            }
            
            mostrarInputId6.forEach(input => {
                input.style.display = 'block'
            })
        }
    }
}

function validarForm1(e) {
    //Cancelamos el comportamiento del evento
    e.preventDefault();
    //Obtenemos el elemento desde el cual se disparó el evento 
    numero = parseFloat(document.querySelector('#inputNumber').value)
    
    if (numero < 7 && numero > 0 & !isNaN(numero)){
        const p1Alert = document.querySelector('#p1--invalido')
        p1Alert.style.display = 'none';
        document.querySelector('#form--poke').style.display = 'none'
        mostrarFormPokes()
        mostrarFormPoke()

    } else {
        if (numero > 6 || numero < 1 || isNaN(numero)) {
            const p1Alert = document.querySelector('#p1--invalido')
            p1Alert.style.display = 'block';
            //alert("Número invalido! recuerda que debieras portar entre 1 a 6 pokemones.")
        }
    }
}

// Form para nombrar a los pokemon

const btnNombrar = document.querySelector('#form--nombrar--pokes')
btnNombrar.addEventListener('submit', validarClickNombrar)

function ingresoDatos(){
    for (i = 0; i <= numero; i++) {
        console.log(i)
        switch(i) {
            case 1:
                if (i === 1){
                    nombre1 = select1.options[select1.selectedIndex].text  
                    nivel1 = parseFloat(document.querySelector('#nivelPoke1').value)
                    posicion1 = 1
                    id1 = Math.floor(Math.random() * 99) 
                    console.log(nombre1)
                }
                break
            case 2:
                if (i === 2){
                    nombre2 = select2.options[select2.selectedIndex].text 
                    nivel2 = parseFloat(document.querySelector('#nivelPoke2').value)
                    posicion2 = 2
                    id2 = Math.floor(Math.random() * 99)
                    while(id1 === id2) { 
                        id2 = Math.floor(Math.random() * 99)
                    }
                    console.log(nombre2)
                }
                break
            case 3:
                if (i === 3){
                    nombre3 = select3.options[select3.selectedIndex].text
                    nivel3 = parseFloat(document.querySelector('#nivelPoke3').value)
                    posicion3 = 3
                    id3 = Math.floor(Math.random() * 99)
                    while(id3 === id2 || id3 === id1){ 
                        id3 = Math.floor(Math.random() * 99)
                    }
                    console.log(nombre3)
                }
                break
            case 4:
                if (i === 4){
                    nombre4 = select4.options[select4.selectedIndex].value
                    nivel4 = parseFloat(document.querySelector('#nivelPoke4').value)
                    posicion3 = 4
                    id4 = Math.floor(Math.random() * 99)
                    while(id4 === id3 || id4 === id2 || id4 === id1 ){
                        id4 = Math.floor(Math.random() * 99)
                    }
                }
                break
            case 5:
                if (i === 5){
                    nombre5 = select5.options[select5.selectedIndex].value 
                    nivel5 = parseFloat(document.querySelector('#nivelPoke5').value)
                    posicion3 = 5
                    id5 = Math.floor(Math.random() * 99)
                    while(id5 === id4 || id5 === id3 || id5 === id2 || id5 === id1 ){
                        id5 = Math.floor(Math.random() * 99)
                    }
                }
                break
            case 6:
                if (i === 6){
                    nombre6 = select6.options[select6.selectedIndex].value 
                    nivel6 = parseFloat(document.querySelector('#nivelPoke6').value)
                    posicion6 = 6
                    id6 = Math.floor(Math.random() * 99)
                    while(id6 === id5 || id6 === id4 || id6 === id3 || id6 === id2 || id6 === id1 ){
                        id6 = Math.floor(Math.random() * 99)
                    }
                }
                break
            default:
                break
        }
    }
}



let hpHidden = document.querySelector('#div--hp')
let btnPoke = document.querySelector('#btn--poke')
function validarClickNombrar(e){
    e.preventDefault()
    ingresoDatos()
    pokemon1 = new Pokemon(nombre1, nivel1, posicion1, id1)
    pokemon2 = new Pokemon(nombre2, nivel2, posicion2, id2)
    pokemon3 = new Pokemon(nombre3, nivel3, posicion3, id3)
    pokemon4 = new Pokemon(nombre4, nivel4, posicion4, id4)
    pokemon5 = new Pokemon(nombre5, nivel5, posicion5, id5)
    pokemon6 = new Pokemon(nombre6, nivel6, posicion6, id6)
    pokemones = [pokemon1] // array de objetos
    pushArray()
    console.log(pokemones)
    //ocultar formulario anterior
    formNombrar.style.display = 'none';
    form.style.display = 'none';
    btnPoke.style.display = 'none'
    //mostrar abrir hp
    pPoke.style.display = 'none'
    hpHidden.style.display = 'block';
}

// metodo push para añadir pokemones al array
function pushArray() {
    switch(numero) {
        case 1:
            break
        case 2:
            pokemones.push(pokemon2)
            break
        case 3:
            pokemones.push(pokemon2, pokemon3)
            break
        case 4:
            pokemones.push(pokemon2, pokemon3, pokemon4)
            break
        case 5:
            pokemones.push(pokemon2, pokemon3, pokemon4, pokemon5)
            break
        case 6:
            pokemones.push(pokemon2, pokemon3, pokemon4, pokemon5, pokemon6)
            break
    }
}

//const para el boton mostrar form hp
const abrirHp = document.querySelector('#abrir--hp')
const formHp = document.querySelector('#form--hp')



// mostrar form hp
abrirHp.addEventListener('click', function(){
    formHp.style.display = 'block'
    validadorMostrarFormPoke = true
    mostrarFormPoke() //mostrar forms dependiendo del numero de pokes.
})
// variables de parrafo
let hp1Parrafo = document.querySelector('#hp--poke1--p')
let hp2Parrafo = document.querySelector('#hp--poke2--p')
let hp3Parrafo = document.querySelector('#hp--poke3--p')
let hp4Parrafo = document.querySelector('#hp--poke4--p')
let hp5Parrafo = document.querySelector('#hp--poke5--p')
let hp6Parrafo = document.querySelector('#hp--poke6--p')
let id1Parrafo = document.querySelector('#id--poke1--p')
let id2Parrafo = document.querySelector('#id--poke2--p')
let id3Parrafo = document.querySelector('#id--poke3--p')
let id4Parrafo = document.querySelector('#id--poke4--p')
let id5Parrafo = document.querySelector('#id--poke5--p')
let id6Parrafo = document.querySelector('#id--poke6--p')

//const para el boton submit de datos ingresados (los hp)
const btnNombrarHp = document.querySelector('#form--hp--pokes')
btnNombrarHp.addEventListener('submit', validarClickHp)

let costo
let divCost = document.querySelector('#div--costo')

function validarClickHp(e){
    e.preventDefault()
    ingresoDatos2()
    if (validador) {
        mostrarCosto()
    }
}

//ingresar datos y validador // OPERADOR TERNARIO
function acortarValidadorIngresoDatos2() {
    for (i = 1; i <= numero; i++) {
        if (i === 1) {
            (isNaN(hp1)) ? hp1Parrafo.innerHTML = `datos no válidos a tu <b>${pokemones[0].nombre}</b>` : hp1Parrafo.innerHTML =``
        }
        if (i === 2) {
            (isNaN(hp2)) ? hp2Parrafo.innerHTML = `datos no válidos a tu <b>${pokemones[1].nombre}</b>`: hp2Parrafo.innerHTML =``
        }   
        if (i === 3) {
            (isNaN(hp3)) ? hp3Parrafo.innerHTML = `datos no válidos a tu <b>${pokemones[2].nombre}</b>` : hp3Parrafo.innerHTML =``
        }
        if (i === 4) {
            (isNaN(hp4)) ? hp4Parrafo.innerHTML = `datos no válidos a tu <b>${pokemones[3].nombre}</b>` : hp4Parrafo.innerHTML =``
        }
        if (i === 5) {
            (isNaN(hp5)) ? hp5Parrafo.innerHTML = `datos no válidos a tu <b>${pokemones[4].nombre}</b>` : hp5Parrafo.innerHTML =``
        }
        if (i === 6) {
            (isNaN(hp6)) ? hp6Parrafo.innerHTML = `datos no válidos a tu <b>${pokemones[5].nombre}</b>` : hp6Parrafo.innerHTML =``
        }
    }
}
function ingresoDatos2(){
    for (i = 0; i <= numero; i++) {
        console.log(i)
        switch(i) {
            case 1:
                if (i === 1){
                    hp1 = parseFloat(document.querySelector('#hp--poke1').value)
                }
                break
            case 2:
                if (i === 2){
                    hp2 = parseFloat(document.querySelector('#hp--poke2').value)
                }
                break
            case 3:
                if (i === 3){
                    hp3 = parseFloat(document.querySelector('#hp--poke3').value)
                }
                break
            case 4:
                if (i === 4){
                    hp4 = parseFloat(document.querySelector('#hp--poke4').value)
                }
                break
            case 5:
                if (i === 5){
                    hp5 = parseFloat(document.querySelector('#hp--poke5').value)
                }
                break
            case 6:
                if (i === 6){
                    hp6 = parseFloat(document.querySelector('#hp--poke6').value)
                }
                break
            default:
                break
        }
    }

    switch(numero) {
        case 1: 
            acortarValidadorIngresoDatos2()
            if(!isNaN(hp1)){
                validador = true
            }
            break
        case 2:
            acortarValidadorIngresoDatos2()
            if (!isNaN(hp1) && !isNaN(hp2)) {
                validador = true
            }
            break
        case 3:
            acortarValidadorIngresoDatos2()
            if (!isNaN(hp1) && !isNaN(hp2) && !isNaN(hp3)) {
                validador = true
            }
            break
        case 4:
            acortarValidadorIngresoDatos2()
            if (!isNaN(hp1) && !isNaN(hp2) && !isNaN(hp3) && !isNaN(hp4)) {
                validador = true
            }
            break
        case 5:
            acortarValidadorIngresoDatos2()
            if (!isNaN(hp1) && !isNaN(hp2) && !isNaN(hp3) && !isNaN(hp4) && !isNaN(hp5)) {
                validador = true
            }
            break
        case 6:
            acortarValidadorIngresoDatos2()
            if (!isNaN(hp1) && !isNaN(hp2) && !isNaN(hp3) && !isNaN(hp4) && !isNaN(hp5) && !isNaN(hp6)) {
                validador = true
            }
            break
    }
}

const formId = document.querySelector('#div--id')
const btnPagar = document.querySelector('#btn--pagar')
function mostrarCosto(){
    console.log(validador)
    ocultarForm()
    costo = pokeCalc()
    console.log(costo)
    divCost.innerHTML = `
        <h3>Curar a tus pokemon cuesta ${pokeCalc()} dolares!</h3>
        `
}

function ocultarForm() { 
    //hide
    let pPoke = document.querySelector('#div-btn-poke')
    pPoke.style.display = 'none'
    formHp.style.display = 'none'
    abrirHp.style.display = 'none'
    //show
    btnPagar.style.display = 'block'
}
// CALCULADORA FINAL DEL COSTO DEL SERVICIO
function pokeCalc () {
    function calculadorPoke (pokeNumber = 1, dolar = 10) { // funcion para calcular costo base 
        return pokeNumber * dolar
    }
    let  costoBase = calculadorPoke(numero)
    
    function calculadorHp(hp1 = 0, hp2 = 0, hp3 = 0, hp4 = 0, hp5 = 0, hp6 = 0) { // funcion para calcular costo total por hp
        return 2 * hp1 + 2 * hp2 + 2 * hp3 + 2 * hp4 + 2 * hp4 + 2 * hp5 + 2 * hp6
    }
    const costoHp = calculadorHp(hp1, hp2, hp3, hp4, hp5, hp6)
    
    
    function sumarCosto(pokeNumber = 1, hpNumber = 0) { // funcion para sumar ambos costos.
        const costoCura = costoBase + costoHp
        return costoCura
    }
    let costoTotal = sumarCosto(costoBase, costoHp)
    return costoTotal
}


btnPagar.addEventListener('click', function(){
    formId.style.display = 'block'
    divThx.innerHTML = `<h2>Gracias por preferir Centro Pokemón, sus pokemones están sanados!</h2>`
    btnPagar.style.display = 'none'
    divThx.style.display = 'block'
    divCost.style.display = 'none'
    mostrarFormPoke()
})


//SUBMIT ID de paciente
let formIdSubmit = document.querySelector('#form--id')
formIdSubmit.addEventListener('submit', function(e){
    e.preventDefault()
    ingresoDatos3()
    idEncontrado()
    validadorIdEncontrado()
    if (validadorId){
        pushId()
        console.log(ids)
        contenedorHtml()
        ocultarForm2()
        divFinal()
    }
})


function acortarValidadorIngresoDatos3() {
    for (i = 1; i <= numero; i++) {
        if (i === 1) {
            if(isNaN(idABuscar1)){
                id1Parrafo.innerHTML = `un entrenador que está sentado en la sala de espera está reclamando que te estás llevando su pokemon! Ingresa el ID correcto por favor!`
            } else {
                id1Parrafo.innerHTML =``
            }
        }
        if (i === 2) {
            if(isNaN(idABuscar2)){
                id2Parrafo.innerHTML = `un entrenador que está sentado en la sala de espera está reclamando que te estás llevando su pokemon! Ingresa el ID correcto por favor!`
            } else {
                id2Parrafo.innerHTML =``
            }
        }   
        if (i === 3) {
            if(isNaN(idABuscar3)){
                id3Parrafo.innerHTML = `un entrenador que está sentado en la sala de espera está reclamando que te estás llevando su pokemon! Ingresa el ID correcto por favor!`
            } else {
                id3Parrafo.innerHTML =``
            }
        }
        if (i === 4) {
            if(isNaN(idABuscar4)){
                id3Parrafo.innerHTML = `El mismo te está reclamando que te estás llevando su pokemon! Ingresa el ID correcto por favor!`
            } else {
                id3Parrafo.innerHTML =``
            }
        }
        if (i === 5) {
            if(isNaN(idABuscar5)){
                id3Parrafo.innerHTML = `El mismo te está reclamando que te estás llevando su pokemon! Ingresa el ID correcto por favor!`
            } else {
                id3Parrafo.innerHTML =``
            }
        }
        if (i === 6) {
            if(isNaN(idABuscar6)){
                id3Parrafo.innerHTML = `El mismo te está reclamando que te estás llevando su pokemon y te quiere pegar! Ingresa el ID correcto por favor!`
            } else {
                id3Parrafo.innerHTML =``
            }
        }
    }
}

function ingresoDatos3() {
    for (i = 0; i <= numero; i++) {
        switch(i) {
            case 1:
                if (i === 1){
                    idABuscar1 = parseFloat(document.querySelector('#id--poke1').value)
                }
                
                break
            case 2:
                if (i === 2){
                    idABuscar2 = parseFloat(document.querySelector('#id--poke2').value)
                }
                break
            case 3:
                if (i === 3){
                    idABuscar3 = parseFloat(document.querySelector('#id--poke3').value)
                }
                break
            case 4:
                if (i === 4){
                    idABuscar4 = parseFloat(document.querySelector('#id--poke4').value)
                    
                }
                break
            case 5:
                if (i === 5){
                    idABuscar5 = parseFloat(document.querySelector('#id--poke5').value)
                    
                }
                break
            case 6:
                if (i === 6){
                    idABuscar6 = parseFloat(document.querySelector('#id--poke6').value)
                    
                }
                break
            default:
                break
        }
    }
    switch(numero){
        case 1:
            acortarValidadorIngresoDatos3()
            if(!isNaN(idABuscar1)){
                validadorId = true
            }
            break
        case 2:
            acortarValidadorIngresoDatos3()
            if(!isNaN(idABuscar1) && !isNaN(idABuscar2)){
                validadorId = true
            }
            break
        case 3:
            acortarValidadorIngresoDatos3()
            if(!isNaN(idABuscar1) && !isNaN(idABuscar2) &&!isNaN(idABuscar3)){
                validadorId = true
            }
            break
        case 4:
            acortarValidadorIngresoDatos3()
            if(!isNaN(idABuscar1) && !isNaN(idABuscar2) &&!isNaN(idABuscar3) && !isNaN(idABuscar4)){
                validadorId = true
            }
            break
        case 5:
            acortarValidadorIngresoDatos3()
            if(!isNaN(idABuscar1) && !isNaN(idABuscar2) &&!isNaN(idABuscar3) && !isNaN(idABuscar4) && !isNaN(idABuscar5)){
                validadorId = true
            }
            break
        case 6:
            acortarValidadorIngresoDatos3()
            if(!isNaN(idABuscar1) && !isNaN(idABuscar2) &&!isNaN(idABuscar3) && !isNaN(idABuscar4) && !isNaN(idABuscar5) && !isNaN(idABuscar6)){
                validadorId = true
            }
            break
    }
}


function idEncontrado(){
    for (i = 1; i <= numero; i++) {
        if (i === 1) {
            idEncontrado1 = pokemones.find(element => element.id === idABuscar1) ?? console.log("ID no corresponde")
            if (idEncontrado1 === undefined) {
                id1Parrafo.innerHTML = `un entrenador que está sentado en la sala de espera está reclamando que te estás llevando su pokemon! Ingresa el ID correcto por favor!`
            }
        }
        if (i === 2) {
            idEncontrado2 = pokemones.find(element => element.id === idABuscar2) ?? console.log("ID no corresponde")
            if (idEncontrado2 === undefined) {
                id2Parrafo.innerHTML = `un entrenador que está sentado en la sala de espera está reclamando que te estás llevando su pokemon! Ingresa el ID correcto por favor!`
            }
        }
        if (i === 3) {
            idEncontrado3 = pokemones.find(element => element.id === idABuscar3) ?? console.log("ID no corresponde")
            if (idEncontrado3 === undefined) {
                id3Parrafo.innerHTML = `un entrenador que está sentado en la sala de espera está reclamando que te estás llevando su pokemon! Ingresa el ID correcto por favor!`
            }
        }
        if (i === 4) {
            idEncontrado4 = pokemones.find(element => element.id === idABuscar4) ?? console.log("ID no corresponde")
            if (idEncontrado4 === undefined) {
                id4Parrafo.innerHTML = `un entrenador que está sentado en la sala de espera está reclamando que te estás llevando su pokemon! Ingresa el ID correcto por favor!`
            }
        }
        if (i === 5) {
            idEncontrado5 = pokemones.find(element => element.id === idABuscar5) ?? console.log("ID no corresponde")
            if (idEncontrado5 === undefined) {
                id5Parrafo.innerHTML = `un entrenador que está sentado en la sala de espera está reclamando que te estás llevando su pokemon! Ingresa el ID correcto por favor!`
            }
        }
        if (i === 6){
            idEncontrado6 = pokemones.find(element => element.id === idABuscar6) ?? console.log("ID no corresponde")
            if (idEncontrado6 === undefined) {
                id6Parrafo.innerHTML = `un entrenador que está sentado en la sala de espera está reclamando que te estás llevando su pokemon! Ingresa el ID correcto por favor!`
            }
        }
    }
}
function validadorIdEncontrado(){
    switch(numero){
        case 1:
            if(idEncontrado1 == undefined){
                validadorId = false
            }
            break
        case 2:
            
            if(idEncontrado1 == undefined || idEncontrado2 == undefined){
                validadorId = false
            }
            break
        case 3:
            if(idEncontrado1 == undefined || idEncontrado2 == undefined || idEncontrado3 == undefined){
                validadorId = false
            }
            break
        case 4:
            if(idEncontrado1 == undefined || idEncontrado2 == undefined || idEncontrado3 == undefined || idEncontrado4 == undefined){
                validadorId = false
            }
            break
        case 5:
            if(idEncontrado1 == undefined || idEncontrado2 == undefined || idEncontrado3 == undefined || idEncontrado4 == undefined || idEncontrado5 == undefined){
                validadorId = false
            }
            break
        case 6:
            if(idEncontrado1 == undefined || idEncontrado2 == undefined || idEncontrado3 == undefined || idEncontrado4 == undefined || idEncontrado5 == undefined || idEncontrado6 == undefined){
                validadorId = false
            }
            break
    }
}


function pushId() {
    for (i = 1; i <= numero; i++) {
        if (i === 1) {
            ids.push(idEncontrado1)
        }
        if (i === 2) {
            ids.push(idEncontrado2)
        }
        if (i === 3) {
            ids.push(idEncontrado3)
        }
        if (i === 4) {
            ids.push(idEncontrado4)
        }
        if (i === 5) {
            ids.push(idEncontrado5)
        }
        if (i === 6){
            ids.push(idEncontrado6)
        }
    }
}


async function contenedorHtml() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=150&offset=0") // api de los primeros 150 pokemon
    .then(response => response.json())
    .then(async data => {
    let arrayPkmFinal = await data.results // pido sólo lo que contiene la propiedad results(el array con los 150 pokemon)
    for (i = 1; i <= numero; i++) { // ciclo for para cada pokemon(los 6)
        if (i === 1) {
            let miau = arrayPkmFinal.find((elem) => elem.name == ids[0].nombre) // busco el pokemon en el array
            let urlApiPoke1 = miau.url // me consigo la url del pokemon encontrado
            fetch(urlApiPoke1)
            .then(resp => resp.json())
            .then(async dat => {
                let sprites = await dat.sprites //sprite de pokemon en .png
                container1.innerHTML = `<p>${ids[0].nombre}</p>
                                        <p>Nivel${ids[0].nivel}</p>
                                        <img src="${sprites.front_default}">
                                        `
            })
        }
        if (i === 2) {
            let miau = arrayPkmFinal.find((elem) => elem.name == ids[1].nombre)
            let urlApiPoke1 = miau.url 
            fetch(urlApiPoke1)
            .then(resp => resp.json())
            .then(async dat => {
                let sprites = await dat.sprites
                container2.innerHTML = `<p>${ids[1].nombre}</p>
                                        <p>Nivel${ids[1].nivel}</p>
                                        <img src="${sprites.front_default}" class="pkm__sprite">
                                        `
            })
        }
        if (i === 3) {
            let miau = arrayPkmFinal.find((elem) => elem.name == ids[2].nombre)
            let urlApiPoke1 = miau.url 
            fetch(urlApiPoke1)
            .then(resp => resp.json())
            .then(async dat => {
                let sprites = await dat.sprites
                container3.innerHTML = `<p>${ids[2].nombre}</p>
                                        <p>Nivel${ids[2].nivel}</p>
                                        <img src="${sprites.front_default}" class="pkm__sprite">
                                        `
            })
        }
        if (i === 4) {
            let miau = arrayPkmFinal.find((elem) => elem.name == ids[3].nombre)
            let urlApiPoke1 = miau.url 
            fetch(urlApiPoke1)
            .then(resp => resp.json())
            .then(async dat => {
                let sprites = await dat.sprites
                container4.innerHTML = `<p>${ids[3].nombre}</p>
                                        <p>Nivel${ids[3].nivel}</p>
                                        <img src="${sprites.front_default}" class="pkm__sprite">
                                        `
            })
        }
        if (i === 5) {
            let miau = arrayPkmFinal.find((elem) => elem.name == ids[4].nombre)
            let urlApiPoke1 = miau.url 
            fetch(urlApiPoke1)
            .then(resp => resp.json())
            .then(async dat => {
                let sprites = await dat.sprites
                container5.innerHTML = `<p>${ids[4].nombre}</p>
                                        <p>Nivel${ids[4].nivel}</p>
                                        <img src="${sprites.front_default}" class="pkm__sprite">
                                        `
            })
        }
        if (i === 6){
            let miau = arrayPkmFinal.find((elem) => elem.name == ids[5].nombre)
            let urlApiPoke1 = miau.url 
            fetch(urlApiPoke1)
            .then(resp => resp.json())
            .then(async dat => {
                let sprites = await dat.sprites
                container6.innerHTML = `<p>${ids[5].nombre}</p>
                                        <p>Nivel${ids[5].nivel}</p>
                                        <img src="${sprites.front_default}" class="pkm__sprite">
                                        `
            })
        }
    }
})
}

function ocultarForm2() {
    divThx.style.display = 'none'
    formId.style.display ='none'
}

function divFinal(){
    final.style.display = 'block'
    document.querySelector('.btn--curar').style.display = 'none'
    switch(numero) {
        case 1:
            final.innerHTML = `${ids[0].nombre} de nivel ${ids[0].nivel} ya está mucho mejor!. Aquí lo tiene, gracias por preferir Centro pokemon Inc!`
            break
        case 2:
            final.innerHTML = `tu ${ids[0].nombre} de nivel ${ids[0].nivel} y ${pokemones[1].nombre} de nivel ${ids[1].nivel} ya están mucho mejor!. Aquí los tiene, gracias por preferir Centro pokemon Inc!.`
            break
        case 3:
            final.innerHTML = `tu ${ids[0].nombre} de nivel ${ids[0].nivel}, ${pokemones[1].nombre} de nivel ${ids[1].nivel} y ${pokemones[2].nombre} de nivel ${ids[2].nivel} ya están mucho mejor!. Aquí los tiene, gracias por preferir Centro pokemon Inc!.`
            break
        case 4:
            final.innerHTML = `tu ${ids[0].nombre} de nivel ${ids[0].nivel}, ${pokemones[1].nombre} de nivel ${ids[1].nivel}, ${pokemones[2].nombre} de nivel ${ids[2].nivel} y ${pokemones[3].nombre} de nivel ${ids[3].nivel} ya están mucho mejor!. Aquí los tiene, gracias por preferir Centro pokemon Inc!.`
            break
        case 5:
            final.innerHTML = `tu ${ids[0].nombre} de nivel ${ids[0].nivel}, ${pokemones[1].nombre} de nivel ${ids[1].nivel}, ${pokemones[2].nombre} de nivel ${ids[2].nivel}, ${pokemones[3].nombre} de nivel ${ids[3].nivel}y ${pokemones[4].nombre} de nivel ${ids[4].nivel}ya están mucho mejor!. Aquí los tiene, gracias por preferir Centro pokemon Inc!.`
            break
        case 6:
            final.innerHTML = `tu ${ids[0].nombre} de nivel ${ids[0].nivel}, ${pokemones[1].nombre} de nivel ${ids[1].nivel}, ${pokemones[2].nombre} de nivel ${ids[2].nivel}, ${pokemones[3].nombre} de nivel ${ids[3].nivel}y ${pokemones[4].nombre} de nivel ${ids[4].nivel} y ${pokemones[5].nombre} de nivel ${ids[5].nivel} ya están mucho mejor!. Aquí los tiene, gracias por preferir Centro pokemon Inc!.`
            break
    }
}