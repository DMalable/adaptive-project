const fullscreenMenu = document.querySelector('.fullscreen-menu')
const hamburger = document.querySelector('.hamburger')
const closeSign = document.querySelector('.fullscreen-menu__close')
const menuLink = document.querySelectorAll('.menu__link')

hamburger.addEventListener('click', function(event){
  event.preventDefault();
  fullscreenMenu.classList.add('fullscreen-menu--active')
})

closeSign.addEventListener('click', function(event){
  event.preventDefault()
  fullscreenMenu.classList.remove('fullscreen-menu--active')
})

menuLink.forEach(elm => elm.addEventListener('click', () => fullscreenMenu.classList.remove('fullscreen-menu--active')
))
