let credit = 200;
let point = 100;
let bet = 10;

let cards = [];
let currentCardIndex = 1;

function initializeGame() {
    cards = generateDeck();
    updateCards();
    document.getElementById('credit').textContent = credit;
    document.getElementById('point').textContent = point;
    document.getElementById('bet').textContent = bet;
    document.getElementById('message').textContent = '';
}

function generateDeck() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = Array.from({ length: 13 }, (_, i) => i + 1);
    const deck = [];

    for (let suit of suits) {
        for (let value of values) {
            deck.push({ value, suit });
        }
    }
    return shuffle(deck);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function updateCards() {
    document.getElementById('card1').textContent = cards[currentCardIndex - 1]?.value || '?';
    document.getElementById('card2').textContent = cards[currentCardIndex]?.value || '?';
    document.getElementById('card3').textContent = '?';
}

function makeGuess(guess) {
    if (credit < bet) {
        alert('Not enough credit!');
        return;
    }

    const nextCard = cards[currentCardIndex + 1];
    const previousCard = cards[currentCardIndex];
    const result = evaluateGuess(guess, nextCard, previousCard);

    if (result) {
        credit += bet;
        point += bet * 2;
        document.getElementById('message').textContent = 'Correct!';
        document.getElementById('message').style.color = 'green';
    } else {
        credit -= bet;
        document.getElementById('message').textContent = 'Wrong!';
        document.getElementById('message').style.color = 'red';
    }

    currentCardIndex++;
    updateCards();
    document.getElementById('credit').textContent = credit;
    document.getElementById('point').textContent = point;
}

function evaluateGuess(guess, nextCard, previousCard) {
    switch (guess) {
        case 'High':
            return nextCard.value > previousCard.value;
        case 'Low':
            return nextCard.value < previousCard.value;
        case 'Red':
            return ['Hearts', 'Diamonds'].includes(nextCard.suit);
        case 'Black':
            return ['Clubs', 'Spades'].includes(nextCard.suit);
        default:
            return false;
    }
}

function changeBet(newBet) {
    bet = newBet;
    document.getElementById('bet').textContent = bet;
}

function redeemRewards() {
    if (point >= 100) {
        point -= 100;
        credit += 50;
        document.getElementById('credit').textContent = credit;
        document.getElementById('point').textContent = point;
    } else {
        alert('Not enough points to redeem rewards!');
    }
}

initializeGame();
