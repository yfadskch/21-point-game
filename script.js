let credit = 200;
let bet = 10;
let point = 100;
let currentCards = ["?", "?", "?"];

function changeBet(amount) {
  bet = amount;
  document.getElementById("bet").textContent = bet;
}

function makeGuess(guess) {
  const card3 = generateCard();
  currentCards[2] = card3.value;
  updateCards();

  if (evaluateGuess(guess, card3)) {
    credit += bet;
    point += bet * 2;
    showMessage("Correct!", "green");
  } else {
    credit -= bet;
    showMessage("Wrong!", "red");
  }

  updateInfo();
  if (credit <= 0) {
    alert("Game Over! Not enough credit.");
    resetGame();
  }
}

function generateCard() {
  const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  const suit = suits[Math.floor(Math.random() * suits.length)];
  const value = Math.floor(Math.random() * 13) + 1;
  return { suit, value };
}

function evaluateGuess(guess, card3) {
  const card2Value = currentCards[1];
  if (guess === "High") return card3.value > card2Value;
  if (guess === "Low") return card3.value < card2Value;
  if (guess === "Red") return ["Hearts", "Diamonds"].includes(card3.suit);
  if (guess === "Black") return ["Clubs", "Spades"].includes(card3.suit);
}

function updateCards() {
  document.getElementById("card1").textContent = currentCards[0];
  document.getElementById("card2").textContent = currentCards[1];
  document.getElementById("card3").textContent = "?";
}

function updateInfo() {
  document.getElementById("credit").textContent = credit;
  document.getElementById("point").textContent = point;
}

function showMessage(msg, color) {
  const message = document.getElementById("message");
  message.textContent = msg;
  message.style.color = color;
}

function resetGame() {
  credit = 200;
  point = 100;
  bet = 10;
  currentCards = ["?", "?", "?"];
  updateCards();
  updateInfo();
  showMessage("");
}

function redeemRewards() {
  const rewards = prompt(
    "Choose a reward:\n1. 200 Points: +200 Credit\n2. 1000 Points: Welcome Bonus 60%\n3. 3000 Points: Free 8.88"
  );

  if (rewards === "1" && point >= 200) {
    point -= 200;
    credit += 200;
  } else if (rewards === "2" && point >= 1000) {
    point -= 1000;
    credit += Math.floor(credit * 0.6);
  } else if (rewards === "3" && point >= 3000) {
    point -= 3000;
    credit += 8.88;
  } else {
    alert("Not enough points or invalid choice.");
  }

  updateInfo();
}
