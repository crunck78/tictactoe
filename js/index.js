function getGridDimention(){
    console.log('Page Loaded.');
    document.getElementById('game-mode-selection').innerHTML = 'Select Grid Size';
}

function setGridSize(size){
    console.log('User selected grid dimention ' +size+'x'+size);
    document.getElementById('grid-selection').classList.add('d-none');
    document.getElementById('start-grid'+size).classList.remove('d-none');
}

function goToGrid(path){
    window.location.href = path;
}
