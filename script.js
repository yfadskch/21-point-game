// 卡牌数据
const suits = ['red', 'black']; // 红色：♥️，黑色：♠️
const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
let currentCard = generateRandomCard();
let previousCard = { suit: '?', rank: '?' }; // 初始占位

function generateRandomCard() {
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const rank = ranks[Math.floor(Math.random() * ranks.length)];
    return { suit, rank };
}

function displayCards() {
    const prevCardDisplay = document.getElementById('previousCard');
    const currCardDisplay = document.getElementById('currentCard');

    // 显示上一张卡牌
    prevCardDisplay.innerHTML = `
        <div class="card-number">${previousCard.rank}</div>
        <div class="card-suit">${previousCard.suit === 'red' ? '♥️' : '♠️'}</div>
    `;

    // 显示当前卡牌
    currCardDisplay.innerHTML = `
        <div class="card-number">${currentCard.rank}</div>
        <div class="card-suit">${currentCard.suit === 'red' ? '♥️' : '♠️'}</div>
    `;
}

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
    } else {
        message = '❌ Wrong Guess!';
    }

    // 更新卡牌
    previousCard = currentCard;
    currentCard = nextCard;

    // 更新显示
    displayCards();
    document.getElementById('message').textContent = message;
}

function nextCard() {
    previousCard = currentCard;
    currentCard = generateRandomCard();
    displayCards();
    document.getElementById('message').textContent = ''; // 清空消息
}

// 初始化显示
displayCards();
