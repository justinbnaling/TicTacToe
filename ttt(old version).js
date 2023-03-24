const Gameboard = (function(){
    const board = ["","","","","","","","",""];

    const enterMark = (mark, position) => {
        board[position] = mark;
    };
    
    const getBoardConsole = () =>{
        return board;
    };
    
    const getBoard = () =>{return board};
    
    return {enterMark, getBoardConsole, getBoard, board}
})()

const GameController = (function(){
    const players = [
        {
        name: "Player One",
        mark: "X"
        },
        {
        name: "Player Two",
        mark: "O"
        }
    ];

    let activePlayer = players[0];

    const switchActivePlayer = () => {
        if (activePlayer == players[0]){activePlayer = players[1]}
        else {activePlayer = players[0];}   
    }
    
    const getActivePlayer = () => {
        return activePlayer;
    }

    let validTurn = (position) => {
        if (Gameboard.board[position] == ''){return true}
        else {return false}
    }

    let winner = null;

    const getWinner = () => {
        return winner;
    }


    // true if board is full 
    // false otherwise
    const boardFull = () => {
        for (let i=0; i < Gameboard.board.length; i++){
            if (Gameboard.board[i] == ""){return false}
        }
        return true;
    }


    /*
    DeclareWinner
        True if winner found
        False if winner not found
    */
    
    const declareWinner = () => {
        let winArray = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [6,4,2],
        ]
        
        for(let i=0; i<8; i++){
            let j=0;
            if ((Gameboard.board[winArray[i][j]] == "X" &&
                Gameboard.board[winArray[i][j+1]] == "X" &&
                Gameboard.board[winArray[i][j+2]] == "X") ||
                (Gameboard.board[winArray[i][j]] == "O" &&
                Gameboard.board[winArray[i][j+1]] == "O" &&
                Gameboard.board[winArray[i][j+2]] == "O")) 
                {
                    if (GameController.getActivePlayer().name == "Player One"){
                        console.log(`the winner is: ${players[1].name}`)
                        winner = players[1].name;
                    }
                    else{
                        console.log(`the winner is: ${players[0].name}`)
                        winner = players[0].name;
                    }
                    return true;
                }
        }
        return false;
    }

    const declareTie = () =>{
        if (declareWinner() == false) {
            if (boardFull()){
                console.log(`Tie Game!`)
                return true;
            }
        }
        return false;
    }

    const declareGameOver = () => {
        if (declareTie()){return true}
        if (declareWinner()){return true}
        return false
    }

    const resetGame = () =>{
        for(let i=0; i<Gameboard.board.length; i++){
            Gameboard.enterMark("", i);
        }
        activePlayer = players[0]
    }
    
    // allow enterMark if position is empty and there is no winner
    const playRound = (position) =>{
        if ((validTurn(position) == true) && 
            (declareGameOver() != true)) {                    
            Gameboard.enterMark(activePlayer.mark, position)            
            switchActivePlayer();
            }
    }

    return {playRound, getActivePlayer, declareWinner, getWinner, resetGame, boardFull, declareTie}
})()

const ScreenController = (function(){
    const boardDiv = document.querySelector('.board');
    const turnDiv = document.querySelector('.turn')


    const clearScreen = () =>{
        boardDiv.textContent = "";
    }

    const displayWinner = () =>{
        turnDiv.textContent = `${GameController.getWinner()} is the winner!`;
        const resetButton = document.createElement("button");
        resetButton.textContent = "New Game";
        resetButton.style.display = "block"
        turnDiv.appendChild(resetButton)
        resetButton.addEventListener("click", ()=>{
            GameController.resetGame()
            clearScreen()
            updateScreen()
            resetButton.style.display = "none"
        })
    }

    // Plays round given an button's index
    const buttonPlayRound = (e) =>{
        if(GameController.declareTie()){
            console.log(`Tie Game!`)
            GameController.playRound(e.target.classList[0]);
            updateScreen()
            turnDiv.textContent = "Tie Game!";
        }
        else if (GameController.declareWinner() != true){
            console.log(e.target.classList[0])
            GameController.playRound(e.target.classList[0]);
            updateScreen()
            if (GameController.declareWinner()){
                displayWinner()
                console.log(`winner Found!`)}
        }
    }

    const renderBoard = () =>{
        Gameboard.board.forEach((element, index)=>{
            const cellButton = document.createElement("button");
            cellButton.textContent = element;
            cellButton.classList.add(`${index}`)
            boardDiv.appendChild(cellButton)
        })
    }

    const updateScreen = () =>{
        turnDiv.textContent = `${GameController.getActivePlayer().name}'s turn`
        clearScreen()
        renderBoard()

        const cellButtons = document.querySelectorAll("button")
        cellButtons.forEach(button =>{
            button.addEventListener("click", buttonPlayRound)
        })
    }
    return {updateScreen}

})()

//initial screen loadout
ScreenController.updateScreen() 