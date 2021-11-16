var allPlayers = [
	{
		'number': 1,
		'mark': 'X',
		'color': 'bg-primary',
		'markCount': 0,
		'wins': 0
	},
	{
		'number': 2,
		'mark': 'O',
		'color': 'bg-danger',
		'markCount': 0,
		'wins': 0
	},
	{
		'number': 3,
		'mark': 'Y',
		'color': 'bg-warning',
		'markCount': 0,
		'wins': 0
	},
	{
		'number': 4,
		'mark': 'H',
		'color': 'bg-success',
		'markCount': 0,
		'wins': 0
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
	document.getElementById('player-turn').innerHTML = 'Player ' + allPlayers[actualPlayer]['number'] + ' select a cell.';
}

function initGrid() {
	for (var i = 0; i < gridSize; i++) { // grid dimention 3x3
		cells.push(document.getElementById('cell' + i));
		selections.push(document.getElementById('select' + i));
	}
}

function mark(nr) {
	allMarks++;
	selections[nr].classList.add('d-none');//hidde button
	allPlayers[actualPlayer]['markCount']++;
	cells[nr].classList.add(allPlayers[actualPlayer]['color']);//mark selection
	cells[nr].classList.add('marked');//mark selection
	cells[nr].innerHTML = allPlayers[actualPlayer]['mark'];//mark selection
	if (allPlayers[actualPlayer]['markCount'] >= gridDimention) { // at least required marks to check for a win equals grid dimention
		foundWinner = checkGrid();
	}
	if (foundWinner) {
		hiddeUnselectedButtons();
		allPlayers[actualPlayer]['wins']++;
		document.getElementById('new-game').classList.remove('d-none');
		document.getElementById('player-turn').innerHTML = 'Player ' + allPlayers[actualPlayer]['number'] + ' has won the Game.';
	}
	else if (allMarks == gridSize) {
		hiddeUnselectedButtons();
		document.getElementById('new-game').classList.remove('d-none');
		document.getElementById('player-turn').innerHTML = "It's a Tie";
	}
	else { //change player
		actualPlayer = (actualPlayer == maxPlayers - 1) ? 0 : (actualPlayer + 1);
		document.getElementById('player-turn').innerHTML = 'Player ' + allPlayers[actualPlayer]['number'] + ' select a cell.';
	}
}

function hiddeUnselectedButtons() {
	for (var i = 0; i < gridSize; i++) {
		if (selections[i].classList.contains('d-none')) {
			continue;
		}
		selections[i].classList.add('d-none');
	}
}

function checkGrid() {

	var win = checkLines(1, gridDimention); //columns check
	if (win == 0) {
		win = checkLines(gridDimention, 1); // rows check
		if (win == 0) {
			win = checkDiagonals();
		}
	}
	return win;
}

/**
 * Checks Boards Lines if the cells have the same value.
 * If one Line matches all cells, return @var match.
 * After all Lines have been checked, will return @var match as result of check. 0 if no match was found. 
 * @param { number } lineOffset - Can only have two values: 1 | gridDimention. If is set to 1, it checks the columns, cellOffset must equal gridDimention
 * @param { number } cellOffset - Can only have two values: 1 | gridDimention. If is set to 1, it checks the rows, lineOffset must equal gridDimention
 * @returns - If one Line all check Cells have the same value, return matches, will be equal to gridDimention value
 * 			-If one cell does not match, check the next Line
 */
function checkLines(lineOffset, cellOffset) {
	for (var i = 0; i < gridDimention; i++) {
		// preset variables for line check and next cell check
		var match = 0;
		var firstCell = i * lineOffset;
		var nextCell = firstCell + cellOffset;
		var lastCell = firstCell + (gridDimention - 1) * cellOffset;
		while (nextCell <= lastCell) {  // Until we reach the last cell to check
			if (cells[firstCell].innerHTML != cells[nextCell].innerHTML) { // no match, go to next line
				match = 0;
				break;
			}
			match++; //match found add one, and move to next cell to check
			nextCell += cellOffset;
		}
		if (match != 0) { // Found winning line
			return match;
		}
	}
	return match;
}

/**
 * Checks Boards diagonal Lines if the cells have the same value.
 * If one Line matches all cells, return @var match.
 * After all Lines have been checked, will return @var match as result of check. 0 if no match was found. 
 * Only checks diagonals from cell [0, 0] to [ gridDimention, gridDimention ] as direction  left-top to right-bottom
 * and [ gridDimention, 0 ] t0 [ 0, gridDimention ] as direction right-top to left-bottom
 * @returns { number } - If all check Cells have the same value, return matches, will be equal to gridDimention value
 * 						-If one cell does not match, check the next Diagonal
 */
function checkDiagonals() {
	/**
	 * @var { number }
	 */
	var match = 0;
	var firstCell = 0; // left-top cell index
	var nextCell = firstCell + (gridDimention + 1); //pre set the nextcell index. 
	var lastCell = gridSize - 1; // right-bottom cell index
	for (var i = 0; i < 2; i++) { // any gridDimention has only 2 diagonals

		while (nextCell <= lastCell) { // Until we reach the last cell to check
			if (cells[firstCell].innerHTML != cells[nextCell].innerHTML) { // no match, go to next line
				match = 0;
				firstCell = gridDimention - 1; //top-right cell index
				nextCell = firstCell + (gridDimention - 1); // next cell index
				lastCell = gridSize - gridDimention; // left-bottom cell index
				break;
			}
			match++; //match found add one, and move to next cell to check
			if (i == 0) { // check left-top to right-bottom corners diagonal
				nextCell += (gridDimention + 1);
			} else {
				nextCell += (gridDimention - 1); // check right-top to left-bottom corners diagonal
			}
		}
		if (match != 0) { // if first diagonal cells match, found a winning line return match.
			return match;
		}
	}
	return match;
}
