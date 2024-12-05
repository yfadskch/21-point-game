let credit = 200;
let point = 100;
let bet = 10;

function generateCard() {
  const suits = ['♠', '♥', '♦', '♣'];
  const numbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  const number = numbers[Math.floor(Math.random() * numbers.length)];
  const suit = suits[Math.floor(Math.random() * suits.length)];

  return { number, suit };
}

function updateCards() {
  const card1 = generateCard();
  const card2 = generateCard();
  const card3 = { number: '?', suit: '?' };

  document.getElementById('card1').innerText = `${card1.number} ${card1.suit}`;
  document.getElementById('card2').innerText = `${card2.number} ${card2.suit}`;
  document.getElementById('card3').innerText = `${card3.number}`;
}

function changeBet(amount) {
  bet = amount;
  document.getElementById('bet').innerText = bet;
}

function makeGuess(guess) {
  if (credit < bet) {
    document.getElementById('message').innerText = 'Not enough credit!';
    return;
  }

  credit -= bet;
  document.getElementById('credit').innerText = credit;

  const card3 = generateCard();
  document.getElementById('card3').innerText = `${card3.number} ${card3.suit}`;

  const isCorrect =
    (guess === 'high' && card3.number >= '8') ||
    (guess === 'low' && card3.number <= '7') ||
    (guess === 'red' && (card3.suit === '♥' || card3.suit === '♦')) ||
    (guess === 'black' && (card3.suit === '♠' || card3.suit === '♣'));

  if (isCorrect) {
    credit += bet * 2;
    point += bet;
    document.getElementById('message').innerText = 'Correct!';
  } else {
    document.getElementById('message').innerText = 'Wrong!';
  }

  document.getElementById('credit').innerText = credit;
  document.getElementById('point').innerText = point;

  setTimeout(updateCards, 2000); // Reset for next round
}

function redeemRewards() {
  if (point >= 100) {
    credit += 50;
    point -= 100;
    document.getElementById('credit').innerText = credit;
    document.getElementById('point').innerText = point;
    document.getElementById('message').innerText = 'Redeemed 50 credits!';
  } else {
    document.getElementById('message').innerText = 'Not enough points!';
  }
}

// Initialize the game
updateCards();
