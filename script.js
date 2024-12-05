const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
const suits = ['club', 'diamond', 'heart', 'spade'];
const suitSymbols = { club: '♣️', diamond: '♦️', heart: '♥️', spade: '♠️' };
let currentCard = generateCard();
let previousCard = { rank: '?', suit: '?' };
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

    const currentCardBack = document.querySelector('#currentCard .flip-card-back');
    currentCardBack.querySelector('.card-number').textContent = currentCard.rank;
    currentCardBack.querySelector('.card-suit').textContent = suitSymbols[currentCard.suit];
}

function flipCard() {
    const card = document.getElementById('currentCard');
    card.classList.add('flipped');
}

function resetCard() {
    const card = document.getElementById('currentCard');
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
        if (Math.random() > 0.5) {
            score += bet;
            message.textContent = '🎉 Correct!';
        } else {
            score -= bet;
            message.textContent = '❌ Wrong!';
        }
        previousCard = currentCard;
        currentCard = generateCard();
        displayCards();
        resetCard();
    }, 800); // 翻转动画完成后更新内容
}

function redeemPoints() {
    if (score >= 100) {
        score -= 100;
        alert('Redeemed 100 points!');
    } else {
        alert('Not enough points to redeem.');
    }
    document.getElementById('score').textContent = `Score: ${score}`;
}

displayCards();
