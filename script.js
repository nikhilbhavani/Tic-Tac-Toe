const start = document.querySelector(".start");
const turntext = document.querySelector(".turn-text");
const winnertext = document.querySelector(".winner-text");


const Gameboard = (() => {
  const board = Array(3)
    .fill(null)
    .map(() => Array(3).fill(null));

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      board[row][col] = { checked: false, value: null };
    }
  }

  const getBoard = () => board;

  const mark = (row, col, symbol, span) => {
    if ((board[row][col].checked === true)) {
      return false;
    }
    board[row][col].checked = true;
    board[row][col].value = symbol;
    span.textContent=symbol;
    return true;
    
  };

  const resetBoard = (squares) => {
    squares.forEach(square=>{
        const span=square.querySelector("span");
        if(span){
            span.textContent='';
        }
    });
    turntext.classList.remove("hidden");
    winnertext.classList.add("hidden");

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          board[row][col] = { checked: false, value: null };
        }
      }
  };


  return { mark, getBoard, resetBoard };
})();

const Player = (name, symbol) => {
  return { name, symbol };
};

const GameControl = (() => {
  let players = [];
  let currentplayer;
  let gameend = false;

  const assignplayer = (player1, player2) => {
    players = [player1, player2];
    currentplayer = player1;
  };

  const humanplayer1 = document.getElementById("humanplayer1");
  const humanplayer2 = document.getElementById("humanplayer2");
  const compplayer1 = document.getElementById("compplayer1");
  const compplayer2 = document.getElementById("compplayer2");
  const start = document.querySelector(".start");
  const turntext = document.querySelector(".turn-text");
  const GB = document.querySelector(".game-board");
  const squares = document.querySelectorAll(".square");
  const winnertext = document.querySelector(".winner-text");
  const reset = document.querySelector(".reset");

  let player1type;
  let player2type;

  humanplayer1.addEventListener("click", () => {
    humanplayer1.classList.add("selected");
    compplayer1.classList.remove("selected");
    compplayer1.classList.add("hidden");
    player1type = "Human";
  });

  humanplayer2.addEventListener("click", () => {
    humanplayer2.classList.add("selected");
    compplayer2.classList.remove("selected");
    compplayer2.classList.add("hidden");
    player2type = "Human";
  });

  compplayer1.addEventListener("click", () => {
    compplayer1.classList.add("selected");
    humanplayer1.classList.remove("selected");
    humanplayer1.classList.add("hidden");
    player1type = "Computer";
  });

  compplayer2.addEventListener("click", () => {
    compplayer2.classList.add("selected");
    humanplayer2.classList.remove("selected");
    humanplayer2.classList.add("hidden");
    player2type = "Computer";
  });

  const startGame = () => {
    start.addEventListener("click", () => {
      if (!player1type || !player2type) {
        alert("select player type");
        return;
      }

      const player1 = Player(player1type, "X");
      const player2 = Player(player2type, "O");

      assignplayer(player1, player2);

      turntext.classList.remove("hidden");
      GB.classList.remove("hidden");
      start.classList.add("hidden");
      turntext.textContent = `${player1.name}'s turn (${player1.symbol})`;

      squares.forEach((square, index) => {
        square.addEventListener("click", () => playturn(square, index));
      });
    });
  };

  const playturn = (square, index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;

    const span = square.querySelector("span");
    if (span.textContent !== "") {
      alert("square already taken");
      return;
    }

    if (gameend) {
      return;
    }

    const successlful = Gameboard.mark(row, col, currentplayer.symbol, span);

    if (successlful) {
      if (checkwinner()) {
        turntext.classList.add("hidden");
        winnertext.classList.remove("hidden");
        winnertext.textContent = `${currentplayer.name} Wins!!`;
        gameend = true;
        return;
      }

      if (istie()) {
        turntext.classList.add("hidden");
        winnertext.classList.remove("hidden");
        winnertext.textContent = `It's a Tie!!`;
        gameend = true;
        return;
      }

      switchplayer();
    } else {
      alert("Cell already used.");
    }
  };

  const compplay = () => {
    const board=Gameboard.getBoard();
    const moves=[];
    board.forEach((row,rowindex)=>{
        row.forEach((cell,colindex)=>{
            if(!cell.checked){
                moves.push({rowindex,colindex});
            }
        });
    });
    const randommove=moves[Math.floor(Math.random()*moves.length)];
    const square=squares[randommove.rowindex*3+randommove.colindex];

    setTimeout(() => {
        playturn(square,randommove.rowindex*3+randommove.colindex)
    }, 1000);
  }

  const switchplayer=()=>{
    currentplayer=currentplayer===players[0]? players[1]:players[0];
    turntext.textContent=`${currentplayer.name}'s turn ${currentplayer.symbol}`;
    if(currentplayer.name==="Computer"){
        compplay();
    }
  };

  const checkwinner = () => {
    const board = Gameboard.getBoard();

    const winconditions = [
      // Rows
      [board[0][0], board[0][1], board[0][2]],
      [board[1][0], board[1][1], board[1][2]],
      [board[2][0], board[2][1], board[2][2]],
      // Columns
      [board[0][0], board[1][0], board[2][0]],
      [board[0][1], board[1][1], board[2][1]],
      [board[0][2], board[1][2], board[2][2]],
      // Diagonals
      [board[0][0], board[1][1], board[2][2]],
      [board[0][2], board[1][1], board[2][0]],
    ];

    return winconditions.some(condition =>
        condition.every(cell => cell.checked && cell.value === currentplayer.symbol)
      );
  };

  const istie = () =>{
        const board=Gameboard.getBoard();
        return board.flat().every(cell => cell.checked);
  };

  const gamereset = (squares) => {
    Gameboard.resetBoard(squares);
    gameend = false;
    currentplayer = players[0];
    turntext.textContent=`${currentplayer.name}'s turn ${currentplayer.symbol}`;
    };

    reset.addEventListener('click', () => gamereset(squares));
    
    return{assignplayer,playturn,gamereset,startGame,switchplayer,compplay};
})();

start.addEventListener('click',GameControl.startGame);


