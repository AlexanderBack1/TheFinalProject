//Birk-er
let yMovement = true
let xMovement = false

birk1 = {
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

birk2 = {
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
    tegnTonne(birk1)
    tegnTonne(birk2)
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