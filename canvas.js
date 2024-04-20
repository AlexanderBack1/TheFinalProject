//regler for canvaset
const canvas = document.querySelector("canvas")
canvas.width = 900
canvas.height = 600

const ctx = canvas.getContext("2d")


//banen
let row1 = {
    startY: 0,
    endY: 150
}

let row2 = {
    startY: 200,
    endY: 150
}

let row3 = {
    startY: 450,
    endY: 150
}

function drawLevels(rows) {
    ctx.fillStyle = "rgb(200 0 0 / 50%)"
    ctx.fillRect(0, rows.startY, 1000, rows.endY)
}

//fysikkens lover i følge meg
const gravity = -0.65

//tønner
let yMovement = true
let xMovement = false

tonne1 = {
    x: 100,
    y: 120,
    radius: 30,
    x_velocity: 5,
    yVelocity: 3,

    yMovement: false,
    xMovement: true,

    visible: true,

    yLimit: 400,

    size: 60,

    //resetting
    startX: 100,
    startY: 120,
    startYLimit: 400,
    yStartVelocity: 3,
}

function tegnTonne(tonne) {
    if (tonne.visible == true) {
        ctx.beginPath()
        ctx.arc(tonne1.x, tonne1.y, tonne1.radius, 0, Math.PI * 2)
        ctx.fillStyle = "rgb(0 0 200 / 50%)"
        ctx.fill()
        ctx.closePath()
    }
}

function drawBarrels() {
    tegnTonne(tonne1)
}

//tønne bevegelse
function invertMovement() {
    tonne1.x_velocity = -tonne1.x_velocity
}

function flytteTonne() {
    if (tonne1.xMovement == true) {
        if (tonne1.x > canvas.width - tonne1.radius || tonne1.x < tonne1.radius) {
            invertMovement()
        }

        tonne1.x += tonne1.x_velocity

    } else if (tonne1.yMovement == true) {
        if (tonne1.y + tonne1.size > tonne1.yLimit) {
            tonne1.yVelocity = 0
        }

        tonne1.y += tonne1.yVelocity
    }
}


//moveSquares
const moveSquare1 = {
    startX: 800,
    startY: 0,

    endX: 50,
    endY: 150
}

const moveSquare2 = {
    startX: 800,
    startY: 340,

    endX: 30,
    endY: 10
}

const moveSquare3 = {
    startX: 850,
    startY: 450,

    endX: 50,
    endY: 150
}

const moveSquare4 = {
    startX: 50,
    startY: 200,

    endX: 50,
    endY: 150
}

const moveSquare5 = {
    startX: 85,
    startY: 590,

    endX: 30,
    endY: 10
}

function drawMoveSquares(squares) {
    ctx.fillStyle = "rgb(0 200 0 / 0%)"
    ctx.fillRect(squares.startX, squares.startY, squares.endX, squares.endY)
}

function createSquares() {
    drawMoveSquares(moveSquare1)
    drawMoveSquares(moveSquare2)
    drawMoveSquares(moveSquare3)
    drawMoveSquares(moveSquare4)
    drawMoveSquares(moveSquare5)
}


function collisionSquare() {
    if (tonne1.xMovement == true && tonne1.yMovement == false) {
        tonne1.xMovement = false
        tonne1.yMovement = true
    }
    else {
        tonne1.xMovement = true
        tonne1.yMovement = false
    }
}

function detectCollision(tonne, square) {
    let squareCenterX = square.startX + square.endX / 2;
    let squareCenterY = square.startY + square.endY / 2;

    let distX = Math.abs(tonne.x - squareCenterX);
    let distY = Math.abs(tonne.y - squareCenterY);

    let distance = Math.sqrt(distX * distX + distY * distY);

    return distance <= (tonne.radius + Math.min(square.endX, square.endY) / 2);
}



function resetTonne(tonne) {
    tonne.x = tonne.startX
    tonne.y = tonne.startY
    tonne.yLimit = tonne.startYLimit
    tonne.yVelocity = tonne.yStartVelocity
    tonne.visible = true
}


//spilleren
const player = {
    startX: 850,
    startY: 540,

    endX: 50,
    endY: 50,

    speed: 7,

    yVelocity: 10,
    yStartVelocity: 10,

    yLimit: 590,

    level1: 1,
    level2: 350,
    level3: 150,
}

