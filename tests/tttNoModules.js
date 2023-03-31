const Gameboard = (function(){
    const gameboard = ["","","","","","","","",""];
    
    return {gameboard}
})()

const playerFactory = function(){}

// const displayController = (function(){
//     const squares = document.querySelectorAll("grid div")
//     squares.forEach(element=>{
//         element.addEventListener("click", enterMark)
//     })

//     function enterMark(event){
//         event.target.innerText = "clicked";
//     }
    
//     return {enterMark}
// })()



const squares = document.querySelectorAll("grid div")
squares.forEach(element=>{
    element.addEventListener("click", enterMark)
})

function enterMark(event){
    if (squareIsEmpty(event)){
        console.log(`square is empty`)

        let mark = determineMark()
        markGameboard(event, mark)
        markHTML(event, mark)
        }


    
}

function squareIsEmpty(event){
    if (event.target.innerText == ""){
        return true
    }
    console.log(`this cell is NOT empty`)
    return false;
}

function determineMark(){
    let blanks=0;
    for (let i = 0; i < Gameboard.gameboard.length; i++) {
        if (Gameboard.gameboard[i] == ""){
            blanks++;
        }
    }

    console.log(`There are ${blanks} empty squares`)
    if (blanks % 2 == 1){return "X"}
    else {return "O"}
}

function markGameboard(event, mark){
    Gameboard.gameboard[event.target.id] = mark;
}

function markHTML(event, mark){
    event.target.innerText = mark;
}