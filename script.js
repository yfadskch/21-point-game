// Card Data
const suits = ['red', 'black']; // Red = ♥️♦️, Black = ♠️♣️
const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
let currentCard = generateRandomCard();
let previousCard = { suit: '?', rank: '?' }; // Initial placeholder for previous card

function generateRandomCard() {
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const rank = ranks[Math.floor(Math.random() * ranks.length)];
    return { suit, rank };
}

function displayCards() {
    const prevCardDisplay = document.getElementById('previousCard');
    const currCardDisplay = document.getElementById('currentCard');

    // Display previous card
    prevCardDisplay.textContent = `${previousCard.rank} (${previousCard.suit === 'red' ? '♥️' : '♠️'})`;

    // Display current card
    currCardDisplay.textContent = `${currentCard.rank} (${currentCard.suit === 'red' ? '♥️' : '♠️'})`;
}

function makeGuess(guess) {
    const nextCard = generateRandomCard();
    let message = '';

    if (
        (guess === 'high' && ranks.indexOf(nextCard.rank) > ranks.indexOf(currentCard.rank)) ||
        (guess === 'low' && ranks.indexOf(nextCard.rank) < ranks.indexOf(currentCard.rank)) ||
        (guess === 'red' && nextCard.suit === 'red') ||
        (guess === 'black' && nextCard.suit === 'black')
    ) {
        message = '🎉 Correct Guess!';
    } else {
        message = '❌ Wrong Guess!';
    }

    // Update previous and current card
    previousCard = currentCard;
    currentCard = nextCard;

    // Update card displays
    displayCards();
    document.getElementById('message').textContent = message;
}

function nextCard() {
    previousCard = currentCard;
    currentCard = generateRandomCard();

    // Add flip animation
    const prevCardDisplay = document.getElementById('previousCard');
    const currCardDisplay = document.getElementById('currentCard');
    prevCardDisplay.classList.add('flip');
    currCardDisplay.classList.add('flip');

    setTimeout(() => {
        displayCards();
        prevCardDisplay.classList.remove('flip');
        currCardDisplay.classList.remove('flip');
    }, 500);

    // Clear message
    document.getElementById('message').textContent = '';
}

// Initialize the card displays
displayCards();
