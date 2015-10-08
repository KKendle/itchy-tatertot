var turnCount = 1;
var playerHealth = 10;
var enemyHealth = 25;

var hitCheck = function() {
  return Math.floor(Math.random() * 2);
};

var attack = function(number) {
  // can be 0
  return Math.floor(Math.random() * number);
}

var playerTurn = function() {
  if(hitCheck()) {
    var playerAttack = attack(5);

    if(playerAttack == 0) {
      document.write("The enemy blocked!<br/>");
    }
    else {
      document.write("You hit your enemy and did " + playerAttack + " damage<br/>");
      enemyHealth -= playerAttack;
      if(enemyHealth < 0) {
        enemyHealth = 0;
      }
      document.write("Your enemy now has: " + enemyHealth + " health<br />");
    }

  }
  else {
    document.write("You missed...<br />");
  }
};

var enemyTurn = function() {
  if(hitCheck()) {
    var enemyAttack = attack(3);

    if(enemyAttack == 0) {
      document.write("You blocked!<br />");
    }
    else {
      document.write("The enemy hit you for " + enemyAttack + " damage<br />");
      playerHealth -= enemyAttack;
      if(playerHealth < 0) {
        playerHealth = 0;
      }
      document.write("You now have " + playerHealth + " health<br />");
    }

  }
  else {
    document.write("The enemy missed you...<br />");
  }
};

while(playerHealth > 0 && enemyHealth > 0) {
  document.write("Turn number: " + turnCount++ + "<br />");
  document.write("Your health: " + playerHealth + "<br />");
  document.write("Enemy health: " + enemyHealth + "<br />");

  playerTurn();
  enemyTurn();

  document.write("<br />");
}

document.write("Your health: " + playerHealth + "<br />");
document.write("Enemy health: " + enemyHealth + "<br />");
if(playerHealth == 0) {
  document.write("You died...<br />");
  document.write("The battle raged for " + (turnCount - 1) + " turns<br />");
}
else {
  document.write("You won!<br />");
  document.write("The battle raged for " + (turnCount - 1) + " turns<br />");
}
