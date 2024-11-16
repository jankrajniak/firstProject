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

        displaySavedSongs();
    }

})

// Generic function to create a note object
function createNote(sound, description, length = 1) {
    let noteObject = {
        note: sound,
        name: description,
        length: length
    };
console.log("Created Note Object:", noteObject);
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
    console.log("storing note object:", noteObject);

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
    console.log("Saving music:", tempStorage);
    localStorage.setItem(recordingName, JSON.stringify(tempStorage));
    displaySavedSongs();
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
    console.log("Bb key clicked");
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

    const song = JSON.parse(localStorage.getItem(songId));

    console.log("Retrieved Song from localStorage:", song);


    if(song && Array.isArray(song)) {
        let currentTime = 0;

        song.forEach(note => {
            console.log("checking note:", note);
            if (note.note && note.name && note.length !== undefined) {
                let fileName = note.note.replace(/[-]/g, '');
                const filePath = `./assets/sounds/${fileName}.wav`;
                console.log("Attempting to play file:", filePath);
// Check if file exists and create the Audio object
const sound = new Audio(filePath);
// sound.play();

sound.addEventListener('error', () => {
    console.error("Audio file not found or format not supported:", filePath);
});
        
            setTimeout(() => {
                sound.play().then(() => {
                    console.log(`${note.note} is playing`);
                 }).catch(err => {
                    console.error("Audio playback error:", err);
                });
                
                createHTML(note);
            }, currentTime);

            currentTime += note.length *1000;
        } else {
            console.error("INvalid note object:", note);
        }
        });
    } else {
        console. error("Invalid song data:", song);
    }
}

selectSong.addEventListener('change', function () {
    const selectedSongId = this.value;
    console.log("Selected songId:", selectedSongId);
    playSong(selectedSongId);
   });

// FUNCTION TO PUT THE SAVED SONGS IN THE DROP DOWN
 function displaySavedSongs() {
    const defaultOption = document.createElement('option');
   selectSong.innerHTML = '';
   defaultOption.value = '';
   defaultOption.textContent = 'Select a Song';
   defaultOption.disabled = true;
   defaultOption.selected = true;
   selectSong.appendChild(defaultOption);
   
   for (let i = 0; i <localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key !== 'tempStorage' && key !== 'songs') {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = key;
        selectSong.appendChild(option);
    }
   }
 }
document.addEventListener('DOMContentLoaded', displaySavedSongs);