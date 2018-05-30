import printMe from './print.js';
import './style.scss';
import { cube } from './math.js';
import menu from './menu.js';
import Barba from 'barba';
import { TweenMax, TimelineLite, CSSPlugin } from "gsap/TweenMax";

menu();

let timeToTop = "0.6";

function hoverpage() {

    let hoverEffects = (elements, hoverClass) => {
        elements.forEach( (element) => {
            element.addEventListener("mouseenter", (e) => {
                let slug = '#'+e.target.classList[1];
                console.log(slug)
                document.querySelector(slug).classList.add(hoverClass);
                console.log(element)
            })
            element.addEventListener("mouseleave", (e) => {
                let slug = '#'+e.target.classList[1];
                document.querySelector(slug).classList.remove(hoverClass)
            });
            element.addEventListener("click", (e) => {
                let slug = '#'+e.target.classList[1];
                document.querySelector(slug).classList.add("clicked");
                if (window.scrollY == 0) {
                    timeToTop = 0;
                }
                setTimeout( function(){
                    document.querySelector(slug).style.display = "none";
                }, timeToTop * 1000)
            })
        })
    }

    let pages = document.querySelectorAll(".page-link");
    hoverEffects(pages, 'hover');
}


hoverpage();

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

        TweenMax.to(obj, timeToTop,{
            y: 0,
            ease: Power2.easeOut,
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
        let depart = 100;

        if (this.getNewPageFile() == "home") {
            versLaDroite = true
        }
        else if(this.newContainer.dataset.namespace == "projet" && this.getOldPageFile() == "home") {
            depart = 50;
        }

        TweenMax.set(this.newContainer, {
            visibility: 'visible',
            xPercent: versLaDroite ? -depart : depart,
            position: "fixed",
            top: "150px",
            left: 0,
            right: 0,
            ease: Power2.easeIn,
        });

        TweenMax.to(this.oldContainer, 0.7, { xPercent: versLaDroite ? 100 : -100});
        TweenMax.to(this.newContainer, 0.7, { xPercent: 0, onComplete: function() {
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
    },
    getOldPageFile: function () {
        let pageFile = Barba.HistoryManager.prevStatus().url.split('/').pop().split().shift()
        if (pageFile == "") {
            return "home"
        }
        else {
            return pageFile
        }
    }
});

Barba.Pjax.getTransition = function() {
    return MovePage;
};

Barba.Pjax.start();

var Homepage = Barba.BaseView.extend({
    namespace: 'homepage',
    onEnterCompleted: function() {


        hoverpage();
    }
});

var Projet = Barba.BaseView.extend({
    namespace: 'projet',
    onEnterCompleted: function() {

        let next = document.querySelector('a#next');
        let prev = document.querySelector('a#prev');

        hoverpage();
    }
})

Homepage.init();

Projet.init();


