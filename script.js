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

// 随机生成卡牌 (数值为 1 到 13)
function getRandomCard() {
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  return { suit: suits[Math.floor(Math.random() * suits.length)], value: Math.floor(Math.random() * 13) + 1 };
}

// 转换数值为显示字符 (显示 A, J, Q, K)
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
  cardElement.style.color = ['hearts', 'diamonds'].includes(card.suit) ? 'red' : 'black';
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

  // 比较逻辑：数值大小
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

// 打开奖励弹窗
document.getElementById('reward-btn').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'block';
});

// 处理奖励选择
document.querySelectorAll('.reward-option').forEach(button => {
  button.addEventListener('click', () => {
    const option = button.dataset.option;
    let rewardMessage = "";

    if (option === '1' && points >= 200) {
      balance += 200;
      points -= 200;
      rewardMessage = "You redeemed 200 Points for +200 Balance!";
    } else if (option === '2' && points >= 1000) {
      balance += 500; // Welcome Bonus
      points -= 1000;
      rewardMessage = "You redeemed 1000 Points for Welcome Bonus (+500 Balance)!";
    } else if (option === '3' && points >= 3000) {
      balance += 888; // Free 8.88 reward
      points -= 3000;
      rewardMessage = "You redeemed 3000 Points for Free 8.88!";
    } else {
      rewardMessage = "Not enough points to redeem this reward!";
    }

    document.getElementById('modal-message').textContent = rewardMessage;
    document.getElementById('modal').style.display = 'none';
    updateDisplay();
  });
});

// 事件监听：投注金额选择
document.querySelectorAll('.bet-btn').forEach(button => {
  button.addEventListener('click', () => currentBet = parseInt(button.dataset.bet));
});

// 事件监听：猜测按钮
['high', 'low', 'red', 'black'].forEach(guess => {
  document.getElementById(`btn-${guess}`).addEventListener('click', () => checkGuess(guess));
});

// 初始化游戏
window.onload = () => {
  updateDisplay();
  startGame();
};

