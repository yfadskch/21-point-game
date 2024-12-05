const cards = [
  { value: "A", suit: "hearts" },
  { value: "2", suit: "diamonds" },
  { value: "3", suit: "clubs" },
  { value: "4", suit: "spades" },
  { value: "5", suit: "hearts" },
  { value: "6", suit: "diamonds" },
  { value: "7", suit: "clubs" },
  { value: "8", suit: "spades" },
  { value: "9", suit: "hearts" },
  { value: "10", suit: "diamonds" },
  { value: "J", suit: "clubs" },
  { value: "Q", suit: "spades" },
  { value: "K", suit: "hearts" },
];

let credit = 200;
let point = 100;
let bet = 10;
let currentCards = [];

function changeBet(amount) {
  bet = amount;
  document.getElementById("bet").innerText = bet;
}

function makeGuess(guess) {
  if (credit < bet) {
    alert("Not enough credit!");
    return;
  }
  credit -= bet;
  document.getElementById("credit").innerText = credit;

  const nextCard = currentCards[2];
  document.getElementById("card3").classList.add("flipped");
  setTimeout(() => {
    document.getElementById("card3").innerText = nextCard.value;
    document.getElementById("card3").classList.remove("flipped");

    const correct =
      (guess === "high" && nextCard.value > currentCards[1].value) ||
      (guess === "low" && nextCard.value < currentCards[1].value) ||
      (guess === "red" && ["hearts", "diamonds"].includes(nextCard.suit)) ||
      (guess === "black" && ["clubs", "spades"].includes(nextCard.suit));

    if (correct) {
      credit += bet * 2;
      point += bet;
      document.getElementById("result").innerText = "Correct!";
    } else {
      document.getElementById("result").innerText = "Wrong!";
    }

    document.getElementById("credit").innerText = credit;
    document.getElementById("point").innerText = point;
  }, 600);
}

function redeemRewards() {
  if (point >= 100) {
    point -= 100;
    credit += 50;
    document.getElementById("point").innerText = point;
    document.getElementById("credit").innerText = credit;
    alert("Redeemed 100 points for 50 credit!");
  } else {
    alert("Not enough points!");
  }
}

function startGame() {
  currentCards = [drawCard(), drawCard(), drawCard()];
  document.getElementById("card1").innerText = currentCards[0].value;
  document.getElementById("card2").innerText = currentCards[1].value;
  document.getElementById("card3").innerText = "?";
}

function drawCard() {
  return cards[Math.floor(Math.random() * cards.length)];
}

startGame();
