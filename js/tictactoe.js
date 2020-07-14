var allPlayers = [	
	{ 	'number' : 1,
		'mark' : 'X',
		'color' : 'bg-primary',
		'markCount' : 0,
		'wins' : 0
	},
	{
		'number' : 2,
		'mark' : 'O',
		'color' : 'bg-danger',
		'markCount' : 0,
		'wins' : 0
	},
	{ 	'number' : 3,
		'mark' : 'Y',
		'color' : 'bg-warning',
		'markCount' : 0,
		'wins' : 0
	},
	{
		'number' : 4,
		'mark' : 'H',
		'color' : 'bg-success',
		'markCount' : 0,
		'wins' : 0
	}
];

var maxPlayers = 0; //controls allPlayers JSON depending on what grid size is selected, each grid size can have only a particular number of players

var cells = [];
var selections = [];
var gridDimention;
var gridSize; // equals gridDimention * gridDimention

var actualPlayer = 0;
var allMarks = 0; // keep track of how many cells have been selected, if all cells have been marked and win is false then game over, it is a tie
var foundWinner = false; // if true game over, announce winner, if false and not all cells have been marked game is still on progress
var tie = false; // grid full and no winning line

function startGame(selectedDimention, players) {
	maxPlayers = players;
	gridDimention = selectedDimention;
	gridSize = gridDimention * gridDimention;
	initGrid();
	document.getElementById('player-turn').innerHTML = 'Player ' +allPlayers[actualPlayer]['number']+ ' select a cell.';
}

function initGrid() {
	for(var i = 0; i < gridSize; i++) { // grid dimention 3x3
		cells.push(document.getElementById('cell' + i));
		selections.push(document.getElementById('select' + i));
	}
}

function mark(nr) {
	//allMarks++;
	selections[nr].classList.add('d-none');//hidde button
	allPlayers[actualPlayer]['markCount']++;
	cells[nr].classList.add(allPlayers[actualPlayer]['color']);//mark selection
	cells[nr].innerHTML = allPlayers[actualPlayer]['mark'];//mark selection
	if( allPlayers[actualPlayer]['markCount'] >= gridDimention) { // at least required marks to check for a win equals grid dimention
		foundWinner = checkGrid();
	}
	if(foundWinner) {
		hiddeUnselectedButtons();
		allPlayers[actualPlayer]['wins']++;
		document.getElementById('new-game').classList.remove('d-none');
		document.getElementById('player-turn').innerHTML = 'Player ' +allPlayers[actualPlayer]['number']+ ' has won the Game.';
	} else { //change player
		actualPlayer = (actualPlayer == maxPlayers - 1) ? 0 : (actualPlayer + 1);
		document.getElementById('player-turn').innerHTML = 'Player ' +allPlayers[actualPlayer]['number']+ ' select a cell.';
	}
}

function hiddeUnselectedButtons(){
	for(var i = 0; i < gridSize; i++)
	{
		if(selections[i].classList.contains('d-none')){
			continue;
		}
		selections[i].classList.add('d-none');
	}
}

function checkGrid() {
	
	var win = checkLines( 1, gridDimention ); //columns check
	if(win == 0){
		win = checkLines( gridDimention, 1); // rows check
		if( win == 0 ){
			win = checkDiagonals();
		}
	}
	return win;
}

function checkLines( lineOffset, cellOffset) {
	for( var i = 0; i < gridDimention; i++){
		// preset variables for line check and next cell check
		var match = 0;
		var firstCell = i * lineOffset;
		var nextCell = firstCell + cellOffset;
		var lastCell = firstCell +  (gridDimention - 1) * cellOffset;
		while( nextCell <= lastCell){
			if(cells[ firstCell ].innerHTML != cells[ nextCell ].innerHTML){ // no match, go to next line
				match = 0;
				break;
			}
			match++;
			nextCell += cellOffset;
		}
		if(match != 0){ // found winning line;
			return match;
		}
	}
	return match;
}

function checkDiagonals(){
	var match = 0;
	var firstCell = 0;
	var nextCell = firstCell + (gridDimention + 1);
	var lastCell = gridSize - 1;
	for( var i = 0; i < 2; i++){ // any gridDimention has only 2 diagonals
		
		while( nextCell <= lastCell){
			if(cells[ firstCell ].innerHTML != cells[ nextCell ].innerHTML){ // no match, go to next line
				match = 0;
				firstCell = gridDimention - 1;
				nextCell = firstCell + (gridDimention - 1);
				lastCell = gridSize - gridDimention;
				break;
			}
			match++;
			if( i == 0 ){ // check upper left to bottom right corners diagonal
				nextCell += (gridDimention + 1);
			} else{
				nextCell += (gridDimention - 1); // check upper right to bottom left corners diagonal
			}
		}
		if(match != 0){
			return match;
		}
	}
	return match;
}
