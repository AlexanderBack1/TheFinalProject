const scoreDiv = document.getElementById("scoreDiv")
const scoreBoard = document.getElementById("scoreBoard")
const highScoreBoard = document.getElementById("highScoreBoard")

let highscore = parseInt(sessionStorage.getItem("highscore")) || 0

let score = 100000

function updateScore() {
    scoreBoard.innerText = score


    if(score <= 0) {
        score = 0
        scoreBoard.innerText = "0"
    }

    highScoreBoard.innerText = highscore
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


//leaderboard
const GameID = "donkeyKong"

const URL = "https://rasmusweb.no/hs.php"

const requestOptions = {
    method: "GET",
    headers: {
        Accept: "application/json",
    },
}
//henter
let i = 1
async function getRequest(gameId) {

    const apiCallPromise = await fetch(URL + "?id=" + gameId, requestOptions)

  console.log("StatusCodeOK: " + apiCallPromise.ok)

    // Getting the json from the response (NOTE: Also await!)
    const json = await apiCallPromise.json()
    console.log(json)
    console.log(json.hs)
    console.log(json.player)

    document.getElementById("spanP"+i).innerText = json.player
    document.getElementById("spanS"+i).innerText = json.hs

    i++
}

//legger til info
async function postRequest(gameId) {
    postBody = {}
    postBody.id = gameId
    postBody.hs = 300
    postBody.player = "Jonas"

    const apiCallPromise = await fetch(URL, {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
        body: JSON.stringify(postBody),
    })

    //appendPElm(htmlObj, "StatusCodeOK: " + apiCallPromise.ok)

    // Getting the json from the response:
    const responseJson = await apiCallPromise.json()
    console.log(responseJson)

    //appendPElm(htmlObj, "Response: " + responseJson)
}

for(i = 0; i<5; i++){
    postRequest(GameID+i)
}

for (i = 0; i<5; i++) {
  getRequest(GameID+i)
}
