//Selectors for all HTML 
const keysPressed = document.querySelector('#keys-Pressed')

// Logic used to determine whether the page is operating under "recording" or "not recording" behavior

    //Intialize variable which tracks the state
    let recording = false;
    let startTime = null;

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
            //clear the displayed noteObject(s), so that the user is clear they are starting fresh and reset startTime to null
            //for the next recording
            removeHTML();
            displaySavedSongs();
            startTime = null;
        }

    })

// Generic function to create a note object (using a new object vs. leveraging allNotes to allow for inclusion
// of other info such as length (and more in the future)
function createNote(sound, description, location, length = 1000) {
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
    if (recordingName) {
        const tempStorage = retrieveFromStorage();
        console.log("Saving music:", tempStorage);
        localStorage.setItem(recordingName, JSON.stringify(tempStorage));
        displaySavedSongs();
    }
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

//Function used to update the play time of the last played note object 
function updatePlayTime(playTime) {
    const tempStorage = retrieveFromStorage();
    tempStorage.at(-1).length = playTime;
    localStorage.setItem('tempStorage', JSON.stringify(tempStorage));
}
  

//Function to select the object from repository of notes (allNotes in our case) that matches the ID of the clicked key
function identifyNote(id, noteRepository) {
    return noteRepository.find(obj => obj.id === id);
};

//Function to be executed on clicking a piano key
function executePianoClick(clickedKey) {
    //Check if this is the first click since the recording has started and we are recording
    if (startTime === null && recording) {
        //If it is, we will not be updating the time of the previous note object, but we will start recording
        //time
        startTime = Date.now();

    }   else if (recording) {
        // If it is not and we have been recording, we also have to update the previous note with the appropriate time
        const oldStartTime = startTime;
        startTime = Date.now();
        const playTime = startTime - oldStartTime;
        updatePlayTime(playTime);
    }

    //We identify, play and add the current note to localStorage 
    //Use the identifyNote function to obtain the relevant object
    noteData = identifyNote("#"+clickedKey, allNotes);

    //create an audio object with the sound appropriate for the key
    const note = new Audio(noteData.url);
    //play the audio object
    note.play();

    //create a noteObject for the paino key pressed
    playedNote = createNote(noteData.id,noteData.text, noteData.url);

    //store the noteObjected in temporary storage (appropriate to recording or not recording state)
    storeNote(playedNote);

    //create the HTML elements to display
    createHTML();

}

// Event listeners for each key press. 

Dsharp.addEventListener('click', function() { 
    executePianoClick(this.id);

});

Fsharp.addEventListener('click', function() {   
    executePianoClick(this.id);

});

Asharp.addEventListener('click', function() {   
    executePianoClick(this.id);

});

Csharp.addEventListener('click', function() {   
    executePianoClick(this.id);

});

Gsharp.addEventListener('click', function() {   
    executePianoClick(this.id);

});

B.addEventListener('click', function() {   
    executePianoClick(this.id);

});

F.addEventListener('click', function() {   
    executePianoClick(this.id);

});

A.addEventListener('click', function() {   
    executePianoClick(this.id);

});

E.addEventListener('click', function() {   
    executePianoClick(this.id);

});

D.addEventListener('click', function() {   
    executePianoClick(this.id);

});

C.addEventListener('click', function() {   
    executePianoClick(this.id);

});

G.addEventListener('click', function() {   
    executePianoClick(this.id);

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
            if (note.note && note.url && note.name && note.length !== undefined) {
                const filePath = note.url;
                console.log("Attempting to play file:", note.url);

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

            currentTime += note.length;
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