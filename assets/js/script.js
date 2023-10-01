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
            option.addEventListener("click", checkWin(pick, cpuPick(diff)));
        }

        firstTime = false;
    }
}
//**Gets the game difficulty when the player starts a game */
function getDifficulty() {

}
//**Gets the game mode when the player starts a game */
function getMode() {

}

function cpuPick(diff) {

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