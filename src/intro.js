import {TweenMax, TimelineLite} from "gsap/TweenMax";

let endLoading = (e) => {
    if (document.querySelector('#loader') === null) return;

    TweenMax.set('body', {clearProps: 'all'})

    let interval = setInterval(function() {
        if(document.readyState === 'complete') {
            clearInterval(interval);

            let loader = document.querySelector('#loader');

            if (loader !== null) {
                TweenMax.to(loader, 1.5, {opacity: 0, ease: Power2.easeIn, onComplete: function(){
                        loader.remove();
                    }});
            }

        }
    }, 100);
}

let intro = function () {

    if ( document.querySelector('#homepage') === null ) return

    TweenMax.set("body", {height: '100vh', overflow: 'hidden'})
    TweenMax.set(".logo-img", {transformStyle:"preserve-3d"});
    TweenMax.from('.logo-img', 3, {opacity: 0, rotationX: 40, rotationY: 65, ease: Power2.easeInOut, delay: 1})

    setTimeout(endLoading, 4000)
}

export default intro;