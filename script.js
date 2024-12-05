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

// 奖励兑换逻辑
function redeemRewards() {
    const reward = prompt("Choose a reward:\n1. 200 Points: +200 Balance\n2. 1000 Points: Welcome Bonus 60%\n3. 3000 Points: Free 8.88\n\nEnter 1, 2, or 3:");
    if (reward === '1') {
        if (point >= 200) {
            point -= 200;
            credit += 200;
            alert("200 Points redeemed for +200 Credit!");
        } else {
            alert("Not enough points to redeem this reward.");
        }
    } else if (reward === '2') {
        if (point >= 1000) {
            point -= 1000;
            credit += Math.floor(credit * 0.6);
            alert("1000 Points redeemed for Welcome Bonus 60%!");
        } else {
            alert("Not enough points to redeem this reward.");
        }
    } else if (reward === '3') {
        if (point >= 3000) {
            point -= 3000;
            credit += 8.88;
            alert("3000 Points redeemed for Free 8.88!");
        } else {
            alert("Not enough points to redeem this reward.");
        }
    } else {
        alert("Invalid choice!");
    }
    displayCards();
}

// 改变投注额
function changeBet(newBet) {
    bet = newBet;
    document.getElementById('bet').textContent = `Bet: ${bet}`;
}

// 游戏逻辑
function makeGuess(guess) {
    if (credit < bet) {
        alert('Not enough credit!');
        return;
    }
    credit -= bet;

    const cardOrder = ranks.indexOf(nextCard.rank) - ranks.indexOf(currentCard.rank);
    let correctGuess = false;

    if (guess === 'high' && cardOrder > 0) correctGuess = true;
    if (guess === 'low' && cardOrder < 0) correctGuess = true;
    if (guess === 'red' && ['heart', 'diamond'].includes(nextCard.suit)) correctGuess = true;
    if (guess === 'black' && ['club', 'spade'].includes(nextCard.suit)) correctGuess = true;

    if (correctGuess) {
        credit += bet * 2;
        point += 50;
        document.getElementById('message').textContent = "🎉 Correct!";
    } else {
        document.getElementById('message').textContent = "❌ Wrong!";
    }

    previousCard = currentCard;
    currentCard = nextCard;
    nextCard = generateCard();

    document.querySelector('#nextCard .flip-card-inner').classList.toggle('flipped');
    displayCards();
}

// 初始化
displayCards();
