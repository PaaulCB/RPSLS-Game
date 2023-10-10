// Wait for the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", function () {

    //Add event listener to start button ,instructions paragraph and close button
    document.getElementById("starter").addEventListener("click", checkUsername);
    let instr = document.getElementById("instructions");
    instr.previousElementSibling.addEventListener("click", showInstructions);
    instr.children[1].addEventListener("click", hideInstructions);
    let hist = document.getElementById("history");
    hist.previousElementSibling.addEventListener("click", showHistory);
    hist.children[1].addEventListener("click", hideHistory);
    document.getElementById("guest").addEventListener("change", guestToggle);
});

//Global var to check if its the first time that the user starts the game
var firstTime = true;
//Global constant to store the possible options
const gamePicks = ["scissors", "paper", "rock", "lizard", "spock"];

/**Hides the game menu and shows the game area when start the game */
function startGame() {
    //Makes the game area visible
    let gameArea = document.getElementsByClassName("game-area")[0];
    gameArea.style.display = "grid";
    //Hides the game menu
    let gameMenu = document.getElementsByClassName("game-menu")[0];
    gameMenu.style.display = "none";

    //Add event listener to the option buttons only if is the first time
    //that starts the game
    if (firstTime) {
        //Make the options visible
        let gameOptions = document.getElementsByClassName("options-area")[0];
        gameOptions.style.display = "grid";
        let options = document.getElementsByClassName("option");

        for (let option of options) {
            let pick = option.getAttribute("data-option");
            console.log(pick);
            option.addEventListener("click", function () {
                checkWin(pick, cpuPick(pick));
            });
            console.log(option);
        }
        //Makes history visible
        document.getElementById("history-container").style.display = "block";
        firstTime = false;
    }
}

/**Checks if the username its valid and get it */
function checkUsername() {
    let guest = document.getElementById("guest").checked;
    let username = document.getElementById("username").value;
    if (guest || username !== "") {
        let playerName = document.getElementById("player-name");
        if (guest) {
            let random = Math.floor(Math.random() * 1000);
            playerName.innerText = "Guest#" + random;
        } else {
            playerName.innerText = username;
        }
        startGame();
    } else {
        document.getElementById("username").focus();
        document.getElementById("username").placeholder = "Insert a valid username";
    }
}

/**Show or hide username input*/
function guestToggle() {
    if (document.getElementById("guest").checked) {
        document.getElementById("username").style.display = "none";
        document.getElementById("username").value = "";
    } else {
        document.getElementById("username").style.display = "block";
        document.getElementById("username").focus();
    }
}

/**Gets the game difficulty*/
function getDifficulty() {

    let difficulties = document.getElementsByName("difficulty");
    for (let diff of difficulties) {
        if (diff.checked) {
            return diff.value;
        }
    }
}

/**Gets the game mode*/
function getMode() {

    let modes = document.getElementsByName("mode");
    for (let mode of modes) {
        if (mode.checked) {
            return mode.value;
        }
    }
}
/**Gets the cpu pick depending on the game difficulty */
function cpuPick(pick) {

    let randomPick = gamePicks[Math.floor(Math.random() * 5)];
    switch (getDifficulty()) {
        //If the difficulty is 1, 25% of the times will pick a lossing option
        case "1":
            if ((Math.random() * 100 + 1) <= 25) {
                return specialPick(pick, "lose");
            } else {
                return randomPick;
            }
        //If the difficulty is 2 will pick a random option 
        case "2":
            return randomPick;
        //If the difficulty is 3, 25% of the times will pick a winner option
        case "3":
            if ((Math.random() * 100 + 1) <= 25) {
                return specialPick(pick, "win");
            } else {
                return randomPick;
            }
        default:
            alert("Error, invalid difficulty");
    }
}

/**
 * Return a pick that always win or lose against the user pick
 * depending on the type paramater.
 * Because of the way that the gamePicks its arranged items with 
 * +1 and +3 index loses agains the pick and items with
 * +2 and +4 index wins agains the pick
 */
