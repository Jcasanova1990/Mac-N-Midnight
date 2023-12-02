document.addEventListener("DOMContentLoaded", function () {
    const player = document.getElementById("player");
    let playerX = 300;
    let playerY = 250;
    let heldDirection = null;
    let currentMap = 1;
    const enemyCount = 3;
    const bossCount = 1;
    let enemies = [];
    let bosses = [];
  
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
  
    function createBoss() {
        if (currentMap === 3) { // Only create boss on map 3
            const boss = document.createElement("div");
            boss.classList.add("doodle", "boss")
            boss.style.backgroundColor = "#800080"; // Set initial color to purple
            document.getElementById("game-container").appendChild(boss);
            //add else state for enemies === 0 


            // Initialize boss position on map
            const maxX = maps[currentMap].width - 40;
            const maxY = maps[currentMap].height - 40;
            boss.style.left = Math.floor(Math.random() * maxX) + "px";
            boss.style.top = Math.floor(Math.random() * maxY) + "px";
    
            bosses.push(boss);
        }
    }
  
    function updateBosses() {
      bosses.forEach((boss) => {
        const bossX = parseInt(boss.style.left);
        const bossY = parseInt(boss.style.top);
        const playerDistance = Math.hypot(playerX - bossX, playerY - bossY);
  
        if (playerDistance < 50) {
          // If the boss is close to the player, simulate an attack
          attackEnemy(boss);
        } else {
          // Otherwise, move the boss towards the player
          const angle = Math.atan2(playerY - bossY, playerX - bossX);
          const speed = 2;
          const deltaX = speed * Math.cos(angle);
          const deltaY = speed * Math.sin(angle);
  
          // Ensure bosses stay within the boundaries of the current map
          const newX = Math.max(0, Math.min(bossX + deltaX, maps[currentMap].width - 40));
          const newY = Math.max(0, Math.min(bossY + deltaY, maps[currentMap].height - 40));
  
          boss.style.left = newX + "px";
          boss.style.top = newY + "px";
        }
      });
    }

    function attackEnemy(boss) {
        // Change color to red during an attack
        boss.style.backgroundColor = "#f00"; // Change color to red
        setTimeout(() => {
            // Reset color after a short delay
            boss.style.backgroundColor = "#800080"; // Change color back to purple
        }, 200); // Adjust the delay (in milliseconds) as needed
    
        console.log("Boss attacked player!");
    }
    
    // clear func
    function clearEnemy() {
     const enemies = document.querySelectorAll(".doodle")
     console.log(enemies)

    //  loop over enemy arr remove element from dom everytime .remove()*************************************************************
    }
    


    function createEnemy() {
      const enemy = document.createElement("div");
      enemy.classList.add("doodle", "enemy")
      document.getElementById("game-container").appendChild(enemy);
  
      // Initialize enemy position on map
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
  
      console.log("Enemy attacked player!");
    }
  
    function updatePlayerPosition() {
      player.style.left = playerX + "px";
      player.style.top = playerY + "px";
    }
  
    // player movement, attack, and block
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
  
      console.log("Player attacked enemies!");
    }
  
    function movePlayer() {
      const speed = 5;
  
      switch (heldDirection) {
        case "ArrowUp":
          playerY -= speed;
  
          if (playerY < 0 && currentMap === 1) {
            currentMap = 2;
            makeMapEnemies(currentMap)
            playerY = maps[currentMap].height - 40;
          } else if (playerY < 0 && currentMap === 2) {
            currentMap = 3;
            makeMapEnemies(currentMap)

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
      requestAnimationFrame(gameLoop);
      if (currentMap === 3 && bosses.length === 0) {
        createBoss();
    }
    }
  
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("keyup", handleKeyRelease);
  
    // Create enemies on map 1 && 2
   

    // call this func before 
    function makeMapEnemies(currentMap){
        if (currentMap === 1 || currentMap === 2) { 
            clearEnemy()
            for (let i = 0; i < enemyCount; i++) {
                createEnemy();
            }
            
        }
        // per map clear it 
        
        // Create boss on map 3
        if (currentMap === 3) {clearEnemy()
            for (let i = 0; i < bossCount; i++) {createBoss();
            }
            
        }
    } 
    makeMapEnemies(1)
  
  
    gameLoop();
    updatePlayerPosition();
  });
  