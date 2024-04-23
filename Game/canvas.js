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

tonne2 = {
    x: 200,
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
        ctx.arc(tonne.x, tonne.y, tonne.radius, 0, Math.PI * 2)
        ctx.fillStyle = "rgb(0 0 200 / 50%)"
        ctx.fill()
        ctx.closePath()
    }
}

function drawBarrels() {
    tegnTonne(tonne1)
    tegnTonne(tonne2)
}


//tønne bevegelse
function invertMovement(tonne) {
    tonne.x_velocity = -tonne.x_velocity
}

function flytteTonne(tonne) {
    if (tonne.xMovement == true) {
        if (tonne.x > canvas.width - tonne.radius || tonne.x < tonne.radius) {
            invertMovement(tonne)
        }

        tonne.x += tonne.x_velocity

    } else if (tonne.yMovement == true) {
        if (tonne.y + tonne.size > tonne.yLimit) {
            tonne.yVelocity = 0
        }

        tonne.y += tonne.yVelocity
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


function collisionSquare(tonne) {
    if (tonne.xMovement == true && tonne.yMovement == false) {
        tonne.xMovement = false
        tonne.yMovement = true
    }
    else {
        tonne.xMovement = true
        tonne.yMovement = false
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

    speed: 4,
    climbSpeed: 3,

    XSpeed: 0,
    YSpeed: 0,

    yVelocity: 10,
    yStartVelocity: 10,

    yLimit: 590,

    level2: 350,
    level3: 150,
}

function drawPlayer() {
    if (climbing == false) {
        player.startX += player.XSpeed
    }

    if (climbing == true) {
        player.startY += player.YSpeed
    }

    dontLeave()

    ctx.drawImage(image, player.startX, player.startY, player.endX, player.endY)
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
    climbing = false
    jumping = false
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

    if (detectPlayerLadderCollision(stige1)) {
        if (player.startY + 50 > 600) {
            player.startY = 550;
            player.YSpeed = 0;
        }
    }

    if (detectPlayerLadderCollision(stige2)) {
        if (player.startY + 50 > 350) {
            player.startY = 300;
            player.YSpeed = 0;
        }
    }
}


//mål
mal = {
    startX: 0,
    startY: 0,

    endX: 70,
    endY: 150
}

function skapMal() {
    ctx.fillStyle = "rgb(100 100 100 / 100%)"
    ctx.fillRect(mal.startX, mal.startY, mal.endX, mal.endY)
}

function playerInGoal() {
    /*if(player.yLimit == player.level3) {
     if(player.startX + player.endX < mal.startX + mal.endX) {
         console.log("ja")
     }*/

    return player.startX < mal.startX + mal.endX &&
        player.startX + player.endX > mal.startX &&
        player.startY < mal.startY + mal.endY &&
        player.startY + player.endY > mal.startY && 
        player.yLimit == player.level3;
}

const winScreen = document.getElementById("winscreen")
function win() {
    winScreen.style.zIndex = "10"
    winScreen.style.opacity = "100%"
}

function hide() {
    winScreen.style.zIndex = "-1"
    winScreen.style.opacity = "0%"
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
        fall()
    }
}
popupTxt = document.getElementById("popupTxt")

function klatring() {
    climbing = true
    popupTxt.innerText = "Trykk på F for å stoppe å klatre"
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


function stopKlatring() {
    player.YSpeed = 0
    climbing = false
    popup.style.opacity = "0%"
    popupTxt.innerText = "Trykk på E for å klatre"

    document.removeEventListener("keydown", klatreMovement)
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
function detectCollisionPlayerTonne(tonne) {
    let dx = player.startX - tonne.x;
    let dy = player.startY - tonne.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < player.speed + tonne.radius) {
        return true;
    }
}



//funksjon som skjekker alle kollisjoner
function checkCollisions(tonne) {
    //kollisjoner mellom tønner og moveSquares
    if (detectCollision(tonne, moveSquare1) ||
        detectCollision(tonne, moveSquare2) ||
        detectCollision(tonne, moveSquare4) ||
        detectCollision(tonne, moveSquare5)) {
        collisionSquare(tonne);

    }
    if (detectCollision(tonne, moveSquare3)) {
        tonne.visible = false;
        resetTonne(tonne)
    }

    if (detectCollision(tonne, moveSquare4)) {
        tonne.yLimit = 625
        tonne.yVelocity = tonne.yStartVelocity
    }
    if (detectCollision(tonne, moveSquare2) || detectCollision(tonne, moveSquare5)) {
        invertMovement(tonne)
    }

    //kolisjoner mellom stiger og spiller
    if (detectPlayerLadderCollision(stige1) || detectPlayerLadderCollision(stige2)) {
        collisionStige();
        //kanskje noe her som forhindrer deg fra å forlate stigen
    }

    if (!detectPlayerLadderCollision(stige1) && !detectPlayerLadderCollision(stige2)) {
        stopKlatring()
    }

    //kolisjon mellom spiller og tønner
    if (detectCollisionPlayerTonne(tonne)) {
        player.yLimit = 590
        fall()
    }

    //kolisjon mellom spiller og mål 
    if (playerInGoal()) {
        win()
    }
}


function createArena() {
    drawLevels(row1)
    drawLevels(row2)
    drawLevels(row3)

    skapStiger(stige2)
    skapStiger(stige1)

    skapMal()
}

//hoved funksjonen for hele canvaset
tegn()
movePlayer() // må være utenfor tegn, fordi at når den var inni så lagde den en ny eventlistner per frame
function tegn() {
    flytteTonne(tonne1)
    flytteTonne(tonne2)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    checkCollisions(tonne1)
    checkCollisions(tonne2)
    createArena()
    createSquares()
    drawBarrels()
    drawPlayer()
    requestAnimationFrame(tegn)
}

//to do
//highscore (online)
//skins
//intro - starta på
//flere baller
//en siste fight animasjon
//styling