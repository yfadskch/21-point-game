<<<<<<< HEAD
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
=======
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

  function openRewardPopup() {
    document.getElementById('modal').style.display = 'block';
  }

  function claimReward(option) {
    let message = '';
    if (option === '1' && points >= 200) {
      points -= 200;
      balance += 200;
      message = 'You redeemed 200 points for +200 Balance!';
    } else if (option === '2' && points >= 1000) {
      points -= 1000;
      balance += 1000;
      message = 'You redeemed 1000 points for Welcome Bonus';
    } else if (option === '3' && points >= 3000) {
      points -= 3000;
      balance += 3000;
      message = 'You redeemed 3000 points for Free 8.88!';
    } else {
      message = 'Not enough points to redeem this reward!';
    }

    document.getElementById('modal-message').textContent = message;
    updateDisplay();
  }

  function closeRewardPopup() {
    document.getElementById('modal').style.display = 'none';
  }

  document.getElementById('reward-btn').addEventListener('click', openRewardPopup);
  document.getElementById('close-modal').addEventListener('click', closeRewardPopup);

  document.querySelectorAll('.reward-option').forEach(button => {
    button.addEventListener('click', () => {
      claimReward(button.dataset.option);
    });
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
>>>>>>> d409743fb05a067b09ee9f15fab71809cc79d90e
