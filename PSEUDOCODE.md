#User opens page and sees the basic elements displayed - header, piano, key-press tracker and music saving controls
    1. All the sounds get downloaded to the users local storage
    2. Prompt with a quick description of the site functionality
    3. CSS stylesheet is applied to the HTML

#User starts clicking on keys to play music. After they click on a key:
   1. We need to have a listener event for each key element (div) for "mousedown"
   2. When the event is triggered, a "note" object is created and added to an array of note objects at the index 0
   3. We start a timer to track how long the key was pressed and how long the sound played 
    ##1. Key changes style visually to show it was pressed
    1. CSS theme for the key has to be temporarily changed to a different theme (theme selector the same way Tish demonstrated in class for the toggle button)
    ##2. Box displays the key that was pressed (by key we mean note)
        ###i) It will be a new div element
        1. A div element is automatically generated to display the content of the "note" object.
        ###ii) It will have a header that shows the note in the style of (Bb)
        1. The Div will contain a Header with the note from the "note object"
        ###iii) It will have a paragraph that displays the name of the note (B-flat)
        1. The P element will have the descriptive text from the "Note" object
        ###iv) When in recording mode, each new div element is displayed in a flex wrapper (set to wrap)
    ##3. Music plays
   1. play a sound from the local storage based on the "note" objects "sound-name" attribute
    ##4. Key returns back to original styling
    1. we have an event listener for "mouseup". When the even happens
        i) CSS theme is reverted back to starting (same as when we use mousedown)
        ii) we record the time during which the key was pressed 
        iii) music stops playing 
    ##5. The process restarts fresh

#User can press the record button to save their music
    ##1. When the record button is pushed, it changes to display "Stop Recording"
    1. Event listener for button click
    2. When the listener is trigger, the text of the button is automatically changed
    3. While loop gets kicked off (turn some sort of variable to "true")
    ##2. Each piano key click is recorded as a new div element and displayed in a flex wrapper
    1. We create a new note object and we increase our object counter
    2. BUT when recording we add the object to the array at the new index (so that way we are not overwriting the object, but continuing to grow the array)
    3. We automatically build and append a new div element based on the content of the object
    ##3. This continues until stop recording is pressed
    1. Even listener for button click. Which changes some variable to false so that while loop stops
    2. Change the button back to start recording 
    ##4. Pop-up appears, asking user if they want to save the recording or no
    1. confirm pop up
    ##5. If they say no, nothing happens
    1. Clear the box showing the notes and reset the counter to 0
    ##6. If they say yes:
        1. Prompt user to enter name of recording
        ###2. Save list of pressed keys in local storage
        1. Function that saves the array of note objects in local storage (along with the name) 
        ###3. Add the name of the music to the list of selections for the saved music list
        1. Automatically creates an option in the dropdown selector of saved music based on the name provided by the user
        2. Clear the box showing the notes and reseet the counter to 0
        
#User can select recorded music from the list:
    ##1. They have an option to play the music (when option is selected, prompt user with a popup)
    ##2. They have an option to delete the music (stretch goal: through CSS pseudo-class ::after??)
            1. Assuming there is a listener for the drop down list selection (stretch goal - instead of a drop down list, create a button that opens a menu with a list of all the saved musics in the style of the W3 navigation button that opens a new page on click but then takes you back to the original view)
            2. When we click on an option, we get a pop-up confirm to play/delete/cancel
            3. If play
                function that reads the array, and plays the sound of each note object for as long as the key was pressed for it (read first note object in array, play the sound for corresponding note, change the styling of the note accordingly, after timer expires stop playing, move on to the next object in the array)
            Else if delete
                function that removes that particular music piece from local storage
            Else if cancel
                 does nothing and returns to main view 

    
