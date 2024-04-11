//regler for canvaset
const canvas = document.querySelector("canvas")
canvas.width = 1000
canvas.height = 500

const ctx = canvas.getContext("2d")


//banen
let row1 = {
    startY: 0,
    endY: 200
}

let row2 = {
    startY: 300,
    endY: 500
}

function drawLevels(rows) {
    ctx.fillStyle = "rgb(200 0 0 / 50%)"
    ctx.fillRect(0, rows.startY, 1000, rows.endY)
}

createArena()

function createArena() {
    drawLevels(row1)
    drawLevels(row2)
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
    xMovement: true
}

tegnTonne()

function tegnTonne() {
    ctx.beginPath()
    ctx.arc(tonne1.x, tonne1.y, tonne1.radius, 0, Math.PI * 2)
    ctx.fillStyle = "rgb(0 0 200 / 50%)"
    ctx.fill()
    ctx.closePath()
}

//tønne bevegelse
function flytteTonne() {
    if (tonne1.xMovement == true) {
        if (tonne1.x > canvas.width - tonne1.radius || tonne1.x < tonne1.radius) {
            tonne1.x_velocity = -tonne1.x_velocity
        }

        tonne1.x += tonne1.x_velocity

    } else if (tonne1.yMovement == true) {
        if (tonne1.y + 70 > canvas.height) {
            tonne1.y_velocity = 0
        }

        tonne1.y += tonne1.y_velocity
    }
}

const moveSquare1 = {
    startX: 0,
    startY: 0,

    endX: 200,
    endY: 200
}

const moveSquare2 = {
    startX: 800,
    startY: 0,

    endX: 200,
    endY: 200
}

function drawMoveSquares(squares) {
    ctx.fillStyle = "rgb(0 200 0 / 50%)"
    ctx.fillRect(squares.startX, squares.startY, squares.endX, squares.endY)
}

function createSquares() {
    drawMoveSquares(moveSquare1)
    drawMoveSquares(moveSquare2)
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

//hoved funksjonen for hele canvaset
tegn()
function tegn() {
    flytteTonne()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    createArena()
    createSquares()
    tegnTonne()
    requestAnimationFrame(tegn)
}