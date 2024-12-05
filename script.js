// 游戏数据
const suits = ['red', 'black'];
const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
let currentCard = generateRandomCard();
let previousCard = { suit: '?', rank: '?' }; // 初始占位
let score = 100; // 初始积分
let bet = 10; // 默认投注筹码
const rewardBonus = 5; // 正确猜测额外奖励积分

function generateRandomCard() {
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const rank = ranks[Math.floor(Math.random() * ranks.length)];
    return { suit, rank };
}

function displayCards() {
    const prevCardDisplay = document.getElementById('previousCard');
    const currCardDisplay = document.getElementById('currentCard');

    // 渲染上一张卡牌
    prevCardDisplay.innerHTML = `
        <div class="card-number">${previousCard.rank}</div>
        <div class="card-suit">${previousCard.suit === 'red' ? '♥️' : '♠️'}</div>
    `;

    // 渲染当前卡牌
    currCardDisplay.innerHTML = `
        <div class="card-number">${currentCard.rank}</div>
        <div class="card-suit">${currentCard.suit === 'red' ? '♥️' : '♠️'}</div>
    `;
}

// 更改投注筹码
function changeBet(amount) {
    bet = amount;
    document.getElementById('bet').textContent = `Bet: ${bet}`;
}

// 猜测逻辑
function makeGuess(guess) {
    const nextCard = generateRandomCard();
    let message = '';

    if (
        (guess === 'high' && ranks.indexOf(nextCard.rank) > ranks.indexOf(currentCard.rank)) ||
        (guess === 'low' && ranks.indexOf(nextCard.rank) < ranks.indexOf(currentCard.rank)) ||
        (guess === 'red' && nextCard.suit === 'red') ||
        (guess === 'black' && nextCard.suit === 'black')
    ) {
        message = '🎉 Correct Guess!';
        score += bet + rewardBonus; // 正确：增加投注金额和额外奖励
    } else {
        message = '❌ Wrong Guess!';
        score += bet; // 错误：仅增加投注金额
    }

    // 更新卡牌和积分显示
    previousCard = currentCard;
    currentCard = nextCard;
    displayCards();
    document.getElementById('message').textContent = message;
    document.getElementById('score').textContent = `Score: ${score}`;
}

// 下一张卡牌
function nextCard() {
    previousCard = currentCard;
    currentCard = generateRandomCard();
    displayCards();
    document.getElementById('message').textContent = ''; // 清空消息
}

// 积分兑换逻辑
function redeemPoints() {
    if (score >= 100) {
        score -= 100; // 扣除积分
        alert('Redeemed 100 points for 10 chips!');
    } else {
        alert('Not enough points to redeem.');
    }
    document.getElementById('score').textContent = `Score: ${score}`;
}

// 初始化显示
displayCards();
