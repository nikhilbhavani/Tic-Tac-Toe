



const Gameboard = (() => {
    const board= Array(3).fill(null).map(()=>Array(3).fill(null));

    for(let row=0; row<3;row++){
        for (let col=0; col<3; col++){
            board[row][col]={checked:false, value:null};
        }
    }

    const getBoard=()=>board;

    const mark=(row,col,symbol)=>{
        if(board[row][col].checked=true){
            return false;
        }
        board[row][col].checked=true;
        board[row][col].value=symbol;
        return true;
    };

    return{mark,getBoard};
})();

const Player = (name,symbol) => {
    return{name,symbol};
};

const GameControl = (() => {
    let players=[];
    let currentplayer;
    let gameend=false;

    const assignplayer = (player1,player2)=>{
        players=[player1,player2];
        currentplayer=player1
    };

    const humanplayer1=document.getElementById("humanplayer1");
    const humanplayer2=document.getElementById("humanplayer2");
    const compplayer1=document.getElementById("compplayer1");
    const compplayer2=document.getElementById("compplayer2");
    const start=document.querySelector(".start");
    const turntext=document.querySelector(".turn-text");
    const GB=document.querySelector(".game-board");
    const squares=document.querySelectorAll(".square")
    

    let player1type;
    let player2type;

    humanplayer1.addEventListener('click', () => {
        humanplayer1.classList.add("selected");
        compplayer1.classList.remove("selected");
        player1type="Human"
    });

    humanplayer2.addEventListener('click', () => {
        humanplayer2.classList.add("selected");
        compplayer2.classList.remove("selected");
        player2type="Human";
    });

    compplayer1.addEventListener('click', () => {
        compplayer1.classList.add("selected");
        humanplayer1.classList.remove("selected");
        player1type="Computer";
    });

    compplayer2.addEventListener('click', () => {
        compplayer2.classList.add("selected");
        humanplayer2.classList.remove("selected");
        player2type="Computer";
    });

    const startGame = () => {
        start.addEventListener('click', () => {
            if(!player1type || !player2type){
                alert("select player type");
                return;
            }

            const player1=Player(player1type,"X");
            const player2=Player(player2type,"O");

            assignplayer(player1,player2);

            turntext.classList.remove("hidden");
            GB.classList.remove("hidden");
            start.classList.add("hidden");
            turntext.textContent='${player1.name} turn (${player1.symbol})';

            squares.forEach((square,index) => {
                square.addEventListener('click',()=>playturn(square,index));
            });
        });
    };

    const playturn = (square,index) =>{
        const
    }

})