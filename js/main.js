
// HTML SELECTORS
const mainNav = document.querySelector('.main-nav')
const welcomeSection = document.querySelector('.welcome-section')
const mainSection = document.querySelector('.main-section')
const footer = document.querySelector('.footer')
// SELECTOR BTN ENTER WEB DEVELOPMENT PROJECTS
const btnEnterSite = document.querySelector('.welcome-section__btn')
// EVENT SHOW MAIN
btnEnterSite.addEventListener('click', function(){
    welcomeSection.style.display = 'none'

    mainNav.style.display = 'block'
    mainNav.style.animation = 'aparecer--index--container  450ms ease-in'
    mainSection.style.display = 'block'
    mainSection.style.animation = 'aparecer--index--container  450ms ease-in'
    footer.style.display = 'flex'
    footer.style.animation = 'aparecer--index--container  450ms ease-in'
})