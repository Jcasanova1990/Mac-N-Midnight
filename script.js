document.addEventListener("DOMContentLoaded", function () {
  const playerName = "Mac";
  const playerInfo = document.getElementById("player-info");
  const playerNameElement = document.getElementById("player-name");
  const playerHpElement = document.getElementById("player-hp");
  const player = document.getElementById("player");

  playerNameElement.textContent = playerName;

  let playerX = 300;
  let playerY = 250;
  let playerHealth = 15;
  let heldDirection = null;
  let currentMap = 1;
  const enemyCount = 8;
  const bossCount = 1;
  let enemies = [];
  let bosses = [];
  const maxEnemyHits = 2;
  const maxBossHits = 10;

  const maps = {
      1: {
          width: 640,
          height: 360,
      },
      2: {
          width: 640,
          height: 360,
      },
      3: {
          width: 640,
          height: 360,
          barrierY: 1,
          barrierX: 1,
      },
  };

  const commonBoundaries = {
      width: 640,
      height: 360,
  };

  let lastAttackTime = 0;
  const attackCooldown = 1000; // 1000ms cooldown between attacks
  let isPlayerAttacking = false;

  function updatePlayerInfo() {
    // Update player HP in the UI
    playerHpElement.textContent = `HP: ${playerHealth}`;
}

  function createBoss() {
    if (currentMap === 3) {
        const boss = document.createElement("div");
        boss.classList.add("doodle", "boss");
        boss.style.backgroundColor = "#800080";
        document.getElementById("game-container").appendChild(boss);

        const maxX = maps[currentMap].width - 40;
        const maxY = maps[currentMap].height - 40;
        boss.style.left = Math.floor(Math.random() * maxX) + "px";
        boss.style.top = Math.floor(Math.random() * maxY) + "px";

        boss.hits = 0; // Track the number of hits
        boss.isHit = false; // Flag to track if the boss is hit

        bosses.push(boss);

        const attackInterval = setInterval(() => {
            bosses.forEach((boss) => {
                if (currentMap === 3) {
                    attackEnemy(boss);
                }
            });
        }, 2000);

        // Set up an interval to periodically check and remove the boss
        const checkBossInterval = setInterval(() => {
          if (boss.hits >= maxBossHits) {
            clearInterval(attackInterval);
            clearInterval(checkBossInterval);
            boss.remove();
            const index = bosses.indexOf(boss);
            if (index !== -1) {
                bosses.splice(index, 1);
                console.log("Defeated boss:", boss);
        
                // Additional actions upon defeating the boss
                // Trigger some event, display a message, etc.
                displayVictoryMessage();
            }
        }
        }, 100); // Adjust the interval duration as needed
    }
}

  function updateBosses() {
      bosses.forEach((boss) => {
          const bossX = parseInt(boss.style.left);
          const bossY = parseInt(boss.style.top);

          const angle = Math.atan2(playerY - bossY, playerX - bossX);
          const speed = 2;
          const deltaX = speed * Math.cos(angle);
          const deltaY = speed * Math.sin(angle);

          const newX = Math.max(0, Math.min(bossX + deltaX, maps[currentMap].width - 40));
          const newY = Math.max(0, Math.min(bossY + deltaY, maps[currentMap].height - 40));

          boss.style.left = newX + "px";
          boss.style.top = newY + "px";

          // Handle multiple attacks on bosses
          if (isPlayerCloseToEnemy(boss) && isPlayerAttacking) {
              attackEnemy(boss);
          }
      });
  }

  function attackEnemy(enemy) {
    if (!enemy.isHit) {
        enemy.style.backgroundColor = "#f00";
        setTimeout(() => {
            enemy.style.backgroundColor = "#ff0";
        }, 1500);

        console.log("enemy Attacked!");

        enemy.hits = (enemy.hits || 0) + 1;
        enemy.isHit = true; // Mark the enemy as hit

        const maxHits = enemy.classList.contains("boss") ? maxBossHits : maxEnemyHits;

        if (enemy.hits >= maxHits) {
            enemy.remove();
            const index = enemy.classList.contains("boss") ? bosses.indexOf(enemy) : enemies.indexOf(enemy);
            if (index !== -1) {
                if (enemy.classList.contains("boss")) {
                    bosses.splice(index, 1);
                    console.log("Defeated boss:", enemy);
                    // Optionally, you can trigger additional actions or events upon defeating the boss.
                } else {
                    enemies.splice(index, 1);
                    console.log("Defeated enemy:", enemy);
                }
            }
        }
    }
}

function resetGame() {
  // Add logic to reset the game state, such as restoring player health, clearing enemies, etc.
  playerHealth = 15;
  makeMapEnemies(currentMap); // Reset enemies
}

  function clearEnemy() {
      const enemiesToRemove = document.querySelectorAll(".doodle.enemy");
      enemiesToRemove.forEach((enemy) => {
          enemy.remove();
          const index = enemies.indexOf(enemy);
          if (index !== -1) {
              enemies.splice(index, 1);
          }
      });
  }

  function createEnemy() {
      const enemy = document.createElement("div");
      enemy.classList.add("doodle", "enemy");
      enemy.hits = 0; // Track the number of hits
      enemy.isHit = false; // Flag to track if the enemy is hit
      document.getElementById("game-container").appendChild(enemy);

      const maxX = maps[currentMap].width - 40;
      const maxY = maps[currentMap].height - 40;
      enemy.style.left = Math.floor(Math.random() * maxX) + "px";
      enemy.style.top = Math.floor(Math.random() * maxY) + "px";

      enemies.push(enemy);
  }

  function updateEnemies() {
      enemies.forEach((enemy) => {
          const enemyX = parseInt(enemy.style.left);
          const enemyY = parseInt(enemy.style.top);

          // Only attack if the player is close to the enemy and attacking
          if (isPlayerCloseToEnemy(enemy) && isPlayerAttacking) {
              attackEnemy(enemy);
          } else {
              const angle = Math.atan2(playerY - enemyY, playerX - enemyX);
              const speed = 2;
              const deltaX = speed * Math.cos(angle);
              const deltaY = speed * Math.sin(angle);

              const newX = Math.max(0, Math.min(enemyX + deltaX, maps[currentMap].width - 40));
              const newY = Math.max(0, Math.min(enemyY + deltaY, maps[currentMap].height - 40));

              enemy.style.left = newX + "px";
              enemy.style.top = newY + "px";

              // Reset the hit status for the next attack
              enemy.isHit = false;
          }
      });
  }

  function attack() {
    const currentTime = Date.now();

    if (currentTime - lastAttackTime >= attackCooldown) {
        player.style.backgroundColor = "#f00";
        setTimeout(() => {
            player.style.backgroundColor = "#00f";
            isPlayerAttacking = false; // Reset the attack status
        }, 200);

        console.log("Player attacked enemies!");

        lastAttackTime = currentTime;
        isPlayerAttacking = true; // Set the attack status

        // Decrease player health with each attack
        playerHealth--;

        // Check if player has run out of health
        if (playerHealth <= 0) {
            // Game over logic (e.g., display a message, reset the game, etc.)
            console.log("Game over!");
            resetGame(); // Create a function to reset the game state
        }

        // Iterate through enemies and bosses and handle a single attack
        [...enemies, ...bosses].forEach((enemy) => {
            if (isPlayerCloseToEnemy(enemy)) {
                attackEnemy(enemy);
            }
        });
    }
}

  function block() {
      player.style.backgroundColor = "#0f0";
      setTimeout(() => {
          player.style.backgroundColor = "#00f";
      }, 300);

      console.log("Player blocked!");
  }

  function updatePlayerPosition() {
      player.style.left = playerX + "px";
      player.style.top = playerY + "px";
  }

  function handleKeyPress(e) {
      switch (e.key) {
          case "ArrowUp":
          case "ArrowDown":
          case "ArrowLeft":
          case "ArrowRight":
              heldDirection = e.key;
              break;
          case " ":
              attack();
              break;
          case "b":
              block();
              break;
      }
  }

  function handleKeyRelease(e) {
      if (e.key === heldDirection) {
          heldDirection = null;
      }
  }

  function isPlayerCloseToEnemy(enemy) {
      const playerDistance = Math.hypot(playerX - parseInt(enemy.style.left), playerY - parseInt(enemy.style.top));
      return playerDistance < 50;
  }

  function movePlayer() {
      const speed = 5;

      switch (heldDirection) {
          case "ArrowUp":
              playerY -= speed;

              if (playerY < 0 && currentMap === 1) {
                  currentMap = 2;
                  makeMapEnemies(currentMap);
                  playerY = maps[currentMap].height - 40;
              } else if (playerY < 0 && currentMap === 2) {
                  currentMap = 3;
                  makeMapEnemies(currentMap);

                  playerY = maps[currentMap].height - 40;
              }

              if (currentMap === 3 && playerY < maps[3].barrierY) {
                  playerY = maps[3].barrierY;
              }
              break;
          case "ArrowDown":
              playerY += speed;

              if (playerY > commonBoundaries.height - 40) {
                  playerY = commonBoundaries.height - 40;
              }
              break;
          case "ArrowLeft":
              playerX -= speed;

              if (playerX < 0) {
                  playerX = 0;
              }
              break;
          case "ArrowRight":
              playerX += speed;

              if (playerX > commonBoundaries.width - 40) {
                  playerX = commonBoundaries.width - 40;
              }
              break;
      }

      updatePlayerPosition();
  }

  function gameLoop() {
      movePlayer();
      updateEnemies();
      updateBosses();
      updatePlayerInfo();
      requestAnimationFrame(gameLoop);
      if (currentMap === 3 && bosses.length === 0) {
          createBoss();
      }
  }

  function makeMapEnemies(currentMap) {
      clearEnemy();

      if (currentMap === 1) {
          for (let i = 0; i < Math.min(enemyCount, 3); i++) {
              createEnemy();
          }
      }

      if (currentMap === 2) {
          for (let i = 0; i < Math.min(enemyCount, 5); i++) {
              createEnemy();
          }
      }

      if (currentMap === 3) {
          createBoss();
      }
  }

  makeMapEnemies(1);

  gameLoop();
  updatePlayerPosition();

  document.addEventListener("keydown", handleKeyPress);
  document.addEventListener("keyup", handleKeyRelease);
});
