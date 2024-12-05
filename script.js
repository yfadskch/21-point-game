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
        case 'heart': return '♥️
