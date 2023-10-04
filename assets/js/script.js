// Wait for the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", function () {
    //Add event listener to start button ,instructions paragraph and close button
    document.getElementById("starter").addEventListener("click", startGame);
    let instr = document.getElementById("instructions");
    instr.previousElementSibling.addEventListener("click", showInstructions);
    instr.children[1].addEventListener("click", hideInstructions);
});

//Global var to check if its the first time that the user starts the game
var firstTime = true;
//Global constant to store the possible options
const gamePicks = [
    ["scissors", "icon 1"],
    ["paper", "icon 2"],
    ["rock", "icon 3"],
    ["lizard", "icon 4"],
    ["spoke", "icon 5"]];

function startGame() {
    //Makes the game area visible
    let gameArea = document.getElementsByClassName("game-area")[0];
    gameArea.style.display = "block";
    //Hides the game menu
    let gameMenu = document.getElementsByClassName("game-menu")[0];
    gameMenu.style.display = "none";
    let diff = getDifficulty();
    let mode = getMode();
    //Add event listener to the option buttons only if is the first time
    //that starts the game
    if (firstTime) {
        let options = document.getElementsByClassName("option");

        for (let option of options) {
            let pick = option.getAttribute("data-option");
            console.log(pick);
            option.addEventListener("click", checkWin(pick, cpuPick(diff, pick)));
        }

        firstTime = false;
    }
}

//**Gets the game difficulty when the player starts a game */
function getDifficulty() {
    let difficulties = document.getElementsByName("difficulty");
    for (let diff of difficulties) {
        if (diff.checked) {
            return diff.value;
        }
    }
}

//**Gets the game mode when the player starts a game */
function getMode() {
    let modes = document.getElementsByName("mode");
    for (let mode of modes) {
        if (mode.checked) {
            return mode.value;
        }
    }
}
//**Gets the cpu pick depending on the game difficulty */
function cpuPick(diff, pick) {
    let randomPick = gamePicks[Math.floor(Math.random() * 5)][0];
    switch (diff) {
        //If the difficulty is 1, 25% of the times will pick a lossing option
        case 1:
            if ((Math.random() * 100 + 1) <= 25) {
                return pickLose(pick);
            } else {
                return randomPick;
            }
        //If the difficulty is 2 will pick a random option 
        case 2:
            return randomPick;
        //If the difficulty is 3, 25% of the times will pick a winner option
        case 3:
            if ((Math.random() * 100 + 1) <= 25) {
                return pickLose(pick);
            } else {
                return randomPick;
            }
        default:
            alert("Error, invalid difficulty");
    }
}

function pickWin(player) {

}

function pickLose(player) {

}

function checkWin(player, cpu) {

}

function updateWin() {

}

function updateLose() {

}

/**Shows the instruccions when the user clicks on the paragraph
 */
function showInstructions() {
    document.getElementById("instructions").style.display = "block";
}

/**Hide the instruccions when the user clicks on the close button
 */
function hideInstructions() {
    document.getElementById("instructions").style.display = "none";
}

function endGame() {

}