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
    let gameEnd = false; 
    let round = 0;

    const getGameEnd = () =>{
        return gameEnd
    }

    const setGameEnd = (bool) =>{
        gameEnd = bool
        return gameEnd
    }

    const getRound = () =>{
        return round;
    }

    const resetRound = () =>{
        round = 0;
        return round;
    }

    const addRound = ()=>{
        round++
        return round;
    }

    const getActivePlayer = () =>{
        return activePlayer;
    }

    const switchActivePlayer = () => {
        if (activePlayer == players[0]){activePlayer = players[1]}
        else {activePlayer = players[0];}   
    }
   
    let validTurn = (position) => {
        if (Gameboard.board[position] == ''){return true}
        else {return false}
    }

    let winner = null;

    const getWinner = () => {
        return winner;
    }

    const setWinner = (bool) => {
        winner = bool
        return winner;
    }

    // true if board is full
    const boardFull = () => {
        if (round > 8) {
            gameEnd = true;
            return true
        }
        return false;
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
                        console.log(`the winner is: ${players[0].name}`)
                        winner = players[0].name;
                    }
                    else{
                        console.log(`the winner is: ${players[1].name}`)
                        winner = players[1].name;
                    }
                    GameController.endGame = true;
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

    const resetGame = () =>{
        for(let i=0; i<Gameboard.board.length; i++){
            Gameboard.enterMark("", i);
        }
        activePlayer = players[0];
        resetRound();
        setWinner(false);
        setGameEnd(false);
    }
    
    const playRound = (position) =>{
        if ((validTurn(position) == true) && 
            (getGameEnd() == false)) {
            Gameboard.enterMark(activePlayer.mark, position)  
            addRound();
            // full board state
            if (boardFull()){
                setGameEnd(true);
                console.log(`the boardful state is ${boardFull()}`)
                if (declareWinner()) {console.log(`the winner is ${getWinner()}`)}
                else {
                    console.log(declareTie())
                }
            }

            // find whether if there is a winner
            else if(declareWinner()){
                setGameEnd(true);
                console.log(`the winner is ${getWinner()}`)
            }

            // wait for next turn
            else{
                switchActivePlayer();
            }
        } 
    }
    

    return {playRound, getActivePlayer, getWinner, resetGame, declareTie, getGameEnd}
})()

const ScreenController = (function(){
    const boardDiv = document.querySelector('.board');
    const turnDiv = document.querySelector('.turn')


    const clearScreen = () =>{
        boardDiv.textContent = "";
    }

    const displayResult = () =>{
        if ((GameController.getWinner() == "Player One") ||
           (GameController.getWinner() == "Player Two")) {
            turnDiv.textContent = `${GameController.getWinner()} is the winner!`;
        }
        else{
            turnDiv.textContent = `Tie Game!`;
        }
        
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
        GameController.playRound(e.target.classList[0]);
        updateScreen()
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
        if (GameController.getGameEnd()) {
            console.log(`game has ended update screen`)
            displayResult()
            clearScreen()
            renderBoard()
        }

        else{
            turnDiv.textContent = `${GameController.getActivePlayer().name}'s turn`
            clearScreen()
            renderBoard()

            const cellButtons = document.querySelectorAll("button")
            cellButtons.forEach(button =>{
                button.addEventListener("click", buttonPlayRound)
            })
        }
    }
    return {updateScreen}

})()

//initial screen loadout
ScreenController.updateScreen() 