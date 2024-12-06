const suits = ['♠', '♣', '♥️', '♦️'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

let credit = 200;
let bet = 10;
let point = 100;

function changeBet(amount) {
    bet = amount;
    document.getElementById('bet').textContent = bet;
}

function makeGuess(guess) {
    if (credit < bet) {
        alert("Not enough credit!");
        return;
    }

    credit -= bet;
    document.getElementById('credit').textContent = credit;

    const card1 = getRandomCard();
    const card2 = getRandomCard();
    const card3 = getRandomCard();

    document.getElementById('card1').textContent = `${card1.value}${card1.suit}`;
    document.getElementById('card2').textContent = `${card2.value}${card2.suit}`;
    document.getElementById('card3').textContent = '?';

    let outcome = evaluateGuess(card2.value, card3.value, guess);
    if (outcome) {
        point += bet * 2;
        credit += bet * 2;
        document.getElementById('message').textContent = "Correct!";
        document.getElementById('message').style.color = "green";
    } else {
        document.getElementById('message').textContent = "Wrong!";
        document.getElementById('message').style.color = "red";
    }

    document.getElementById('credit').textContent = credit;
    document.getElementById('point').textContent = point;
}

function getRandomCard() {
    const value = values[Math.floor(Math.random() * values.length)];
    const suit = suits[Math.floor(Math.random() * suits.length)];
    return { value, suit };
}

function evaluateGuess(prevValue, nextValue, guess) {
    const prevIndex = values.indexOf(prevValue);
    const nextIndex = values.indexOf(nextValue);

    if (guess === 'high') return nextIndex > prevIndex;
    if (guess === 'low') return nextIndex < prevIndex;
    if (guess === 'red') return ['♥️', '♦️'].includes(nextValue.suit);
    if (guess === 'black') return ['♠', '♣'].includes(nextValue.suit);
    return false;
}

function redeemRewards() {
    const choice = prompt(
        "Choose a reward:\n1. 200 Points: +200 Credit\n2. 1000 Points: Welcome Bonus 60%\n3. 3000 Points: Free 8.88\n\nEnter 1, 2, or 3"
    );

    if (choice === '1' && point >= 200) {
        credit += 200;
        point -= 200;
    } else if (choice === '2' && point >= 1000) {
        credit += Math.floor(credit * 0.6);
        point -= 1000;
    } else if (choice === '3' && point >= 3000) {
        credit += 8.88;
        point -= 3000;
    } else {
        alert("Not enough points!");
    }

    document.getElementById('credit').textContent = credit;
    document.getElementById('point').textContent = point;
}