function drawPlayer() {
    ctx.fillStyle = "rgb(200 200 200)"
    ctx.fillRect(player.startX, player.startY, player.endX, player.endY)
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

}

let playerCenterX = player.startX + player.endX / 2
let playerCenterY = player.startY + player.endY / 2

let climbing = false

function moveLeft() {
    player.startX -= player.speed
    playerCenterX = player.startX + player.endX / 2
}

function moveRight() {
    player.startX += player.speed
    playerCenterY = playerCenterY = player.startY + player.endY / 2
}

let hopp = null

let jumping = false;

function jump() {
    if (!jumping) {
        jumping = true;
        player.yVelocity = player.yStartVelocity;
        requestAnimationFrame(playerJump);
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



function dontLeave() {
    if (player.startX > 950) {
        player.startX = 950
    }
    if (player.startX < 0) {
        player.startX = 0
    }
}

//stiger

stige1 = {
    startX: 60,
    startY: 330,

    endX: 80,
    endY: 270,
}

stige2 = {
    startX: 760,
    startY: 130,

    endX: 80,
    endY: 220,
}

function skapStiger(stige) {
    ctx.fillStyle = "rgb(200 0 200 / 30%)"
    ctx.fillRect(stige.startX, stige.startY, stige.endX, stige.endY)
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
    popup.style.opacity = "70%"
}

function klatreMovement(event) {
    let key = event.key;

    if (key === "e" || key === "E") {
        klatring()
    }

    if (key === "f" || key === "F") {
        stopKlatring()
        jump()
    }
}
popupTxt = document.getElementById("popupTxt")

function klatring() {
    climbing = true
    popupTxt.innerText = "Trykk på F for å stoppe å klatre"
}

function updateYLimit() {
    if(player.startY + 50 < player.level3) {
        player.yLimit = 150
    }
    else if(player.startY + 50 < player.level2) {
        player.yLimit = 350
    }
    else {
        player.yLimit = 590
    }
}

function stopKlatring() {
    climbing = false
    popup.style.opacity = "0%"
    popupTxt.innerText = "Trykk på E for å klatre"

    document.removeEventListener("keydown", klatreMovement)
}

function climbDown() {
    player.startY += player.speed
    playerCenterY = player.startY + player.endY / 2
}

function climbUp() {
    player.startY -= player.speed
    playerCenterY = player.startY + player.endY / 2
}



//funksjon som skjekker alle kollisjoner mulig
function checkCollisions() {
    //kollisjoner mellom tønner og moveSquares
    if (detectCollision(tonne1, moveSquare1) ||
        detectCollision(tonne1, moveSquare2) ||
        detectCollision(tonne1, moveSquare4) ||
        detectCollision(tonne1, moveSquare5)) {
        collisionSquare();

    }
    if (detectCollision(tonne1, moveSquare3)) {
        tonne1.visible = false;
        setTimeout(resetTonne(tonne1), 1000)
    }

    if (detectCollision(tonne1, moveSquare4)) {
        tonne1.yLimit = 625
        tonne1.yVelocity = tonne1.yStartVelocity
    }
    if (detectCollision(tonne1, moveSquare2) || detectCollision(tonne1, moveSquare5)) {
        invertMovement()
    }


    if (detectPlayerLadderCollision(stige1) || detectPlayerLadderCollision(stige2)) {
        collisionStige();
    }

    if(!detectPlayerLadderCollision(stige1) && !detectPlayerLadderCollision(stige2)) {
        stopKlatring()
    }
}





function createArena() {
    drawLevels(row1)
    drawLevels(row2)
    drawLevels(row3)

    skapStiger(stige2)
    skapStiger(stige1)
}


//spilleren interakterer med stiger



//hoved funksjonen for hele canvaset
tegn()
movePlayer() // må være utenfor tegn, fordi at når den var inni så lagde den en ny eventlistner per frame
function tegn() {
    flytteTonne()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    checkCollisions()
    createArena()
    createSquares()
    drawBarrels()
    drawPlayer()
    requestAnimationFrame(tegn)
}

//to do
//highscore (online)
//stiger
//spiller-ball kollisjon
//skins
//intro
//flere baller
//en siste fight animasjon