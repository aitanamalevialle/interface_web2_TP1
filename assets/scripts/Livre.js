export class Livre {
    #_el;
    #_elLivre;
    #_elModal;
    #_elHTML;
    #_elBody;

    constructor(el, livre) {
        this.#_el = el; 
        this.#_elLivre = livre; 
        this._elBtn = this.#_el.querySelector('[data-js-ajout]'); 
        this.#_elModal = document.querySelector('[data-js-modal-livre]');
        this.#_elHTML = document.documentElement; 
        this.#_elBody = document.body; 
        this.fermeModal = this.#fermeModal.bind(this); 
        this.#init(); 
    }

    #init() {
        this.#_el.addEventListener('click', this.#afficheModal.bind(this));
        
        // Si le bouton existe, ajout d'un écouteur pour l'ajout au panier.
        if (this._elBtn) {
            this._elBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // Empêche la propagation de l'événement click.
                this.ajoutePanier(); // Ajoute le livre au panier.
            }.bind(this));
        }
    }
    
    #afficheModal() {
        // Mise à jour du contenu du modal avec les informations du livre.
        this.#_elModal.querySelector('.modal__contenu').innerHTML = 
        `
            <img src='${this.#_elLivre.image}'>
            <p><small>Titre : </small>${this.#_elLivre.titre}</p>
            <p><small>Auteur : </small>${this.#_elLivre.auteur}</p>
            <p><small>Éditeur : </small>${this.#_elLivre.editeur}</p>
            <p><small>Pages : </small>${this.#_elLivre.pages}</p>
            <p>${this.#_elLivre.description}</p>
        `;
    
        this.#_elModal.classList.replace('modal--ferme', 'modal--ouvert');
        this.#_elHTML.classList.add('overflow-y-hidden');
        this.#_elBody.classList.add('overflow-y-hidden');
        this.#_elModal.addEventListener('click', this.fermeModal);
    }

    ajoutePanier() {
        let panier = JSON.parse(localStorage.getItem('panier')) || [], // Récupération du panier dans le local storage.
            livreExistant = false;

        // Vérification de l'existence du livre dans le panier.
        for (let i = 0, l = panier.length; i < l; i++) {
            if (panier[i].titre == this.#_elLivre.titre) {
                livreExistant = true;
                break;
            }
        }

        // Si le livre n'est pas dans le panier, il est ajouté.
        if (!livreExistant) {
            panier.push({
                titre: this.#_elLivre.titre,
                prix: this.#_elLivre.prix
            });
            localStorage.setItem('panier', JSON.stringify(panier)); // Mise à jour du panier dans le local storage.
            this.#fermeModal();
        }
    }

    #fermeModal() {
        this.#_elModal.classList.replace('modal--ouvert', 'modal--ferme');
        this.#_elHTML.classList.remove('overflow-y-hidden');
        this.#_elBody.classList.remove('overflow-y-hidden');
        this.#_elModal.removeEventListener('click', this.fermeModal);
    }
}