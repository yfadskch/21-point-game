let credit = 200;
let bet = 10;
let point = 100;
let cards = [];
const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

function initializeGame() {
  cards = [];
  document.getElementById('card1').textContent = '?';
  document.getElementById('card2').textContent = '?';
  document.getElementById('card3').textContent = '?';
  document.getElementById('result').textContent = '';
}

function generateCard() {
  const value = Math.floor(Math.random() * 13) + 1;
  const suit = suits[Math.floor(Math.random() * suits.length)];
  return { value, suit };
}

function startGame() {
  const firstCard = generateCard();
  const secondCard = generateCard();
  cards = [firstCard, secondCard];
  document.getElementById('card1').textContent = firstCard.value;
  document.getElementById('card2').textContent = secondCard.value;
}

function makeGuess(guess) {
  if (credit < bet) {
    alert('Not enough credit!');
    return;
  }
  credit -= bet;

  const thirdCard = generateCard();
  document.getElementById('card3').textContent = thirdCard.value;
  const result = evaluateGuess(cards[1], thirdCard, guess);

  if (result) {
    point += bet * 2;
    credit += bet * 2;
    document.getElementById('result').textContent = 'Correct!';
    document.getElementById('result').style.color = 'green';
  } else {
    document.getElementById('result').textContent = 'Wrong!';
    document.getElementById('result').style.color = 'red';
  }

  updateDisplay();
  initializeGame();
}

function evaluateGuess(previousCard, currentCard, guess) {
  if (guess === 'high') {
    return currentCard.value > previousCard.value;
  }
  if (guess === 'low') {
    return currentCard.value < previousCard.value;
  }
  if (guess === 'red') {
    return currentCard.suit === 'hearts' || currentCard.suit === 'diamonds';
  }
  if (guess === 'black') {
    return currentCard.suit === 'clubs' || currentCard.suit === 'spades';
  }
  return false;
}

function changeBet(amount) {
  bet = amount;
  updateDisplay();
}

function redeemRewards() {
  if (point >= 100) {
    credit += 50;
    point -= 100;
    updateDisplay();
  } else {
    alert('Not enough points!');
  }
}

function updateDisplay() {
  document.getElementById('credit').textContent = credit;
  document.getElementById('bet').textContent = bet;
  document.getElementById('point').textContent = point;
}

// Initialize the game when the page loads
initializeGame();
startGame();
