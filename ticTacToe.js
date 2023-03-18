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

    // declare winner if either user occupies winConditions
    const declareWinner = () => {

        // winning conditions
        let winArray = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [0,4,8],
        ]
        
        let winCondition = false;
        for(let i=0; i<8; i++){
            let j=0;
            if ((Gameboard.board[winArray[i][j]] == "X" &&
                Gameboard.board[winArray[i][j+1]] == "X" &&
                Gameboard.board[winArray[i][j+2]] == "X") ||

                (Gameboard.board[winArray[i][j]] == "O" &&
                Gameboard.board[winArray[i][j+1]] == "O" &&
                Gameboard.board[winArray[i][j+2]] == "O")) 
                {
                    
                    console.log(`row: ${i} is all x`)
                    console.log(`j is ${j}`)
                    winCondition = true;
                    break;
                }
            else{
                console.log(`row: ${i} is NOT all x`)
            }
        }

        console.log(winCondition)

    }
    
    // allow enterMark if position is empty
    const playRound = (position) =>{
        if (validTurn(position) == true) {                    
            Gameboard.enterMark(activePlayer.mark, position)            
            switchActivePlayer();
        }
    }

    return {playRound, getActivePlayer, declareWinner}
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
        // check win 
        GameController.declareWinner()
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