var turnCount = 1;
var playerHealthStart = 10;
var enemyHealthStart = 15;
var playerHealth = 10;
var enemyHealth = 15;

var renderLog = document.getElementById("log");
var renderTurn = document.getElementById("turn");
var renderPlayerHealth = document.getElementById("playerHealth");
var renderEnemyHealth = document.getElementById("enemyHealth");
var getPlayerHealthbar = document.getElementsByClassName("healthbar")[0];
var getEnemyHealthbar = document.getElementsByClassName("healthbar")[1];

var scrollToBottom = function() {
  return renderLog.scrollTop = renderLog.scrollHeight;
}

var playerLose = function() {
  renderLog.innerHTML += ("You died...<br />");
  scrollToBottom();
  renderLog.innerHTML += ("The battle raged for " + (turnCount - 1) + " turns<br />");
  scrollToBottom();
  document.getElementsByTagName("button")[0].disabled = true;
}

var playerWin = function() {
  renderLog.innerHTML += ("You won!<br />");
  scrollToBottom();
  renderLog.innerHTML += ("The battle raged for " + (turnCount - 1) + " turns<br />");
  scrollToBottom();
  document.getElementsByTagName("button")[0].disabled = true;
}

var checkGameOver = function() {
  if(playerHealth == 0) {
    playerLose();
  }
  else if(enemyHealth == 0) {
    playerWin();
  }
}

renderTurn.innerHTML = (turnCount++);

renderPlayerHealth.innerHTML = playerHealth;
renderEnemyHealth.innerHTML = enemyHealth;

var hitCheck = function() {
  return Math.floor(Math.random() * 2);
};

var attack = function(number) {
  // can be 0
  return Math.floor(Math.random() * number);
}

var playerTurn = function() {
  renderTurn.innerHTML = (turnCount++);
  scrollToBottom();

  renderLog.innerHTML += ("<br />");
  if(hitCheck()) {
    var playerAttack = attack(5);

    if(enemyHealth <= 12) {
      getEnemyHealthbar.classList.add("yellow");
    }
    if(enemyHealth <= 5) {
      getEnemyHealthbar.classList.add("red");
    }

    if(playerAttack == 0) {
      renderLog.innerHTML += ("The enemy blocked!<br/>");
      scrollToBottom();
      enemyTurn();
    }
    else {
      renderLog.innerHTML += ("You hit your enemy and did " + playerAttack + " damage<br/>");
      scrollToBottom();
      enemyHealth -= playerAttack;
      renderEnemyHealth.innerHTML = enemyHealth;

      if(enemyHealth <= 0) {
        enemyHealth = 0;
        renderEnemyHealth.innerHTML = enemyHealth;
        getEnemyHealthbar.classList.add("gray");
        playerWin();
      }
      else {
        enemyTurn();
      }
    }

  }
  else {
    renderLog.innerHTML += ("You missed...<br />");
    scrollToBottom();
    enemyTurn();
  }
};

var enemyTurn = function() {
  if(hitCheck()) {
    var enemyAttack = attack(3);

    if(enemyAttack == 0) {
      renderLog.innerHTML += ("You blocked!<br />");
      scrollToBottom();
    }
    else {
      renderLog.innerHTML += ("The enemy hit you for " + enemyAttack + " damage<br />");
      scrollToBottom();
      playerHealth -= enemyAttack;
      renderPlayerHealth.innerHTML = playerHealth;

      if(playerHealth <= 7) {
        getPlayerHealthbar.classList.add("yellow");
      }
      if(playerHealth <= 3) {
        getPlayerHealthbar.classList.add("red");
      }

      if(playerHealth <= 0) {
        playerHealth = 0;
        renderPlayerHealth.innerHTML = playerHealth;
        getPlayerHealthbar.classList.add("gray");
        playerLose();
      }
      else {
        scrollToBottom();
      }
    }

  }
  else {
    renderLog.innerHTML += ("The enemy missed you...<br />");
    scrollToBottom();
  }
};
