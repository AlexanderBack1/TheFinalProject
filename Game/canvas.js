//start spillet
let scoreInterval = 0
let gameOn = false
const canvas = document.querySelector("canvas")
const aside = document.querySelector("aside")
const startButton = document.getElementById("startButton")


function begin() {
    gameOn = true
    tegn()
    birkTimeout()
    nameScreen.style.zIndex = "-1"
    nameScreen.style.opacity = "0%"
    scoreInterval = setInterval(lessScore, 1000)
    namePlayer.innerText = playerName
    resetAllBirks()
    sound = true
    spillAvBakgrunn()
    startButton.style.display = "none"
    canvas.style.filter = "brightness(100%)"
    aside.style.filter = "brightness(100%)"
}

//regler for canvaset
canvas.width = 900
canvas.height = 600

const ctx = canvas.getContext("2d")



//fysikkens lover i følge meg
const gravity = -0.65



//spilleren
const player = {
    startX: 830,
    startY: 540,

    endX: 50,
    endY: 50,

    speed: 4,
    climbSpeed: 3,

    XSpeed: 0,
    YSpeed: 0,

    yVelocity: 10,
    yStartVelocity: 10,

    yLimit: 590,

    level2: 400,
    level3: 200,
}

function drawPlayer() {
    if (climbing == false) {
        player.startX += player.XSpeed
    }

    if (climbing == true) {
        player.startY += player.YSpeed
    }

    dontLeave()

    ctx.drawImage(playerImage, player.startX, player.startY, player.endX, player.endY)
}

function movePlayer() {
    document.addEventListener("keydown", function (event) {
        let key = event.key;
        if (key === "a" || key === "A") {
            if (climbing == false) {
                moveLeft()
                dontLeave()
            }

        }
        if (key === "d" || key === "D") {
            if (climbing == false) {
                moveRight()
                dontLeave()
            }

        }

        if (key === "w" || key === "W") {
            if (climbing == false) {
                jump()
            }
            else {
                climbUp()
                updateYLimit()
            }
        }

        if (key === "s" || key === "S") {
            if (climbing == true) {
                climbDown()
                updateYLimit()
            }
        }
    });

    document.addEventListener("keyup", function (event) {
        let key = event.key;
        if (key === "a" || key === "A") {
            if (climbing == false) {
                player.XSpeed = 0
            }

        }
        if (key === "d" || key === "D") {
            if (climbing == false) {
                player.XSpeed = 0
            }

        }

        if (key === "w" || key === "W") {
            if (climbing == true) {
                player.YSpeed = 0
            }
        }

        if (key === "s" || key === "S") {
            if (climbing == true) {
                player.YSpeed = 0
            }
        }
    });
}

let playerCenterX = player.startX + player.endX / 2
let playerCenterY = player.startY + player.endY / 2

let climbing = false

function moveLeft() {
    player.XSpeed = -player.speed
    playerCenterX = player.startX + player.endX / 2
}

function moveRight() {
    player.XSpeed = player.speed
    playerCenterY = playerCenterY = player.startY + player.endY / 2
}

let hopp = null

let jumping = false;

function jump() {
    if (!jumping) {
        jumping = true;
        player.yVelocity = player.yStartVelocity;
        requestAnimationFrame(playerJump);
        spillAvJump()
    }
}

function playerJump() {
    player.startY -= player.yVelocity;
    player.yVelocity += gravity;

    if (player.startY + 50 > player.yLimit) {
        player.startY = player.yLimit - 50;
        jumping = false;
    } else {
        requestAnimationFrame(playerJump);
    }
}


let falling = false

function fall() {
    if (!falling) {
        falling = true
        player.yVelocity = player.yStartVelocity;
        requestAnimationFrame(playerFall);
    }
}

function playerFall() {
    player.startY -= player.yVelocity / 2;
    player.yVelocity += gravity;

    if (player.startY + 50 > player.yLimit) {
        player.startY = player.yLimit - 50;
        falling = false;
    } else {
        requestAnimationFrame(playerFall);
    }
}



function dontLeave() {
    if (player.startX < 0) {
        player.startX = 0;
        player.XSpeed = 0;
    }
    else if (player.startX + player.endX > 900) {
        player.startX = 900 - player.endX;
        player.XSpeed = 0;
    }

    if (detectPlayerLadderCollision(stige1) && climbing == true) {
        if (player.startY + 50 > 590) {
            player.startY = 540;
            player.YSpeed = 0;
            fall()
            stopKlatring()
        }
    }

    if (detectPlayerLadderCollision(stige2) && climbing == true) {
        if (player.startY + 50 > 350) {
            player.startY = 300;
            player.YSpeed = 0;
            fall()
            stopKlatring()
        }
    }
}


//mål

function playerInGoal() {

    return player.startX < mal.startX + mal.endX &&
        player.startX + player.endX > mal.startX &&
        player.startY < mal.startY + mal.endY &&
        player.startY + player.endY > mal.startY &&
        player.yLimit == player.level3 - 50;
}

function resetPlayer() {
    player.startX = 850
    player.startY = 540
    player.yLimit = 590
}

const wScoreBoard = document.getElementById("wScoreBoard")
const whighScoreBoard = document.getElementById("whighScoreBoard")
const winScreen = document.getElementById("winscreen")

let hasWon = false;
function win() {
    if (!hasWon) {
        winScreen.style.zIndex = "10"
        winScreen.style.opacity = "100%"

        clearInterval(scoreInterval)

        wScoreBoard.innerHTML = score
        if (score > highscore) {
            highscore = score
            localStorage.setItem("highscore", score);
        }
        whighScoreBoard.innerText = highscore

        checkHigh()
        spillAvWin()

        setTimeout(function() {
            startButton.style.display = "block"
            canvas.style.filter = "brightness(70%)"
            aside.style.filter = "brightness(70%)"
            gameOn = false
            resetPlayer()
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            preveiw()
        }, 2000);

        whighScoreBoard2.innerText = playerArr[0].hs
        hasWon = true
        collision = true
    }
}

