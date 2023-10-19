"use strict";

campoMinato();
function campoMinato(){

const btn = document.querySelector('.btn');
const sectionGrid = document.getElementById('section-grid');
const difficultySelection = document.getElementById('difficulty-selection');

btn.addEventListener('click', function(){
    // controlla se esiste già la grid 
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
    const NUM_BOMBS = 16;
    const bombs = [];
    // definisco la locazione delle bombe
    while(bombs.length < NUM_BOMBS){
        let bomb = randomInteger(1, boxTotal);
        if(!bombs.includes(bomb)) bombs.push(bomb);
    }
    // creo le box 
    for(let i=0; i < boxTotal; i++){
        grid.append(newBox(i,boxTotal));
    }
});

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
    box.addEventListener('click', function(){
        box.classList.add('clicked');
        console.log(`hai cliccato la casella: ${index + 1}`);
    });
    return box
}
}