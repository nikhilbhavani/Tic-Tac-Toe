



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

    

})