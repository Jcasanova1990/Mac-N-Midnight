// document.addEventListener("DOMContentLoaded", function() {
//   const player = document.getElementById("player");
//   let playerX = 300;
//   let playerY = 250;
//   let heldDirection = null;
//   let currentMap = 1;

//   const maps = {
//       1: {
//           width: 640,
//           height: 360,
//       },
//       2: {
//           width: 800,
//           height: 480,
//       },
//       3: {
//           width: 480,
//           height: 240,
//           barrierY: 80, // Y-coordinate where the barrier is placed
//       },
//   };

//   const commonBoundaries = {
//       width: 640,
//       height: 360,
//   };

//   function updatePlayerPosition() {
//       player.style.left = playerX + "px";
//       player.style.top = playerY + "px";
//   }

//   function handleKeyPress(e) {
//       switch(e.key) {
//           case "ArrowUp":
//           case "ArrowDown":
//           case "ArrowLeft":
//           case "ArrowRight":
//               heldDirection = e.key;
//               break;
//       }
//   }

//   function handleKeyRelease(e) {
//       if (e.key === heldDirection) {
//           heldDirection = null;
//       }
//   }

//   function movePlayer() {
//       const speed = 5;

//       switch(heldDirection) {
//           case "ArrowUp":
//               playerY -= speed;

//               if (playerY < 0 && currentMap === 1) {
//                   // Switch to the second map
//                   currentMap = 2;
//                   playerY = maps[currentMap].height - 40;
//               } else if (playerY < 0 && currentMap === 2) {
//                   // Switch to the third map
//                   currentMap = 3;
//                   playerY = maps[currentMap].height - 40;
//               }

//               // Check if the player has entered map 3 and is above the barrier
//               if (currentMap === 3 && playerY < maps[3].barrierY) {
//                   playerY = maps[3].barrierY;
//               }
//               break;
//           case "ArrowDown":
//               playerY += speed;

//               // Check if the player is moving beyond the bottom of the map
//               if (playerY > commonBoundaries.height - 40) {
//                   playerY = commonBoundaries.height - 40;
//               }
//               break;
//           case "ArrowLeft":
//               playerX -= speed;

//               // Check if the player is moving beyond the left boundary
//               if (playerX < 0) {
//                   playerX = 0;
//               }
//               break;
//           case "ArrowRight":
//               playerX += speed;

//               // Check if the player is moving beyond the right boundary
//               if (playerX > commonBoundaries.width - 40) {
//                   playerX = commonBoundaries.width - 40;
//               }
//               break;
//       }

//       updatePlayerPosition();
//   }

//   document.addEventListener("keydown", handleKeyPress);
//   document.addEventListener("keyup", handleKeyRelease);

//   function gameLoop() {
//       movePlayer();
//       requestAnimationFrame(gameLoop);
//   }

//   gameLoop();
//   updatePlayerPosition();
// });

document.addEventListener("DOMContentLoaded", function() {
  const player = document.getElementById("player");
  const enemies = [];
  let playerX = 300;
  let playerY = 250;
  let heldDirection = null;
  let currentMap = 1;

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

  const attackCooldown = 60; // Cooldown frames for attacks
  let playerAttackCooldown = 0;
  let bossAttackCooldown = 0;

  function createEnemy(isBoss = false) {
      const enemy = document.createElement("div");
      enemy.className = isBoss ? "boss" : "enemy";
      document.getElementById("game-container").appendChild(enemy);
      return enemy;
  }

  function initializeEnemies(count) {
      for (let i = 0; i < count - 1; i++) {
          const enemy = createEnemy();
          enemies.push({
              element: enemy,
              x: Math.random() * (commonBoundaries.width - 40),
              y: Math.random() * (commonBoundaries.height - 40),
              directionX: 1,
              directionY: 1,
              attackCooldown: 0,
          });
      }

      // Create a boss (last enemy)
      const boss = createEnemy(true);
      enemies.push({
          element: boss,
          x: Math.random() * (commonBoundaries.width - 40),
          y: Math.random() * (commonBoundaries.height - 40),
          directionX: 1,
          directionY: 1,
          attackCooldown: 0,
      });
  }

  function updateEnemies() {
      enemies.forEach(enemy => {
          // Simple enemy movement
          enemy.x += enemy.directionX;
          enemy.y += enemy.directionY;

          // Bounce off the walls
          if (enemy.x < 0 || enemy.x > commonBoundaries.width - 40) {
              enemy.directionX *= -1;
          }
          if (enemy.y < 0 || enemy.y > commonBoundaries.height - 40) {
              enemy.directionY *= -1;
          }

          // Update enemy position
          enemy.element.style.left = enemy.x + "px";
          enemy.element.style.top = enemy.y + "px";

          // Check for collision with the player
          if (
              playerX < enemy.x + 40 &&
              playerX + 40 > enemy.x &&
              playerY < enemy.y + 40 &&
              playerY + 40 > enemy.y
          ) {
              // Handle collision (you may want to reduce player health or take other actions)
              console.log("Player collided with an enemy!");
          }

          // Check for attack cooldown
          if (enemy.attackCooldown > 0) {
              enemy.attackCooldown--;
          } else {
              // Perform enemy attack (you can customize this based on your game design)
              performEnemyAttack(enemy);
              // Reset cooldown
              enemy.attackCooldown = attackCooldown;
          }
      });
  }

  function performEnemyAttack(enemy) {
      // Basic attack logic (you can customize this based on your game design)
      console.log("Enemy attacked!");
  }

  function performBossAttack(boss) {
      // Basic boss attack logic (you can customize this based on your game design)
      console.log("Boss attacked!");
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
          case "Space": // Space key for player attack
              if (playerAttackCooldown === 0) {
                  performPlayerAttack();
                  playerAttackCooldown = attackCooldown;
              }
              break;
      }
  }

  function performPlayerAttack() {
      // Basic player attack logic (you can customize this based on your game design)
      console.log("Player attacked!");
  }

  function handleKeyRelease(e) {
      if (e.key === heldDirection) {
          heldDirection = null;
      }
  }

  function movePlayer() {
      const speed = 5;

      switch(heldDirection) {
          case "ArrowUp":
              playerY -= speed;
              break;
          case "ArrowDown":
              playerY += speed;
              break;
          case "ArrowLeft":
              playerX -= speed;
              break;
          case "ArrowRight":
              playerX += speed;
              break;
      }

      // Ensure the player stays within the boundaries of the current map
      playerX = Math.max(0, Math.min(playerX, maps[currentMap].width - 40));
      playerY = Math.max(0, Math.min(playerY, maps[currentMap].height - 40));

      // Update player position
      updatePlayerPosition();

      // Check for attack cooldown
      if (playerAttackCooldown > 0) {
          playerAttackCooldown--;
      }
  }

  function gameLoop() {
      movePlayer();
      updateEnemies();
      requestAnimationFrame(gameLoop);
  }

  document.addEventListener("keydown", handleKeyPress);
  document.addEventListener("keyup", handleKeyRelease);

  initializeEnemies(3); // 3 enemies on map 1

  function startGame() {
      gameLoop();
  }

  startGame();
});