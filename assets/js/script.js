const dropdownButton = document.getElementById('dropdownMenuButton');
const greenTheme = document.getElementById('greenTheme');
const redTheme = document.getElementById('redTheme');
const blueTheme = document.getElementById('blueTheme');
const normalTheme = document.getElementById('normalTheme');
const modalTitle = document.querySelector('.modal-title')

const piano = document.getElementById(`piano`);

function changeTheme(themeClass, themeName) {
    piano.classList.remove(`green-theme`, `red-theme`, `blue-theme`, `normal-theme`);

    if (themeClass) {
        piano.classList.add(themeClass);
    }

dropdownButton.textContent = themeName;
}

greenTheme.addEventListener('click', function(){
    changeTheme('green-theme', 'Green');
});
redTheme.addEventListener('click', function(){
    changeTheme('red-theme', 'Red');
});
blueTheme.addEventListener('click', function(){
    changeTheme('blue-theme', 'Blue');
});
normalTheme.addEventListener('click', function(){
    changeTheme('', 'Select Theme');
});

// modalTitle.textContent('instructions')