const keysPressed = document.querySelector('#keys-Pressed')

let recording = false;

recordButton = document.querySelector('#record-button');

recordButton.addEventListener('click', function() {
    if (recording === false) {
        recording = true;
        recordButton.textContent = 'Stop Recording';
    } else {
        recording = false;
        recordButton.textContent = 'Record Music';
    }

})


// Generic function to create a note object
function createNote(sound, description, time) {
    let noteObject = {
        note: sound,
        name: description,
        length: time
    }

    return noteObject;
}

// const Bb = document.querySelector('#Bb');


function storeNote(noteObject) {
    localStorage.setItem('playedNote', JSON.stringify(noteObject));
}

function createHTML(noteObject) {
    keyPressed = document.querySelector('#noteObject')

    if (keyPressed) {
        keyPressed.querySelector('h2').textContent = noteObject.note;
        keyPressed.querySelector('p').textContent = noteObject.name;
    } else {
        const note = document.createElement('div');
        note.setAttribute('id','noteObject');
    
        const key = document.createElement('h2');
        key.textContent = noteObject.note;
        
        const name = document.createElement('p');
        name.textContent = noteObject.name;
    
        note.appendChild(key); 
        note.appendChild(name);
    
        keysPressed.appendChild(note);
    }
    
}

// Logic to create a specific note object on key press or mouse click (event listeners for each keypress)
Bb.addEventListener('click', function() {
    // const startTime = Date.now();
    
    const note = new Audio('./assets/sounds/Bb.wav');
    note.play();

    // Bb.addEventListener('mouseup', function() {
    //     const endTime = Date.now();
    //     const playTime = endTime-startTime;
    //     console.log(playTime);
    // })

    playedNote = createNote(this.id,'B flat',0);

    storeNote(playedNote);

    createHTML(playedNote);

    if (recording) {
        console.log('recorded');
    } else {
        console.log('not recorded');
    }

});

Fsharp.addEventListener('click', function() {
    // const startTime = Date.now();
    
    const note = new Audio('./assets/sounds/Fsharp.wav');
    note.play();

    // Bb.addEventListener('mouseup', function() {
    //     const endTime = Date.now();
    //     const playTime = endTime-startTime;
    //     console.log(playTime);
    // })

    playedNote = createNote(this.id,'F sharp',0);

    storeNote(playedNote);

    createHTML(playedNote);

});

Eb.addEventListener('click', function() {
    // const startTime = Date.now();
    
    const note = new Audio('./assets/sounds/Eb.wav');
    note.play();

    // Bb.addEventListener('mouseup', function() {
    //     const endTime = Date.now();
    //     const playTime = endTime-startTime;
    //     console.log(playTime);
    // })

    playedNote = createNote(this.id,'E flat',0);

    storeNote(playedNote);

    createHTML(playedNote);

});


// FUNTION TO PULL SAVED SONGS FROM LOCAL STORAGE AND HAVE IT PLAY
const selectSong = document.querySelector('#saved');

function playSong(songId) {
    const savedSongs = JSON.parse(localStorage.getItem('songs')) || [];
    const song = savedSongs.find(song => song.id === songId);

    if(song) {
        let currentTime = 0;
        song.notes.forEach(note => {
            setTimeout(() => {
                const sound = new Audio(`./assets/sounds/${note.note}.wav`);
                sound.play();
                createHTML(note);
            }, currentTime);

            currentTime += note.length;
        });
    }
}

selectSong.addEventListener('change', function () {
    const selectedSongId = this.value;
    playSong(selectedSongId);
});

// FUNCTION TO PUT THE SAVED SONGS IN THE DROP DOWN
 function displaySavedSongs() {
    const savedSongs = JSON.parse(localStorage.getItem('songs')) || [];
    

    savedSongs.forEach((song, index) => {
        const option = document.createElement('option');
        option.value = song.id;
        option.textContent = `Song ${index + 1}`;
        selectSong.appendChild(option);
    });
 }