/** *
 *[randomInteger] 
 *Presi due numeri calcola un numero randomico nel range di essi
 *@param {number} min
 *@param {number} max
 *@returns {number}
*/
function randomInteger(min,max){
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

/** *
 *[checkPalindroma] 
 *Presa una stringa controlla se è palindroma (ritorna true) o se non è palindroma (ritorna false)
 *@param {string} _world
 *@returns {boolean}
*/
function checkPalindroma(_world) {
    _world = _world.toLowerCase();
    _world = _world.split(" ").join("");
    _world = Array.from(_world);
    let j = 0;
    for(let i = _world.length-1; i >= 0; i-- ){
        if(_world[j] !== _world[i]){
            return false;
        }
        j++;
    }
    return true;
}

/** *
 *[pari] 
 *preso un numero controlla che sia pari
 *@param {number} x
 *@returns {boolean} se pari 'true' altrimenti 'false'
*/
function pariODispari(x){
    return (x % 2 === 0) ? true : false;
}