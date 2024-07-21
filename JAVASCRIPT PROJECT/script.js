let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtnGame");
let newGameBtn = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isDraw = checkWinner();

        if (count === 9 && !isDraw) {
            showDraw();
        }
    });
});

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBox();
    msgContainer.classList.add("hide");
    resetBtn.classList.remove("hide");
}

const disableBox = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBox = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congaratulation! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    resetBtn.classList.add("hide");
    disableBox();
}

const showDraw = () => {
    msg.innerText = `Congaratulation for a draw match!`;
    msgContainer.classList.remove("hide");
    resetBtn.classList.add("hide");
    disableBox();
}


const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);