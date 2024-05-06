//Birk-er

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

function tegnbirk(birk) {
    if (birk.visible == true) {
        let img = new Image();
        img.onload = function () {
            ctx.beginPath()
            ctx.arc(birk.x, birk.y, birk.radius, 0, Math.PI * 2)
            ctx.fillStyle = "rgb(0 0 0 / 0%)"
            ctx.fill()
            ctx.clip();
            ctx.drawImage(img, birk.x - birk.radius, birk.y - birk.radius, birk.radius * 2, birk.radius * 2);
        };
        img.src = "../Bilder/Birk.png";
    }
}



    function drawBarrels() {
        tegnbirk(birk1)
        tegnbirk(birk2)
    }


    //tønne bevegelse
    function invertMovement(birk) {
        birk.x_velocity = -birk.x_velocity
    }

    function flyttebirk(birk) {
        if (birk.xMovement == true) {
            if (birk.x > canvas.width - birk.radius || birk.x < birk.radius) {
                invertMovement(birk)
            }

            birk.x += birk.x_velocity

        } else if (birk.yMovement == true) {
            if (birk.y + birk.size > birk.yLimit) {
                birk.yVelocity = 0
            }

            birk.y += birk.yVelocity
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


    function collisionSquare(birk) {
        if (birk.xMovement == true && birk.yMovement == false) {
            birk.xMovement = false
            birk.yMovement = true
        }
        else {
            birk.xMovement = true
            birk.yMovement = false
        }
    }

    function detectCollision(birk, square) {
        let squareCenterX = square.startX + square.endX / 2;
        let squareCenterY = square.startY + square.endY / 2;

        let distX = Math.abs(birk.x - squareCenterX);
        let distY = Math.abs(birk.y - squareCenterY);

        let distance = Math.sqrt(distX * distX + distY * distY);

        return distance <= (birk.radius + Math.min(square.endX, square.endY) / 2);
    }



    function resetbirk(birk) {
        birk.x = birk.startX
        birk.y = birk.startY
        birk.yLimit = birk.startYLimit
        birk.yVelocity = birk.yStartVelocity
        birk.visible = true
    }