document.addEventListener('DOMContentLoaded', () => {
  let balance = 500; // 初始余额
  let points = 0;    // 初始积分
  let currentBet = 100;

  // 更新余额和积分显示
  function updateDisplay() {
    document.getElementById('balance').textContent = balance;
    document.getElementById('points').textContent = points;
  }

  // 打开奖励弹窗
  function openRewardPopup() {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('modal-message').textContent = 'Select your reward!';
  }

  // 关闭奖励弹窗
  function closeRewardPopup() {
    document.getElementById('modal').style.display = 'none';
  }

  // 监听 Credit Reward 按钮
  document.getElementById('reward-btn').addEventListener('click', openRewardPopup);
  document.getElementById('close-modal').addEventListener('click', closeRewardPopup);

  // 监听 Bet 按钮
  document.querySelectorAll('.bet-btn').forEach(button => {
    button.addEventListener('click', () => {
      currentBet = parseInt(button.dataset.bet);
    });
  });

  // 监听 Red 和 Black 按钮
  document.getElementById('btn-red').addEventListener('click', () => {
    points += 50; // 示例：红色按钮加分
    balance += currentBet;
    updateDisplay();
  });

  document.getElementById('btn-black').addEventListener('click', () => {
    points += 100; // 示例：黑色按钮加分
    balance -= currentBet;
    updateDisplay();
  });

  // 初始化显示
  updateDisplay();
});
