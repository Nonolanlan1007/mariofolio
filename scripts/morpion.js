let player1;
let player2;

let plate = {
    a: {
        a1: 0,
        a2: 0,
        a3: 0
    },
    b: {
        b1: 0,
        b2: 0,
        b3: 0
    },
    c: {
        c1: 0,
        c2: 0,
        c3: 0
    }
}

let Possibleswins = [
    // horizontal
    ["A1", "A2", "A3"],
    ["B1", "B2", "B3"],
    ["C1", "C2", "C3"],

    // vertical
    ["A1", "B1", "C1"],
    ["A2", "B2", "C2"],
    ["A3", "B3", "C3"],

    // diagonales
    ["A1", "B2", "C3"],
    ["A3", "B2", "C1"],
]

let player1Cases = []
let player2Cases = []

let currentPlayer = 1;
const player1Item = "../assets/pumper.png"
const player2Item = "../assets/bowser_logo.png"

function startGame () {
    const mortouseWin = localStorage.getItem("mortouseWin")

    if (mortouseWin && mortouseWin === "true") document.querySelector("#gameWon").style.display = "flex"
    else if (mortouseWin && mortouseWin === "false") document.querySelector("#gameLost").style.display = "flex"
    else {
        document.querySelector("#canPlay").style.display = "flex"
        document.querySelector("#gameHeader").style.display = "block"
        drawGameBoard()
    }
}

function drawGameBoard () {
    document.getElementById("line1").innerHTML = `
        <button class="box" id="A1" onclick="caseSelector('A1')" ${player1Cases.includes("A1") || player2Cases.includes("A1") ? 'disabled="disabled"' : ""}>${getPlayerOnCase("A1") === 1 ? `<img src="${player1Item}">` : getPlayerOnCase("A1") === 2 ? `<img src="${player2Item}">` : ""}</button>
        <button class="box" id="A2" onclick="caseSelector('A2')" ${player1Cases.includes("A2") || player2Cases.includes("A2") ? "disabled" : ""}>${getPlayerOnCase("A2") === 1 ? `<img src="${player1Item}">` : getPlayerOnCase("A2") === 2 ? `<img src="${player2Item}">` : ""}</button>
        <button class="box" id="A3" onclick="caseSelector('A3')" ${player1Cases.includes("A3") || player2Cases.includes("A3") ? "disabled" : ""}>${getPlayerOnCase("A3") === 1 ? `<img src="${player1Item}">` : getPlayerOnCase("A3") === 2 ? `<img src="${player2Item}">` : ""}</button>
    `
    document.getElementById("line2").innerHTML = `
        <button class="box" id="B1" onclick="caseSelector('B1')" ${player1Cases.includes("B1") || player2Cases.includes("B1") ? "disabled" : ""}>${getPlayerOnCase("B1") === 1 ? `<img src="${player1Item}">` : getPlayerOnCase("B1") === 2 ? `<img src="${player2Item}">` : ""}</button>
        <button class="box" id="B2" onclick="caseSelector('B2')" ${player1Cases.includes("B2") || player2Cases.includes("B2") ? "disabled" : ""}>${getPlayerOnCase("B2") === 1 ? `<img src="${player1Item}">` : getPlayerOnCase("B2") === 2 ? `<img src="${player2Item}">` : ""}</button>
        <button class="box" id="B3" onclick="caseSelector('B3')" ${player1Cases.includes("B3") || player2Cases.includes("B3") ? "disabled" : ""}>${getPlayerOnCase("B3") === 1 ? `<img src="${player1Item}">` : getPlayerOnCase("B3") === 2 ? `<img src="${player2Item}">` : ""}</button>
    `
    document.getElementById("line3").innerHTML = `
        <button class="box" id="C1" onclick="caseSelector('C1')" ${player1Cases.includes("C1") || player2Cases.includes("C1") ? "disabled" : ""}>${getPlayerOnCase("C1") === 1 ? `<img src="${player1Item}">` : getPlayerOnCase("C1") === 2 ? `<img src="${player2Item}">` : ""}</button>
        <button class="box" id="C2" onclick="caseSelector('C2')" ${player1Cases.includes("C2") || player2Cases.includes("C2") ? "disabled" : ""}>${getPlayerOnCase("C2") === 1 ? `<img src="${player1Item}">` : getPlayerOnCase("C2") === 2 ? `<img src="${player2Item}">` : ""}</button>
        <button class="box" id="C3"  onclick="caseSelector('C3')" ${player1Cases.includes("C3") || player2Cases.includes("C3") ? "disabled" : ""}>${getPlayerOnCase("C3") === 1 ? `<img src="${player1Item}">` : getPlayerOnCase("C3") === 2 ? `<img src="${player2Item}">` : ""}</button>
    `
}

