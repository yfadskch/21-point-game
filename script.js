document.addEventListener("DOMContentLoaded", () => {
  let balance = 500; // 初始余额
  let points = 0; // 初始积分
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
    cardElement.textContent = card.value === 1 ? 'A' : card.value === 11 ? 'J' : card.value === 12 ? 'Q' : card.value === 13 ? 'K' : card.value;
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

  document.querySelectorAll('.bet-btn').forEach(button => {
    button.addEventListener('click', () => currentBet = parseInt(button.dataset.bet));
  });

  document.getElementById('btn-red').addEventListener('click', () => checkGuess('red'));
  document.getElementById('btn-black').addEventListener('click', () => checkGuess('black'));

  document.getElementById('reward-btn').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'block';
  });

  document.querySelectorAll('.reward-option').forEach(button => {
    button.addEventListener('click', () => {
      const option = button.dataset.option;
      if (option === '1' && points >= 200) { balance += 200; points -= 200; }
      else if (option === '2' && points >= 1000) { balance += 500; points -= 1000; }
      else if (option === '3' && points >= 3000) { balance += 888; points -= 3000; }
      else { alert('Not enough points to redeem this reward!'); }
      document.getElementById('modal').style.display = 'none';
      updateDisplay();
    });
  });

  updateDisplay();
  startGame();
});
