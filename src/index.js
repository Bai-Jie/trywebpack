import './styles.css'
import _ from 'lodash';
import { max } from './utils'

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

function component() {
    const element = document.createElement('div');
    element.classList.add("content");

    element.innerHTML = _.join(['Hello', 'webpack', max(7, 2)], ' ');

    return element;
}

document.body.appendChild(component());
