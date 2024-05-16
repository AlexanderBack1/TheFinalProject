    setTimeout(function() {
        for (j=0; j<5; j++){
            document.getElementById("spanP"+j).innerText = playerArr[j].name
            document.getElementById("spanS"+j).innerText = playerArr[j].hs
        }
    }, 1000);