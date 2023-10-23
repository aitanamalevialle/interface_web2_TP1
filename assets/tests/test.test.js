/**
 * Appelle dans le bloc try la fonction de test à exécuter reçue en deuxième paramètre,
 * puis injecte sa description reçue en premier paramètre ainsi que le message personnalisé lancé en cas d’exception, celui-ci attrapé dans le bloc catch.
 * @param {String} description 
 * @param {Function} callback 
 */
export function test(description, callback) {
    try {
        callback();
        console.log(`✅ ${description}`);
    } catch (err) {
        console.error(`❌ ${description}`);
        console.error(err);
    }
};

/**
 * Si la condition reçue en premier paramètre est false, une instance de l’objet Error est lancée (throw) avec le message personnalisé reçu en deuxième paramètre. 
 * @param {Boolean} condition 
 * @param {String} messageErreur 
 */
export function affirme(condition, messageErreur) {
    if (!condition) {
        throw new Error(messageErreur);
    }
};