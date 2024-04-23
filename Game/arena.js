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
    ctx.fillStyle = "rgb(200 0 0 / 0%)"
    ctx.fillRect(0, rows.startY, 1000, rows.endY)
}

//linjer

let line1 = {
    startY: 150,
}

let line2 = {
    startY: 350,
}

let line3 = {
    startY: 590,
}

function drawLines(line) {
    ctx.fillStyle = "rgb(21 113 69 / 100%)"
    ctx.fillRect(0, line.startY, 1000, 10)
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
    endY: 230,
}
const stigeImg = document.getElementById("stige")

function skapStiger(stige) {
    ctx.drawImage(stigeImg, stige.startX, stige.startY, stige.endX, stige.endY)
}

mal = {
    startX: 0,
    startY: 0,

    endX: 70,
    endY: 150
}

const goalImg = document.getElementById("banner")
function skapMal() {
    ctx.drawImage(goalImg, mal.startX, mal.startY, mal.endX, mal.endY)
}

function createArena() {
    drawLevels(row1)
    drawLevels(row2)
    drawLevels(row3)

    drawLines(line1)
    drawLines(line2)
    drawLines(line3)

    skapStiger(stige2)
    skapStiger(stige1)

    skapMal()
}