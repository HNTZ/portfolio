import printMe from './print.js';
import './style.scss';
import { cube } from './math.js';


console.log("m")

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode! hehe mdr');
}