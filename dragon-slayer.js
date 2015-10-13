function Character(name, health, attackPower) {
  this.name = name;
  this.health = health;
  this.attackPower = attackPower;
}

var person = new Character("Kevin", 10, 5);
var opponent = new Character("Dragon", 15, 3);

var turnCount = 1;

var renderLog = document.getElementById("log");
var renderTurn = document.getElementById("turn");
var renderPlayerHealth = document.getElementById("playerHealth");
var renderEnemyHealth = document.getElementById("enemyHealth");
var getPlayerHealthbar = document.getElementsByClassName("healthbar")[0];
var getEnemyHealthbar = document.getElementsByClassName("healthbar")[1];

var scrollToBottom = function() {
  return renderLog.scrollTop = renderLog.scrollHeight;
};

var playerLose = function() {
  renderLog.innerHTML += ("You died...<br />");
  scrollToBottom();
  renderLog.innerHTML += ("The battle raged for " + (turnCount - 1) + " turns<br />");
  scrollToBottom();
  document.getElementsByTagName("button")[0].disabled = true;
};

var playerWin = function() {
  renderLog.innerHTML += ("You won!<br />");
  scrollToBottom();
  renderLog.innerHTML += ("The battle raged for " + (turnCount - 1) + " turns<br />");
  scrollToBottom();
  document.getElementsByTagName("button")[0].disabled = true;
};

var checkGameOver = function() {
  if(person.health == 0) {
    playerLose();
  }
  else if(opponent.health == 0) {
    playerWin();
  }
};

var hitCheck = function() {
  return Math.floor(Math.random() * 2);
};

var attack = function(number) {
  // can be 0
  return Math.floor(Math.random() * number);
}

renderTurn.innerHTML = (turnCount++);
renderPlayerHealth.innerHTML = person.health;
renderEnemyHealth.innerHTML = opponent.health;


var playerTurn = function() {
  renderTurn.innerHTML = (turnCount++);
  scrollToBottom();

  renderLog.innerHTML += ("<br />");
  if(hitCheck()) {
    var playerAttack = attack(person.attackPower);

    if(opponent.health <= 12) {
      getEnemyHealthbar.classList.add("yellow");
    }
    if(opponent.health <= 5) {
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
      opponent.health -= playerAttack;
      renderEnemyHealth.innerHTML = opponent.health;

      if(opponent.health <= 0) {
        opponent.health = 0;
        renderEnemyHealth.innerHTML = opponent.health;
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
    var enemyAttack = attack(opponent.attackPower);

    if(enemyAttack == 0) {
      renderLog.innerHTML += ("You blocked!<br />");
      scrollToBottom();
    }
    else {
      renderLog.innerHTML += ("The enemy hit you for " + enemyAttack + " damage<br />");
      scrollToBottom();
      person.health -= enemyAttack;
      renderPlayerHealth.innerHTML = person.health;

      if(person.health <= 7) {
        getPlayerHealthbar.classList.add("yellow");
      }
      if(person.health <= 3) {
        getPlayerHealthbar.classList.add("red");
      }

      if(person.health <= 0) {
        person.health = 0;
        renderPlayerHealth.innerHTML = person.health;
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
