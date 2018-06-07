import {TweenMax, TimelineLite} from "gsap/TweenMax";

let endLoading = (e) => {
    if (document.querySelector('#loader') === null) return;
    if (e !== undefined) e.preventDefault();

    TweenMax.set('body', {clearProps: 'all'})

    let interval = setInterval(function() {
        if(document.readyState === 'complete') {
            clearInterval(interval);

            let loader = document.querySelector('#loader');

            if (loader !== null) {
                TweenMax.to(loader, 1.5, {opacity: 0, onComplete: function(){
                        loader.remove();
                    }});
            }

        }
    }, 100);
}

let intro = function () {

    if ( document.querySelector('#homepage') === null ) return

    let skip = document.querySelector(".loader-img a")
    let tl = new TimelineLite()

    skip.addEventListener('click', endLoading)
    TweenMax.set("body", {height: '100vh', overflow: 'hidden'})

    tl.to('#intro-1', 0.3, {opacity: 1}, "+=0.5")
    tl.to('#intro-1', 0.3, {opacity: 0}, "+=1.4")
    tl.to('#intro-2', 0.3, {opacity: 1})
    tl.to('#intro-2', 0.3, {opacity: 0}, "+=1.4")
    tl.to('#intro-3', 0.3, {opacity: 1})
    tl.to('#intro-3', 0.3, {opacity: 0}, "+=1.4")

    setTimeout(endLoading, 6500);
}

export default intro;