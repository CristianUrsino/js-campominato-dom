# js-campominato-dom
Il computer genera 16 numeri casuali nello stesso range della difficoltà ( difficoltà 1 ⇒ 100 caselle, diifficoltà 2 ⇒ 81 caselle, difficoltà 3 ⇒ 49 caselle) prescelta: le bombe. nella stessa cella può essere posizionata al massimo una bomba.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software comunica il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
Quando si clicca su una bomba e finisce la partita, non si possono cliccare altre celle. Non si può cliccare 2 volte sulla stessa cella.
Quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste.