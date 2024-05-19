let txtArr = [
    "I Donkey Rasmus er målet ditt å komme deg fram til Rasmus",
    "Men pass på, Rasmus gjør det ikke lett for deg",
    "Han har en arme av Birk-er som han sender mot deg",
    "Disse må du hoppe over for å unngå å miste poeng",
    "Bruk W-tasten for å hoppe",
    "Bruk A- og D-tasten for å bevege deg til høyre eller venstre",
    "Arenaen har tre etasjer",
    "For å komme deg opp en etasje må du bruke stigene",
    "Trykk på E-tasten når du er i nærheten av en stige for å begynne å klatre",
    "Når du er på en stige må du bruke W-tasten for å klatre oppover, og S-tasten for å klatre nedover",
    "Når du har begynt å klatre kan du trykke på F-tasten for å stoppe å klatre",
    "Spillet har et Score-system",
    "Jo kortere tid du bruker på å komme deg til Rasmus, jo mer score får du",
    "Hvis du ikke hopper over Birk-ene mister du også score",
    "Målet er å komme seg fram til Rasmus, med mest mulig score",
    "Lykke til!!!!"
]

const expTxt = document.getElementById("expTxt")
const backBtn = document.getElementById("backBtn")
const nextBtn = document.getElementById("nextBtn")
const img = document.getElementById("exImg")

let f = -1

function next() {
    f++
    expTxt.innerText = txtArr[f]
    img.src = "../Bilder/Examples/example" + (f + 1) + ".png"

    checkS1()
}

function back() {
    f--
    expTxt.innerText = txtArr[f]
    img.src = "../Bilder/Examples/example" + (f + 1) + ".png"

    checkS1()
}

function checkS1() {
    if (f < 0) {
        backBtn.style.display = "none"
        expTxt.innerText = "Velkommen til Donkey Rasmus"
    }
    else if (f < 15) {
        backBtn.style.display = "block"
        nextBtn.style.display = "block"
    }

    else {
        nextBtn.style.display = "none"
    }
}
