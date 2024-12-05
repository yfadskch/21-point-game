const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
const suits = ['club', 'diamond', 'heart', 'spade'];
const suitSymbols = { club: '♣️', diamond: '♦️', heart: '♥️', spade: '♠️' };
let currentCard = generateCard();
let previousCard = { rank: '?', suit: '?' };
let nextCard = generateCard();
let score = 100;
let bet = 10;

// 生成随机卡牌
function generateCard() {
    return {
        rank: ranks[Math.floor(Math.random() * ranks.length)],
        suit: suits[Math.floor(Math.random() * suits.length)],
    };
}

function displayCards() {
    const prevCard = document.getElementById('previousCard');
    prevCard.querySelector('.card-number').textContent = previousCard.rank;
    prevCard.querySelector('.card-suit').textContent = suitSymbols[previousCard.suit] || '?';

    const currCard = document.getElementById('currentCard');
    currCard.querySelector('.card-number').textContent = currentCard.rank;
    currCard.querySelector('.card-suit').textContent = suitSymbols[currentCard.suit];

    const nextCardBack = document.querySelector('#nextCard .flip-card-back');
    nextCardBack.querySelector('.card-number').textContent = nextCard.rank;
    nextCardBack.querySelector('.card-suit').textContent = suitSymbols[nextCard.suit];
}

function flipCard() {
    const card = document.getElementById('nextCard');
    card.classList.add('flipped');
}

function resetCard() {
    const card = document.getElementById('nextCard');
    card.classList.remove('flipped');
}

function changeBet(amount) {
    bet = amount;
    document.getElementById('bet').textContent = `Bet: ${bet}`;
}

function makeGuess(guess) {
    flipCard(); // 翻转卡牌
    setTimeout(() => {
        const message = document.getElementById('message');
        const comparison = compareCards(currentCard, nextCard);
        if (
            (guess === 'high' && comparison < 0) ||
            (guess === 'low' && comparison > 0) ||
            (guess === 'red' && ['heart', 'diamond'].includes(nextCard.suit)) ||
            (guess === 'black' && ['club', 'spade'].includes(nextCard.suit))
        ) {
            score += bet;
            message.textContent = '🎉 Correct!';
        } else {
            score -= bet;
            message.textContent = '❌ Wrong!';
        }
        previousCard = currentCard;
        currentCard = nextCard;
        nextCard = generateCard();
        displayCards();
        resetCard();
    }, 800);
}

function compareCards(card1, card2) {
    const rank1 = ranks.indexOf(card1.rank);
    const rank2 = ranks.indexOf(card2.rank);
    if (rank1 !== rank2) return rank1 - rank2;
    return suits.indexOf(card1.suit) - suits.indexOf(card2.suit);
}

function redeemPoints() {
    if (score >= 100) {
        score -= 100;
        alert('Redeemed 100 points for 10 chips!');
    } else {
        alert('Not enough points to redeem.');
    }
    document.getElementById('score').textContent = `Score: ${score}`;
}

displayCards();
