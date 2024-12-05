let credit = 200;
let bet = 10;
let point = 100;

function changeBet(amount) {
    bet = amount;
    document.getElementById("bet").innerText = bet;
}

function makeGuess(type) {
    const result = Math.random(); // Simulate a random result
    const card3 = Math.floor(Math.random() * 13) + 1;
    document.getElementById("card3").innerText = card3;

    if (result > 0.5) {
        credit += bet;
        point += 10;
        showMessage("Correct!", "green");
    } else {
        credit -= bet;
        showMessage("Wrong!", "red");
    }

    if (credit <= 0) {
        alert("Not enough credit!");
    }

    updateStats();
}

function redeemRewards() {
    const choice = prompt(
        "Choose a reward:\n1. 200 Points: +200 Balance\n2. 1000 Points: Welcome Bonus 60%\n3. 3000 Points: Free 8.88"
    );

    if (choice === "1" && point >= 200) {
        credit += 200;
        point -= 200;
    } else if (choice === "2" && point >= 1000) {
        credit += credit * 0.6;
        point -= 1000;
    } else if (choice === "3" && point >= 3000) {
        credit += 8.88;
        point -= 3000;
    } else {
        alert("Not enough points!");
    }

    updateStats();
}

function showMessage(message, color) {
    const messageBox = document.getElementById("message");
    messageBox.innerText = message;
    messageBox.style.color = color;
}

function updateStats() {
    document.getElementById("credit").innerText = credit;
    document.getElementById("point").innerText = point;
}
