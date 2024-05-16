//navn 
const nameInput = document.getElementById("nameInput")
let name = localStorage.getItem("name") || 0

function registrerName(){
    let playerName = nameInput.value

    console.log(playerName)
    localStorage.setItem("name", playerName)
}