let balance = 500; // 初始余额
let points = 0; // 初始积分
let currentBet = 100;

let previousCard2 = getRandomCard();
let previousCard3 = getRandomCard();

// 更新余额和积分显示
function updateDisplay() {
  document.getElementById('balance').textContent = balance;
  document.getElementById('points').textContent = points;
}

// 随机生成卡牌
function getRandomCard() {
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  return { suit: suits[Math.floor(Math.random() * suits.length)], value: Math.floor(Math.random() * 13) + 1 };
}

// 显示卡牌的值
function setCardDisplay(cardElement, card) {
  cardElement.textContent = card.value === 1 ? 'A' : card.value === 11 ? 'J' : card.value === 12 ? 'Q' : card.value === 13 ? 'K' : card.value;
  cardElement.style.color = ['hearts', 'diamonds'].includes(card.suit) ? 'red' : 'black';
}

// 开始新一轮游戏
function startGame() {
  setCardDisplay(document.getElementById('card1'), previousCard2);
  setCardDisplay(document.getElementById('card2'), previousCard3);
  document.getElementById('card3').textContent = '?';
  document.getElementById('message').textContent = 'Make Your Guess!';
}

// 检查猜测（Red 和 Black）
function checkGuess(condition) {
  const card3 = getRandomCard();
  setCardDisplay(document.getElementById('card3'), card3);

  let win = condition === 'red'
    ? ['hearts', 'diamonds'].includes(card3.suit)
    : ['clubs', 'spades'].includes(card3.suit);

  if (win) {
    balance += currentBet;
    points += currentBet;
    document.getElementById('message').textContent = 'You guessed correctly!';
  } else {
    balance -= currentBet;
    document.getElementById('message').textContent = 'Wrong guess!';
  }

  previousCard2 = previousCard3;
  previousCard3 = card3;

  updateDisplay();
  setTimeout(startGame, 2000);
}

// 打开奖励窗口
function openRewardPopup() {
  document.getElementById('modal').style.display = 'block';
}

// 关闭奖励窗口
function closeRewardPopup() {
  document.getElementById('modal').style.display = 'none';
}

// 处理 Credit Reward 功能
document.querySelectorAll('.reward-option').forEach(button => {
  button.addEventListener('click', () => {
    const option = button.dataset.option; // 获取选择的奖励选项
    let message = ''; // 存储奖励信息

    if (option === '1' && points >= 200) {
      balance += 200;
      points -= 200;
      message = 'You redeemed 200 Points for +200 Balance!';
    } else if (option === '2' && points >= 1000) {
      balance += 500;
      points -= 1000;
      message = 'You redeemed 1000 Points for Welcome Bonus!';
    } else if (option === '3' && points >= 3000) {
      balance += 888;
      points -= 3000;
      message = 'You redeemed 3000 Points for Free 8.88!';
    } else {
      message = 'Not enough points to redeem this reward!';
    }

    document.getElementById('modal-message').textContent = message; // 显示奖励结果
    updateDisplay(); // 更新余额和积分
    setTimeout(closeRewardPopup, 2000); // 2秒后关闭弹窗
  });
});

// 监听 Credit Reward 按钮
document.getElementById('reward-btn').addEventListener('click', openRewardPopup);

// 监听投注按钮
document.querySelectorAll('.bet-btn').forEach(button => {
  button.addEventListener('click', () => {
    currentBet = parseInt(button.dataset.bet);
  });
});

// 监听 Red 和 Black 按钮
document.getElementById('btn-red').addEventListener('click', () => checkGuess('red'));
document.getElementById('btn-black').addEventListener('click', () => checkGuess('black'));

// 页面加载时初始化
window.onload = () => {
  updateDisplay();
  startGame();
};
