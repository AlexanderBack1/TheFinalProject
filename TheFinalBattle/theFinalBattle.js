let chosenSkin = localStorage.getItem("chosenSkin") || 0
const player = document.getElementById("player")

updateSkin()

function updateSkin() {
    if (chosenSkin == 0) {
      player.src = "../Bilder/playerIcon1.png"
    }

    if (chosenSkin == 1) {
       player.src= "../Bilder/kasper.png"
    }

    if (chosenSkin == 2) {
        player.src= "../Bilder/Torbjorn.png"
    }

    if (chosenSkin == 3) {
        player.src= "../Bilder/Jonas.png"
    }

}