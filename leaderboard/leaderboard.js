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
}

//legger til info
async function postRequest(gameId) {
    postBody = {}
    postBody.id = gameId
    postBody.hs = 300
    postBody.player = nameInput.value

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



const nameInput = document.getElementById("nameInput")
function h(){
    console.log(nameInput.value)
}

function pushName() {
    postRequest(GameID)
    getRequest(GameID)
}