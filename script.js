let credit = 200;
let bet = 10;
let point = 100;
let card1Value, card2Value, card3Value;

function generateCardValue() {
  return Math.floor(Math.random() * 13) + 1;
}

function generateCardColor() {
  return Math.random() > 0.5 ? "Red" : "Black";
}

function changeBet(amount) {
  bet = amount;
  document.getElementById("bet").textContent = bet;
}

function makeGuess(guess) {
  if (credit < bet) {
    alert("Not enough credit!");
    return;
  }

  // Deduct the bet from credit
  credit -= bet;

  // Generate card values
  card1Value = generateCardValue();
  card2Value = generateCardValue();
  card3Value = generateCardValue();

  // Display the first two cards
  document.getElementById("card1").textContent = card1Value;
  document.getElementById("card2").textContent = card2Value;

  // Default card 3 to question mark
  document.getElementById("card3").textContent = "?";

  let result;
  if (guess === "High") {
    result = card3Value > card2Value;
  } else if (guess === "Low") {
    result = card3Value < card2Value;
  } else if (guess === "Red") {
    result = generateCardColor() === "Red";
  } else {
    result = generateCardColor() === "Black";
  }

  if (result) {
    credit += bet * 2; // Reward
    point += bet;
    document.getElementById("message").textContent = "Correct!";
    document.getElementById("message").style.color = "green";
  } else {
    document.getElementById("message").textContent = "Wrong!";
    document.getElementById("message").style.color = "red";
  }

  document.getElementById("card3").textContent = card3Value;
  updateStats();
}

function updateStats() {
  document.getElementById("credit").textContent = credit;
  document.getElementById("point").textContent = point;
}

function redeemRewards() {
  if (point >= 100) {
    point -= 100;
    credit += 50;
    updateStats();
    document.getElementById("message").textContent = "Redeemed!";
    document.getElementById("message").style.color = "green";
  } else {
    document.getElementById("message").textContent = "Not enough points to redeem!";
    document.getElementById("message").style.color = "red";
  }
}
