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
            [0,4,8],
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
                    // switchActivePlayer()
                    if (GameController.getActivePlayer().name == "Player One"){
                        console.log(`the winner is: ${players[1].name}`)
                    }
                    else{
                        console.log(`the winner is: ${players[0].name}`)
                    }
                    
                    return true;
                }
        }
        return false;

    }
    
    // allow enterMark if position is empty and there is no winner
    const playRound = (position) =>{

        if (declareWinner == true){
            console.log(`do Nothing`)
        }

        else {
            if (validTurn(position) == true){
        // if ((validTurn(position) == true) && (declareWinner != true)) {                    
            Gameboard.enterMark(activePlayer.mark, position)            
            switchActivePlayer();
            }
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

        if(GameController.declareWinner()){
            console.log(`winner declared do nothing`)
        }

        else {
            // if (GameController.declareWinner() != true)
            console.log(e.target.classList[0])
            GameController.playRound(e.target.classList[0]);
            updateScreen()
            // check win 
            if (GameController.declareWinner()){console.log(`winner Found!`)}
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