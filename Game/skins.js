let playerImage = document.getElementById("anden")
let chosenSkin = localStorage.getItem("chosenSkin") || 0

const andImg = document.getElementById("andImg")
const kasperImg = document.getElementById("kasperImg")
const torbImg = document.getElementById("torbImg")
const jonasImg = document.getElementById("jonasImg")
const skinImg = document.querySelectorAll(".skinImg")
updateSkin()

function updateSkin() {
    if (chosenSkin == 0) {
        playerImage = document.getElementById("anden")
        andImg.style.border = "10px solid var(--mainGreen)"
    }

    if (chosenSkin == 1) {
        playerImage = document.getElementById("kasper")
        kasperImg.style.border = "10px solid var(--mainGreen)"
    }

    if (chosenSkin == 2) {
        playerImage = document.getElementById("torb")
        torbImg.style.border = "10px solid var(--mainGreen)"
    }

    if (chosenSkin == 3) {
        playerImage = document.getElementById("jonas")
        jonasImg.style.border = "10px solid var(--mainGreen)"
    }
}

function chosenAnd() {
    chosenSkin = 0
    localStorage.setItem("chosenSkin", chosenSkin)
    andImg.style.border = "10px solid var(--mainGreen)"
    skinImg.forEach((img) => {
        if (img.id !== "andImg") {
          img.style.border = "0";
        }
      });
}

function chosenKasper() {
    chosenSkin = 1
    localStorage.setItem("chosenSkin", chosenSkin)
    kasperImg.style.border = "10px solid var(--mainGreen)"
    skinImg.forEach((img) => {
        if (img.id !== "kasperImg") {
          img.style.border = "0";
        }
      });
}

function chosenTorb() {
    chosenSkin = 2
    localStorage.setItem("chosenSkin", chosenSkin)
    torbImg.style.border = "10px solid var(--mainGreen)"
    skinImg.forEach((img) => {
        if (img.id !== "torbImg") {
          img.style.border = "0";
        }
      });
}

function chosenJonas() {
    chosenSkin = 3
    localStorage.setItem("chosenSkin", chosenSkin)
    jonasImg.style.border = "10px solid var(--mainGreen)"
    skinImg.forEach((img) => {
        if (img.id !== "jonasImg") {
          img.style.border = "0";
        }
      });
}