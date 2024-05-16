//leaderboard
const GameID = "donkeyKong"

const URL = "https://rasmusweb.no/hs.php"

const requestOptions = {
    method: "GET",
    headers: {
        Accept: "application/json",
    },
}

let playerArr = []
//henter
async function getRequest(gameId, i) {

    const apiCallPromise = await fetch(URL + "?id=" + gameId, requestOptions)

  console.log("StatusCodeOK: " + apiCallPromise.ok)

    // Getting the json from the response (NOTE: Also await!)
    const json = await apiCallPromise.json()
    console.log(json)
    console.log(json.hs)
    console.log(json.player)

    


    let player = {
        name: json.player,
        highscore: json.hs
    };

    playerArr.push(player);

}

//legger til info
async function postRequest(gameId) {
    postBody = {}
    postBody.id = gameId + 4
    postBody.hs = 1200
    postBody.player = "Pelle"

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

pullNames()

function pullNames() {
    for (let i = 0; i < 5; i++) {
        getRequest(GameID + i, i) 
    }
    
    setTimeout(function() {
        playerArr.sort((a, b) => b.highscore - a.highscore); // Sorterer basert på highscore (fallende rekkefølge)

        for (j=0; j<5; j++){
            document.getElementById("spanP"+j).innerText = playerArr[j].name
            document.getElementById("spanS"+j).innerText = playerArr[j].highscore
        }
    }, 4000);
}