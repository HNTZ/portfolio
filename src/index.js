import printMe from './print.js';
import './style.scss';
import { cube } from './math.js';
import './pages/index.hbs'


console.log("m")

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode! hehe mdr');
}

try {
    function component() {
        let element = document.createElement('pre');

        element.innerHTML = [
            'Hello Webpack!',
            '5 cubed is equal to ' + cube(5)
        ].join('\n\n');

        return element;
    }
    document.body.appendChild(component());
}

catch(e) {}

printMe();

var titre = "<h1> mdr ça va ? moi ça va hehe! </h1>";

let title = "Contact";

document.body.insertAdjacentHTML("afterBegin", titre);

if (module.hot) {
    module.hot.accept('./print.js', function() {
        console.log('Accepting the updated printMe module!');
        printMe();
    })
}