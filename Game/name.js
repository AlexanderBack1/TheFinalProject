//navn 
const nameScreen = document.getElementById("nameScreen")
const namePlayer = document.getElementById("namePlayer")

let playerName = localStorageStorage.getItem("playerName") || 0

const nameInput = document.getElementById("nameInput")

function registrerName() {
    playerName = nameInput.value

    namePlayer.innerText = playerName

    localStorageStorage.setItem("playerName", playerName)
}