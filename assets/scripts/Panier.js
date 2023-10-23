export class Panier {
    #_el;
    #_elModalPanier;
    #_elPanier;
    #_elHTML;
    #_elBody;

    constructor(el) {
        this.#_el = el;
        this.#_elModalPanier = document.querySelector('[data-js-modal-panier]');
        this.#_elPanier = document.querySelector('.panier');
        this.#_elHTML = document.documentElement;
        this.#_elBody = document.body;

        this.fermeModalPanier = this.#fermeModalPanier.bind(this);

        // Initialiser le panier.
        this.#init();
    }

    #init() {
        this.#_elPanier.addEventListener('click', this.#affichePanier.bind(this)); 
    }
    
    #affichePanier() {
        let panier = JSON.parse(localStorage.getItem('panier')) || [],
            total = 0,
            contenu = "";

        if (panier.length == 0) {
            contenu = `<p>Il n’y a aucun livre dans votre panier.</p>`;
        } else {
            let gestionPluriel = (panier.length > 1) ? 'Livres' : 'Livre';
            
            // Construire le contenu du panier.
            contenu += "<table><tr><td>" + gestionPluriel + "</td><td>Prix</td></tr>";
            
            // Boucler à travers chaque livre dans le panier et ajout au contenu.
            for (let i = 0, l = panier.length;  i < l; i++) {
                contenu += `<tr><td>${panier[i].titre}</td><td>${panier[i].prix}$</td></tr>`;
                total += panier[i].prix;
            }

            contenu += `<tr><td>Total</td><th>${total}$</th></tr></table>`;
        }

        // Afficher le contenu dans le modal du panier.
        this.#_elModalPanier.innerHTML = contenu;

        // Ouvrir le modal du panier et cacher le scroll de la page.
        this.#_elModalPanier.classList.replace('modal--ferme', 'modal--ouvert');
        this.#_elHTML.classList.add('overflow-y-hidden');
        this.#_elBody.classList.add('overflow-y-hidden');
        this.#_elModalPanier.addEventListener('click', this.fermeModalPanier);
    }    
    
    #fermeModalPanier() {
        this.#_elModalPanier.classList.replace('modal--ouvert', 'modal--ferme');
        this.#_elHTML.classList.remove('overflow-y-hidden');
        this.#_elBody.classList.remove('overflow-y-hidden');
        this.#_elModalPanier.removeEventListener('click', this.fermeModalPanier);
    }
}