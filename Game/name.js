//navn 
const nameScreen = document.getElementById("nameScreen")
const namePlayer = document.getElementById("namePlayer")

let playerName = localStorage.getItem("playerName") || 0

function checkName(){
    if(playerName == 0){
        nameScreen.style.zIndex = "1"
        nameScreen.style.opacity = "100%"
    }
    else {
        nameScreen.style.zIndex = "-1"
        nameScreen.style.opacity = "0%"
        namePlayer.innerText = playerName
    }
}

const nameInput = document.getElementById("nameInput")

function registrerName(){
    playerName = nameInput.value

    namePlayer.innerText = playerName
    console.log(playerName)
    localStorage.setItem("playerName", playerName)
}