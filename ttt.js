let head = document.querySelector(".head");
let boxes = document.querySelectorAll(".box");
let turnO = true;
let show = document.querySelectorAll(".show");
let results = document.querySelector(".results");
let restart = document.querySelector(".play-again");
let scores = document.querySelectorAll(".score");
let booyahPopup = document.querySelector(".booyah-popup");
let booyahWinner = document.querySelector(".booyah-winner");
let booyahButton = document.querySelector(".booyah-button");

// Initialize scores
let oScore = 0;
let xScore = 0;

// Update scores display
const updateScores = () => {
    scores[0].textContent = oScore;
    scores[1].textContent = xScore;

    // Check for Booyah condition
    if (oScore >= 4 || xScore >= 4) {
        showBooyah(oScore >= 4 ? "O" : "X");
    }
};

// Show Booyah popup
const showBooyah = (winner) => {
    booyahWinner.textContent = `${winner} Wins the Game!`;
    booyahPopup.style.display = "block";
    disableBoxes();
};

// Hide Booyah popup and reset game
const hideBooyah = () => {
    booyahPopup.style.display = "none";
    oScore = 0;
    xScore = 0;
    updateScores();
    resetGame();
};

// Add click event to Booyah button
booyahButton.addEventListener("click", hideBooyah);

// Initialize scores display
updateScores();

// Winning patterns for Tic-Tac-Toe
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Update turn indicator
const updateTurn = () => {
    show.forEach(span => span.style.backgroundColor = "transparent");
    show[turnO ? 0 : 1].style.backgroundColor = "rgba(0, 0, 0, 0.2)";
};

// Initialize turn indicator
updateTurn();

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.dataset.disabled === "true") return;

        box.style.backgroundColor = "rgb(10, 10, 50)";
        box.style.boxShadow = "none";
        box.innerText = turnO ? "O" : "X";
        turnO = !turnO;
        box.dataset.disabled = "true";
        updateTurn();
        checkWinner();
    });
});

// Disable all boxes
const disableBoxes = () => {
    boxes.forEach(box => box.dataset.disabled = "true");
};

// Enable all boxes for a new game
const enableBoxes = () => {
    boxes.forEach(box => {
        box.dataset.disabled = "false";
        box.innerText = "";
        box.style.backgroundColor = "";
        box.style.boxShadow = "";
        box.classList.remove("winning-box");
    });
};

// Show the winner message
const showWinner = (winner, pattern) => {
    disableBoxes();
    results.innerText = `${winner} Wins!`;
    results.style.display = "block";

    // Update scores
    if (winner === "O") {
        oScore++;
    } else {
        xScore++;
    }
    updateScores();

    // Highlight winning boxes
    pattern.forEach(index => {
        boxes[index].classList.add("winning-box");
    });

    // Hide message after 3 seconds
    setTimeout(() => {
        results.style.display = "none";
        // Remove winning box highlight after message disappears
        pattern.forEach(index => {
            boxes[index].classList.remove("winning-box");
        });
    }, 3000);
};

// Check for a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (boxes[a].innerText &&
            boxes[a].innerText === boxes[b].innerText &&
            boxes[a].innerText === boxes[c].innerText) {
            showWinner(boxes[a].innerText, pattern);
            return;
        }
    }

    // Check for draw
    let isDraw = true;
    boxes.forEach(box => {
        if (!box.innerText) isDraw = false;
    });

    if (isDraw) {
        results.innerText = "It's a Draw!";
        results.style.display = "block";
        setTimeout(() => {
            results.style.display = "none";
        }, 3000);
    }
};

// Reset the game
const resetGame = () => {
    turnO = true;
    enableBoxes();
    updateTurn();
    results.style.display = "none";
    // Remove any remaining winning box highlights
    boxes.forEach(box => {
        box.classList.remove("winning-box");
    });
};

// Add click event to restart button
restart.addEventListener("click", resetGame);

// Style results
results.style.color = "yellow";
results.style.backgroundColor = "black";
results.style.fontSize = "42px";
results.style.width = "60%";
results.style.marginLeft = "20%";
results.style.borderRadius = "5%";