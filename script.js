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

function displayCards() {
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('credit').textContent = `Credit: ${credit}`;
    document.getElementById('bet').textContent = `Bet: ${bet}`;
}

function changeBet(amount) {
    bet = amount;
    document.getElementById('bet').textContent = `Bet: ${bet}`;
}

function makeGuess(guess) {
    if (credit < bet) {
        document.getElementById('message').textContent = '❌ Not enough Credit!';
        return;
    }

    credit -= bet; // 扣除信用点数
    const message = document.getElementById('message');

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

    previousCard = currentCard;
    currentCard = nextCard;
    nextCard = generateCard();
    displayCards();
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
        credit += 50; // 每 100 积分兑换 50 Credit
        alert('Redeemed 100 points for 50 credits!');
    } else {
        alert('Not enough points to redeem.');
    }
    displayCards();
}

displayCards();
