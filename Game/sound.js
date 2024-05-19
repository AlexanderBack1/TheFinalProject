let sound = false

function spillAvBakgrunn() {
    let lydElement = document.getElementById('background');
    if (sound == true) {
        lydElement.currentTime = 0;
        lydElement.play();
    } else {
        lydElement.pause();
    }

    setTimeout(spillAvBakgrunn, 115000)
}


function spillAvJump() {
    let lydElement = document.getElementById('jump');
    lydElement.currentTime = 0;
    lydElement.play();
}

function spillAvDmg() {
    let lydElement = document.getElementById('damage');
    lydElement.currentTime = 0;
    lydElement.play();
}

function spillAvWin() {
    let lydElement = document.getElementById('win');
    lydElement.currentTime = 0;
    lydElement.play();
}