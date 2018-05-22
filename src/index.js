import printMe from './print.js';
import './style.scss';
import { cube } from './math.js';
import menu from './menu.js';
// import Webs from './assets/img/web-s.svg';
// import Webm from './assets/img/web-m.svg';
// import Webl from './assets/img/web-l.svg';
// for (let i = 1; i < 13; i++) {
//     import i from '/assets/img/'+ i +'.png';
// }


menu();

let hoverEffects = (elements, hoverClass) => {
    elements.forEach( (element) => {
        element.addEventListener("mouseenter", () => {
            element.classList.add(hoverClass);
            console.log(element)
        })
        element.addEventListener("mouseleave", () => {
            element.classList.remove(hoverClass)
        })
    })
}

let projets = document.querySelectorAll(".projets-item");

let techs = document.querySelectorAll(".tech");

let groupTechs = document.querySelectorAll(".group-tech");

hoverEffects(projets, "hover");

hoverEffects(techs, "hover");

hoverEffects(groupTechs, "hover");

