/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, previousRoll;

// initialize 
init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        
        // 2. Display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
        
        // Update score if both dice number isn't 1
        if (dice1 !== 1 && dice2 !== 1) {
            // Add score 
            roundScore += dice1 + dice2;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        }
        else {
            nextPlayer();
        }


        /*
        // check if you get two 6's in a row
        if (dice === 6 && previousRoll === 6) {
            roundScore = 0;
            scores[activePlayer] = 0;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        }
        // 3. Update the round score IF the rolled number is not 1
        else if (dice !== 1) {
            // Add score
            roundScore += dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        }
        else {
            // Next player
            nextPlayer();
        }
        // set previous roll
        previousRoll = dice;
        */
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // set final score of the game
        var input = document.querySelector('.final-score').value;
        var winningScore;
        if (input)
            winningScore = input;
        else
            winningScore = 100;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game 
        if (scores[activePlayer] >= winningScore) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('#dice-1').style.display = 'none';
            document.querySelector('#dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner'); 
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active'); 
            gamePlaying = false;
        }
        else {
            // Next Player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    previousRoll = 0;
    gamePlaying = true;

    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    previousRoll = 0;

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
}

//document.querySelector("#current-" + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//var x = document.querySelector('#score-0').textContent;


/*
3 CHALLENGES
change the game to follow these rules:

1. a player loses his entire score when he rolls two 6 in a row. After that it is
the next player's turn. 
2. add an input field to the HTML where players can set the winning score, so that 
they can change the predefined score of 100. (Hint: you can read that value with 
.value property in JavaScript.)
3. Add another dice to the game, so that there are two dices now. The player loses his 
current score when one of them is a 1. (Hint: you will need CSS to position the second
dice, so that a look at the CSS code for the first one.)

*/





