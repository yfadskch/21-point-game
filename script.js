const suits = ['♠', '♥', '♣', '♦'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
let deck, playerHand, dealerHand, playerName = 'Player';

function createDeck() {
    const deck = [];
    for (const suit of suits) {
        for (const value of values) {
            deck.push({ suit, value });
        }
    }
    return deck.sort(() => Math.random() - 0.5);
}

function calculateScore(hand) {
    let score = 0, aceCount = 0;
    hand.forEach(card => {
        if (card.value === 'A') {
            score += 11;
            aceCount++;
        } else if (['J', 'Q', 'K'].includes(card.value)) {
            score += 10;
        } else {
            score += parseInt(card.value);
        }
    });
    while (score > 21 && aceCount > 0) {
        score -= 10;
        aceCount--;
    }
    return score;
}

function displayHand(hand, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    hand.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.textContent = `${card.value}${card.suit}`;
        container.appendChild(cardDiv);
    });
}

function setPlayerName() {
    const nameInput = document.getElementById('playerName').value;
    playerName = nameInput || 'Player';
    document.getElementById('playerLabel').textContent = `${playerName}'s Hand`;
    document.getElementById('playerNameContainer').style.display = 'none';
    document.getElementById('gameBoard').style.display = 'block';
    startGame();
}

function hit() {
    playerHand.push(deck.pop());
    displayHand(playerHand, 'playerCards');
    document.getElementById('playerScore').textContent = `Score: ${calculateScore(playerHand)}`;
    document.getElementById('playerProgress').value = calculateScore(playerHand);

    if (calculateScore(playerHand) > 21) {
        alert('You busted! Dealer wins.');
        resetGame();
    }
}

function stand() {
    while (calculateScore(dealerHand) < 17) {
        dealerHand.push(deck.pop());
    }
    displayHand(dealerHand, 'dealerCards');
    document.getElementById('dealerScore').textContent = `Score: ${calculateScore(dealerHand)}`;
    document.getElementById('dealerProgress').value = calculateScore(dealerHand);

    if (calculateScore(dealerHand) > 21 || calculateScore(playerHand) > calculateScore(dealerHand)) {
        alert(`${playerName} wins!`);
    } else if (calculateScore(playerHand) < calculateScore(dealerHand)) {
        alert('Dealer wins.');
    } else {
        alert('It\'s a tie!');
    }

    resetGame();
}

function resetGame() {
    setTimeout(startGame, 1000);
}

function startGame() {
    deck = createDeck();
    playerHand = [deck.pop(), deck.pop()];
    dealerHand = [deck.pop(), deck.pop()];

    displayHand(playerHand, 'playerCards');
    displayHand(dealerHand.slice(0, 1), 'dealerCards'); // Only show 1 dealer card

    document.getElementById('playerScore').textContent = `Score: ${calculateScore(playerHand)}`;
    document.getElementById('dealerScore').textContent = 'Score: ?';
    document.getElementById('playerProgress').value = calculateScore(playerHand);
    document.getElementById('dealerProgress').value = 0;
}

document.addEventListener('DOMContentLoaded', startGame);
