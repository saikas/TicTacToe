//	Alexander Shmakov
//	cmpt304::assign2
//	Oct. 18,2015
//	used Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:38.0) Gecko/20100101 Firefox/38.0

(function() {
	player = "X";
	ai = "O";
	rows = parseInt(3);				//change value row set rows
	columns = parseInt(3);			//change value columns set columns

	gameOver = false;
	moveCount = 0;

	genGrid(rows, columns);
	return;
})();

//assumes the number of rows and columns was passed
function genGrid(rows, cols) {

	document.getElementById("message").innerHTML = "Player "+player+", you go first";
	var el = document.getElementById("tableDiv");
	el.innerHTML = "";
	var table = document.createElement("table");
	var newRow;
	var newCol;

	for (var i=0; i<rows; i++) {

		newRow = document.createElement("tr");

		for (var j=0; j<cols; j++) {
			newCol = document.createElement("td");
			newCol.id = "" +i+j;
			addEvent(newCol); //calls a function to set event listener
			newRow.appendChild(newCol);
		}
		table.appendChild(newRow);
	}
	el.appendChild(table);
	return;
}


//assumes the element to which the event is added was passed
function addEvent(el) {
	el.addEventListener('click', onPress, false);
	return;
}

//assumes the event was passed
function onPress(event) {

	if(event.target.innerHTML==="" && !gameOver && moveCount!=(rows*columns)) {
		event.target.appendChild(document.createTextNode(player));
		event.target.className= "used";
		document.getElementById("message").innerHTML = "Player "+player+"'s Turn";


		moveCount++; //used for the title in the trace
		gameOver = checkWin(player);
		printMoves(); //print user's trace

		if(!gameOver) {// ai player only is the game didnt end
			AI();
		}	
	}
	return;
}



//assumes the symbol of the player was passed
//returns true if there is a win, false otherwise
function checkWin(symbol) {
	var h_count=[];
	var v_count=[];

	var d1_count=0;
	var d2_count=0;

	for(var k=0; k<rows; k++) {
		h_count[k]=0;
	}
	for(var q=0; q<columns; q++) {
		v_count[q]=0;
	}

	for (var i=0; i<rows; i++) {
		for (var j=0; j<columns; j++) {

			//diag2 (top left to bottom right)
			if(columns==rows && i==j) {
				if(document.getElementById(""+i+j).innerHTML==symbol)
					d2_count++;

				if(d2_count == rows) {
					document.getElementById("message").innerHTML = "Player "+symbol + " Wins";
					for (var k=0; k<rows; k++) {
						for (var m=0; m<columns; m++) {
							document.getElementById(""+k+m).className = "used";
						}
					}
					return true;
				}
			}

			//diag1 (top right to botton left)
			if(columns==rows && j+i==rows-1) {//since it works only when rows==columns it doesnt matter if its columns-1 or rows-1
				if(document.getElementById(""+i+j).innerHTML==symbol)
					d1_count++;

				if(d1_count == rows) {
					document.getElementById("message").innerHTML = "Player "+symbol + " Wins";
					for (var k=0; k<rows; k++) {
						for (var m=0; m<columns; m++) {
							document.getElementById(""+k+m).className = "used";
						}
					}
					return true;
				}
			}

			//works for both vertical and horizontal
			if(document.getElementById(""+i+j).innerHTML==symbol) {
				v_count[j]++;
				h_count[i]++;
			}

			//vertical
			for(var n=0; n<columns; n++) {
				if(v_count[n] == rows) {
					document.getElementById("message").innerHTML = "Player "+symbol + " Wins";
					for (var k=0; k<rows; k++) {
						for (var m=0; m<columns; m++) {
							document.getElementById(""+k+m).className = "used";
						}
					}
					return true;
				}
			}

			//horizontal
			for(var m=0; m<rows; m++) {
				if(h_count[m] == columns) {
					document.getElementById("message").innerHTML = "Player "+symbol + " Wins";
					for (var k=0; k<rows; k++) {
						for (var m=0; m<columns; m++) {
							document.getElementById(""+k+m).className = "used";
						}
					}
					return true;
				}
			}
		}
	}

	return false;
}

