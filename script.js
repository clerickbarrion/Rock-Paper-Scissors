// Enter a choice, computer randomly gets assigned a choice.
// Choices are compared. Winner is announced, scores and images
// are updated.

// class for interactive elements
class Labels {
    // captures elements
    constructor() {
        this.announcement = document.getElementById('announcement')
        this.errorMessage = document.getElementById('error-message')
        this.playerChoiceInput = document.getElementById('player-choice-input')
        this.resetButton = document.getElementById('reset-button')
        this.playButtons = {
            rockButton: document.getElementById('rock'),
            paperButton: document.getElementById('paper'),
            scissorsButton: document.getElementById('scissors'),
        }
        this.images = {
            playerImg: document.getElementById('player-choice-img'),
            computerImg: document.getElementById('computer-choice-img'),
        }
        this.totals = {
            winTotal: document.getElementById('wins'),
            lossTotal: document.getElementById('losses'),
            tieTotal: document.getElementById('ties'),
        }
    }
    // updates images
    updateImg(playerChoice, computerChoice) {
        this.images.playerImg.src = `images/${playerChoice}.png`
        this.images.computerImg.src = `images/${computerChoice}.png`
    }
    // updates totals
    updateTotals(wins, losses, ties) {
        this.totals.winTotal.innerText = `Wins: ${wins}`
        this.totals.lossTotal.innerText = `Losses: ${losses}`
        this.totals.tieTotal.innerText = `Ties: ${ties}`
    }
    // resets
    reset() {
        wins = 0, losses = 0, ties = 0
        this.updateTotals(wins, losses, ties)
        this.updateImg('blank','blank')
        this.announcement.innerText = 'Rock Paper Scissors'
        this.errorMessage.style.display = 'none'
    }
    
}

// class for game logic
class Game {
    // stores choices and win conditions
    constructor() {
        this.choices = ['rock','paper','scissors']
        // 1st word is computer choice. 2nd word is player choice
        this.computerWin = ['paper rock','scissors paper','rock scissors']
        this.playerWin = ['rock paper','paper scissors','scissors rock']
    }

    // randomizes computer choice
    get computerChoice() {return this.choices[Math.floor(Math.random()*3)]}

    // starts the game
    play() {
        let playerChoice = labels.playerChoiceInput.value

        // validates player choice
        if (!this.choices.includes(playerChoice.toLowerCase())) {
            labels.errorMessage.style.display = 'block'
            return
        } else {
            labels.errorMessage.style.display = 'none'
        }

        let computerChoice = this.computerChoice

        // puts choices in win scenario format
        const match = `${computerChoice} ${playerChoice}`;

        // checks if `match` matches one of the win conditions
        let winner
        Object.entries(this).forEach(scenario => {
            if (scenario[1].includes(match)) {winner = scenario[0]}
        })
        switch (winner) {
            case 'playerWin':
                labels.announcement.innerText = 'Player wins!'
                wins++
                break;
            case 'computerWin':
                labels.announcement.innerText = 'Computer wins!'
                losses++
                break;
            default:
                labels.announcement.innerText = 'Tie!'
                ties++
        }

        // updates
        labels.updateImg(playerChoice, computerChoice)
        labels.updateTotals(wins, losses, ties)
    }

}

let wins = 0, losses = 0, ties = 0

// create objects
let labels = new Labels()
let rps = new Game()

// event listeners
Object.values(labels.playButtons).forEach(button => {
    button.addEventListener('click', () => {
        labels.playerChoiceInput.value = button.value;
        rps.play()
    })
})
labels.playerChoiceInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {labels.playerChoiceInput.blur(); rps.play()}
})
labels.resetButton.addEventListener('click', () => {labels.reset()})