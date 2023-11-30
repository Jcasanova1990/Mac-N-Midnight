document.addEventListener("DOMContentLoaded", function() {
  const player = document.getElementById("player");
  let playerX = 300;
  let playerY = 250;
  let heldDirection = null;
  let currentMap = 1;
  const enemyCount = 3;
  let enemies = [];

  const maps = {
      1: {
          width: 640,
          height: 360,
      },
      2: {
          width: 800,
          height: 480,
      },
      3: {
          width: 480,
          height: 240,
          barrierY: 80,
      },
  };

  const commonBoundaries = {
      width: 640,
      height: 360,
  };

  function createEnemy() {
      const enemy = document.createElement("div");
      enemy.className = "enemy";
      document.getElementById("game-container").appendChild(enemy);

      // Initialize enemy position randomly within the map
      const maxX = maps[currentMap].width - 40;
      const maxY = maps[currentMap].height - 40;
      enemy.style.left = Math.floor(Math.random() * maxX) + "px";
      enemy.style.top = Math.floor(Math.random() * maxY) + "px";

      enemies.push(enemy);
  }

  function updateEnemies() {
      enemies.forEach((enemy) => {
          // Simulate movement towards the player
          const enemyX = parseInt(enemy.style.left);
          const enemyY = parseInt(enemy.style.top);
          const playerDistance = Math.hypot(playerX - enemyX, playerY - enemyY);

          if (playerDistance < 50) {
              // If the enemy is close to the player, simulate an attack
              attackEnemy(enemy);
          } else {
              // Otherwise, move the enemy towards the player
              const angle = Math.atan2(playerY - enemyY, playerX - enemyX);
              const speed = 2;
              const deltaX = speed * Math.cos(angle);
              const deltaY = speed * Math.sin(angle);

              // Ensure enemies stay within the boundaries of the current map
              const newX = Math.max(0, Math.min(enemyX + deltaX, maps[currentMap].width - 40));
              const newY = Math.max(0, Math.min(enemyY + deltaY, maps[currentMap].height - 40));

              enemy.style.left = newX + "px";
              enemy.style.top = newY + "px";
          }
      });
  }

  function attackEnemy(enemy) {
      // For simplicity, let's change the color of the enemy to indicate an attack
      enemy.style.backgroundColor = "#f00"; // Change color to red
      setTimeout(() => {
          // Reset color after a short delay
          enemy.style.backgroundColor = "#ff0"; // Change color back to yellow
      }, 200); // Adjust the delay (in milliseconds) as needed
  }

  function updatePlayerPosition() {
      player.style.left = playerX + "px";
      player.style.top = playerY + "px";
  }

  function handleKeyPress(e) {
      switch(e.key) {
          case "ArrowUp":
          case "ArrowDown":
          case "ArrowLeft":
          case "ArrowRight":
              heldDirection = e.key;
              break;
          case " ":
              attack();
              break;
      }
  }

  function handleKeyRelease(e) {
      if (e.key === heldDirection) {
          heldDirection = null;
      }
  }

  function attack() {
      player.style.backgroundColor = "#f00";
      setTimeout(() => {
          player.style.backgroundColor = "#00f";
      }, 200);
  }

  function movePlayer() {
      const speed = 5;

      switch(heldDirection) {
          case "ArrowUp":
              playerY -= speed;

              if (playerY < 0 && currentMap === 1) {
                  currentMap = 2;
                  playerY = maps[currentMap].height - 40;
              } else if (playerY < 0 && currentMap === 2) {
                  currentMap = 3;
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
      requestAnimationFrame(gameLoop);
  }

  document.addEventListener("keydown", handleKeyPress);
  document.addEventListener("keyup", handleKeyRelease);

  // Create enemies at the start
  for (let i = 0; i < enemyCount; i++) {
      createEnemy();
  }

  gameLoop();
  updatePlayerPosition();
});
