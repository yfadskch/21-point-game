let credit = 200;
let bet = 10;
let point = 100;

const suits = ["♠", "♥", "♦", "♣"];
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let previousCard = null;

// Initialize game
function initializeGame() {
    document.getElementById("credit").innerText = credit;
    document.getElementById("bet").innerText = bet;
    document.getElementById("point").innerText = point;
    showInitialCards();
}

// Generate a random card
function generateCard() {
    const rank = ranks[Math.floor(Math.random() * ranks.length)];
    const suit = suits[Math.floor(Math.random() * suits.length)];
    return `${rank}${suit}`;
}

// Show initial cards
function showInitialCards() {
    const card1 = generateCard();
    const card2 = generateCard();
    previousCard = card2;

    document.getElementById("card1").innerText = card1;
    document.getElementById("card2").innerText = card2;
    document.getElementById("card3").innerText = "?";
}

// Change bet amount
function changeBet(amount) {
    bet = amount;
    document.getElementById("bet").innerText = bet;
}

// Make a guess
function makeGuess(guess) {
    if (credit < bet) {
        document.getElementById("result").innerText = "Not enough credit!";
        return;
    }

    credit -= bet;
    const card3 = generateCard();
    document.getElementById("card3").innerText = card3;

    const cardValue = ranks.indexOf(card3[0]);
    const previousValue = ranks.indexOf(previousCard[0]);
    let result = false;

    if (guess === "High" && cardValue > previousValue) result = true;
    if (guess === "Low" && cardValue < previousValue) result = true;
    if (guess === "Red" && ["♥", "♦"].includes(card3.slice(-1))) result = true;
    if (guess === "Black" && ["♠", "♣"].includes(card3.slice(-1))) result = true;

    if (result) {
        point += bet * 2;
        credit += bet * 2;
        document.getElementById("result").innerText = "Correct!";
    } else {
        document.getElementById("result").innerText = "Wrong!";
    }

    document.getElementById("credit").innerText = credit;
    document.getElementById("point").innerText = point;
}

// Redeem rewards
function redeemRewards() {
    if (point >= 100) {
        point -= 100;
        credit += 50;
        document.getElementById("point").innerText = point;
        document.getElementById("credit").innerText = credit;
        document.getElementById("result").innerText = "Redeemed 50 Credit!";
    } else {
        document.getElementById("result").innerText = "Not enough points!";
    }
}

// Start the game
initializeGame();
