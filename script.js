let credit = 200;
let point = 100;
let bet = 10;

function changeBet(newBet) {
    bet = newBet;
    updateStats();
}

function updateStats() {
    document.getElementById('credit').textContent = `Credit: ${credit}`;
    document.getElementById('point').textContent = `Point: ${point}`;
    document.getElementById('bet').textContent = `Bet: ${bet}`;
}

function makeGuess(type) {
    if (credit < bet) {
        document.getElementById('message').textContent = 'Not enough Credit!';
        return;
    }

    credit -= bet;

    // Simulate card logic
    const isCorrect = Math.random() > 0.5;
    if (isCorrect) {
        credit += bet * 2;
        point += bet;
        document.getElementById('message').textContent = '🎉 Correct!';
    } else {
        document.getElementById('message').textContent = '❌ Wrong!';
    }

    updateStats();
}

function redeemRewards() {
    const reward = prompt(
        `Choose a reward:\n1. 200 Points: +200 Balance\n2. 1000 Points: Welcome Bonus 60%\n3. 3000 Points: Free 8.88\n\nEnter 1, 2, or 3:`
    );

    if (reward === '1' && point >= 200) {
        point -= 200;
        credit += 200;
        document.getElementById('message').textContent = 'Reward 1 Redeemed: +200 Credit';
    } else if (reward === '2' && point >= 1000) {
        point -= 1000;
        credit += Math.floor(credit * 0.6);
        document.getElementById('message').textContent = 'Reward 2 Redeemed: Welcome Bonus 60%';
    } else if (reward === '3' && point >= 3000) {
        point -= 3000;
        credit += 8.88;
        document.getElementById('message').textContent = 'Reward 3 Redeemed: Free 8.88';
    } else {
        document.getElementById('message').textContent = 'Insufficient Points for this Reward!';
    }

    updateStats();
}

// Initialize stats on page load
updateStats();
