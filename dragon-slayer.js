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
      console.log("The enemy blocked!");
    }
    else {
      console.log("You hit your enemy and did " + playerAttack + " damage");
      enemyHealth -= playerAttack;
      if(enemyHealth < 0) {
        enemyHealth = 0;
      }
      console.log("Your enemy now has: " + enemyHealth + " health");
    }

  }
  else {
    console.log("You missed...");
  }
};

var enemyTurn = function() {
  if(hitCheck()) {
    var enemyAttack = attack(3);

    if(enemyAttack == 0) {
      console.log("You blocked!");
    }
    else {
      console.log("The enemy hit you for " + enemyAttack + " damage");
      playerHealth -= enemyAttack;
      if(playerHealth < 0) {
        playerHealth = 0;
      }
      console.log("You now have " + playerHealth + " health");
    }

  }
  else {
    console.log("The enemy missed you...");
  }
};

while(playerHealth > 0 && enemyHealth > 0) {
  console.log("Turn number: " + turnCount++);
  console.log("Your health: " + playerHealth);
  console.log("Enemy health: " + enemyHealth);

  playerTurn();
  enemyTurn();

  console.log(" ");
}

console.log("Your health: " + playerHealth);
console.log("Enemy health: " + enemyHealth);
if(playerHealth == 0) {
  console.log("You died...");
  console.log("The battle raged for " + (turnCount - 1) + " turns");
}
else {
  console.log("You won!");
  console.log("The battle raged for " + (turnCount - 1) + " turns");
}
