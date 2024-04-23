let playerImage = document.getElementById("anden")
let chosenSkin = localStorage.getItem("chosenSkin") || 0

function updateSkin() {
    if (chosenSkin == 0) {
        playerImage = document.getElementById("anden")
    }

    if (chosenSkin == 1) {
        playerImage = document.getElementById("kasper")
    }

    if (chosenSkin == 2) {
        playerImage = document.getElementById("torb")
    }

    if (chosenSkin == 3) {
        playerImage = document.getElementById("jonas")
    }

}
function chosenAnd() {
    chosenSkin = 0
    localStorage.setItem("chosenSkin", chosenSkin)
}

function chosenKasper() {
    chosenSkin = 1
    localStorage.setItem("chosenSkin", chosenSkin)
}

function chosenTorb() {
    chosenSkin = 2
    localStorage.setItem("chosenSkin", chosenSkin)
}

function chosenJonas() {
    chosenSkin = 3
    localStorage.setItem("chosenSkin", chosenSkin)
}