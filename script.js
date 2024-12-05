const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
const suits = ['club', 'diamond', 'heart', 'spade'];
const suitSymbols = { club: '♣️', diamond: '♦️', heart: '♥️', spade: '♠️' };
let currentCard = generateCard();
let previousCard = { rank: '?', suit: '?' };
let nextCard = generateCard();
let point = 100;
let credit = 200;
let bet = 10;

// 随机生成卡牌
function generateCard() {
    return {
        rank: ranks[Math.floor(Math.random() * ranks.length)],
        suit: suits[Math.floor(Math.random() * suits.length)],
    };
}

// 显示卡牌
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

// 修改投注金额
function changeBet(amount) {
    bet = amount;
    document.getElementById('bet').textContent = `Bet: ${bet}`;
}

// 猜测逻辑
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
        credit += bet * 2; // 猜对时增加 double betting
        document.getElementById('message').textContent = '🎉 Correct!';
    } else {
        document.getElementById('message').textContent = '❌ Wrong!';
    }

    previousCard = currentCard;
    currentCard = nextCard;
    nextCard = generateCard();
    displayCards();
    resetCard();
}

// 比较卡牌大小
function compareCards(card1, card2) {
    const rank1 = ranks.indexOf(card1.rank);
    const rank2 = ranks.indexOf(card2.rank);
    return rank1 - rank2;
}

// 兑换积分
function redeemPoints() {
    if (point >= 100) {
        point -= 100;
        credit += 50;
        alert('Redeemed 100 points for 50 credits!');
    } else {
        alert('Not enough points to redeem.');
    }
    displayCards();
}

// 翻转卡牌
function flipCard() {
    const card = document.getElementById('nextCard');
    card.classList.add('flipped');
}

// 重置翻转状态
function resetCard() {
    const card = document.getElementById('nextCard');
    card.classList.remove('flipped');
}

// 初始化显示
displayCards();
