// Utility to generate a random card
function getRandomCard() {
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const suit = suits[Math.floor(Math.random() * suits.length)];
  const value = Math.floor(Math.random() * 13) + 1; // 1 to 13
  return { suit, value };
}

// Display card values
function displayCard(card, elementId) {
  const element = document.getElementById(elementId);
  element.textContent = card.value;
  element.style.color = ['hearts', 'diamonds'].includes(card.suit) ? 'red' : 'black';
}

// Game state
let card1, card2, card3;

// Initialize game
function startGame() {
  card1 = getRandomCard();
  card2 = getRandomCard();
  card3 = getRandomCard();

  displayCard(card1, 'card1');
  displayCard(card2, 'card2');
  document.getElementById('card3').textContent = '?';
  document.getElementById('message').textContent = 'Make your guess!';
}

// Check result
function checkGuess(guess) {
  const messageElement = document.getElementById('message');

  if (guess === 'higher' || guess === 'lower') {
    const isHigher = card3.value > card2.value;
    const result = (guess === 'higher' && isHigher) || (guess === 'lower' && !isHigher);
    messageElement.textContent = result ? 'You guessed correctly!' : 'Wrong guess!';
  } else if (guess === 'red' || guess === 'black') {
    const isRed = ['hearts', 'diamonds'].includes(card3.suit);
    const result = (guess === 'red' && isRed) || (guess === 'black' && !isRed);
    messageElement.textContent = result ? 'You guessed correctly!' : 'Wrong guess!';
  }

  displayCard(card3, 'card3');
}

// Attach event listeners
document.getElementById('btn-high').addEventListener('click', () => checkGuess('higher'));
document.getElementById('btn-low').addEventListener('click', () => checkGuess('lower'));
document.getElementById('btn-red').addEventListener('click', () => checkGuess('red'));
document.getElementById('btn-black').addEventListener('click', () => checkGuess('black'));
document.getElementById('btn-restart').addEventListener('click', startGame);

// Start the game
startGame();
