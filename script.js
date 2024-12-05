const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
const suits = ['club', 'diamond', 'heart', 'spade'];
const suitSymbols = { club: '♣️', diamond: '♦️', heart: '♥️', spade: '♠️' };
let currentCard = generateCard();
let previousCard = { rank: '?', suit: '?' };
let nextCard = generateCard();
let score = 100;
let credit = 200; // 初始 Credit
let bet = 10;

// 生成随机卡牌
function generateCard() {
    return {
        rank: ranks[Math.floor(Math.random() * ranks.length)],
        suit: suits[Math.floor(Math.random() * suits.length)],
    };
}

// 显示卡牌
function displayCards() {
    // 更新 previousCard（卡牌 1）
    const prevCardElem = document.getElementById('previousCard');
    prevCardElem.querySelector('.card-number').textContent = previousCard.rank;
    prevCardElem.querySelector('.card-suit').textContent = suitSymbols[previousCard.suit] || '?';

    // 更新 currentCard（卡牌 2）
    const currCardElem = document.getElementById('currentCard');
    currCardElem.querySelector('.card-number').textContent = currentCard.rank;
    currCardElem.querySelector('.card-suit').textContent = suitSymbols[currentCard.suit];

    // 更新 nextCard（卡牌 3，翻转状态）
    const nextCardBackElem = document.querySelector('#nextCard .flip-card-back');
    nextCardBackElem.querySelector('.card-number').textContent = nextCard.rank;
    nextCardBackElem.querySelector('.card-suit').textContent = suitSymbols[nextCard.suit];

    // 更新 Score 和 Credit
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('credit').textContent = `Credit: ${credit}`;
    document.getElementById('bet').textContent = `Bet: ${bet}`;
}

// 翻转卡牌
function flipCard() {
    const card = document.getElementById('nextCard');
    card.classList.add('flipped');
}

// 重置翻转卡牌
function resetCard() {
    const card = document.getElementById('nextCard');
    card.classList.remove('flipped');
}

// 更改投注
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

    credit -= bet; // 扣除信用点数
    const message = document.getElementById('message');

    // 判断结果
    const comparison = compareCards(currentCard, nextCard);
    if (
        (guess === 'high' && comparison < 0) ||
        (guess === 'low' && comparison > 0) ||
        (guess === 'red' && ['heart', 'diamond'].includes(nextCard.suit)) ||
        (guess === 'black' && ['club', 'spade'].includes(nextCard.suit))
    ) {
        score += bet;
        credit += bet; // 猜对奖励 Credit
        message.textContent = '🎉 Correct!';
    } else {
        message.textContent = '❌ Wrong!';
    }

    // 更新卡牌状态
    previousCard = currentCard; // 当前卡牌成为上一张卡牌
    currentCard = nextCard; // 下一张卡牌成为当前卡牌
    nextCard = generateCard(); // 生成新的下一张卡牌
    displayCards();
    resetCard(); // 重置翻转状态
}

// 卡牌比较逻辑
function compareCards(card1, card2) {
    const rank1 = ranks.indexOf(card1.rank);
    const rank2 = ranks.indexOf(card2.rank);
    if (rank1 !== rank2) return rank1 - rank2;
    return suits.indexOf(card1.suit) - suits.indexOf(card2.suit);
}

// 积分兑换 Credit
function redeemPoints() {
    if (score >= 100) {
        score -= 100;
        credit += 50; // 每 100 积分兑换 50 Credit
        alert('Redeemed 100 points for 50 credits!');
    } else {
        alert('Not enough points to redeem.');
    }
    displayCards();
}

// 初始显示卡牌
displayCards();
