//Selectors for HTML elements of interest
const keysPressed = document.querySelector('#keys-Pressed')

// Logic used to determine whether the page is operating under "recording" or "not recording" behavior

let recording = false;

recordButton = document.querySelector('#record-button');

recordButton.addEventListener('click', function() {
    if (recording === false) {
        localStorage.removeItem('tempStorage');
        recording = true;
        recordButton.textContent = 'Stop Recording';
    } else {
        let recordingName = prompt('Please enter the name for your music recording')
        saveMusic(recordingName);
        recording = false;
        recordButton.textContent = 'Record Music';
        localStorage.removeItem('tempStorage');
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

// Function to store a note object to an array

function retrieveFromStorage() {
    const tempStorage = localStorage.getItem('tempStorage');
    let currentMusic;

    if (tempStorage) {
        currentMusic = JSON.parse(tempStorage);
    } else {
        currentMusic = [];
    }

    return currentMusic;
}

// Function to save an array of note objects to temporary storage (used for building HTML and holding played music when recording)
function storeNote(noteObject) {
    const tempStorage = retrieveFromStorage();

    if (recording) {
        tempStorage.push(noteObject);
    } else {
        if (tempStorage.length === 0) {
            tempStorage.push(noteObject);
        } else {
            tempStorage[0] = noteObject;
        }    
    }
    localStorage.setItem('tempStorage', JSON.stringify(tempStorage));
}

// Function to save an array of note objects from tempStorage into named storage
function saveMusic(recordingName) {
    const tempStorage = retrieveFromStorage();
    localStorage.setItem(recordingName,tempStorage);
}


// Function to create HTML elements to represent the notes held in localStorage under tempStorage
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
    const note = new Audio('./assets/sounds/Bb.wav');
    note.play();

    playedNote = createNote(this.id,'B flat');

    storeNote(playedNote);

    createHTML(playedNote);

});

Fsharp.addEventListener('click', function() {   
    const note = new Audio('./assets/sounds/Fsharp.wav');
    note.play();

    playedNote = createNote(this.id,'F sharp');

    storeNote(playedNote);

    createHTML(playedNote);

});

Eb.addEventListener('click', function() {

    const note = new Audio('./assets/sounds/Eb.wav');
    note.play();

    playedNote = createNote(this.id,'E flat');

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