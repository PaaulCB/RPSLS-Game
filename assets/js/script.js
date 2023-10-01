// Wait for the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", function () {
    //Add event listener to start button ,instructions paragraph and close button
    document.getElementById("starter").addEventListener("click", startGame);
    let instr = document.getElementById("instructions");
    instr.previousElementSibling.addEventListener("click", showInstructions);
    instr.children[1].addEventListener("click", hideInstructions);
});

function startGame() {
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

function showInstructions() {

}

function hideInstructions() {

}

function endGame() {

}