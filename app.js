/* eslint-env browser */
/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var currScore, totalScore, activePlayer;

currScore = [0, 0];
totalScore = 0;
activePlayer = 0;

document.querySelector('#current-0').textContent = 0;
document.querySelector('#score-0').textContent = 0;
document.querySelector('#current-1').textContent = 0;
document.querySelector('#score-1').textContent = 0;

document.querySelector('.dice').style.display = 'none';

function nextPlayer() {
    totalScore = 0;
    document.querySelector('#current-' + activePlayer).textContent = 0;
    
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    
    activePlayer = activePlayer ? 0 : 1;
    
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-roll').addEventListener('click', function () {
    
    var diceValue, diceImage;
    diceValue = Math.ceil(Math.random() * 6);
    
    diceImage = document.querySelector('.dice');
    diceImage.style.display = 'block';
    diceImage.src = 'dice-' + diceValue + '.png';
    
    if (diceValue !== 1) {
        totalScore += diceValue;
    
        document.querySelector('#current-' + activePlayer).textContent = totalScore;
        
    } else {
        nextPlayer();
    }
    
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    
    currScore[activePlayer] += totalScore;
    
    document.querySelector('#score-' + activePlayer).textContent = currScore[activePlayer];
    
    if (currScore[activePlayer] >= 10) {
        document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        
        document.querySelector('.dice').style.display = 'none';
        
        document.querySelector('.btn-roll').disabled = true;
        document.querySelector('.btn-hold').disabled = true;
    } else {
        nextPlayer();
    }
    
});