//assumes two parameters were passed
//returns true if it didnt find a one step win, otherwise returns false
//parameter symbol: the chains of x's or O's it will search for
//parameter block: if equal to symbol it will Win in one step, if different, will block the symbol.
function winOrBlock(symbol,block) {
	var h_count=[];
	var v_count=[];

	var d1_count=0;
	var d2_count=0;

	for(var k=0; k<rows; k++) {
		h_count[k]=0;
	}
	for(var q=0; q<columns; q++) {
		v_count[q]=0;
	}

	//checking where there is one left to win
	for (var k=0; k<rows; k++) {
		for (var m=0; m<columns; m++) {

			//diag2 (top left to bottom right)
			if(columns==rows && k==m) {
				if(document.getElementById(""+k+m).innerHTML==symbol) {
					d2_count++;
				}
			}

			//diag1 (top right to botton left)
			if(columns==rows && m+k==rows-1) {
				if(document.getElementById(""+k+m).innerHTML==symbol) {
					d1_count++;
				}
			}

			//works for both vertical and horizontal
			if(document.getElementById(""+k+m).innerHTML==symbol) {
				v_count[m]++;
				h_count[k]++;
			}
		}
	}

	//placing in the empty spot to win or to block

	//diag2
	if(d2_count == rows-1) {//since it works only when rows==columns it doesnt matter if its columns-1 or rows-1
		for(var i=0; i<rows; i++) {
			for(var j=0; j<columns; j++) {
				if(i==j && document.getElementById(""+i+j).innerHTML==="") {
					document.getElementById(""+i+j).innerHTML=block;
					return false;
				}
			}
		}
	}
	//diag1
	if(d1_count == rows-1) {//since it works only when rows==columns it doesnt matter if its columns-1 or rows-1
		for(var i=0; i<rows; i++) {
			for(var j=0; j<columns; j++) {
				if(i+j==rows-1 && document.getElementById(""+i+j).innerHTML==="") {
					document.getElementById(""+i+j).innerHTML=block;
					return false;
				}
			}
		}
	}

	//vertical
	for(var n=0; n<columns; n++) {
		if(v_count[n] == rows-1) {
			for(var k=0; k<rows; k++) {
				if(document.getElementById(""+k+n).innerHTML==="") {
					document.getElementById(""+k+n).innerHTML=block;
					return false;
				}
			}
		}
	}

	//horizontal
	for(var m=0; m<rows; m++) {
		if(h_count[m] == columns-1) {
			for(var v=0; v<columns; v++) {
				if(document.getElementById(""+m+v).innerHTML==="") {
					document.getElementById(""+m+v).innerHTML=block;
					return false;
				}
			}
		}
	}
		
	return true;
}




function AI() {

	var R;
	var C;
	var choice;
	var valid = false;

	if(moveCount!=(rows*columns)){
	
		moveCount++; //used for the title in the trace

		//win in one move
		var trySomethingElse = winOrBlock(ai,ai);	//if winOrBlock returns true the ai will now try to block

		//block user
		if(trySomethingElse) {
			trySomethingElse = winOrBlock(player,ai);
		
			if(trySomethingElse) {
				trySomethingElse = false;

				//random pick
				while(!valid) {
					R = parseInt(Math.floor(rows*Math.random()));
					C = parseInt(Math.floor(columns*Math.random()));
					choice = R.toString() + C.toString();

					var pick = document.getElementById(choice);

					if(pick.innerHTML==="") {
						pick.innerHTML = ai;
						pick.className = "used ai";
						valid = true;
						
					}
				}
			}
		}

		gameOver = checkWin(ai);
		printMoves();
	}
	else {
		document.getElementById("message").innerHTML = "It's A Tie";
	}
	return;
}

//creates the move trace
function printMoves() {
	var title = document.createElement("h3");
	title.appendChild(document.createTextNode("Step: "+moveCount)); //creating a title
	var source = document.getElementById("tableDiv").lastChild;
	var copy = source.cloneNode(true);//cloning the original table

	document.getElementById("moves").appendChild(title);
	document.getElementById("moves").appendChild(copy);
	return;
}
