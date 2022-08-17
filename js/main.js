// HTML SELECTORS
const mainNav = document.querySelector('.main-nav-show')
const welcomeSection = document.querySelector('.welcome-section')
const mainSection = document.querySelector('.main-section-show')
const footer = document.querySelector('.footer-show')
const navContainer = document.querySelector('.nav-container')
// SELECTOR BTN ENTER WEB DEVELOPMENT PROJECTS
const btnEnterSite = document.querySelector('.welcome-section__btn')
// EVENT SHOW MAIN
btnEnterSite.addEventListener('click', function(){
    welcomeSection.style.display = 'none'
    mainNav.style.display = 'block'
    mainNav.style.animation = 'aparecernav  250ms ease-out'
    navContainer.style.animation = 'aparecernav  250ms ease-out'
    mainSection.style.display = 'block'
    mainSection.style.animation = 'aparecerindexcontainer  450ms ease-in'
    footer.style.display = 'flex'
    footer.style.animation = 'aparecerindexcontainer  450ms ease-in'
})