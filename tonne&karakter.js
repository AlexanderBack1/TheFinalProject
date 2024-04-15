//regler for canvaset
const canvas = document.querySelector("canvas")
canvas.width = 1000
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

createArena()

function createArena() {
    drawLevels(row1)
    drawLevels(row2)
    drawLevels(row3)
}


//fysikkens lover i følge meg
const gravity = -0.65

//tønner
let yMovement = true
let xMovement = false

tonne1 = {
    x: 100,
    y: 100,
    radius: 50,
    x_velocity: 5,
    yVelocity: 3,

    yMovement: false,
    xMovement: true,

    visible: true,

    yLimit: 400,

    //resetting
    startX: 100,
    startY: 100,
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
        if (tonne1.y + 100 > tonne1.yLimit) {
            tonne1.yVelocity = 0
        }

        tonne1.y += tonne1.yVelocity
    }
}


//moveSquares
const moveSquare1 = {
    startX: 950,
    startY: 0,

    endX: 50,
    endY: 150
}

const moveSquare2 = {
    startX: 800,
    startY: 350,

    endX: 200,
    endY: 50
}

const moveSquare3 = {
    startX: 950,
    startY: 450,

    endX: 50,
    endY: 150
}

const moveSquare4 = {
    startX: 0,
    startY: 200,

    endX: 50,
    endY: 150
}

const moveSquare5 = {
    startX: 0,
    startY: 590,

    endX: 200,
    endY: 50
}

function drawMoveSquares(squares) {
    ctx.fillStyle = "rgb(0 200 0 / 50%)"
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
        console.log("beveger seg nedover")
    }
    else {
        tonne1.xMovement = true
        tonne1.yMovement = false
        console.log("beveger seg til")
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

function checkCollisions() {
    if (detectCollision(tonne1, moveSquare1) ||
        detectCollision(tonne1, moveSquare2) ||
        detectCollision(tonne1, moveSquare4) ||
        detectCollision(tonne1, moveSquare5)) {
        collisionSquare();
        console.log("ja")
    }
    if (detectCollision(tonne1, moveSquare3)) {
        tonne1.visible = false;
        setTimeout(resetTonne(tonne1), 1000)
    }

    if (detectCollision(tonne1, moveSquare4)) {
        tonne1.yLimit = 640
        tonne1.yVelocity = tonne1.yStartVelocity
    }
    if (detectCollision(tonne1, moveSquare2)) {
        invertMovement()
    }
    if (detectCollision(tonne1, moveSquare5)) {
        invertMovement()
    }
}


//spilleren
const player = {
    startX: 950,
    startY: 540,

    endX: 50,
    endY: 50,

    speed: 7,

    yVelocity: 10,
    yStartVelocity: 10,

    yLimit: 590
}

function drawPlayer() {
    ctx.fillStyle = "rgb(200 200 200)"
    ctx.fillRect(player.startX, player.startY, player.endX, player.endY)
}

function movePlayer() {
    document.addEventListener("keydown", function (event) {
        let key = event.key;
        if (key === "a" || key === "A") {
            moveLeft()
            dontLeave()
        }
        if (key === "d" || key === "D") {
            moveRight()
            dontLeave()
        }

        if (key === "w" || key === "W") {
            jump()
        }
    });

}

function moveLeft() {
    player.startX -= player.speed
}

function moveRight() {
    player.startX += player.speed
}

let hopp = null

let jumping = false;

function jump() {
    if (!jumping) {
        console.log("ja")
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

//hoved funksjonen for hele canvaset
tegn()
movePlayer() // må være utenfor tegn, fordi at når den var inni så lagde den en ny eventlistner per frame
function tegn() {
    flytteTonne()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    createArena()
    createSquares()
    tegnTonne(tonne1)
    drawPlayer()
    requestAnimationFrame(tegn)
    checkCollisions()
}