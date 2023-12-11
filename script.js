console.log('hello gjee');
const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");

const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;



const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to initialize the game

function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //update in UI also
    boxes.forEach( (box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";

         // initialize all boxes to default(color) properties
    box.classList = ` box box${index+1}`;
    })

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current player - ${currentPlayer}`;

   

}

initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O"
    }
    else{
        currentPlayer = "X";
    }
    // update in UI
    gameInfo.innerText = ` Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    // console.log('entered checkGameover');

    let answer = "";
    winningPositions.forEach( (position) => {
        //  all 3 boxes should be non-empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
        &&(gameGrid[position[0]] === gameGrid[position[1]]) &&(gameGrid[position[1]] === gameGrid[position[2]])){

        //check if winner  is X
        if(gameGrid[position[0]] === "X")
            answer = "X";
        else
            answer = "O";

        //disable pointer events after winning
        boxes.forEach( (box) =>{
            box.style.pointerEvents = "none";
        })
        // now we know x/O is a winner
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");
    }

    } );

    if(answer !== ""){
        gameInfo.innerText = `Winner is - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //let's check weather there is TIE
    let fillCount = 0;
    gameGrid.forEach( (box) => {
        if(box !== "")
            fillCount++;
    });

    if(fillCount === 9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
    
}

function handleClick(index){
    if(gameGrid[index] === ""){
        //updating in UI
        boxes[index].innerText = currentPlayer;
        //updating in gameGrid array
        gameGrid[index] = currentPlayer;

        boxes[index].style.pointerEvents = "none";
        console.log('finidhed swapping');
        //swap the turn
        swapTurn();
        

        //check if someone has won
        checkGameOver();
    }
}



// adding event listner on each boxes
boxes.forEach((box,index) => {
    box.addEventListener("click" , () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click" , () => {
    initGame();
})