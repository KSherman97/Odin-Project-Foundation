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

    if(determinate == 1) {
        console.log("Computer played rock\n");
    } else if(determinate == 2) {
        console.log("Computer played paper\n");
    } else {
        console.log("Computer played scissors\n");
    }

    return determinate;
}

// human choice logic
// We are done if the user enters exit
function getHumanChoice(move) {
    console.log(move);

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
    if(userMove == computerMove) {
        console.log("Tie!\n");
    } else if(userMove == 3 && computerMove == 1) {
        computerScore += 1;
        console.log("You Lose!\n");
    } else if(userMove == 1 && computerMove == 3) {
        userScore += 1;
        console.log("You Win!\n");
    } else {
        if(userMove > computerMove) {
            userScore += 1;
            console.log("You Win!\n");
        } else {
            computerScore += 1;
            console.log("You Lose!\n");
        }
    }
}

function playGame() { 
    for(let i = 0; i < 5; i++) {
        let userInput = prompt("Enter a move: ");

        let humanSelection = getHumanChoice(userInput);
        let computerSelection = getComputerChoice();

        playRound(humanSelection, computerSelection);
        console.log("User Score: " + userScore, " Computer Score: " + computerScore + "\n");
    }
}

playGame();