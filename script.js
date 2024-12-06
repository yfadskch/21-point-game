let credit = 200;
let bet = 10;
let point = 100;
let lastCardValue = null;

function changeBet(amount) {
    if (credit >= amount) {
        bet = amount;
        document.getElementById('bet').textContent = bet;
    } else {
        alert('Not enough credit!');
    }
}

function makeGuess(guess) {
    const card1 = generateCard();
    const card2 = generateCard();
    const card3 = generateCard();

    document.getElementById('card1').textContent = card1.value + card1.suit;
    document.getElementById('card2').textContent = card2.value + card2.suit;
    document.getElementById('card3').textContent = '?';

    let result = evaluateGuess(guess, card3);

    if (result) {
        credit += bet;
        point += bet;
        document.getElementById('result-message').textContent = 'Correct!';
        document.getElementById('result-message').style.color = 'green';
    } else {
        credit -= bet;
        document.getElementById('result-message').textContent = 'Wrong!';
        document.getElementById('result-message').style.color = 'red';
    }

    document.getElementById('credit').textContent = credit;
    document.getElementById('point').textContent = point;
    lastCardValue = card2.value;
}

function generateCard() {
    const suits = ['♠', '♣', '♥', '♦'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    return {
        suit: suits[Math.floor(Math.random() * suits.length)],
        value: values[Math.floor(Math.random() * values.length)],
    };
}

function evaluateGuess(guess, card) {
    const cardValue = parseInt(card.value) || (card.value === 'A' ? 14 : 10);
    const guessIsCorrect =
        (guess === 'High' && cardValue > 7) ||
        (guess === 'Low' && cardValue <= 7) ||
        (guess === 'Red' && (card.suit === '♥' || card.suit === '♦')) ||
        (guess === 'Black' && (card.suit === '♠' || card.suit === '♣'));
    return guessIsCorrect;
}

function redeemRewards() {
    const choice = prompt('Choose a reward:\n1.200 Points: +200 Balance\n2.1000 Points: Welcome Bonus 60%\n3.3000 Points: Free 8.88');

    if (choice === '1' && point >= 200) {
        point -= 200;
        credit += 200;
    } else if (choice === '2' && point >= 1000) {
        point -= 1000;
        credit += Math.floor(credit * 0.6);
    } else if (choice === '3' && point >= 3000) {
        point -= 3000;
        alert('You received Free 8.88!');
    } else {
        alert('Not enough points or invalid choice!');
    }

    document.getElementById('credit').textContent = credit;
    document.getElementById('point').textContent = point;
}
