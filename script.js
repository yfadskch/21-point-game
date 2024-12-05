// 游戏数据
const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
const suitPriority = {
    club: 1,
    diamond: 2,
    heart: 3,
    spade: 4
};
let currentCard = generateRandomCard();
let previousCard = { suit: '?', rank: '?' };
let score = 100;
let bet = 10;
const rewardBonus = 5;

// 生成随机卡牌
function generateRandomCard() {
    const suits = ['club', 'diamond', 'heart', 'spade'];
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const rank = ranks[Math.floor(Math.random() * ranks.length)];
    return { suit, rank };
}

// 比较两张卡牌
function compareCards(card1, card2) {
    const rank1 = ranks.indexOf(card1.rank);
    const rank2 = ranks.indexOf(card2.rank);

    if (rank1 > rank2) {
        return 1;
    } else if (rank1 < rank2) {
        return -1;
    } else {
        return suitPriority[card1.suit] - suitPriority[card2.suit];
    }
}

function displayCards() {
    const prevCardDisplay = document.getElementById('previousCard');
    const currCardDisplay = document.getElementById('currentCard');

    prevCardDisplay.innerHTML = `
        <div class="card-number">${previousCard.rank}</div>
        <div class="card-suit">${getSuitSymbol(previousCard.suit)}</div>
    `;

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

// 更改投注
function changeBet(amount) {
    bet = amount;
    document.getElementById('bet').textContent = `Bet: ${bet}`;
}

// 猜测逻辑
function makeGuess(guess) {
    const nextCard = generateRandomCard();
    let message = '';
    const comparison = compareCards(nextCard, currentCard);

    if (
        (guess === 'high' && comparison > 0) ||
        (guess === 'low' && comparison < 0) ||
        (guess === 'red' && (nextCard.suit === 'heart' || nextCard.suit === 'diamond')) ||
        (guess === 'black' && (nextCard.suit === 'club' || nextCard.suit === 'spade'))
    ) {
        message = '🎉 Correct Guess!';
        score += bet + rewardBonus;
    } else {
        message = '❌ Wrong Guess!';
        score += bet;
    }

    previousCard = currentCard;
    currentCard = nextCard;
    displayCards();
    document.getElementById('message').textContent = message;
    document.getElementById('score').textContent = `Score: ${score}`;
}

// 积分兑换
function redeemPoints() {
    if (score >= 100) {
        score -= 100;
        alert('Redeemed 100 points for 10 chips!');
    } else {
        alert('Not enough points to redeem.');
    }
    document.getElementById('score').textContent = `Score: ${score}`;
}

// 初始化显示
displayCards();
