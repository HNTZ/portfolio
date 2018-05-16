import printMe from './print.js';
import './style.scss';
import { cube } from './math.js';
import menu from './menu.js';
import Webs from './assets/img/web-s.svg'
import Webm from './assets/img/web-m.svg'
import Webl from './assets/img/web-l.svg'


menu();

let projets = document.querySelectorAll(".projets-item");

projets.forEach( function(projet){
    console.log(projet)
    projet.addEventListener("mouseenter", () => {
        console.log("mdr")
        projet.classList.add("hover")
    })
    projet.addEventListener("mouseleave", () => {
        projet.classList.remove("hover")
    })
})