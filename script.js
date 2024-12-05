let credit = 200;
let point = 100;
let bet = 10;

let suits = ["♠", "♣", "♥", "♦"];
let lastCard = null;

function generateCard() {
    let number = Math.floor(Math.random() * 13) + 1;
    let suit = suits[Math.floor(Math.random() * suits.length)];
    return { number, suit };
}

function displayCards() {
    const card1 = document.getElementById("card1");
    const card2 = document.getElementById("card2");
    const card3 = document.getElementById("card3");

    // First card is the last round's second card
    if (lastCard) {
        card1.textContent = lastCard.number + lastCard.suit;
    } else {
        const initialCard = generateCard();
        card1.textContent = initialCard.number + initialCard.suit;
        lastCard = initialCard;
    }

    // Second card: Random new card
    const newCard = generateCard();
    card2.textContent = newCard.number + newCard.suit;
    lastCard = newCard;

    // Third card: Hidden
    card3.textContent = "?";
}

function changeBet(amount) {
    bet = amount;
    document.getElementById("bet").textContent = bet;
}

function makeGuess(type) {
    const resultText = document.getElementById("result");
    const card3 = generateCard();

    const card3Element = document.getElementById("card3");
    card3Element.textContent = card3.number + card3.suit;

    let isCorrect = false;
    if (type === "High" && card3.number > lastCard.number) isCorrect = true;
    if (type === "Low" && card3.number < lastCard.number) isCorrect = true;
    if (type === "Red" && (card3.suit === "♥" || card3.suit === "♦")) isCorrect = true;
    if (type === "Black" && (card3.suit === "♠" || card3.suit === "♣")) isCorrect = true;

    if (isCorrect) {
        credit += bet;
        point += bet * 2;
        resultText.textContent = "Correct!";
        resultText.style.color = "green";
    } else {
        credit -= bet;
        resultText.textContent = "Wrong!";
        resultText.style.color = "red";
    }

    document.getElementById("credit").textContent = credit;
    document.getElementById("point").textContent = point;

    if (credit <= 0) {
        alert("Not enough credit!");
        credit = 0;
    }
}

function redeemRewards() {
    if (point >= 100) {
        point -= 100;
        credit += 50;
        document.getElementById("credit").textContent = credit;
        document.getElementById("point").textContent = point;
        alert("Redeemed 50 credits for 100 points!");
    } else {
        alert("Not enough points to redeem!");
    }
}

// Initial display
displayCards();
