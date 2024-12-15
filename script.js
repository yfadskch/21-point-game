let balance = 200;
let points = 0;
let currentBet = 100;

function updateDisplay() {
  document.getElementById('balance').textContent = balance;
  document.getElementById('points').textContent = points;
}

function getRandomCard() {
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const suit = suits[Math.floor(Math.random() * 4)];
  const value = Math.floor(Math.random() * 13) + 1;
  return { suit, value };
}

function startGame() {
  document.getElementById('card1').textContent = '?';
  document.getElementById('card2').textContent = '?';
  document.getElementById('card3').textContent = '?';
  document.getElementById('message').textContent = 'Make Your Guess!';
}

function checkGuess(condition) {
  const card3 = getRandomCard();
  document.getElementById('card3').textContent = card3.value;

  const card2Value = 5; // Fixed card2 value for example
  let win = false;

  if (condition === 'higher') win = card3.value > card2Value;
  else if (condition === 'lower') win = card3.value < card2Value;

  if (win) {
    balance += currentBet;
    points += currentBet;
    document.getElementById('message').textContent = 'You guessed correctly!';
  } else {
    balance -= currentBet;
    document.getElementById('message').textContent = 'Wrong guess!';
  }

  updateDisplay();
}

function openRewardPopup() {
  document.getElementById('modal').style.display = 'block';
}

function closeRewardPopup() {
  document.getElementById('modal').style.display = 'none';
}

document.querySelectorAll('.bet-btn').forEach(button => {
  button.addEventListener('click', () => {
    currentBet = parseInt(button.dataset.bet);
  });
});

document.getElementById('reward-btn').addEventListener('click', openRewardPopup);

document.querySelectorAll('.reward-option').forEach(button => {
  button.addEventListener('click', () => {
    const option = button.dataset.option;
    let message = '';

    if (option === '1' && points >= 200) {
      balance += 200;
      points -= 200;
      message = 'You redeemed 200 Points for +200 Balance!';
    } else if (option === '2' && points >= 1000) {
      message = 'You redeemed 1000 Points for Welcome Bonus!';
    } else if (option === '3' && points >= 3000) {
      message = 'You redeemed 3000 Points for Free 8.88!';
    } else {
      message = 'Not enough points to redeem this reward!';
    }

    document.getElementById('modal-message').textContent = message;
    updateDisplay();
    setTimeout(closeRewardPopup, 2000);
  });
});

document.getElementById('btn-high').addEventListener('click', () => checkGuess('higher'));
document.getElementById('btn-low').addEventListener('click', () => checkGuess('lower'));

window.onload = () => {
  updateDisplay();
  startGame();
};
