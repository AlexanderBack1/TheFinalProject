//Birk-er
const birkImage = document.getElementById("birk")

birk1 = {
    startX: 71,
    startY: 110,
    endX: 50,
    endY: 40,

    x_velocity: 5,
    yVelocity: 3,

    yMovement: false,
    xMovement: true,

    visible: true,

    yLimit: 370,

    size: 60,

    //resetting
    ogStartX: 71,
    ogStartY: 110,
    startYLimit: 400,
    yStartVelocity: 3,
}

birk2 = {
    startX: 71,
    startY: 110,
    endX: 50,
    endY: 40,

    x_velocity: 5,
    yVelocity: 3,

    yMovement: false,
    xMovement: true,

    visible: true,

    yLimit: 370,

    size: 60,

    //resetting
    ogStartX: 71,
    ogStartY: 110,
    startYLimit: 400,
    yStartVelocity: 3,
}


birk3 = {
    startX: 71,
    startY: 110,
    endX: 50,
    endY: 40,

    x_velocity: 5,
    yVelocity: 3,

    yMovement: false,
    xMovement: true,

    visible: true,

    yLimit: 370,

    size: 60,

    //resetting
    ogStartX: 71,
    ogStartY: 110,
    startYLimit: 400,
    yStartVelocity: 3,
}



function tegnbirk(birk) {
    if (birk.visible == true) {
        ctx.drawImage(birkImage, birk.startX, birk.startY, birk.endX, birk.endY)
    }
}

let birkTwo = false
let birkThree = false
let birkFour = false

function birkTimeout() {
    setTimeout(function() {
        birkTwo = true
    }, 3000);
    setTimeout(function() {
        birkThree = true
    }, 6000);
}

function drawBarrels() {
    tegnbirk(birk1)
    if(birkTwo == true) {
        tegnbirk(birk2)
    }

    if(birkThree == true) {
        tegnbirk(birk3)
    }
}

//tønne bevegelse
function invertMovement(birk) {
    birk.x_velocity = -birk.x_velocity
}

function flyttebirk(birk) {
    if (birk.xMovement == true) {
        if (birk.startX > canvas.width - birk.radius || birk.startX < birk.radius) {
            invertMovement(birk)
        }

        birk.startX += birk.x_velocity

    } else if (birk.yMovement == true) {
        if (birk.startY + birk.endY > birk.yLimit) {
            birk.yVelocity = 0
        }

        birk.startY += birk.yVelocity
    }
}

function moveBirk() {
    flyttebirk(birk1);
    if(birkTwo == true) {
        flyttebirk(birk2);
    }
    if(birkThree == true) {
        flyttebirk(birk3);
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
    startY: 350,

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
    startX: 70,
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

function collisionSquareX(birk) {
    birk.xMovement = false
    birk.yMovement = true
}

function collisionSquareY(birk) {
    birk.xMovement = true
    birk.yMovement = false
}



function detectCollision(birk, square) {
    if (birk.startX < square.startX + square.endX &&
        birk.startX + birk.endX > square.startX &&
        birk.startY < square.startY + square.endY &&
        birk.startY + birk.endY > square.startY) {
        return true
    }
}

function resetAllBirks() {
    resetbirk(birk1)
    resetbirk(birk2)
    resetbirk(birk3)
    birkTwo = false
    birkThree = false
}

function resetbirk(birk) {
    birk.startX = birk.ogStartX
    birk.startY = birk.ogStartY
    birk.yLimit = birk.startYLimit
    birk.startYVelocity = birk.startYStartVelocity
    birk.xMovement = true
    birk.yMovement = false
    birk.visible = true
    birk.x_velocity = 5
}

