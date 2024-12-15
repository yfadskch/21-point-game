let balance = 500; // 初始余额设置为 500
let points = 0; // 初始积分
let currentBet = 100;

// 记录卡牌状态
let previousCard2 = getRandomCard();
let previousCard3 = getRandomCard();

// 更新显示余额和积分
function updateDisplay() {
  document.getElementById('balance').textContent = balance;
  document.getElementById('points').textContent = points;
}

// 随机生成卡牌
function getRandomCard() {
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  return { suit: suits[Math.floor(Math.random() * suits.length)], value: Math.floor(Math.random() * 13) + 1 };
}

// 转换数值为显示字符
function cardValueToDisplay(value) {
  if (value === 1) return 'A';
  if (value === 11) return 'J';
  if (value === 12) return 'Q';
  if (value === 13) return 'K';
  return value;
}

// 根据花色设置卡牌颜色
function setCardDisplay(cardElement, card) {
  cardElement.textContent = cardValueToDisplay(card.value);
  if (['hearts', 'diamonds'].includes(card.suit)) {
    cardElement.style.color = 'red'; // 红色花色
  } else {
    cardElement.style.color = 'black'; // 黑色花色
  }
}

// 开始新一轮游戏
function startGame() {
  setCardDisplay(document.getElementById('card1'), previousCard2);
  setCardDisplay(document.getElementById('card2'), previousCard3);
  document.getElementById('card3').textContent = '?';
  document.getElementById('card3').style.color = 'black'; // 重置颜色
  document.getElementById('message').textContent = 'Make Your Guess!';
}

// 检查猜测结果
function checkGuess(condition) {
  if (balance < currentBet) {
    document.getElementById('message').textContent = "Insufficient balance!";
    return;
  }

  const card3 = getRandomCard();
  setCardDisplay(document.getElementById('card3'), card3);

  let win = false;

  // 比较逻辑
  if (condition === 'higher') win = card3.value > previousCard3.value;
  if (condition === 'lower') win = card3.value < previousCard3.value;
  if (condition === 'red') win = ['hearts', 'diamonds'].includes(card3.suit);
  if (condition === 'black') win = ['clubs', 'spades'].includes(card3.suit);

  // 更新余额与积分
  if (win) {
    balance += currentBet;
    points += currentBet;
    document.getElementById('message').textContent = 'You guessed correctly!';
  } else {
    balance -= currentBet;
    document.getElementById('message').textContent = 'Wrong guess!';
  }

  // 更新上一轮的卡牌状态
  previousCard2 = previousCard3;
  previousCard3 = card3;

  updateDisplay();

  // 2秒后隐藏卡牌并重新开始
  setTimeout(startGame, 2000);
}

// 事件监听
document.querySelectorAll('.bet-btn').forEach(button => {
  button.addEventListener('click', () => currentBet = parseInt(button.dataset.bet));
});

['high', 'low', 'red', 'black'].forEach(guess => {
  document.getElementById(`btn-${guess}`).addEventListener('click', () => checkGuess(guess));
});

document.getElementById('reward-btn').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'block';
});

document.querySelectorAll('.reward-option').forEach(button => {
  button.addEventListener('click', () => {
    const option = button.dataset.option;
    if (option === '1' && points >= 200) { balance += 200; points -= 200; }
    if (option === '2' && points >= 1000) { points -= 1000; }
    if (option === '3' && points >= 3000) { points -= 3000; }
    document.getElementById('modal').style.display = 'none';
    updateDisplay();
  });
});

window.onload = () => {
  updateDisplay();
  startGame();
};
