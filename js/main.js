(function() {
  'use strict';

  var pairs = 4;
  var cards = [];

  var flipCount = 0;
  var firstCard = null;
  var secondCard = null;

  var startTime;

  function init() {
    var i;
    var card;
    for (i = 1; i <= pairs; i++) {
      cards.push(createCard(i));
      cards.push(createCard(i));
      // document.getElementById('stage').appendChild(createCard(i));
      // document.getElementById('stage').appendChild(createCard(i));
    }
    while (cards.length) {
      card = cards.splice(Math.floor(Math.random() * cards.length), 1)[0];
      document.getElementById('stage').appendChild(card);
    }
  }

  function createCard(num) {
    var container;
    var card;
    var inner;
    inner = '<div class="card-front">' + num + '</div><div class="card-back">?</div>';
    card = document.createElement('div');
    card.innerHTML = inner;
    card.className = 'card';
    card.addEventListener('click', function() {
      flipCard(this);
      startTime = Date.now();
      runTimer();
    });
    container = document.createElement('div');
    container.className = 'card-container';
    container.appendChild(card);
    return container;
  }

  function flipCard(card) {
    if (firstCard !== null && secondCard !== null) {
      return;
    }
    card.className = 'card open';
    flipCount++;
    if (flipCount % 2 === 1) {
      firstCard = card;
    } else {
      secondCard = card;
      secondCard.addEventListener('transitionend', check);
    }
  }

  function check() {
    if (firstCard.children[0].textContent !== secondCard.children[0].textContent) {
      firstCard.className = 'card';
      secondCard.className = 'card';
    }
    secondCard.removeEventListener('transitionend', check);
    firstCard = null;
    secondCard = null;
  }

  function runTimer() {
    document.getElementById('score').textContent = ((Date.now() - startTime) / 1000).toFixed(2);
    setTimeout(function() {
      runTimer();
    }, 10);
  }

  init();
})();
