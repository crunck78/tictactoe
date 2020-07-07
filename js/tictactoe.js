alert('play tic tac toe'); //test

function mark(nr) {
	document.getElementById('select' + nr).classList.add('d-none');
	document.getElementById('cell' + nr).classList.add('bg-primary');
	document.getElementById('cell' + nr).innerHTML = 'X';
}