function resetGame() {
    score = 100000
    resetAllBirks()
}

function provIgjen() {
    setTimeout(resetGame(), 1000)
    sound = false
    collision = false
    spillAvBakgrunn()
    hasWon = false
    winScreen.style.zIndex = "-1"
    winScreen.style.opacity = "0%"

}


function detectPlayerLadderCollision(ladder) {
    return player.startX < ladder.startX + ladder.endX &&
        player.startX + player.endX > ladder.startX &&
        player.startY < ladder.startY + ladder.endY &&
        player.startY + player.endY > ladder.startY;
}

function collisionStige() {
    climbPopup()
    document.addEventListener("keydown", klatreMovement)
}



let popup = document.getElementById("popup")
function climbPopup() {
    popup.style.opacity = "80%"
}

function klatreMovement(event) {
    let key = event.key;

    if (key === "e" || key === "E") {
        klatring()
    }

    if (key === "f" || key === "F") {
        stopKlatring()
        fall()
    }
}
popupTxt = document.getElementById("popupTxt")

function klatring() {
    climbing = true
    popupTxt.innerText = "Trykk på F for å stoppe å klatre"
    justClimbed = false
}

function updateYLimit() {
    if (player.startY + 50 < player.level3) {
        player.yLimit = 150
    }
    else if (player.startY + 50 < player.level2) {
        player.yLimit = 350
    }
    else {
        player.yLimit = 590
    }
}

let justClimbed = false

function hidePopup() {
    popup.style.opacity = "0%"
    popupTxt.innerText = "Trykk på E for å klatre"
}

function stopKlatring() {
    player.YSpeed = 0
    climbing = false

    document.removeEventListener("keydown", klatreMovement)
    jump()
    justClimbed = true
}

function climbDown() {
    player.YSpeed += player.climbSpeed
    playerCenterY = player.startY + player.endY / 2
}


function climbUp() {
    player.YSpeed -= player.climbSpeed
    playerCenterY = player.startY + player.endY / 2
}


//kollisjon mellom spiller og tønne
function detectCollisionPlayerbirk(birk) {
    if (birk.startX < player.startX + player.endX &&
        birk.startX + birk.endX > player.startX &&
        birk.startY < player.startY + player.endY &&
        birk.startY + birk.endY > player.startY) {
        {
            return true;
        }
    }
}

function birkAni() {
    canvas.style.animation = ("skadeAnimasjon .2s infinite linear")

    setTimeout(function () {
        canvas.style.animation = "none"
    }, 200);
}

function birkGotcha() {
    player.yLimit = 590
    scoreBirk()
    fall()
    birkAni()
    spillAvDmg()
}

//funksjon som skjekker alle kollisjoner
function checkCollisions(birk) {
    //kollisjoner mellom birk-er og moveSquares
    if (detectCollision(birk, moveSquare3)) {
        birk.visible = false;
        resetbirk(birk)
    }

    if (detectCollision(birk, moveSquare1) || detectCollision(birk, moveSquare4)) {
        collisionSquareX(birk)
    }

    if (detectCollision(birk, moveSquare4)) {
        birk.yLimit = 700
        birk.startYVelocity = birk.startYStartVelocity
    }
    if (detectCollision(birk, moveSquare2) || detectCollision(birk, moveSquare5)) {
        invertMovement(birk)
        collisionSquareY(birk)
    }

    //kolisjoner mellom stiger og spiller
    if (detectPlayerLadderCollision(stige1) || detectPlayerLadderCollision(stige2)) {
        collisionStige();
    }

    if(!detectPlayerLadderCollision(stige1) && !detectPlayerLadderCollision(stige2)) {
       hidePopup();
    }

    if (!detectPlayerLadderCollision(stige1) && !detectPlayerLadderCollision(stige2) && !justClimbed) {
        stopKlatring();
    }

    //kolisjon mellom spiller og Birk når spiller ikke er på stige
    if ((!detectPlayerLadderCollision(stige1) && !detectPlayerLadderCollision(stige2)) && detectCollisionPlayerbirk(birk) && !collision) {
        birkGotcha()
        setTimeout(updateCollisionReset, 400)
    }

    //kollisjon mellom spiller og Birk på en stige
    if ((detectPlayerLadderCollision(stige1) || detectPlayerLadderCollision(stige2)) && detectCollisionPlayerbirk(birk) && !collision) {
        stopKlatring()
        birkGotcha()
        setTimeout(updateCollisionReset, 1500)
    }

    //kolisjon mellom spiller og mål 
    if (playerInGoal() && !falling) {
        win()
    }
}

function checkCollisionsBirk() {
    checkCollisions(birk1);
    checkCollisions(birk2);
    checkCollisions(birk3);
}

//navne greier og start game greier
if (playerName == 0) {
    nameScreen.style.zIndex = "1"
    nameScreen.style.opacity = "100%"
}
else {
    startButton.style.display = "block"
    nameScreen.style.zIndex = "-1"
    nameScreen.style.opacity = "0%"

}

function preveiw() {
    createArena()
    drawPlayer()
    updateScore()
    namePlayer.innerText = playerName
}

preveiw();

//hoved funksjonen for hele canvaset
movePlayer();

function tegn() {
    if(gameOn == true) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        updateScore()
        moveBirk()
        createArena();
        checkCollisionsBirk();
        createSquares();
        drawBarrels();
        updateSkin();
        drawPlayer();
        requestAnimationFrame(tegn);
    }
}