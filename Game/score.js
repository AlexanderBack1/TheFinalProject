const scoreDiv = document.getElementById("scoreDiv")
const scoreBoard = document.getElementById("scoreBoard")
const highScoreBoard = document.getElementById("highScoreBoard")
const highScoreBoard2 = document.getElementById("highScoreBoard2")
const whighScoreBoard2 = document.getElementById("whighScoreBoard2")

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
        highScoreBoard2.innerText = playerArr[0].hs
        whighScoreBoard2.innerText = playerArr[0].hs
    }, 4000);
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


//oppdater leaderboard

    function checkHigh() {
        setTimeout(function() {
            if(score > playerArr[4].hs) {
                postRequest(score, playerName)
            }

            playerArr = []
            pullNames()
        }, 1000);
    }