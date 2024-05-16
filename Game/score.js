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
        highScoreBoard2.innerText = playerArr[0].hs
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

//oppdater leaderboard
//all time highscore, if(din score > alltime) {endre på det, jeg har noen vage tanker} else if(skjekk de andre i synkende rekkefølge)
setTimeout(checkHigh(), 4000)

    function checkHigh() {
        if(highscore > playerArr[0].hs) {
            console.log("ja")
        }
        
        else if (pHighScore > playerArr[1].hs) {
            //noe
        }
        else {
            console.log("nei")
        }
    }