let credit = 200;
let bet = 10;
let point = 100;

function updateStats() {
  document.getElementById('credit').textContent = credit;
  document.getElementById('bet').textContent = bet;
  document.getElementById('point').textContent = point;
}

function changeBet(amount) {
  bet = amount;
  updateStats();
}

function makeGuess(guess) {
  if (credit < bet) {
    alert('Not enough credit!');
    return;
  }

  const card1 = Math.floor(Math.random() * 13) + 1;
  const card2 = Math.floor(Math.random() * 13) + 1;
  const card3 = Math.floor(Math.random() * 13) + 1;

  const result = guess === 'High' ? card3 > card2 : guess === 'Low' ? card3 < card2 : null;

  document.getElementById('card1').textContent = card1;
  document.getElementById('card2').textContent = card2;
  document.getElementById('card3').textContent = card3;

  if (result) {
    credit += bet;
    point += 10;
    document.getElementById('message').textContent = 'Correct!';
  } else {
    credit -= bet;
    document.getElementById('message').textContent = 'Wrong!';
  }

  updateStats();
}

function redeemRewards() {
  const reward = prompt(`Choose a reward:
1. 200 Points: +200 Balance
2. 1000 Points: Welcome Bonus 60%
3. 3000 Points: Free 8.88`);

  if (reward === '1' && point >= 200) {
    credit += 200;
    point -= 200;
  } else if (reward === '2' && point >= 1000) {
    credit += Math.floor(credit * 0.6);
    point -= 1000;
  } else if (reward === '3' && point >= 3000) {
    alert('You received Free 8.88!');
    point -= 3000;
  } else {
    alert('Not enough points for this reward!');
  }

  updateStats();
}

updateStats();
