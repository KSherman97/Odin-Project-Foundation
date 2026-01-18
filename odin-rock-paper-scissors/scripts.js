/**
 * Author: Kyle Sherman
 * Date: 01/13/2026
 * 
 * Description:
 * 
 * This is a js based console implementation of rock-paper-scissors
 * 
 * I do understand there are some things that could be improved,
 * for example, among other things:
 * - case sensitivity
 * - inpropper input or exit case
 * - mixing of logic and output
 * 
 * This assignment explicitly said to ignore those edge cases :)
 */

// global variables
let userScore = 0;
let computerScore = 0;

// Computer choice logic
// Math.random returns 0< and >1 inclusive
// that means we will take a fractional 3rd quantiles
function getComputerChoice() {
    let determinate = Math.floor(Math.random() * 3) + 1;
    
    let roundMove = document.querySelector("#last-move");

    if(determinate == 1) {
        roundMove.textContent = "Computer played rock";
    } else if(determinate == 2) {
        roundMove.textContent = "Computer played paper";
    } else {
        roundMove.textContent = "Computer played scissors";
    }

    return determinate;
}

// human choice logic
// We are done if the user enters exit
function getHumanChoice(move) {
    if(move == "rock") {
        return 1;
    } else if(move == "paper") {
        return 2;
    } else {
        return 3;
    }
}

// rock beats scissors
// scissors beats paper
// paper beats rock
function playRound(userMove, computerMove) {
    const playerScoreSheet = document.querySelector("#player-score");
    const computerScoreSheet = document.querySelector("#computer-score");
    const roundResult = document.querySelector("#round-result");

    if(userMove == computerMove) {
        roundResult.textContent = "Round Tie!";
    } else if(userMove == 3 && computerMove == 1) {
        computerScore += 1;
        roundResult.textContent = "You Lose!";
    } else if(userMove == 1 && computerMove == 3) {
        userScore += 1;
        roundResult.textContent = "You Win!";
    } else {
        if(userMove > computerMove) {
            userScore += 1;
            roundResult.textContent = "You Win!";
        } else {
            computerScore += 1;
            roundResult.textContent = "You Lose!";
        }
    }

    playerScoreSheet.textContent = userScore;
    computerScoreSheet.textContent = computerScore;
}

// event listeners
const buttonRock = document.querySelector('#button-rock');
buttonRock.addEventListener("click", () => {
    playRound(getHumanChoice("rock"), getComputerChoice());
});

const buttonPaper = document.querySelector('#button-paper');
buttonPaper.addEventListener("click", () => {
    playRound(getHumanChoice("paper"), getComputerChoice());
});

const buttonScissors = document.querySelector('#button-scissors');
buttonScissors.addEventListener("click", () => {
    playRound(getHumanChoice("scissors"), getComputerChoice());
});