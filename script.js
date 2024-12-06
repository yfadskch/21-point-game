let credit = 200;
let point = 100;
let bet = 10;

let previousSecondCard = null;

const suits = ['♠', '♣', '♥️', '♦️'];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

function getRandomCard() {
    const rank = ranks[Math.floor(Math.random() * ranks.length)];
    const suit = suits[Math.floor(Math.random() * suits.length)];
    return `${rank}${suit}`;
}

function startNewRound() {
    const firstCard = previousSecondCard || getRandomCard();
    const secondCard = getRandomCard();
    previousSecondCard = secondCard;

    document.getElementById('card1').textContent = firstCard;
    document.getElementById('card2').textContent = secondCard;
    document.getElementById('card3').textContent = '?';

    document.getElementById('message').textContent = '';
}

function changeBet(newBet) {
    bet = newBet;
    document.getElementById('bet').textContent = bet;
}

function makeGuess(guess) {
    if (credit < bet) {
        document.getElementById('message').textContent = 'Not enough credit!';
        return;
    }

    credit -= bet;
    point += bet; // Point 增加，每次投注都会加分
    document.getElementById('credit').textContent = credit;
    document.getElementById('point').textContent = point;

    const thirdCard = getRandomCard();
    document.getElementById('card3').textContent = thirdCard;

    const rank = thirdCard.slice(0, -1);
    const suit = thirdCard.slice(-1);

    let correct = false;

    if (guess === 'High') {
        correct = ranks.indexOf(rank) > ranks.indexOf(previousSecondCard.slice(0, -1));
    } else if (guess === 'Low') {
        correct = ranks.indexOf(rank) < ranks.indexOf(previousSecondCard.slice(0, -1));
    } else if (guess === 'Red') {
        correct = suit === '♥️' || suit === '♦️';
    } else if (guess === 'Black') {
        correct = suit === '♠' || suit === '♣';
    }

    if (correct) {
        credit += bet * 2;
        document.getElementById('message').textContent = 'Correct!';
        document.getElementById('message').style.color = 'green';
    } else {
        document.getElementById('message').textContent = 'Wrong!';
        document.getElementById('message').style.color = 'red';
    }

    document.getElementById('credit').textContent = credit;

    startNewRound();
}

function redeemRewards() {
    const rewardChoice = prompt(
        `Choose a reward:\n1. 200 Points: +200 Credit\n2. 1000 Points: Welcome Bonus 60%\n3. 3000 Points: Free 8.88`
    );

    if (rewardChoice === '1' && point >= 200) {
        credit += 200;
        point -= 200;
    } else if (rewardChoice === '2' && point >= 1000) {
        credit += Math.floor(credit * 0.6);
        point -= 1000;
    } else if (rewardChoice === '3' && point >= 3000) {
        credit += 8.88;
        point -= 3000;
    } else {
        alert('Invalid choice or not enough points.');
    }

    document.getElementById('credit').textContent = credit;
    document.getElementById('point').textContent = point;
}

// Start the game
startNewRound();
