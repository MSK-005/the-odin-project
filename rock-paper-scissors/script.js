function getComputerChoice() {
    choices = ["rock", "paper", "scissors"];
    maxIndex = 3;
    minIndex = 0;
    choiceIndex = Math.floor(Math.random() * (maxIndex - minIndex) + minIndex);
    return choices[choiceIndex]
}

function getHumanChoice() {
    choice = prompt("Enter your choice: \"rock\", \"paper\" or \"scissors\"").toLowerCase()
    while (!["rock", "paper", "scissors"].includes(choice) || choice === null) {
        choice = prompt("Error! Enter your choice: \"rock\", \"paper\" or \"scissors\"").toLowerCase()
    }
    return choice
}

function playGame() {
    let computerChoice = "";
    let humanChoice = "";
    let humanScore = 0;
    let computerScore = 0;

    function playRound(humanChoice, computerChoice) {
        console.log(`Computer's choice: ${computerChoice} - Your choice: ${humanChoice}`);
        if (humanChoice === computerChoice) {
            console.log("It's a tie.")    
        } else {
            if (humanChoice === "rock" && computerChoice === "paper") {
                computerScore++;
                console.log("You lose. Paper beats Rock.")
            } else if (humanChoice === "rock" && computerChoice === "scissors") {
                humanScore++;
                console.log("You win. Rock beats Scissors.")
            } else if (humanChoice === "paper" && computerChoice === "rock") {
                humanScore++;
                console.log("You win. Paper beats Rock.")
            } else if (humanChoice === "paper" && computerChoice === "scissors") {
                computerScore++;
                console.log("You lose. Scissors beats Paper.")
           } else if (humanChoice === "scissors" && computerChoice === "rock") {
                computerScore++;
                console.log("You lose. Rock beats Scissors.")
           } else if (humanChoice === "scissors" && computerChoice === "paper") {
                humanScore++;
                console.log("You win. Scissors beats Paper.")
           }
        }
    }

    for (let i = 0; i < 5; i++) {
        computerChoice = getComputerChoice();
        humanChoice = getHumanChoice();
        playRound(humanChoice, computerChoice);
    }
    
    console.log(`Computer's score: ${computerScore} - Your score: ${humanScore}`);
    if (humanScore > computerScore) {
        console.log("Player wins.")
    } else if (computerScore > humanScore) {
        console.log("Computer wins.")
    } else {
        console.log("Its' a tie.")
    }
}

playGame();