function Character(name, health, attackPower) {
  this.name = name;
  this.health = health;
  this.attackPower = attackPower;
}

var person = new Character("Kevin", 10, 5);
var opponent = new Character("Dragon", 25, 3);

var turnCount = 1;
var personTotalHealth = person.health;
var opponentTotalHealth = opponent.health;

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
  if(random <= .01) {
    // crit
    return true;
  }
  else {
    // no crit
    return false;
  }
}

var usePotion = function(value) {
  if(person.health == personTotalHealth) {
    renderLog.innerHTML += ("<br />You are already at full health<br />");
    scrollToBottom();
  }
  else {
    var healValue = 3;
    var getPotion = document.getElementsByClassName("potion");
    renderLog.innerHTML += ("<br />You use a potion<br />");
    scrollToBottom();

    if(value == 1) {
      getPotion[0].classList.add("gray");
      // increase health
      person.health += healValue;
      // don't go over the playerTotalHealth amount
      if(person.health >= personTotalHealth) {
        // find the overage difference
        var healValueDifference = person.health - personTotalHealth;
        healValue -= healValueDifference;
        person.health = personTotalHealth;
        renderPlayerHealth.innerHTML = person.health;
        // update log with how much was actually healed for
        renderLog.innerHTML += ("It heals for " + healValue + " health<br />");
        scrollToBottom();
      }
      else {
        renderPlayerHealth.innerHTML = person.health;
        renderLog.innerHTML += ("It heals for " + healValue + " health<br />");
        scrollToBottom();
      }
    }
    else if(value == 2) {
      getPotion[1].classList.add("gray");
      // increase health
      person.health += healValue;
      // don't go over the playerTotalHealth amount
      if(person.health >= personTotalHealth) {
        // find the overage difference
        var healValueDifference = person.health - personTotalHealth;
        healValue -= healValueDifference;
        person.health = personTotalHealth;
        renderPlayerHealth.innerHTML = person.health;
        // update log with how much was actually healed for
        renderLog.innerHTML += ("It heals for " + healValue + " health<br />");
        scrollToBottom();
      }
      else {
        renderPlayerHealth.innerHTML = person.health;
        renderLog.innerHTML += ("It heals for " + healValue + " health<br />");
        scrollToBottom();
      }
    }
    else if(value == 3) {
      getPotion[2].classList.add("gray");
      // increase health
      person.health += healValue;
      // don't go over the playerTotalHealth amount
      if(person.health >= personTotalHealth) {
        // find the overage difference
        var healValueDifference = person.health - personTotalHealth;
        healValue -= healValueDifference;
        person.health = personTotalHealth;
        renderPlayerHealth.innerHTML = person.health;
        // update log with how much was actually healed for
        renderLog.innerHTML += ("It heals for " + healValue + " health<br />");
        scrollToBottom();
      }
      else {
        renderPlayerHealth.innerHTML = person.health;
        renderLog.innerHTML += ("It heals for " + healValue + " health<br />");
        scrollToBottom();
      }
    }
  }
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

    if(playerAttack == 0) {
      renderLog.innerHTML += ("The enemy blocked!<br/>");
      scrollToBottom();
      enemyTurn();
    }
    else {
      var critAmount = critCheck();
      if(critAmount) {
        renderLog.innerHTML += ("Crit!<br />");
        playerAttack *= 2;
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
      else if(opponent.health <= (opponentTotalHealth * .3)) {
        getEnemyHealthbar.classList.add("red");
        enemyTurn();
      }
      else if(opponent.health <= (opponentTotalHealth * .7)) {
        getEnemyHealthbar.classList.add("yellow");
        enemyTurn();
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
    if(enemyAttack == 0) {
      renderLog.innerHTML += ("You blocked!<br />");
      scrollToBottom();
    }
    else {
      var critAmount = critCheck();
      if(critAmount) {
        enemyAttack *= 2;
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
      else if(person.health <= (personTotalHealth * .3)) {
        getPlayerHealthbar.classList.add("red");
      }
      else if(person.health <= (personTotalHealth * .7)) {
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
