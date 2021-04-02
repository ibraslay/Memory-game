import { swapTemplate } from "./templates.js";
import { playGame, checkVictory } from "./randomImages.js";
import { getScoring, setName, setScoreRanking } from "./scoring.js";
import { playSound } from "./sound.js";

// initial template
swapTemplate("registration", "left_section");
// ranking template
swapTemplate("score", "right_section");

// listener to start game boton
document.getElementById("btnStart").addEventListener("click", startGame);

/*
 * This starts the game and
 * changes to game template
 * @ Author:
 */
function startGame() {
  const namePlayer = document.getElementById("namePlayer");
  if (namePlayer.value.trim() != "") {
    setName(namePlayer.value);
    swapTemplate("play", "left_section");

    playGame();
    // listener
    // document.getElementById("board").addEventListener("click", goToPageFinish);
    // score list
    setScoreRanking("ol.list");
    setScoreRanking("ol.listNav");

    // Add Audio Start
    playSound("startSound");
    //TODO: pendiente sonido gameOver en la funcion HARD !!!!!
  } else {
    alert("Name required!");
  }
}

/*
 * This starts again the game
 * @ Author:
 */
function handleStartAgain() {
  swapTemplate("registration", "left_section");
  setTimeout(() => {
    // listener to start game boton
    document.getElementById("btnStart").addEventListener("click", startGame);
  }, 1000);
}

/*
 * This displays the score icon in
 * mobile version
 * @ Author:
 */
document.getElementById("close").addEventListener("click", function () {
  var closed = document.getElementById("close");
  if (closed.classList.contains("nav-animation")) {
    closed.classList.remove("nav-animation");
  }
});
document.getElementById("open").addEventListener("click", function () {
  var closed = document.getElementById("close");
  closed.classList.add("nav-animation");
  // Sound Coin NavBar
  playSound("openCoin");
});

/*
 * this listener wait for animations end
 * @ Author:
 */

document.addEventListener("animationend", handleAnimationEnd);

let arrUserLength = getScoring().length;
function handleAnimationEnd() {
  // clean animations
  cleanAnimations();
  // if game finished
  const arrayUsers = getScoring();
  if (arrayUsers.length !== arrUserLength) {
    checkVictory();
    // swap to finish template
    swapTemplate("finish", "left_section");
    // score list
    setScoreRanking("ol.list");
    setScoreRanking("ol.listNav");
    // Listener
    document
      .getElementById("play-again")
      .addEventListener("click", handleStartAgain);
    // Sound Level Completed
    playSound("levelCompleted");
    arrUserLength = arrayUsers.length;
  }
}

/*
 * this function clean the wrong animation
 * game
 * @ Author:
 */
function cleanAnimations() {
  const allImages = document.querySelectorAll("img[data-id]");
  allImages.forEach((element) => {
    if (element.classList.contains("wrong")) {
      element.classList.remove("wrong");
    }
  });
}
