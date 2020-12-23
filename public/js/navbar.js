const menu = document.getElementById("menu")

const navLinks = document.querySelector(".nav-links")

menu.addEventListener("change", ()=> {
 if(menu.checked) {
  navLinks.classList.add("show")
 } else {
  navLinks.classList.remove('show')
 }
 console.log(menu.checked)
 console.log(navLinks)
})