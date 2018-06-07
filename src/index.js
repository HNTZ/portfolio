import './style.scss';
import menu from './menu.js';
import Barba from 'barba';
import { TweenMax, CSSPlugin } from "gsap/TweenMax";
import intro from './intro.js'

intro();




menu();



let timeToTop = "0.6";

function hoverpage() {

    let hoverEffects = (elements, hoverClass) => {
        elements.forEach( (element) => {
            element.addEventListener("mouseenter", (e) => {
                let slug = '#'+e.target.classList[1];
                document.querySelector(slug).classList.add(hoverClass);
            })
            element.addEventListener("mouseleave", (e) => {
                let slug = '#'+e.target.classList[1];
                document.querySelector(slug).classList.remove(hoverClass)
            });
            element.addEventListener("click", (e) => {
                let slug = '#'+e.target.classList[1];
                document.querySelector(slug).classList.add("clicked");
                if (window.scrollY === 0) {
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

        if (this.getNewPageFile() === "home") {
            versLaDroite = true
        }
        else if(this.newContainer.dataset.namespace === "projet" && this.getOldPageFile() === "home") {
            depart = 50;
        }

        let prev = this.oldContainer.querySelector("#prev")

        if ( prev != null) {
            if (prev.href.split('/').pop() == this.getNewPageFile() ) {
                versLaDroite = true;
            }
        }

        TweenMax.set(this.newContainer, {
            visibility: 'visible',
            xPercent: versLaDroite ? -depart : depart,
            position: "fixed",
            top: "150px",
            left: 0,
            right: 0,
            ease: Power2.easeIn
        });

        TweenMax.to(this.oldContainer, 0.7, { xPercent: versLaDroite ? 100 : -100});
        TweenMax.to(this.newContainer, 0.7, { xPercent: 0, onComplete: function() {
            TweenMax.set(_this.newContainer, { clearProps: 'all' });
            document.getElementsByTagName("body")[0].id = _this.getNewPageFile();
            _this.done();
        }});
    },
    getNewPageFile: function() {
        let pageFile = Barba.HistoryManager.currentStatus().url.split('/').pop();
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

        let open = document.querySelectorAll(".open")
        if (open.length > 0) {
            open.forEach((item) => {
                item.classList.remove("open");
            })
            document.querySelector('.close').classList.remove("close");
        }

        hoverpage();
    }
});

var Projet = Barba.BaseView.extend({
    namespace: 'projet',
    onEnter : function () {
        TweenMax.set("h1", {opacity: 0})
        TweenMax.set("img", {'filter': 'grayscale(1)'})
    },
    onEnterCompleted: function() {
        TweenMax.to("h1", 1, {opacity: 1})
        TweenMax.to("img", 0.3, {'filter': 'grayscale(0)',})
        TweenMax.from("h1", 1, {x: "-150"})
    }
})

var Contact = Barba.BaseView.extend({
    namespace: 'contact',
    onEnterCompleted: function() {
        let open = document.querySelectorAll(".open")
        if (open.length > 0) {
            open.forEach((item) => {
                item.classList.remove("open");
            })
            document.querySelector('.close').classList.remove("close");
        }
    }
});

var aPropos = Barba.BaseView.extend({
    namespace: 'a-propos',
    onEnterCompleted: function() {
        let open = document.querySelectorAll(".open")
        if (open.length > 0) {
            open.forEach((item) => {
              item.classList.remove("open");
            })
            document.querySelector('.close').classList.remove("close");
        }
    }
});

Homepage.init();

Projet.init();

Contact.init();

aPropos.init();
