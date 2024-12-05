const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
const suits = ['club', 'diamond', 'heart', 'spade'];
const suitSymbols = { club: '♣️', diamond: '♦️', heart: '♥️', spade: '♠️' };
let currentCard = generateCard();
let previousCard = { rank: '?', suit: '?' };
let nextCard = generateCard();
let point = 100;
let credit = 200;
let bet = 10;

function generateCard() {
    return {
        rank: ranks[Math.floor(Math.random() * ranks.length)],
        suit: suits[Math.floor(Math.random() * suits.length)],
    };
}

function displayCards() {
    document.getElementById('previousCard').querySelector('.card-number').textContent = previousCard.rank;
    document.getElementById('previousCard').querySelector('.card-suit').textContent = suitSymbols[previousCard.suit] || '?';

    document.getElementById('currentCard').querySelector('.card-number').textContent = currentCard.rank;
    document.getElementById('currentCard').querySelector('.card-suit').textContent = suitSymbols[currentCard.suit];

    const nextCardBack = document.querySelector('#nextCard .flip-card-back');
    nextCardBack.querySelector('.card-number').textContent = nextCard.rank;
    nextCardBack.querySelector('.card-suit').textContent = suitSymbols[nextCard.suit];

    document.querySelector('#nextCard .flip-card-front').textContent = '?';

    document.getElementById('point').textContent = `Point: ${point}`;
    document.getElementById('credit').textContent = `Credit: ${credit}`;
    document.getElementById('bet').textContent = `Bet: ${bet}`;
}

function makeGuess(guess) {
    if (credit < bet) {
        document.getElementById('message').textContent = '❌ Not enough Credit!';
        return;
    }

    credit -= bet;
    const comparison = compareCards(currentCard, nextCard);

    if (
        (guess === 'high' && comparison < 0) ||
        (guess === 'low' && comparison > 0) ||
        (guess === 'red' && ['heart', 'diamond'].includes(nextCard.suit)) ||
        (guess === 'black' && ['club', 'spade'].includes(nextCard.suit))
    ) {
        point += bet;
        credit += bet;
        document.getElementById('message').textContent = '🎉 Correct!';
    } else {
        document.getElementById('message').textContent = '❌ Wrong!';
    }

    previousCard = currentCard;
    currentCard = nextCard;
    nextCard = generateCard();
    displayCards();
}

displayCards();
