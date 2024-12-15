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

  // Reward功能
  function openRewardPopup() {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('modal-message').textContent = 'You redeemed 200 points for +200 Balance!';
    if (points >= 200) {
      points -= 200;
      balance += 200;
    } else {
      document.getElementById('modal-message').textContent = 'Not enough points!';
    }
    updateDisplay();
  }

  document.getElementById('reward-btn').addEventListener('click', openRewardPopup);
  document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
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
