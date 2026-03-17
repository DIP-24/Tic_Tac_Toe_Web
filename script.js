let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGame = document.querySelector("#newGame");
let score = document.querySelector(".score");
let msg = document.querySelector(".msg");

let enter = true;
let moveCount = 0;
let gameOver = false;

const showOverlay = (text) => {
    msg.innerText = text;
    score.classList.remove("hide");
    disableBoxes();
};

let showWinner = (winner) => {
    showOverlay(`${winner} won!`);
};

let showDraw = () => {
    showOverlay("It's a draw!");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameOver) return;
        if(enter){
            box.innerText = "X";
            enter = false;
        }
        else{
            box.innerText = "O";
            enter = true;
        }
        box.disabled = true;
        moveCount++;

        const winner = cheakWinner();
        if(winner){
            gameOver = true;
            showWinner(winner);
        } else if (moveCount === 9){
            gameOver = true;
            showDraw();
        }
    });
}); 
let disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};
let enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = ""; 
    }
};
const pattern = [
    [0,1,2],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
    [8,0,4]
];
let cheakWinner = () => {
    for (let index of pattern) {
        let pos1 = boxes[index[0]].innerText;
        let pos2 = boxes[index[1]].innerText;
        let pos3 = boxes[index[2]].innerText;
        if(pos1 != '' && pos2 != '' && pos3 != ''){
            if(pos1 === pos2 && pos2 === pos3){
                return pos1;  
            }
        }
    }
    return null;
};
let resetGame = () => {
    enter = true;
    moveCount = 0;
    gameOver = false;
    enableBoxes();
    score.classList.add("hide");
};

reset.addEventListener("click",resetGame);
newGame.addEventListener("click",resetGame);
