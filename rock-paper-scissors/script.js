function getComputerChoice() {
    choices = ["rock", "paper", "scissors"];
    maxIndex = 3;
    minIndex = 0;
    choiceIndex = Math.floor(Math.random() * (maxIndex - minIndex) + minIndex);
    computerChoice = choices[choiceIndex];
}

function getHumanChoice(choiceButton) {
    choiceButton = choiceButton.id.toLowerCase();
    if (["rock", "paper", "scissors"].includes(choiceButton)) {
        humanChoice = choiceButton;
    }
}

function displayChoicesAndResult(statement) {
    let choicesText = document.getElementById("display-choices-text");
    let resultText = document.getElementById("display-result-text");
    let scoresText = document.getElementById("display-score-text");
    choicesText.textContent = `Computer chose ${computerChoice} | Player chose ${humanChoice}`;
    resultText.textContent = statement;
    scoresText.textContent = `Computer: ${computerScore} | Player: ${humanScore}`;

    if (humanScore >= 5 || computerScore >= 5) {
        if (humanScore >= 5) {
            resultText.textContent = "Player reaches 5 points first";
        } else if (computerScore >= 5) {
            resultText.textContent = "Computer reaches 5 points first";
        }

        choicesText.textContent = "Select an option to start the game";
        scoresText.textContent = "";
        humanScore = 0;
        computerScore = 0;
    }
}

function playRound() {
    let statement = "";
    if (humanChoice === computerChoice) {
        statement = "It's a tie";
        displayChoicesAndResult(statement);
    } else {
        if (humanChoice === "rock" && computerChoice === "paper") {
            computerScore++;
            statement = "Computer wins";
            displayChoicesAndResult(statement);
        } else if (humanChoice === "rock" && computerChoice === "scissors") {
            humanScore++;
            statement = "Player wins";
            displayChoicesAndResult(statement);
        } else if (humanChoice === "paper" && computerChoice === "rock") {
            humanScore++;
            statement = "Player wins";
            displayChoicesAndResult(statement);
        } else if (humanChoice === "paper" && computerChoice === "scissors") {
            computerScore++;
            statement = "Computer wins";
            displayChoicesAndResult(statement);
        } else if (humanChoice === "scissors" && computerChoice === "rock") {
            computerScore++;
            statement = "Computer wins";
            displayChoicesAndResult(statement);
        } else if (humanChoice === "scissors" && computerChoice === "paper") {
            humanScore++;
            statement = "Player wins";
            displayChoicesAndResult(statement);
        }
    }
}

let humanChoice = "";
let computerChoice = "";
let humanScore = 0;
let computerScore = 0;

let playerChoiceButtons = document.querySelectorAll(".option-button");
playerChoiceButtons.forEach((choiceButton) => {
    choiceButton.addEventListener("click", function() {
        getHumanChoice(choiceButton);
        getComputerChoice();
        playRound();
    });
});