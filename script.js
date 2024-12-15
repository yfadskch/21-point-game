let balance = 500; // 初始余额
let points = 0; // 初始积分
let currentBet = 100;

// 更新余额和积分显示
function updateDisplay() {
  document.getElementById('balance').textContent = balance;
  document.getElementById('points').textContent = points;
}

// 打开奖励弹窗
function openRewardPopup() {
  document.getElementById('modal').style.display = 'block';
  document.getElementById('modal-message').textContent = ''; // 重置内容
}

// 关闭奖励弹窗
function closeRewardPopup() {
  document.getElementById('modal').style.display = 'none';
}

// 处理 Credit Reward 功能
document.getElementById('reward-btn').addEventListener('click', openRewardPopup);

document.getElementById('close-modal').addEventListener('click', closeRewardPopup);

document.querySelectorAll('.reward-option').forEach(button => {
  button.addEventListener('click', () => {
    const option = button.dataset.option; // 获取选项
    let message = ''; // 奖励消息

    if (option === '1' && points >= 200) {
      balance += 200;
      points -= 200;
      message = 'You redeemed 200 Points for +200 Balance!';
    } else if (option === '2' && points >= 1000) {
      balance += 500;
      points -= 1000;
      message = 'You redeemed 1000 Points for Welcome Bonus!';
    } else if (option === '3' && points >= 3000) {
      let randomReward = Math.floor(Math.random() * 500) + 500; // 随机奖励 500-1000
      balance += randomReward;
      points -= 3000;
      message = `You redeemed 3000 Points and won +${randomReward} Balance!`;
    } else {
      message = 'Not enough points to redeem this reward!';
    }

    document.getElementById('modal-message').textContent = message;
    updateDisplay();
    setTimeout(closeRewardPopup, 2000); // 2秒后关闭弹窗
  });
});

// 监听 Bet 按钮
document.querySelectorAll('.bet-btn').forEach(button => {
  button.addEventListener('click', () => {
    currentBet = parseInt(button.dataset.bet);
  });
});

// 初始化显示
window.onload = () => {
  updateDisplay();
};
