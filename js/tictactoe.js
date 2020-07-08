alert('play tic tac toe'); //test

var allPlayers = [	
	{ 	'number' : 1,
		'mark' : 'X',
		'color' : 'bg-primary'
	},
	{
		'number' : 2,
		'mark' : 'O',
		'color' : 'bg-danger'
	}
];

var cells = [];
var player = 0;
var marks = 0;

function initCells() {
	for(var i = 0; i < 9; i++) {
		cells.push( document.getElementById('cell' + i));
	}
}

function startGame() {
	initCells();
	document.getElementById('player-turn').innerHTML = 'Player ' +allPlayers[player]['number']+ ' select a cell.';
}

function mark(nr) {
	marks++;
	//hidde button
	document.getElementById('select' + nr).classList.add('d-none');
	//mark selection
	cells[nr].classList.add(allPlayers[player]['color']);
	cells[nr].innerHTML = allPlayers[player]['mark'];

	checkBoard();
	//change player
	player = (player == allPlayers.length - 1) ? 0 : (player + 1);
	document.getElementById('player-turn').innerHTML = 'Player ' +allPlayers[player]['number']+ ' select a cell.';
}

function checkBoard() {
	var win = 0;
	var lineOffset = 3; // board dimention 3x3
	var cellOffset = 1; // row line
	checkLines( lineOffset, cellOffset);
}

function checkLines( lineOffset, cellOffset) {
	var nextCell = 1;
	var lastCell = cells.length;
	var match = 0;
	for( var i = 0; i < 3; i++) { // 3 for board dimention 3x3
		if( cells[i * lineOffset] != cells[nextCell * cellOffset] ) {
			match = 0;
			break; // no match found go to next line
		}
		match = 1;
	}
	
	return match;
}
