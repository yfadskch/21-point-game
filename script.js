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
  if (card === '?') {
    element.textContent = '?';
    element.style.color = 'black';
  } else {
    element.textContent = card.value;
    element.style.color = ['hearts', 'diamonds'].includes(card.suit) ? 'red' : 'black';
  }
}

// Game state
let previousCard2 = null;
let previousCard3 = null;
let card1, card2, card3;

// Initialize game
function startGame() {
  card1 = previousCard2 ? previousCard2 : getRandomCard();
  card2 = previousCard3 ? previousCard3 : getRandomCard();
  card3 = getRandomCard();

  displayCard(card1, 'card1');
  displayCard(card2, 'card2');
  displayCard('?', 'card3');

  document.getElementById('message').textContent = 'Make your guess!';
}

// Check result
function checkGuess(guess) {
  const messageElement = document.getElementById('message');
  const card3Element = document.getElementById('card3');

  let result = false;

  if (guess === 'higher') {
    result = card3.value > card2.value;
  } else if (guess === 'lower') {
    result = card3.value < card2.value;
  } else if (guess === 'red') {
    result = ['hearts', 'diamonds'].includes(card3.suit);
  } else if (guess === 'black') {
    result = ['clubs', 'spades'].includes(card3.suit);
  }

  messageElement.textContent = result ? 'You guessed correctly!' : 'Wrong guess!';
  displayCard(card3, 'card3'); // Temporarily display card3

  // Hide card3 and start a new round after 2 seconds
  setTimeout(() => {
    displayCard('?', 'card3'); // Hide card3
    previousCard2 = card2; // Update previous cards
    previousCard3 = card3;
    startGame(); // Restart game
  }, 2000);
}

// Attach event listeners
document.getElementById('btn-high').addEventListener('click', () => checkGuess('higher'));
document.getElementById('btn-low').addEventListener('click', () => checkGuess('lower'));
document.getElementById('btn-red').addEventListener('click', () => checkGuess('red'));
document.getElementById('btn-black').addEventListener('click', () => checkGuess('black'));

// Automatically start the game when the page loads
window.onload = startGame;
