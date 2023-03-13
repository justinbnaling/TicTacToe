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
    
    // allow enterMark if position is empty
    const playRound = (position) =>{
        if (validTurn(position) == true) {                    
            Gameboard.enterMark(activePlayer.mark, position)            
            switchActivePlayer();
        }
    }

    return {playRound, getActivePlayer}
})()

const ScreenController = (function(){
    const boardDiv = document.querySelector('.board');
    const turnDiv = document.querySelector('.turn')


    const clearScreen = () =>{
        boardDiv.textContent = "";
    }


    // Plays round given an button's index
    const buttonPlayRound = (e) =>{
        console.log(e.target.classList[0])
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

ScreenController.updateScreen()