const suits = ['♠', '♥', '♣', '♦'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
let deck, playerHand, dealerHand, playerName = 'Player', round = 1, playerWins = 0, dealerWins = 0;

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
    hand.forEach((card, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.textContent = `${card.value}${card.suit}`;
        cardDiv.style.animationDelay = `${index * 0.2}s`;
        cardDiv.classList.add('dealing');
        setTimeout(() => cardDiv.classList.remove('dealing'), 1000);
        container.appendChild(cardDiv);
    });
}

function updateProgress() {
    document.getElementById('playerProgress').value = calculateScore(playerHand);
    document.getElementById('dealerProgress').value = calculateScore(dealerHand);
}

function setPlayerName() {
    const nameInput = document.getElementById('playerName').value;
    playerName = nameInput || 'Player';
    document.getElementById('playerLabel').textContent = `${playerName}'s Hand`;
    document.getElementById('playerNameContainer').style.display = 'none';
    document.getElementById('gameBoard').style.display = 'block';
    startGame();
}

function highlightSpecialRule(hand) {
    const highlight = document.getElementById('highlight');
    if (hand.length === 5 && calculateScore(hand) <= 21) {
        highlight.textContent = `${playerName} achieved the Five Dragon Rule!`;
    } else if (hand.length === 2 && hand[0].value === hand[1].value) {
        highlight.textContent = `${playerName} got a Pair!`;
    } else {
        highlight.textContent = '';
    }
}

function hit() {
    playerHand.push(deck.pop());
    displayHand(playerHand, 'playerCards');
    document.getElementById('playerScore').textContent = `Score: ${calculateScore(playerHand)}`;
    highlightSpecialRule(playerHand);
    updateProgress();
    if (calculateScore(playerHand) > 21) determineWinner();
}

function stand() {
    while (calculateScore(dealerHand) < 17) {
        dealerHand.push(deck.pop());
    }
    displayHand(dealerHand, 'dealerCards');
    document.getElementById('dealerScore').textContent = `Score: ${calculateScore(dealerHand)}`;
    updateProgress();
    determineWinner();
}

function determineWinner() {
    const playerScore = calculateScore(playerHand);
    const dealerScore = calculateScore(dealerHand);
    if (playerScore > 21) {
        dealerWins++;
        alert('You busted! Dealer wins.');
    } else if (dealerScore > 21) {
        playerWins++;
        alert('Dealer busted! You win.');
    } else if (playerScore > dealerScore) {
        playerWins++;
        alert('You win this round!');
    } else if (playerScore < dealerScore) {
        dealerWins++;
        alert('Dealer wins this round.');
    } else {
        alert("It's a tie!");
    }

    if (round >= 5) {
        alert('Game Over! Claim your reward: Free Credit 3 (klking88.com)');
        const link = document.createElement('a');
        link.href = 'https://klking88.com';
        link.target = '_blank';
        link.textContent = 'Click here to claim your reward!';
        link.style.display = 'block';
        link.style.color = 'gold';
        link.style.marginTop = '20px';
        document.body.appendChild(link);
    } else {
        round++;
        startGame();
    }
}

function startGame() {
    deck = createDeck();
    playerHand = [deck.pop(), deck.pop()];
    dealerHand = [deck.pop(), deck.pop()];
    displayHand(playerHand, 'playerCards');
    displayHand(dealerHand, 'dealerCards');
    document.getElementById('playerScore').textContent = `Score: ${calculateScore(playerHand)}`;
    document.getElementById('dealerScore').textContent = `Score: ${calculateScore(dealerHand)}`;
    updateProgress();
}

startGame();