/**
 * @param {String} Case Case où trouver le joueur
 * @returns {Number}
 */
function getPlayerOnCase (Case) {
    switch (Case) {
        case "A1": {
            return plate.a.a1
        }
        case "A2": {
            return plate.a.a2
        }
        case "A3": {
            return plate.a.a3
        }
        case "B1": {
            return plate.b.b1
        }
        case "B2": {
            return plate.b.b2
        }
        case "B3": {
            return plate.b.b3
        }
        case "C1": {
            return plate.c.c1
        }
        case "C2": {
            return plate.c.c2
        }
        case "C3": {
            return plate.c.c3
        }
    }
}

function caseSelector (Case) {
    switch (Case) {
        case "A1": {
            document.getElementById(Case).disabled = "disabled"

            plate.a.a1 = currentPlayer
            break;
        }
        case "A2": {
            document.getElementById(Case).disabled = "disabled"
            plate.a.a2 = currentPlayer
            break;
        }
        case "A3": {
            document.getElementById(Case).disabled = "disabled"
            plate.a.a3 = currentPlayer
            break;
        }
        case "B1": {
            document.getElementById(Case).disabled = "disabled"
            plate.b.b1 = currentPlayer
            break;
        }
        case "B2": {
            document.getElementById(Case).disabled = "disabled"
            plate.b.b2 = currentPlayer
            break;
        }
        case "B3": {
            document.getElementById(Case).disabled = "disabled"
            plate.b.b3 = currentPlayer
            break;
        }
        case "C1": {
            document.getElementById(Case).disabled = "disabled"
            plate.c.c1 = currentPlayer
            break;
        }
        case "C2": {
            document.getElementById(Case).disabled = "disabled"
            plate.c.c2 = currentPlayer
            break;
        }
        case "C3": {
            document.getElementById(Case).disabled = "disabled"
            plate.c.c3 = currentPlayer
            break;
        }
    }

    saveCase(Case)

    let win = checkWin()
    if (win === true) {
        drawGameBoard()
        let allCases = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]

        for (const Case in allCases) {
            document.getElementById(allCases[Case]).disabled = "disabled";
        }

        document.querySelector("#cestavous").style.color = "#FFEEEE"

        localStorage.setItem("mortouseWin", currentPlayer === 1 ? "true" : "false")
        window.location.reload()
    } else {
        drawGameBoard()
        if ((player1Cases.length + player2Cases.length) === 9) {
            localStorage.setItem("mortouseWin", "false")
            window.location.reload()
        }
        nextPlayer(currentPlayer)
    }
}

function nextPlayer (currentP) {
    currentPlayer = currentP === 1 ? 2 : 1
    const cestavous = document.querySelector("#cestavous")


    if (currentPlayer === 2) {
        cestavous.style.color = "#FFEEEE"
        setTimeout(() => botPlay(), 1000)
    } else cestavous.style.color = "#000000"
}

function checkWin () {
    let win = false
    if (currentPlayer === 1 && player1Cases.length >= 3) {
        for (const possibility in Possibleswins) {
            if (player1Cases.includes(Possibleswins[possibility][0]) && player1Cases.includes(Possibleswins[possibility][1]) && player1Cases.includes(Possibleswins[possibility][2])) win = true
        }
    }
    if (currentPlayer === 2 && player2Cases.length >= 3) {
        for (const possibility in Possibleswins) {
            if (player2Cases.includes(Possibleswins[possibility][0]) && player2Cases.includes(Possibleswins[possibility][1]) && player2Cases.includes(Possibleswins[possibility][2])) win = true
        }
    }
    return win
}

function saveCase(Case) {
    if (currentPlayer === 1) {
        player1Cases.push(Case)
    }
    if (currentPlayer === 2) {
        player2Cases.push(Case)
    }
}

function botPlay() {
    let availableCases = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"].filter(caseId => !player1Cases.includes(caseId) && !player2Cases.includes(caseId));

    caseSelector(availableCases[Math.floor(Math.random() * availableCases.length)]);
}