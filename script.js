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
  // Set the previous round's card2 and card3 as card1 and card2
  card1 = previousCard2 ? previousCard2 : getRandomCard();
  card2 = previousCard3 ? previousCard3 : getRandomCard();

  // Generate a new random card for card3
  card3 = getRandomCard();

  // Display the cards
  displayCard(card1, 'card1');
  displayCard(card2, 'card2');
  displayCard('?', 'card3'); // Third card hidden

  // Clear message
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

  // Display card3 temporarily to show result
  displayCard(card3, 'card3');

  // Hide the third card after 2 seconds and start next round
  setTimeout(() => {
    displayCard('?', 'card3'); // Hide card3 again
    previousCard2 = card2; // Update previous cards
    previousCard3 = card3;
    startGame();
  }, 2000);
}

// Attach event listeners
document.getElementById('btn-high').addEventListener('click', () => checkGuess('higher'));
document.getElementById('btn-low').addEventListener('click', () => checkGuess('lower'));
document.getElementById('btn-red').addEventListener('click', () => checkGuess('red'));
document.getElementById('btn-black').addEventListener('click', () => checkGuess('black'));

// Automatically start the game when the page loads
window.onload = startGame;
