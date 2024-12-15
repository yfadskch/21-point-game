let balance = 200; // 初始余额
let points = 0; // 初始积分
let currentBet = 100;

// 记录卡牌状态
let previousCard2 = getRandomCard();
let previousCard3 = getRandomCard();

// 更新显示
function updateDisplay() {
  document.getElementById('balance').textContent = balance;
  document.getElementById('points').textContent = points;
}

// 随机生成卡牌
function getRandomCard() {
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  return { suit: suits[Math.floor(Math.random() * suits.length)], value: Math.floor(Math.random() * 13) + 1 };
}

// 开始新一轮游戏
function startGame() {
  document.getElementById('card1').textContent = previousCard2.value;
  document.getElementById('card2').textContent = previousCard3.value;
  document.getElementById('card3').textContent = '?';
  document.getElementById('message').textContent = 'Make Your Guess!';
}

// 检查猜测
function checkGuess(condition) {
  const card3 = getRandomCard();
  document.getElementById('card3').textContent = card3.value;

  let win = false;

  if (condition === 'higher') win = card3.value > previousCard3.value;
  if (condition === 'lower') win = card3.value < previousCard3.value;
  if (condition === 'red') win = ['hearts', 'diamonds'].includes(card3.suit);
  if (condition === 'black') win = ['clubs', 'spades'].includes(card3.suit);

  if (win) {
    balance += currentBet;
    points += currentBet;
    document.getElementById('message').textContent = 'You guessed correctly!';
  } else {
    balance -= currentBet;
    document.getElementById('message').textContent = 'Wrong guess!';
  }

  previousCard2 = previousCard3; // 更新牌
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
