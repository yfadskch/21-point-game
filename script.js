// Card Data
const suits = ['red', 'black']; // Red = ♥️♦️, Black = ♠️♣️
const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
let currentCard = generateRandomCard();

function generateRandomCard() {
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const rank = ranks[Math.floor(Math.random() * ranks.length)];
    return { suit, rank };
}

function displayCard(card) {
    const cardDisplay = document.getElementById('currentCard');
    cardDisplay.textContent = `${card.rank} (${card.suit === 'red' ? '♥️' : '♠️'})`;
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

    currentCard = nextCard; // Update current card
    displayCard(currentCard); // Show new card
    document.getElementById('message').textContent = message;
}

function nextCard() {
    currentCard = generateRandomCard(); // Generate a new card
    displayCard(currentCard); // Update display
    document.getElementById('message').textContent = ''; // Clear message
}

// Initialize the first card display
displayCard(currentCard);
