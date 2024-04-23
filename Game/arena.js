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

function skapMal() {
    ctx.fillStyle = "rgb(100 100 100 / 100%)"
    ctx.fillRect(mal.startX, mal.startY, mal.endX, mal.endY)
}

function createArena() {
    drawLevels(row1)
    drawLevels(row2)
    drawLevels(row3)

    skapStiger(stige2)
    skapStiger(stige1)

    skapMal()
}