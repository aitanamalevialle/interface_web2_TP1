import { test, affirme } from './test.test.js';
import { livres } from '../scripts/livres.js';

export function valideFormatLivres() {
    for (const cle in livres) {
        test(`Valide le format de la structure du livre ${cle}`, function() {
            let estPresent = true,
                clesAbsentes = [];

            if (!livres[cle].hasOwnProperty('titre')) {
                estPresent = false;
                clesAbsentes.push('titre');
            }
            if (!livres[cle].hasOwnProperty('auteur')) {
                estPresent = false;
                clesAbsentes.push('auteur');
            }
            if (!livres[cle].hasOwnProperty('description')) {
                estPresent = false;
                clesAbsentes.push('description');
            }
            if (!livres[cle].hasOwnProperty('prix')) {
                estPresent = false;
                clesAbsentes.push('prix');
            }
            if (!livres[cle].hasOwnProperty('editeur')) {
                estPresent = false;
                clesAbsentes.push('editeur');
            }
            if (!livres[cle].hasOwnProperty('pages')) {
                estPresent = false;
                clesAbsentes.push('pages');
            }
            if (!livres[cle].hasOwnProperty('image')) {
                estPresent = false;
                clesAbsentes.push('image');
            }
            if (!livres[cle].hasOwnProperty('nouveaute')) {
                estPresent = false;
                clesAbsentes.push('nouveaute');
            }
            if (!livres[cle].hasOwnProperty('categorie')) {
                estPresent = false;
                clesAbsentes.push('categorie');
            }

            let nbCles = clesAbsentes.length;
            affirme(estPresent, `L${nbCles > 1 ? 'es' : 'a'} clé${nbCles > 1 ? 's' : ''} ${clesAbsentes.join(', ')} du livre ${cle} ${nbCles > 1 ? 'sont' : 'est'} absente${nbCles > 1 ? 's' : ''}`);
        });
    }
}