alert('play tic tac toe'); //test

var allPlayers = [	
	{ 	'number' : 1,
		'mark' : 'X',
		'color' : 'bg-primary',
		'markCount' : 0 
	},
	{
		'number' : 2,
		'mark' : 'O',
		'color' : 'bg-danger',
		'markCount' : 0 
	}
];

var cells = [];
var player = 0;
var allMarks = 0; // keep track of how many cells have been selected, if all cells have been marked and win is false then game over, it is a tie
var foundWinner = false; // if true game over, announce winner, if false and not all cells have been marked game is still on progress

function startGame() {
	initCells();
	document.getElementById('player-turn').innerHTML = 'Player ' +allPlayers[player]['number']+ ' select a cell.';
}

function initCells() {
	var cell = 0;
	for(var i = 0; i < 3; i++) { // grid dimention 3x3
		for(var j = 0; j < 3; j++) {
			cells.push( [i,document.getElementById('cell' + (cell))] );
			cell++;
		}
	}
}

function mark(col,row) {
	//allMarks++;
	document.getElementById('select' + nr).classList.add('d-none');//hidde button

	console.log( 'Player ' +allPlayers[player]['number']+ ' move results:');
	console.log('selected cell: ' +nr );
	allPlayers[player]['markCount'] = allPlayers[player]['markCount'] + 1;
	console.log('marked cells so far: '+allPlayers[player]['markCount']);
	cells[col][row].classList.add(allPlayers[player]['color']);//mark selection
	cells[col][row].innerHTML = allPlayers[player]['mark'];//mark selection

	if( allPlayers[player]['markCount'] >= 3) { // at least required marks to check for a win equals grid dimetion
		console.log('Checking grid for player '+allPlayers[player]['number'] );
		foundWinner = checkGrid();
	}
	if(foundWinner) {
		//hidde remaning buttons
		alert('Player '+allPlayers[player]['number']+' has won the Game!!');
		//anounce winner
	} else{ //change player
		player = (player == allPlayers.length - 1) ? 0 : (player + 1);
		document.getElementById('player-turn').innerHTML = 'Player ' +allPlayers[player]['number']+ ' select a cell.';
	}
}

function checkGrid() {
	
}

function checkRows() {

}

function checkColumns() {


}

function checkDiagonals(){

}