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
const gravity = -0.4

//tønner
let yMovement = true
let xMovement = false

tonne1 = {
    x: 100,
    y: 100,
    radius: 50,
    x_velocity: 5,
    y_velocity: 3,

    yMovement: false,
    xMovement: true,

    visible: true,

    yLimit: 350
}

function tegnTonne(tonne) {
    if(tonne.visible == true) {
        ctx.beginPath()
        ctx.arc(tonne1.x, tonne1.y, tonne1.radius, 0, Math.PI * 2)
        ctx.fillStyle = "rgb(0 0 200 / 50%)"
        ctx.fill()
        ctx.closePath()
    }
}

//tønne bevegelse
function flytteTonne() {
    if (tonne1.xMovement == true) {
        if (tonne1.x > canvas.width - tonne1.radius || tonne1.x < tonne1.radius) {
            tonne1.x_velocity = -tonne1.x_velocity
        }

        tonne1.x += tonne1.x_velocity

    } else if (tonne1.yMovement == true) {
        if (tonne1.y + 100 > tonne1.yLimit) {
            tonne1.y_velocity = 0
        }

        tonne1.y += tonne1.y_velocity
    }
}

const moveSquare1 = {
    startX: 950,
    startY: 0,

    endX: 50,
    endY: 150
}

const moveSquare2 = {
    startX: 800,
    startY: 300,

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
    startY: 550,

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
    
    
    function checkCollisions() {
        if (detectCollision(tonne1, moveSquare1) || 
        detectCollision(tonne1, moveSquare2) || 
        detectCollision(tonne1, moveSquare3) ) {
            collisionSquare();
        }
        if (detectCollision(tonne1, moveSquare3)) {
            tonne1.visible = false;
        }

        if (detectCollision(tonne1, moveSquare4)) {
            tonne1.yLimit = 600
            collisionSquare()
        }
    }
    
//hoved funksjonen for hele canvaset
tegn()
function tegn() {
    flytteTonne()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    createArena()
    createSquares()
    tegnTonne(tonne1)
    requestAnimationFrame(tegn)
    checkCollisions()
}