function specialPick(player, type) {

    let gamePicksComparator = gamePicks.concat(gamePicks);
    let playerPick = gamePicks.indexOf(player);
    if (type === "lose") {
        //Since there are two winner/losers picks, just pick one randomly
        if (Math.random() <= 0.5) {
            return gamePicksComparator[playerPick + 1];
        } else {
            return gamePicksComparator[playerPick + 3];
        }
    } else if (type === "win") {
        if (Math.random() <= 0.5) {
            return gamePicksComparator[playerPick + 2];
        } else {
            return gamePicksComparator[playerPick + 4];
        }
    }

}
/**Disables the picks buttons */
function disablePicks() {
    let options = document.getElementsByClassName("option");

    for (let option of options) {
        option.disabled = true;
    }
}
/**Enables the picks buttons */
function enablePicks() {
    let options = document.getElementsByClassName("option");

    for (let option of options) {
        option.disabled = false;
    }
}

/**
 * Checks the wins between player and cpu picks
 * For this function we use the same principle 
 * that we use on specialPick function, items with 
 * +1 and +3 index loses agains the pick and items with
 * +2 and +4 index wins agains the pick
 */
function checkWin(player, cpu) {

    let gamePicksComparator = gamePicks.concat(gamePicks);
    let playerIndex = gamePicks.indexOf(player);
    let cpuIndex = gamePicks.indexOf(cpu);
    //Update the icons of the picks
    updatePicks(playerIndex, cpuIndex);
    //This code make no sense if the cpuPick has smaller index then playerPick 
    if (playerIndex > cpuIndex) {
        //This index will always be bigger than playerIndex
        cpuIndex = gamePicksComparator.lastIndexOf(cpu);
    }

    if (playerIndex == cpuIndex) {
        tie();
    } else if (playerIndex + 1 == cpuIndex || playerIndex + 3 == cpuIndex) {
        //Increase the player score
        updateWin();
    } else if (playerIndex + 2 == cpuIndex || playerIndex + 4 == cpuIndex) {
        //Increase the Cpu score
        updateLose();
    }

    //Sets buttons cooldown
    disablePicks();
    //Checks if the game its over
    if (checkGameOver()) {
        document.getElementById("game-over").style.visibility = "visible";
        gameOverCountdown();
        setTimeout(endGame, 3000);
    } else {
        setTimeout(enablePicks, 1000);
    }


}

/**Updates the player score and shows a win message*/
function updateWin() {
    resultsMessage("win");
    document.getElementById("player-area").classList.add("highlight");
    let score = parseInt(document.getElementById("player-score").innerText);
    document.getElementById("player-score").innerText = ++score;
}

/**Updates the cpu score and shows a lose message*/
function updateLose() {
    resultsMessage("lose");
    document.getElementById("cpu-area").classList.add("highlight");
    let score = parseInt(document.getElementById("cpu-score").innerText);
    document.getElementById("cpu-score").innerText = ++score;
}

/**Shows a tie message*/
function tie() {
    resultsMessage();
}

/**Removes the highlight class */
function removeHighlight() {
    document.getElementById("player-area").classList.remove("highlight");
    document.getElementById("cpu-area").classList.remove("highlight");
}

/**Updates the round-result message and removes the highlight class*/
function resultsMessage(msg) {
    let result = document.getElementById("round-result");
    if (msg === "win") {
        result.innerText = "You win";
    } else if (msg === "lose") {
        result.innerText = "You lose";
    } else {
        result.innerText = "It's a tie";
    }
    removeHighlight();
}

/**
 * Updates on index.html the icons chosen by the player and the cpu
 */
