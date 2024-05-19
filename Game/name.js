//navn 
const nameScreen = document.getElementById("nameScreen")
const namePlayer = document.getElementById("namePlayer")

let playerName = localStorage.getItem("playerName") || 0

const nameInput = document.getElementById("nameInput")

function registrerName() {
    playerName = nameInput.value

    namePlayer.innerText = playerName

    localStorage.setItem("playerName", playerName)
    console.log(playerName)
}

document.addEventListener("keydown", function (event) {
    let key = event.key;

    if(key ===  'Enter') {
        registrerName()
    }
})