
const header = document.querySelector(".header");
window.addEventListener ("scroll", function() {
    header.classList.toggle('sticky', window.scrollY > 100);
});	

let menu = document.querySelector('#menu-btn');
let navlist = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('open');
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navlist.classList.remove('open');
}






let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.add('active');
}
document.querySelector('#close-search').onclick = () =>{
    searchForm.classList.remove('active');
}


