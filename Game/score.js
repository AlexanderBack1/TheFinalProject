const scoreDiv = document.getElementById("scoreDiv")
const scoreBoard = document.getElementById("scoreBoard")
const highScoreBoard = document.getElementById("highScoreBoard")
const highScoreBoard2 = document.getElementById("highScoreBoard2")

let highscore = parseInt(localStorage.getItem("highscore")) || 0


let score = 100000

function updateScore() {
    scoreBoard.innerText = score


    if(score <= 0) {
        score = 0
        scoreBoard.innerText = "0"
    }

    highScoreBoard.innerText = highscore

    setTimeout(function() {
        highScoreBoard2.innerText = playerArr[0].highscore
    }, 1000);
}

function lessScore() {
    score = score -= 100
}

let collision = false

function scoreBirk() {
    if(collision == false) {
        score -= 10000
        collision = true

       setTimeout(updateCollisionReset, 400)
    }
}

function updateCollisionReset() {
    collision = false
}

let scoreInterval = setInterval(lessScore, 1000)