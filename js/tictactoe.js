alert('play tic tac toe'); //test

var player = 0;
var cells = [];

function startGame() {
	player = 1;
	document.getElementById('player-turn').innerHTML = 'Player ' +player+ ' select a cell.';
}

function mark(nr) {

	//disable button
	document.getElementById('select' + nr).classList.add('d-none');
	if( player == 1) {//player1 mark
		document.getElementById('cell' + nr).classList.add('bg-primary');
		document.getElementById('cell' + nr).innerHTML = 'X';
		player = 2; // chnage player
	} else {//player2 mark
		document.getElementById('cell' + nr).classList.add('bg-danger');
		document.getElementById('cell' + nr).innerHTML = 'O';
		player = 1; //change player
	}

	chekcBoard();
	document.getElementById('player-turn').innerHTML = 'Player ' +player+ ' select a cell.';
}

function chekcBoard() {
	checkHorizontals();
	checkVerticals();
	checkDiagonals();
}

function checkHorizontals(){

}

function checkVerticals(){

}

function checkDiagonals(){

}
