//Selectors for all HTML 
const keysPressed = document.querySelector('#keys-Pressed')

// Logic used to determine whether the page is operating under "recording" or "not recording" behavior

    //Intialize variable which tracks the state
    let recording = false;

    //Select the html element (button) which the user clicks to start recording music
    recordButton = document.querySelector('#record-button');

    //Add an event listenered to the button
    recordButton.addEventListener('click', function() {
        // If the "state" was "not recording" before the click, thus we are starting recording
        if (recording === false) {
            //Clear all the previously displayed noteObject, so that the user is clear on which notes
            //are being recorderd
            removeHTML();
            //remove the last unrecorded note from temporary storage so that it isn't included in the recording
            localStorage.removeItem('tempStorage');
            //set the recording variable to true to that functions behave in the "recording" state
            recording = true;
            //change the text of the recording button to show that it's the button to be pushed to stop the recording
            recordButton.textContent = 'Stop Recording';
        // Otherwise the state could only be "recording", thus we are stopping recording
        } else {
            //prompt the user for a name for their music
            let recordingName = prompt('Please enter the name for your music recording')
            //save the recording into local storage under the inputted name
            saveMusic(recordingName);
            //change state to "not recording"
            recording = false;
            //change the text of the record button back to 'Record Music"
            recordButton.textContent = 'Record Music';
            //clear temporary storage so that the display for the user is cleared
            localStorage.removeItem('tempStorage');
            //clear the displayed noteObject(s), so that the user is clear they are starting fresh
            removeHTML();
            displaySavedSongs();
        }

    })

// Generic function to create a note object
function createNote(sound, description, location, length = 1) {
    let noteObject = {
        note: sound,
        name: description,
        url: location,
        length: length
    };
console.log("Created Note Object:", noteObject);
    return noteObject;
}

// Function to retrieve noteObject(s) pressed stored in temporary storage
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

// Function to update the temporary storage with a noteObject
function storeNote(noteObject) {
    //retrieve noteObjects in local storage
    const tempStorage = retrieveFromStorage();
    console.log("storing note object:", noteObject);
    //If recording, append the noteObject to temporary storage    console.log("storing note object:", noteObject);

    if (recording) {
        tempStorage.push(noteObject);
    //If not recording, replace the ONLY noteObject in temporary storage
    } else {
        if (tempStorage.length === 0) {
            tempStorage.push(noteObject);
        } else {
            tempStorage[0] = noteObject;
        }    
    }
    //Save new temporary storage to local storage
    localStorage.setItem('tempStorage', JSON.stringify(tempStorage));
}

// Function to save an array of note objects from tempStorage into named storage
function saveMusic(recordingName) {
    const tempStorage = retrieveFromStorage();
    console.log("Saving music:", tempStorage);
    localStorage.setItem(recordingName, JSON.stringify(tempStorage));
    displaySavedSongs();
}


//Function to clear all HTML elements with class noteObject from the 'keys-pressed' div, 
//so that the display can be refreshed
function removeHTML () {
    const notesDisplayed = document.querySelectorAll('.noteObject')
    notesDisplayed.forEach(element => {
        element.remove();
})
}

// Function to create HTML elements to represent the notes held in localStorage under tempStorage
function createHTML(noteObject = null) {
    if (noteObject) {
        const note = document.createElement('div');
        note.setAttribute('class', 'noteObject');

        const key = document.createElement('h2');
        key.textContent = noteObject.note;

        const name = document.createElement('p');
        name.textContent = noteObject.name;

        note.appendChild(key);
        note.appendChild(name);

        keysPressed.appendChild(note);
    } else {
    //Clear HTML of noteOBject(s)
    removeHTML();

    const tempStorage = retrieveFromStorage();

        tempStorage.forEach(noteObject => {
            const note = document.createElement('div');
            note.setAttribute('class','noteObject');
        
            const key = document.createElement('h2');
            key.textContent = noteObject.note;
            
            const name = document.createElement('p');
            name.textContent = noteObject.name;
        
            note.appendChild(key); 
            note.appendChild(name);
        
            keysPressed.appendChild(note);
        });
    }   
}

