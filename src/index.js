import printMe from './print.js';
import './style.scss';
import { cube } from './math.js';
import menu from './menu.js';
import Barba from 'barba';
import { TweenMax, TimelineLite, CSSPlugin } from "gsap/TweenMax";

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

document.addEventListener("click", function(e){
    if (e.target.tagName === 'a') {
        var href = e.target.href;
        console.log(e.target)
    }
})

var MovePage = Barba.BaseTransition.extend({
    start: function() {

        Promise
            .all([this.newContainerLoading, this.scrollTop()])
            .then(this.movePages.bind(this));
    },

    scrollTop: function() {
        var deferred = Barba.Utils.deferred();
        var obj = { y: window.pageYOffset };

        console.log(obj)

        TweenLite.to(obj, 0.4, {
            y: 0,
            onUpdate: function() {
                if (obj.y === 0) {
                    deferred.resolve();
                }

                window.scroll(0, obj.y);
            },
            onComplete: function() {
                deferred.resolve();
            }
        });

        return deferred.promise;
    },

    movePages: function() {
        var _this = this;

        let versLaDroite = false

        if (this.getNewPageFile() == "home") {
            versLaDroite = true;
        }

        TweenMax.set(this.newContainer, {
            visibility: 'visible',
            xPercent: versLaDroite ? -100 : 100,
            position: "fixed",
            top: "150px",
            left: 0,
            right: 0
        });

        TweenMax.to(this.oldContainer, 0.6, { xPercent: versLaDroite ? 100 : -100});
        TweenMax.to(this.newContainer, 0.6, { xPercent: 0, onComplete: function() {
                TweenMax.set(_this.newContainer, { clearProps: 'all' });
                document.getElementsByTagName("body")[0].id = _this.getNewPageFile();
                _this.done();
            }});
    },
    getNewPageFile: function() {
        let pageFile = Barba.HistoryManager.currentStatus().url.split('/').pop().split('.')[0];
        if (pageFile == "") {
            return "home"
        }
        else {
            return pageFile
        }
        ;
    }
});

Barba.Pjax.getTransition = function() {
    return MovePage;
};

Barba.Pjax.start();


console.log(Barba.Pjax.getCurrentUrl())
