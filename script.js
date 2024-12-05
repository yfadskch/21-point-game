// 游戏数据
const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
const suitPriority = {
    club: 1,    // ♣️
    diamond: 2, // ♦️
    heart: 3,   // ♥️
    spade: 4    // ♠️
};
let currentCard = generateRandomCard();
let previousCard = { suit: '?', rank: '?' }; // 初始占位
let score = 100; // 初始积分
let bet = 10; // 默认投注筹码
const rewardBonus = 5; // 正确猜测额外奖励积分

// 生成随机卡牌
function generateRandomCard() {
    const suits = ['club', 'diamond', 'heart', 'spade']; // 花色
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const rank = ranks[Math.floor(Math.random() * ranks.length)];
    return { suit, rank };
}

// 比较两张卡牌大小
function compareCards(card1, card2) {
    const rank1 = ranks.indexOf(card1.rank);
    const rank2 = ranks.indexOf(card2.rank);

    if (rank1 > rank2) {
        return 1; // card1 大
    } else if (rank1 < rank2) {
        return -1; // card2 大
    } else {
        // 如果 rank 相同，比较花色优先级
        const suit1 = suitPriority[card1.suit];
        const suit2 = suitPriority[card2.suit];
        return suit1 - suit2;
    }
}

function displayCards() {
    const prevCardDisplay = document.getElementById('previousCard');
    const currCardDisplay = document.getElementById('currentCard');

    // 渲染上一张卡牌
    prevCardDisplay.innerHTML = `
        <div class="card-number">${previousCard.rank}</div>
        <div class="card-suit">${getSuitSymbol(previousCard.suit)}</div>
    `;

    // 渲染当前卡牌
    currCardDisplay.innerHTML = `
        <div class="card-number">${currentCard.rank}</div>
        <div class="card-suit">${getSuitSymbol(currentCard.suit)}</div>
    `;
}

// 获取花色符号
function getSuitSymbol(suit) {
    switch (suit) {
        case 'club': return '♣️';
        case 'diamond': return '♦️';
        case 'heart': return '♥️';
        case 'spade': return '♠️';
        default: return '?';
    }
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
    const comparison = compareCards(nextCard, currentCard); // 比较卡牌大小

    if (
        (guess === 'high' && comparison > 0) || // 下一张牌更大
        (guess === 'low' && comparison < 0) ||  // 下一张牌更小
        (guess === 'red' && (nextCard.suit === 'heart' || nextCard.suit === 'diamond')) || // 红色
        (guess === 'black' && (nextCard.suit === 'club' || nextCard.suit === 'spade')) // 黑色
    ) {
        message = '🎉 Correct Guess!';
        score += bet + rewardBonus; // 正确猜测时增加积分
    } else {
        message = '❌ Wrong Guess!';
        score += bet; // 错误猜测时仅增加投注积分
    }

    previousCard = currentCard;
    currentCard = nextCard;
    displayCards();
    document.getElementById('message').textContent = message;
    document.getElementById('score').textContent = `Score: ${score}`;
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
