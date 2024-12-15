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

// 显示卡牌
function setCardDisplay(cardElement, card) {
  cardElement.textContent = card.value === 1 ? 'A' : card.value === 11 ? 'J' : card.value === 12 ? 'Q' : card.value === 13 ? 'K' : card.value;
  cardElement.style.color = ['hearts', 'diamonds'].includes(card.suit) ? 'red' : 'black';
}

// 开始新一轮
function startGame() {
  setCardDisplay(document.getElementById('card1'), previousCard2);
  setCardDisplay(document.getElementById('card2'), previousCard3);
  document.getElementById('card3').textContent = '?';
  document.getElementById('message').textContent = 'Make Your Guess!';
}

// 打开奖励弹窗
function openRewardPopup() {
  document.getElementById('modal').style.display = 'block';
  document.getElementById('reward-message').textContent = ''; // 重置内容
}

// 关闭奖励弹窗
function closeRewardPopup() {
  document.getElementById('modal').style.display = 'none';
}

// 处理 Credit Reward 功能
document.querySelectorAll('.reward-option').forEach(button => {
  button.addEventListener('click', () => {
    const option = button.dataset.option; // 获取奖励选项
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

    document.getElementById('reward-message').textContent = message; // 显示奖励结果
    updateDisplay(); // 更新余额和积分
    setTimeout(closeRewardPopup, 2000); // 2秒后关闭弹窗
  });
});

// 添加事件监听
document.getElementById('reward-btn').addEventListener('click', openRewardPopup);
document.getElementById('close-modal').addEventListener('click', closeRewardPopup);

// 初始化游戏
window.onload = () => {
  updateDisplay();
  startGame();
};
