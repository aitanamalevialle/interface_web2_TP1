import { Librairie } from './Librairie.js';

window.addEventListener('DOMContentLoaded', function() {
    let elLivre = document.querySelector('[data-js-livres]');
    new Librairie(elLivre);
});