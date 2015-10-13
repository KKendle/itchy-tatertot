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

var potionCheck = function(character) {
  console.log("checking if using a potion");
  console.log("this character " + character.name + " is checking for potion");
  console.log(character.name + " has " + character.health + " left");
  var random = Math.random();
  console.log(random);
  if(random <= .05) {
    console.log("large potion");
    console.log("10");
    console.log(character.name + " has " + character.health + " health");
    console.log(character.name + " is healed for 10 health and now has " + (character.health + 10) + " health")
    return character.health += 10;
  }
  else if(random <= .08) {
    console.log("medium potion");
    console.log("7");
    console.log(character.name + " has " + character.health + " health");
    console.log(character.name + " is healed for 7 health and now has " + (character.health + 7) + " health")
    return character.health += 7;
  }
  else if(random <= .15) {
    console.log("small potion");
    console.log("3");
    console.log(character.name + " has " + character.health + " health");
    console.log(character.name + " is healed for 3 health and now has " + (character.health + 3) + " health")
    return character.health += 3;
  }
  else {
    console.log("no potion");
    return 0;
  }
}

var hitCheck = function() {
  // rewrite to raise hit rate.
  // may also add in dodge, parry, and separate block and miss.
  var hit = Math.random();
  if(hit <= .01) {
    console.log("miss");
    return false;
  }
  else {
    console.log("hit");
    return true;
  }
};

var attack = function(number) {
  // remove block functionality and put elsewhere
  // probably under hit check
  // can be 0
  return Math.floor(Math.random() * number);
}



renderTurn.innerHTML = (turnCount++);
renderPlayerHealth.innerHTML = person.health;
renderEnemyHealth.innerHTML = opponent.health;

var playerTurn = function() {
  renderTurn.innerHTML = (turnCount++);
  scrollToBottom();
  var potion = potionCheck(person);
  console.log("potion return of " + potion);
  if(potion > 0) {
    console.log("healing");
    renderPlayerHealth.innerHTML = person.health;
  }

  renderLog.innerHTML += ("<br />");
  if(hitCheck()) {
    console.log("player hit");
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
  var potion = potionCheck(opponent);
  console.log("potion return of " + potion);
  if(potion > 0) {
    console.log("healing");
    renderEnemyHealth.innerHTML = opponent.health;
  }

  if(hitCheck()) {
    console.log("enemy hit");
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
