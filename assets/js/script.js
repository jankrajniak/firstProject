const dropdownButton = document.getElementById('dropdownMenuButton');
const greenTheme = document.getElementById('greenTheme');
const redTheme = document.getElementById('redTheme');
const blueTheme = document.getElementById('blueTheme');
const normalTheme = document.getElementById('normalTheme');

function changeTheme(color, themeName) {
document.body.style.backgroundColor = color;
dropdownButton.textContent = themeName;
}

greenTheme.addEventListener('click', function(){
    changeTheme('green', 'Green');
});
redTheme.addEventListener('click', function(){
    changeTheme('red', 'Red');
});
blueTheme.addEventListener('click', function(){
    changeTheme('blue', 'Blue');
});
normalTheme.addEventListener('click', function(){
    changeTheme('', 'Select Theme');
});