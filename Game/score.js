const scoreDiv = document.getElementById("scoreDiv")
const scoreBoard = document.getElementById("scoreBoard")

let score = 100000

function updateScore() {
    scoreBoard.innerText = score

    if(score <= 0) {
        score = 0
        scoreBoard.innerText = "0"
    }
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

