"use strict";

campoMinato();
function campoMinato(){

const btn = document.querySelector('.btn');
const sectionGrid = document.getElementById('section-grid');
const difficultySelection = document.getElementById('difficulty-selection');
const gameOverResult = document.querySelector('.alert');
let scope =  0;
const NUM_BOMBS = 16;
let bombs = [];
let flagLose = false;
let maxScope = 0;

btn.addEventListener('click', play);

function play() {
    variableReset();
    // crea e appende la grid 
    const grid = document.createElement('div');
    grid.classList.add('grid');
    sectionGrid.append(grid);
    //definisco la grandezza delle box
    let boxTotal = gridSize();
    console.log(boxTotal)
    // definisco la locazione delle bombe
    bombsAllocation(boxTotal);
    // creo le box 
    for(let i=0; i < boxTotal; i++){
        grid.append(newBox(i,boxTotal));
    }
    console.log(bombs);
};

/**
 * [variableReset]
 * resetta le variabili per evitare duplicazioni ed errori
 */
function variableReset(){
    flagLose = false;
    scope = 0;
    let firstChild = sectionGrid.firstChild;
    if(firstChild) sectionGrid.removeChild(firstChild);
    gameOverResult.className = 'alert';
    gameOverResult.innerHTML = '';
    bombs = [];
}

/**
 * [gridSize]
 * crea la griglia della dimenzione scelta dall'utente
 */
function gridSize (){
    let size = difficultySelection.value;
    if(size === '' || size === 'easy') return 100;
    else if(size === 'medium') return  81;
    else return 49;
}

/**
 * [bombsAllocation]
 * sceglie casulmente la locazione della bombe
 * @param {Array number} bombs
 * @param {number} boxTotal
 */
function bombsAllocation(boxTotal) {
    while (bombs.length < NUM_BOMBS) {
        let bomb = randomInteger(0, boxTotal - 1);
        if (!bombs.includes(bomb)) {
            bombs.push(bomb); 
        }
    }
}

/**
 * [newBox]
 * crea un box numerato, della grandezza calcolata per riempire correttamente una griglia, che se cliccato aggiunge una classe(per cambiare il bg color) e stampa il numero proprio
 * @param {number} totale
 * @param {number} index 
 * @returns {object}
 */
function newBox(index,totale){
    const box = document.createElement('div');
    box.innerHTML = index + 1;
    box.classList.add('box');
    box.style.width = `calc(100% / ${Math.sqrt(totale)})`;
    box.style.height = `calc(100% / ${Math.sqrt(totale)})`;
    console.log(box.style.width);
    maxScope = totale - NUM_BOMBS;
    box.addEventListener('click', boxClicked);
    return box;
}

/**
 * [boxClicked]
 * al click di un box controlla se in esso è presente o meno una bomba, poi disattiva il click per il box attivato, tutto questo affinchè il gioco non sia finito
 */
function boxClicked() {
    console.log(this.innerHTML);
    if(flagLose) return;
    if (bombs.includes(parseInt(this.textContent - 1))) {
        bombClicked(this);
    } else {
        safeBoxClicked(this);
    }
    this.removeEventListener('click', boxClicked);
}

/**
 * [bombClicked]
 * evidenzia la presenza della bomba, blocca attraverso la flag i prossimi click, e fa visualizzare le altre bombe nel campo 
 * @param {object} boxActual
 */
function bombClicked(boxActual){
    boxActual.classList.add('bomb');
    boxActual.innerHTML = `<i class="fa-solid fa-bomb fa-beat-fade fa-lg"></i>`;
        gameOverResult.innerHTML = `HAI PERSO, IL TUO PUNTEGGIO E': <strong>${scope}/${maxScope}</strong>`;
        gameOverResult.classList.add('alert-danger');
        flagLose = true;
        const allBoxes = document.querySelectorAll('.box');
        setTimeout(function(){
            for(let i = 0; i < allBoxes.length; i++){
                if (bombs.includes(i)){
                    allBoxes[i].classList.add('bomb');
                    allBoxes[i].innerHTML = `<i class="fa-solid fa-bomb fa-beat-fade fa-lg"></i>`;
                }
            }
        },1000);
}

/**
 * [safeBoxClicked]
 * evidenzia il box, incrementa lo scope affinchè non sia arrivato al massimo in tal caso blocca il gioco
 * @param {object} boxActual
 */
function safeBoxClicked(boxActual) {
    if (!boxActual.classList.contains('clicked')) scope++;
    boxActual.classList.add('clicked');
        console.log(`hai cliccato la casella: ${parseInt(boxActual.innerHTML)}`);
        if (scope === maxScope) {
            flagLose = true;
            gameOverResult.innerHTML = `HAI VINTO, IL TUO PUNTEGGIO E': <strong>${scope}/${maxScope}</strong>`;
            gameOverResult.classList.add('alert-primary');
        }
        console.log(scope);
}

}
