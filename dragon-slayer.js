var turnCount = 1;
var playerHealth = 10;
var enemyHealth = 25;
var renderLog = document.getElementById("log");
var renderTurn = document.getElementById("turn");

var scrollToBottom = function() {
  return renderLog.scrollTop = renderLog.scrollHeight;
}

renderTurn.innerHTML = ("Turn number: " + turnCount + "<br />");

renderLog.innerHTML += ("Your health: " + playerHealth + "<br />");
renderLog.innerHTML += ("Enemy health: " + enemyHealth + "<br />");

var hitCheck = function() {
  return Math.floor(Math.random() * 2);
};

var attack = function(number) {
  // can be 0
  return Math.floor(Math.random() * number);
}

var playerTurn = function() {
  renderTurn.innerHTML = ("Turn number: " + turnCount++ + "<br />");
  scrollToBottom();

  if(hitCheck()) {
    var playerAttack = attack(5);

    if(playerAttack == 0) {
      renderLog.innerHTML += ("The enemy blocked!<br/>");
      scrollToBottom();
      enemyTurn();
    }
    else {
      renderLog.innerHTML += ("You hit your enemy and did " + playerAttack + " damage<br/>");
      scrollToBottom();

      enemyHealth -= playerAttack;
      if(enemyHealth < 0) {
        enemyHealth = 0;
      }
      renderLog.innerHTML += ("Your enemy now has: " + enemyHealth + " health<br />");
      scrollToBottom();
      enemyTurn();
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
      if(playerHealth < 0) {
        playerHealth = 0;
      }
      renderLog.innerHTML += ("You now have " + playerHealth + " health<br />");
      scrollToBottom();
    }

  }
  else {
    renderLog.innerHTML += ("The enemy missed you...<br />");
    scrollToBottom();
  }
};

/*while(playerHealth > 0 && enemyHealth > 0) {
  document.write("Turn number: " + turnCount++ + "<br />");
  document.write("Your health: " + playerHealth + "<br />");
  document.write("Enemy health: " + enemyHealth + "<br />");

  playerTurn();
  enemyTurn();

  document.write("<br />");
}

document.write("Your health: " + playerHealth + "<br />");
document.write("Enemy health: " + enemyHealth + "<br />");
*/
if(playerHealth == 0) {
  renderLog.innerHTML += ("You died...<br />");
  scrollToBottom();
  renderLog.innerHTML += ("The battle raged for " + (turnCount - 1) + " turns<br />");
  scrollToBottom();
}
else if(enemyHealth == 0) {
  renderLog.innerHTML += ("You won!<br />");
  scrollToBottom();
  renderLog.innerHTML += ("The battle raged for " + (turnCount - 1) + " turns<br />");
  scrollToBottom();
}
