let credit = 200;
let bet = 10;
let point = 100;
let previousCard = generateCard();
let currentCard = generateCard();
let nextCard = generateCard();

const suits = ['heart', 'diamond', 'club', 'spade'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

function generateCard() {
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const rank = ranks[Math.floor(Math.random() * ranks.length)];
    return { suit, rank };
}

function displayCards() {
    document.getElementById('previousCard').textContent = previousCard.rank;
    document.getElementById('currentCard').textContent = currentCard.rank;
    document.getElementById('nextCard').querySelector('.flip-card-front').textContent = '?';
    document.getElementById('nextCard').querySelector('.flip-card-back').textContent = nextCard.rank;
    document.getElementById('credit').textContent = `Credit: ${credit}`;
    document.getElementById('bet').textContent = `Bet: ${bet}`;
    document.getElementById('point').textContent = `Point: ${point}`;
}

function redeemRewards() {
    const reward = prompt(`Choose a reward:\n1. 200 Points: +200 Credit\n2. 1000 Points: Welcome Bonus 60%\n3. 3000 Points: Free 8.88\nEnter 1, 2, or 3:`);
    if (reward === '1') {
        if (point >= 200) {
            point -= 200;
            credit += 200;
            alert("200 Points redeemed for 200 Credit!");
        } else {
            alert("Not enough points to redeem this reward.");
        }
    } else if (reward === '2') {
        if (point >= 1000) {
            point -= 1000;
            credit += Math.round(credit * 0.6);
            alert("1000 Points redeemed for Welcome Bonus 60%!");
        } else {
            alert("Not enough points to redeem this reward.");
        }
    } else if (reward === '3') {
        if (point >= 3000) {
            point -= 3000;
            credit += 8.88;
            alert("3000 Points redeemed for Free 8.88!");
        } else {
            alert("Not enough points to redeem this reward.");
        }
    } else {
        alert("Invalid choice!");
    }
    displayCards();
}

function changeBet(newBet) {
    bet = newBet;
    document.getElementById('bet').textContent = `Bet: ${bet}`;
}

function makeGuess(guess) {
    if (credit < bet) {
        alert('Not enough credit!');
        return;
    }
    credit -= bet;

    const cardOrder = ranks.indexOf(nextCard.rank) - ranks.indexOf(currentCard.rank);
    let correctGuess = false;

    if (guess === 'high' && cardOrder > 0) correctGuess = true;
    if (guess === 'low' && cardOrder < 0) correctGuess = true;
    if (guess === 'red' && ['heart', 'diamond'].includes(nextCard.suit)) correctGuess = true;
    if (guess === 'black' && ['club', 'spade'].includes(nextCard.suit)) correctGuess = true;

    if (correctGuess) {
        credit += bet * 2;
        point += 50;
        document.getElementById('message').textContent = "🎉 Correct!";
    } else {
        document.getElementById('message').textContent = "❌ Wrong!";
    }

    previousCard = currentCard;
    currentCard = nextCard;
    nextCard = generateCard();

    document.querySelector('#nextCard .flip-card-inner').classList.toggle('flipped');
    displayCards();
}

displayCards();
