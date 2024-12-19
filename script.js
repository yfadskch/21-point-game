document.addEventListener('DOMContentLoaded', () => {
  let balance = 500;
  let points = 0;
  let currentBet = 100;

  let previousCard2 = getRandomCard();
  let previousCard3 = getRandomCard();

  function updateDisplay() {
    document.getElementById('balance').textContent = balance;
    document.getElementById('points').textContent = points;
  }

  function getRandomCard() {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    return { suit: suits[Math.floor(Math.random() * suits.length)], value: Math.floor(Math.random() * 13) + 1 };
  }

  function setCardDisplay(cardElement, card) {
    cardElement.textContent = card.value;
    cardElement.style.color = ['hearts', 'diamonds'].includes(card.suit) ? 'red' : 'black';
  }

  function startGame() {
    setCardDisplay(document.getElementById('card1'), previousCard2);
    setCardDisplay(document.getElementById('card2'), previousCard3);
    document.getElementById('card3').textContent = '?';
    document.getElementById('message').textContent = 'Make Your Guess!';
  }

  function checkGuess(condition) {
    const card3 = getRandomCard();
    setCardDisplay(document.getElementById('card3'), card3);
    const isRed = ['hearts', 'diamonds'].includes(card3.suit);
    const correct = (condition === 'red' && isRed) || (condition === 'black' && !isRed);

    if (correct) {
      balance += currentBet;
      points += 100;
      document.getElementById('message').textContent = 'You guessed correctly!';
    } else {
      balance -= currentBet;
      points += 50;
      document.getElementById('message').textContent = 'Wrong guess!';
    }

    previousCard2 = previousCard3;
    previousCard3 = card3;
    updateDisplay();
    setTimeout(startGame, 2000);
  }

  function openRewardPopup() {
    document.getElementById('modal').style.display = 'block';
  }

  function claimReward(option) {
    let message = '';
    if (option === '1' && points >= 200) {
      points -= 200;
      balance += 200;
      message = 'You redeemed 200 points for +200 Balance!';
    } else if (option === '2' && points >= 1000) {
      points -= 1000;
      balance += 1000;
      message = 'You redeemed 1000 points for Welcome Bonus!';
    } else if (option === '3' && points >= 3000) {
      points -= 3000;
      balance += 3000;
      message = 'You redeemed 3000 points for Free 8.88!';
    } else {
      message = 'Not enough points to redeem this reward!';
    }

    document.getElementById('modal-message').textContent = message;
    updateDisplay();
  }

  function closeRewardPopup() {
    document.getElementById('modal').style.display = 'none';
  }

  document.getElementById('reward-btn').addEventListener('click', openRewardPopup);
  document.getElementById('close-modal').addEventListener('click', closeRewardPopup);

  document.querySelectorAll('.reward-option').forEach(button => {
    button.addEventListener('click', () => {
      claimReward(button.dataset.option);
    });
  });

  document.querySelectorAll('.bet-btn').forEach(button => {
    button.addEventListener('click', () => {
      currentBet = parseInt(button.dataset.bet);
    });
  });

  document.getElementById('btn-red').addEventListener('click', () => checkGuess('red'));
  document.getElementById('btn-black').addEventListener('click', () => checkGuess('black'));

  updateDisplay();
  startGame();
});
