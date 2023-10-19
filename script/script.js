"use strict";

campoMinato();
function campoMinato(){

const btn = document.querySelector('.btn');
const sectionGrid = document.getElementById('section-grid');
const difficultySelection = document.getElementById('difficulty-selection');
const gameOverResult = document.querySelector('.alert');
let scope =  0;
const NUM_BOMBS = 16;

btn.addEventListener('click', play);

function play() {
    //reset variabili
    scope = 0;
        // *controlla se esiste già la grid 
    let firstChild = sectionGrid.firstChild;
    if(firstChild) sectionGrid.removeChild(firstChild);
    // crea e appende la grid 
    const grid = document.createElement('div');
    grid.classList.add('grid');
    sectionGrid.append(grid);
    //definisco la grandezza delle box
    let boxTotal = difficultySelection.value;
    if(boxTotal === '' || boxTotal === 'easy') boxTotal = 100;
    else if(boxTotal === 'medium') boxTotal = 81;
    else boxTotal = 49;
    // definisco le bombe
    const bombs = [];
    // definisco la locazione delle bombe
    while(bombs.length < NUM_BOMBS){
        let bomb = randomInteger(1, boxTotal);
        if(!bombs.includes(bomb)) bombs.push(bomb);
    }
    // creo le box 
    for(let i=0; i < boxTotal; i++){
        grid.append(newBox(i,boxTotal, bombs));
    }
    console.log(bombs);
};

/**
 * [newBox]
 * crea un box numerato, della grandezza calcolata per riempire correttamente una griglia, che se cliccato aggiunge una classe(per cambiare il bg color) e stampa il numero proprio
 * @param {number} totale
 * @param {number} index 
 * @returns {object}
 */
function newBox(index,totale,bombs){

    const box = document.createElement('div');
    box.innerHTML = index + 1;
    box.classList.add('box');
    box.style.width = `calc(100% / ${Math.sqrt(totale)})`;
    box.style.height = `calc(100% / ${Math.sqrt(totale)})`;
    console.log(box.style.width);
    let maxScope = totale - NUM_BOMBS;
    //click
    box.addEventListener('click', boxClicked);
    function boxClicked() {
        if (bombs.includes(index)) {
            this.classList.add('bomb');
            this.innerHTML = `<i class="fa-solid fa-bomb fa-beat-fade fa-lg"></i>`;
            //blocca click
            const allBoxes = document.querySelectorAll('.box');
            for (let i = 0; i < totale; i++) {
                console.log(allBoxes[i]);
                if(i !== index)allBoxes[i].removeEventListener('click', boxClicked);
            }
            gameOverResult.innerHTML = `HAI PERSO, IL TUO PUNTEGGIO E': <strong>${scope}/${maxScope}</strong>`;
            gameOverResult.classList.add('alert-danger');
        } else {
            if (!this.classList.contains('clicked')) scope++;
            this.classList.add('clicked');
            console.log(`hai cliccato la casella: ${index + 1}`);
            if (scope === maxScope) {
                gameOverResult.innerHTML = `HAI VINTO, IL TUO PUNTEGGIO E': <strong>${scope}/${maxScope}</strong>`;
                gameOverResult.classList.add('alert-primary');
            }
            console.log(scope);
        }
        this.removeEventListener('click', boxClicked);
    }

    return box;
}
}