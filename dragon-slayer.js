function Character(name, health, attackPower) {
  this.name = name;
  this.health = health;
  this.attackPower = attackPower;
}

var person = new Character("Kevin", 10, 5);
var opponent = new Character("Dragon", 25, 3);

var turnCount = 1;

var renderLog = document.getElementById("log");
var renderTurn = document.getElementById("turn");
var renderPlayerName = document.getElementById("playerName");
var renderEnemyName = document.getElementById("enemyName");
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

var potionCheck = function(character) {
  // check if {{ character passed in }} gets a potion
  var random = Math.random();
  if(random <= .05) {
    // small potion, 3 health
    return character.health += 3;
  }
  else {
    // no potion
    return 0;
  }
}

var hitCheck = function() {
  // may also add in dodge, parry, and separate block and miss.
  var hit = Math.random();
  if(hit <= .01) {
    // miss
    return false;
  }
  else {
    // hit
    return true;
  }
};

var attack = function(number) {
  // remove block functionality and put elsewhere
  // probably under hit check
  // can be 0
  return Math.floor(Math.random() * number);
};

var critCheck = function() {
  var random = Math.random();
  console.log("checking for crit");
  if(random <= .01) {
    console.log("crit");
    return true;
  }
  else {
    console.log("no crit");
    return false;
  }
}

var usePotion = function(value) {
  var getPotion = document.getElementsByClassName("potion");
  if(value == 1) {
    getPotion[0].classList.add("gray");
    person.health += 3;
    renderPlayerHealth.innerHTML = person.health;
  }
  else if(value == 2) {
    getPotion[1].classList.add("gray");
    person.health += 3;
    renderPlayerHealth.innerHTML = person.health;
  }
  else if(value == 3) {
    getPotion[2].classList.add("gray");
    person.health += 3;
    renderPlayerHealth.innerHTML = person.health;
  }
  return true;
};



renderTurn.innerHTML = (turnCount++);
renderPlayerName.innerHTML = person.name;
renderEnemyName.innerHTML = opponent.name;
renderPlayerHealth.innerHTML = person.health;
renderEnemyHealth.innerHTML = opponent.health;

var playerTurn = function() {
  renderTurn.innerHTML = (turnCount++);
  scrollToBottom();

  renderLog.innerHTML += ("<br />");
  if(hitCheck()) {
    var playerAttack = attack(person.attackPower);
    console.log("player attack " + playerAttack);

    if(playerAttack == 0) {
      renderLog.innerHTML += ("The enemy blocked!<br/>");
      scrollToBottom();
      enemyTurn();
    }
    else {
      var critAmount = critCheck();
      console.log("crit return val " + critAmount);
      if(critAmount) {
        console.log("same attack val " + playerAttack);
        playerAttack *= 2;
        console.log("crit total damage " + playerAttack);
        renderLog.innerHTML += ("Crit!<br />");
        renderLog.innerHTML += ("You hit your enemy and did " + playerAttack + " damage<br/>");
      }
      else {
        renderLog.innerHTML += ("You hit your enemy and did " + playerAttack + " damage<br/>");
      }
      scrollToBottom();
      opponent.health -= playerAttack;
      renderEnemyHealth.innerHTML = opponent.health;

      if(opponent.health <= 0) {
        opponent.health = 0;
        renderEnemyHealth.innerHTML = opponent.health;
        getEnemyHealthbar.classList.add("gray");
        playerWin();
      }
      else if(opponent.health <= 5) {
        getEnemyHealthbar.classList.add("red");
      }
      if(opponent.health <= 12) {
        getEnemyHealthbar.classList.add("yellow");
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
    // potion check only on hit
    var potion = potionCheck(opponent);
    if(potion > 0) {
      renderEnemyHealth.innerHTML = opponent.health;
    }

    var enemyAttack = attack(opponent.attackPower);
    console.log("enemy attack " + enemyAttack);
    if(enemyAttack == 0) {
      renderLog.innerHTML += ("You blocked!<br />");
      scrollToBottom();
    }
    else {
      var critAmount = critCheck();
      console.log("crit return val " + critAmount);
      if(critAmount) {
        console.log("same value " + enemyAttack);
        enemyAttack *= 2;
        console.log("crit total damage " + enemyAttack);
        renderLog.innerHTML += ("Crit!<br />");
        renderLog.innerHTML += ("The enemy hit you for " + enemyAttack + " damage<br/>");
      }
      else {
        renderLog.innerHTML += ("The enemy hit you for " + enemyAttack + " damage<br />");
      }
      scrollToBottom();
      person.health -= enemyAttack;
      renderPlayerHealth.innerHTML = person.health;

      if(person.health <= 0) {
        person.health = 0;
        renderPlayerHealth.innerHTML = person.health;
        getPlayerHealthbar.classList.add("gray");
        playerLose();
      }
      else if(person.health <= 3) {
        getPlayerHealthbar.classList.add("red");
      }
      else if(person.health <= 7) {
        getPlayerHealthbar.classList.add("yellow");
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