function updatePicks(player, cpu) {

    const icons = [
        '<i class="fa-regular fa-hand-scissors"></i>',
        '<i class="fa-regular fa-hand"></i>',
        '<i class="fa-regular fa-hand-back-fist"></i>',
        '<i class="fa-regular fa-hand-lizard"></i>',
        '<i class="fa-regular fa-hand-spock"></i>'
    ];
    document.getElementById("player-choise").innerHTML = icons[player];
    document.getElementById("cpu-choise").innerHTML = icons[cpu];
}

/**Shows the instruccions when the user clicks on the paragraph*/
function showInstructions() {

    document.getElementById("instructions").style.display = "block";
}

/**Hide the instruccions when the user clicks on the close button*/
function hideInstructions() {

    document.getElementById("instructions").style.display = "none";
}
/**Shows the history when the user clicks on the paragraph*/
function showHistory() {

    document.getElementById("history").style.display = "block";
}

/**Hide the history when the user clicks on the close button*/
function hideHistory() {

    document.getElementById("history").style.display = "none";
}
function gameOverCountdown() {
    let time = 2;
    let gOverMsg = document.getElementById("game-over");
    let gameOver = setInterval(function () {
        if (time <= 0) {
            clearInterval(gameOver);
            //Hides game over message and resets it text
            document.getElementById("game-over").style.visibility = "hidden";
            gOverMsg.innerHTML = "Game Over! Returning to menu in 3...";
        } else {
            gOverMsg.innerHTML = "Game Over! Returning to menu in " + time + "...";
        }
        time -= 1;
    }, 1000);
}

/**Checks the scores and returns a boolean depending on the game mode */
function checkGameOver() {
    let pScore = parseInt(document.getElementById("player-score").innerText);
    let cpuScore = parseInt(document.getElementById("cpu-score").innerText);
    let gOver;
    console.log(getMode());
    switch (getMode()) {
        case "BO3":
            pScore === 3 || cpuScore === 3 ? gOver = true : gOver = false;
            break;
        case "BO5":
            pScore === 5 || cpuScore === 5 ? gOver = true : gOver = false;
            break;
        case "Until5":
            cpuScore === 5 ? gOver = true : gOver = false;
            break;
        default:
            alert("Invalid game mode");
    }

    return gOver;
}

/**
 * Hides the game area and shows the game menu again, 
 * resets the scores and the picks and
 * updates the results div
 */
function endGame() {

    //Hides the game area
    document.getElementsByClassName("game-area")[0].style.display = "none";
    //Makes the game menu visible
    document.getElementsByClassName("game-menu")[0].style.display = "grid";
    //Updates results
    updateResults();
    //Resets scores
    document.getElementById("player-score").innerText = "0";
    document.getElementById("cpu-score").innerText = "0";
    //Resets picks
    document.getElementById("player-choise").innerText = "?";
    document.getElementById("cpu-choise").innerText = "?";
    //Delete round winner message
    document.getElementById("round-result").innerText = "";
    //Removes highlight class
    removeHighlight();
    //Enable the picks buttons
    enablePicks();
    //Hide history
    hideHistory();
    //Reset placeholder value
    document.getElementById("username").placeholder = "Username";
}

/**Updates the text on the results div*/
function updateResults() {
    let username = document.getElementById("player-name").innerText;
    let history = document.getElementById("history-table");
    let pScore = document.getElementById("player-score").innerText;
    let cpuScore = document.getElementById("cpu-score").innerText;
    //Create row
    let row = document.createElement("tr");
    //Create cells
    let player = document.createElement("td");
    let score = document.createElement("td");
    let mode = document.createElement("td");
    let lvl = document.createElement("td");
    //Add data to cells
    player.innerHTML = username;
    score.innerHTML = `${pScore} - ${cpuScore}`;
    mode.innerHTML = getMode();
    lvl.innerHTML = getDifficulty();
    //Append cells to row
    row.appendChild(player);
    row.appendChild(score);
    row.appendChild(mode);
    row.appendChild(lvl);
    //Append row to table;
    history.appendChild(row);


}