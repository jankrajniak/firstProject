//Building basic resources and checking to see if the sounds will play

// alert('LEARN HOW TO PLAY PIANO');
// alert('CLICK ON EACH KEY TO HEAR THE NOTE');
// alert('RECORD YOUR MUSIC AND PLAY IT BACK LATER');

const Bb = document.querySelector('#Bb');
const Fsharp = document.querySelector('#F-sharp');
const Eb = document.querySelector('#Eb');
const Csharp = document.querySelector('#C-sharp');
const Gsharp = document.querySelector('#G-sharp');
const B = document.querySelector('#B');
const F = document.querySelector('#F');
const A = document.querySelector('#A');
const E = document.querySelector('#E');
const D = document.querySelector('#D');
const C = document.querySelector('#C');
const G = document.querySelector('#G');



// Bb.addEventListener('click', function() {
//     const note = new Audio('./assets/sounds/Bb.wav');
//     console.log(Bb.id);
//     console.log(Bb.id+'.wav');
//     note.play();
// });

// Fsharp.addEventListener('click', function() {
//     const note = new Audio('./assets/sounds/Fsharp.wav');
//     note.play();
// });

Eb.addEventListener('click', function() {
    const note = new Audio('./assets/sounds/Eb.wav');
    note.play();
});

Csharp.addEventListener('click', function() {
    const note = new Audio('./assets/sounds/Csharp.wav');
    note.play();
});

Csharp.addEventListener('click', function() {
    const note = new Audio('./assets/sounds/Csharp.wav');
    note.play();
});

Gsharp.addEventListener('click', function() {
    const note = new Audio('./assets/sounds/Gsharp.wav');
    note.play();
});

B.addEventListener('click', function() {
    const note = new Audio('./assets/sounds/B.wav');
    note.play();
});

F.addEventListener('click', function() {
    const note = new Audio('./assets/sounds/F.wav');
    note.play();
});

A.addEventListener('click', function() {
    const note = new Audio('./assets/sounds/A.wav');
    note.play();
});

E.addEventListener('click', function() {
    const note = new Audio('./assets/sounds/E.wav');
    note.play();
});

D.addEventListener('click', function() {
    const note = new Audio('./assets/sounds/D.wav');
    note.play();
});

C.addEventListener('click', function() {
    const note = new Audio('./assets/sounds/C.wav');
    note.play();
});

G.addEventListener('click', function() {
    const note = new Audio('./assets/sounds/G.wav');
    note.play();
});

