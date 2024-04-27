const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelectorAll(".game-info")[0];
const newGameBtn=document.querySelectorAll(".btn")[0];

let currentPlayer;
let gameGrid;

const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Lets create a Function to Intialize the Game
function initGame() {
        currentPlayer="O";
        gameGrid=["","","","","","","","",""];
        //UI pr empty bhi karna padega boxes ko
        boxes.forEach(function(box,index){
            box.innerText="";
            boxes[index].style.pointerEvents="all";
            //one more thing missing,initialize boxes with CSS Property Again
            box.classList=`box box${index+1}`;

        });
        newGameBtn.classList.remove("active");
        gameInfo.innerHTML=`current player-${currentPlayer}`;
}
initGame();

function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
    //UI Update
    gameInfo.innerHTML=`Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    //TODO 
    let answer="";
    winningPositions.forEach(function(position){
        //all three boxes should be non-empty and exactly same in values
        if((gameGrid[position[0]] !=="" || gameGrid[position[1]] !=="" || gameGrid[position[2]] !=="" ) && (gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]] ) ){
            //Check if winner is X
            if(gameGrid[position[0]]==="X"){
                console.log("x is answer");
                answer="X";
            }else{
                answer="O";
            }
            //disable pointer event
            boxes.forEach(function(box){
                box.style.pointerEvents="none";
            });
            //Now we know X/O is winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win"); 

        }
    });
    //it means we have a winner
    if(answer !==""){
        console.log("hello",answer);
        gameInfo.innerText=`Winner Player-${answer}`;
        newGameBtn.classList.add("active");
        return; 
    }
    // we know no winner found,lets chech Whether game is tied
    let fillCount=0;
    gameGrid.forEach((box)=>{
      if(box !=="") {
        fillCount++;
      }
    });
    //board is Filled
    if(fillCount===9){
        gameInfo.innerText="Game Tied !";
        newGameBtn.classList.add("active");
    }
    
}

function handleClick(index){
    if(gameGrid[index]=== ""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        //Swap Kro Turn Ko
        swapTurn();
        //Check koi Jeet To nahi gaya
        checkGameOver();
    }
}

boxes.forEach(function(box, index){
    box.addEventListener("click", ()=>{
        handleClick(index);
    });
});

newGameBtn.addEventListener("click",initGame);