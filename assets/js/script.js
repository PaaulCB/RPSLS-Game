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
const gamePicks = ["scissors", "paper", "rock", "lizard", "spock"];
//**Hides the game menu and shows the game area when start the game */

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
      option.addEventListener("click", function () { checkWin(pick, cpuPick(pick)); });
      console.log(option);
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
/**
 * Checks the wins between player and cpu picks
 * For this function we use the same principle 
 * that we use on spacialPick function, items with 
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
    alert(`${player} vs ${cpu} You tie`);
  } else if (playerIndex + 1 == cpuIndex || playerIndex + 3 == cpuIndex) {
    alert(`${player} vs ${cpu} You win`);
    //Increase the player score
    updateWin();
  } else if (playerIndex + 2 == cpuIndex || playerIndex + 4 == cpuIndex) {
    alert(`${player} vs ${cpu} You lose`);
    //Increase the Cpu score
    updateLose();
  }

  //Checks if the game its over
  if (checkGameOver()) {
    endGame();
  }

}

//**Updates the player score */
function updateWin() {

  let score = parseInt(document.getElementById("player-score").innerText);
  document.getElementById("player-score").innerText = ++score;
}

//**Updates the cpu score */
function updateLose() {

  let score = parseInt(document.getElementById("cpu-score").innerText);
  document.getElementById("cpu-score").innerText = ++score;
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
//**Checks the scores and returns a boolean depending on the game mode */
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
  document.getElementsByClassName("game-menu")[0].style.display = "block";
  //Updates results
  document.getElementById("results").innerText = updateResults();
  //Resets scores
  document.getElementById("player-score").innerText = "0";
  document.getElementById("cpu-score").innerText = "0";
  //Resets picks
  document.getElementById("player-choise").innerText = "?";
  document.getElementById("cpu-choise").innerText = "?";
}
//**Updates the text on the results div*/
function updateResults() {

  let result;
  let pScore = document.getElementById("player-score").innerText;
  let cpuScore = document.getElementById("cpu-score").innerText;
  let diff = getDifficulty();
  let mode = getMode();
  result = `Your last score was ${pScore} - ${cpuScore} on a ${mode} mode`;
  result += ` with a lvl ${diff} difficulty`;
  return result;
}