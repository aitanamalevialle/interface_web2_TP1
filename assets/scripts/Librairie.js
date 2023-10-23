import { livres } from "./livres.js";
import { Livre } from "./Livre.js";
import { Panier } from './Panier.js';

export class Librairie {
    #_el;
    #_elLivre;
    #_elsFiltre;
    #_elPanier;
    
    constructor(el) {
        this.#_el = el;
        this.#_elLivre = this.#_el;
        this.#_elsFiltre = document.querySelectorAll('[data-js-filtre]');
        this.#_elPanier = document.querySelector('.panier');
        
        // Initialiser la librairie.
        this.#init();
    }    

    #init() {
        new Panier(this.#_elPanier);
        
        // Afficher les livres à partir du fichier livres.js.
        this.#afficherLivres(livres);
        
        // Ajouter l'évènement de filtrage.
        for (let i = 0, l = this.#_elsFiltre.length; i < l; i++) {
            this.#_elsFiltre[i].addEventListener('click', this.#filtrerLivres.bind(this));
        }
    }

    // Fonction pour afficher les livres sur la page.
    #afficherLivres(livres, tous = false) {
        this.#_elLivre.innerHTML = '';
        
        // Determiner le nombre de livres à afficher.
        let nombreLivres = tous ? livres.length : (livres.length < 12) ? livres.length : 12;
        
        for (let i = 0, l = nombreLivres; i < l; i++) {
            let livre = livres[i];

            this.#_elLivre.insertAdjacentHTML('beforeend', `
                <div class="grille__item livre" data-js-livre>
                    <img src="${livre.image}">
                    <p>${livre.titre}</p>
                    <p>${livre.prix} $</p>
                    <button class="ajout" data-js-ajout>Ajouter</button>
                </div>
            `);
            
            // Création d'un nouvel objet Livre pour chaque livre affiché.
            let dom = this.#_elLivre.children[this.#_elLivre.children.length - 1];        
            new Livre(dom, livre);
        }
    }

    #filtrerLivres(e) {
        e.preventDefault();
        
        // Obtenir le filtre sélectionné.
        let filtre = e.currentTarget.getAttribute('data-js-filtre'),
            livresFiltres = [];
        
        if (filtre == "Tous") {
            this.#afficherLivres(livres, true);
            return;
        }

        // Filtrer les livres en fonction de la catégorie ou de la nouveauté.
        for (let i = 0, l = livres.length; i < l; i++) {
            if (filtre == "Nouveautés" && livres[i].nouveaute) {
                livresFiltres.push(livres[i]);
            } else if (livres[i].categorie == filtre) {
                livresFiltres.push(livres[i]);
            }
        }

        this.#afficherLivres(livresFiltres);
    }    
}