// Event listeners for each key press. These listeners repeat for each notes, comments will only be included
// on the first one
Bb.addEventListener('click', function() {  
    console.log("Bb key clicked");
    filename = './assets/sounds/Bb.wav'
    //create an audio object with the sound appropriate for the key
    const note = new Audio(filename);
    //play the audio object
    note.play();

    //create a noteObject for the paino key pressed
    playedNote = createNote(this.id,'Note B in flat',filename);

    //store the noteObjected in temporary storage (appropriate to recording or not recording state)
    storeNote(playedNote);

    //create the HTML elements to display
    createHTML();

});

Fsharp.addEventListener('click', function() {   
    filename = './assets/sounds/Fsharp.wav'
    const note = new Audio(filename);
    note.play();

    playedNote = createNote(this.id,'Note F in sharp',filename);

    storeNote(playedNote);

    createHTML();

});

Eb.addEventListener('click', function() {   
    filename = './assets/sounds/Eb.wav'
    const note = new Audio(filename);
    note.play();

    playedNote = createNote(this.id,'Note E in flat',filename);

    storeNote(playedNote);

    createHTML();

});

Csharp.addEventListener('click', function() {   
    filename = './assets/sounds/Csharp.wav'
    const note = new Audio(filename);
    note.play();

    playedNote = createNote(this.id,'Note C in sharp',filename);

    storeNote(playedNote);

    createHTML();

});

Gsharp.addEventListener('click', function() {   
    filename = './assets/sounds/Gsharp.wav'
    const note = new Audio(filename);
    note.play();

    playedNote = createNote(this.id,'Note G in sharp',filename);

    storeNote(playedNote);

    createHTML();

});

B.addEventListener('click', function() {   
    filename = './assets/sounds/B.wav'
    const note = new Audio(filename);
    note.play();

    playedNote = createNote(this.id,'Note B',filename);

    storeNote(playedNote);

    createHTML();

});

F.addEventListener('click', function() {   
    filename = './assets/sounds/F.wav'
    const note = new Audio(filename);
    note.play();

    playedNote = createNote(this.id,'Note F',filename);

    storeNote(playedNote);

    createHTML();

});

A.addEventListener('click', function() {   
    filename = './assets/sounds/A.wav'
    const note = new Audio(filename);
    note.play();

    playedNote = createNote(this.id,'Note A',filename);

    storeNote(playedNote);

    createHTML();

});

E.addEventListener('click', function() {   
    filename = './assets/sounds/E.wav'
    const note = new Audio(filename);
    note.play();

    playedNote = createNote(this.id,'Note E',filename);

    storeNote(playedNote);

    createHTML();

});

D.addEventListener('click', function() {   
    filename = './assets/sounds/D.wav'
    const note = new Audio(filename);
    note.play();

    playedNote = createNote(this.id,'Note D',filename);

    storeNote(playedNote);

    createHTML();

});

C.addEventListener('click', function() {   
    filename = './assets/sounds/C.wav'
    const note = new Audio(filename);
    note.play();

    playedNote = createNote(this.id,'Note C',filename);

    storeNote(playedNote);

    createHTML();

});

G.addEventListener('click', function() {   
    filename = './assets/sounds/G.wav'
    const note = new Audio(filename);
    note.play();

    playedNote = createNote(this.id,'Note G',filename);

    storeNote(playedNote);

    createHTML();

});


// FUNTION TO PULL SAVED SONGS FROM LOCAL STORAGE AND HAVE IT PLAY
const selectSong = document.querySelector('#saved');

function playSong(songId) {

    const song = JSON.parse(localStorage.getItem(songId));

    console.log("Retrieved Song from localStorage:", song);


    if(song && Array.isArray(song)) {
        removeHTML();
        let currentTime = 0;

        song.forEach(note => {
            console.log("checking note:", note);
            if (note.note && note.name && note.length !== undefined) {
                let fileName = note.note.replace(/[-]/g, '');
                const filePath = `./assets/sounds/${fileName}.wav`;
                console.log("Attempting to play file:", filePath);

                 const sound = new Audio(filePath);


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