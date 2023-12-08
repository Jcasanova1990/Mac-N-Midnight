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
            width: 1280,
            height: 720,
            barrierY: 1,
            barrierX: 1,
        },
        2: {
            width: 1280,
            height: 720,
            barrierY: 1,
            barrierX: 1,
        },
        3: {
            width: 1280,
            height: 720,
            barrierY: 1,
            barrierX: 1,
        },
    };

    const commonBoundaries = {
        width: 960,
        height: 700,
    };

    function createBoss() {
        if (currentMap === 3) {
            const boss = document.createElement("div");
            boss.classList.add("doodle", "boss");
            boss.style.backgroundColor = "#800080";
            document.getElementById("game-container").appendChild(boss);

            const bossNameElement = document.createElement("div");
            bossNameElement.classList.add("boss-name");
            bossNameElement.textContent = "Mega Doodle";
            boss.appendChild(bossNameElement);

            const bossHpElement = document.createElement("div");
            bossHpElement.classList.add("boss-hp");
            boss.appendChild(bossHpElement);

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
                        // Attack logic for boss (if needed)
                    }
                });
            }, 1000);

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

            // Check for collision with the player
            if (isPlayerCloseToEnemy(boss)) {
                handleCollision(boss);
            } else {
                // Move towards the player
                const angle = Math.atan2(playerY - bossY, playerX - bossX);
                const speed = 2;
                const deltaX = speed * Math.cos(angle);
                const deltaY = speed * Math.sin(angle);

                const newX = Math.max(0, Math.min(bossX + deltaX, maps[currentMap].width - 40));
                const newY = Math.max(0, Math.min(bossY + deltaY, maps[currentMap].height - 40));

                boss.style.left = newX + "px";
                boss.style.top = newY + "px";
                
                // updates boss hp on UI
                const bossHpElement = boss.querySelector(".boss-hp");
                bossHpElement.textContent = `HP: ${maxBossHits - boss.hits}`;

                // Reset the hit status for the next collision check
                boss.isHit = false;
            }
        });
    }

    function createEnemy() {
        const enemy = document.createElement("div");
        enemy.classList.add("doodle", "enemy");
        enemy.hits = 0; // Track the number of hits
        enemy.isHit = false; // Flag to track if the enemy is hit
        document.getElementById("game-container").appendChild(enemy);

        const enemyNameElement = document.createElement("div");
        enemyNameElement.classList.add("enemy-name");
        enemyNameElement.textContent = "Doodle";
        enemy.appendChild(enemyNameElement);

    
        const enemyHpElement = document.createElement("div");
        enemyHpElement.classList.add("enemy-hp");
        enemy.appendChild(enemyHpElement);

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

            // Check for collision with the player
            if (isPlayerCloseToEnemy(enemy)) {
                handleCollision(enemy);
            } else {
                // Move towards the player
                const angle = Math.atan2(playerY - enemyY, playerX - enemyX);
                const speed = 2;
                const deltaX = speed * Math.cos(angle);
                const deltaY = speed * Math.sin(angle);

                const newX = Math.max(0, Math.min(enemyX + deltaX, maps[currentMap].width - 40));
                const newY = Math.max(0, Math.min(enemyY + deltaY, maps[currentMap].height - 40));

                enemy.style.left = newX + "px";
                enemy.style.top = newY + "px";

                // updates enemy hp and UI
                const enemyHpElement = enemy.querySelector(".enemy-hp");
                enemyHpElement.textContent = `HP: ${maxEnemyHits - enemy.hits}`;

                // Reset the hit status for the next collision check
                enemy.isHit = false;
            }
        });
    }

    function handleCollision(enemy) {
        if (!enemy.isHit && !isPlayerBlocking) {
            // Only decrease player health if the enemy successfully collides and player is not blocking
            playerHealth--;
    
            // Check if player has run out of health
            if (playerHealth <= 0) {
                // Game over 
                console.log("Game over!");
                resetGame(); // Create a function to reset the game state
            }
    
            // Mark the enemy as hit to prevent continuous damage
            enemy.isHit = true;
    
            // Log the type of attack based on the enemy class
            if (enemy.classList.contains("boss")) {
                console.log("Boss attacked!");
            } else {
                console.log("Enemy attacked!");
            }
        }
    }
    

    function displayVictoryMessage() {
        const victoryMessageElement = document.getElementById("victory-message");
        victoryMessageElement.textContent = "Congratulations! You defeated the boss! Thank you for playing the Pre-Alpha Demo. Please Refresh browser if you would like to play again!";
        victoryMessageElement.style.display = "block";

        // resetting the game after a delay
        setTimeout(() => {
            victoryMessageElement.style.display = "none";
        }, 990000); // Adjust the delay as needed
    }

    function updatePlayerInfo() {
        // Update player HP in the UI
        playerHpElement.textContent = `HP: ${playerHealth}`;
    }

    let lastAttackTime = 0;
    const attackCooldown = 1000; // 1000ms cooldown between attacks
    let isPlayerAttacking = false;

    function isPlayerCloseToEnemy(enemy) {
        const playerDistance = Math.hypot(playerX - parseInt(enemy.style.left), playerY - parseInt(enemy.style.top));
        return playerDistance < 50;
    }

    function setPlayerSprite(direction, isAttacking) {  
        let spriteName = isAttacking ? `attack_${direction}_sprite.png` : `${direction}_sprite.png`;
    
        // Clear all existing direction classes
        player.classList.remove("up", "down", "left", "right", "neutral", "attack_up", "attack_down", "attack_left", "attack_right");
    
        if (isAttacking) {
            player.classList.add(`attack_${direction}`);
        } else {
            player.classList.add(direction);
        }
    
        switch (direction) {
            case "up":
                player.style.backgroundImage = `/media/oni/300gb0/school_work/software_classwork/unit1/Mac-N-Midnight/Mac-N-Midnight/player_sprites/move_up_sprite.png')`;
                break;
            case "down":
                player.style.backgroundImage = `url('/media/oni/300gb0/school_work/software_classwork/unit1/Mac-N-Midnight/Mac-N-Midnight/player_sprites/move_down_sprite.png')`;
                break;
            case "left":
                player.style.backgroundImage = `/media/oni/300gb0/school_work/software_classwork/unit1/Mac-N-Midnight/Mac-N-Midnight/player_sprites/move_left_sprite.png')`;
                break;
            case "right":
                player.style.backgroundImage = `/media/oni/300gb0/school_work/software_classwork/unit1/Mac-N-Midnight/Mac-N-Midnight/player_sprites/move_right_sprite.png')`;
                break;
            default:
                player.style.backgroundImage = `url('/media/oni/300gb0/school_work/software_classwork/unit1/Mac-N-Midnight/Mac-N-Midnight/player_sprites/move_neutral_sprite.png')`;
        }
    }



    function attack() {
        const currentTime = Date.now();
    
        if (currentTime - lastAttackTime >= attackCooldown) {
    
            console.log("Player attacked enemies!");
    
            lastAttackTime = currentTime;
    
            isPlayerAttacking = true;
    
            // Get the center coordinates of the player
            const playerCenterX = playerX + player.offsetWidth / 2;
            const playerCenterY = playerY + player.offsetHeight / 2;
    
            // Increase the player's size during the attack
            player.style.width = '120px';
            player.style.height = '120px';
    
            // Change the player's background image during the attack
            player.style.backgroundImage = 'url("/media/oni/300gb0/school_work/software_classwork/unit1/Mac-N-Midnight/Mac-N-Midnight/player_sprites/player_neutral_atk.png")';
    
            // Add the attack animation class to the player element
            player.classList.add("attack-animation");
    
            // Reset the size, reset the background image, remove the animation class, and remove the attack animation class after a delay
            setTimeout(() => {
                isPlayerAttacking = false;
                player.style.width = '60px';
                player.style.height = '60px';
                player.style.backgroundImage = 'url("/media/oni/300gb0/school_work/software_classwork/unit1/Mac-N-Midnight/Mac-N-Midnight/player_sprites/move_neutral_sprite.png")';
                player.classList.remove("attack-animation");
            }, 200);
    
            // Iterate through enemies and bosses and handle a single attack
            [...enemies, ...bosses].forEach((enemy) => {
                // Get the center coordinates of the enemy
                const enemyCenterX = parseInt(enemy.style.left) + enemy.offsetWidth / 2;
                const enemyCenterY = parseInt(enemy.style.top) + enemy.offsetHeight / 2;
    
                // Calculate the distance between the player's and enemy's centers
                const playerDistance = Math.hypot(playerCenterX - enemyCenterX, playerCenterY - enemyCenterY);
                console.log(`Player distance to enemy: ${playerDistance}`);
    
                if (playerDistance < 120) { // Changes the value to the desired attack range
    
                    console.log("Hit Landed!");
    
                    // Update the enemy's hit information
                    enemy.hits = (enemy.hits || 0) + 1;
    
                    const maxHits = enemy.classList.contains("boss") ? maxBossHits : maxEnemyHits;
    
                    // Check if the enemy is defeated
                    if (enemy.hits >= maxHits) {
                        const index = enemy.classList.contains("boss") ? bosses.indexOf(enemy) : enemies.indexOf(enemy);
                        if (index !== -1) {
                            if (enemy.classList.contains("boss")) {
                                bosses.splice(index, 1);
                                console.log("Defeated boss:", enemy);
    
                                // Additional actions upon defeating the boss
                                // Trigger some event, display a message, etc.
                                displayVictoryMessage();
                            } else {
                                enemies.splice(index, 1);
                                console.log("Defeated enemy:", enemy);
                            }
    
                            // Remove the enemy from the DOM
                            enemy.remove();
                        }
                    }
                }
            });
        }
    }
    
    

    
    
    let isPlayerBlocking = false;

    const blockSpriteUrl = "/media/oni/300gb0/school_work/software_classwork/unit1/Mac-N-Midnight/Mac-N-Midnight/player_sprites/blk.png";

    function block() {
        if (!isPlayerBlocking) {
            isPlayerBlocking = true;
    
            player.style.backgroundImage = `url(${blockSpriteUrl})`;
    
            setTimeout(() => {
                // Reset the player sprite after blocking
                setPlayerSprite(heldDirection, false);
                isPlayerBlocking = false; // Reset the block status
            }, 1200);
    
            console.log("Player blocked!");
    
            // The block lasts for 1200ms (1.2 seconds)
            setTimeout(() => {
                isPlayerBlocking = false;
            }, 1200);
        }
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
    function updatePlayerPosition() {
        player.style.left = playerX + "px";
        player.style.top = playerY + "px";
      
        // Remove all direction classes
        player.classList.remove("up", "down", "left", "right");
      
        // Add the appropriate direction class based on the movement
        if (heldDirection) {
          player.classList.add(heldDirection);
        }
      }
    function gameLoop() {
        movePlayer();
        updateEnemies();
        updateBosses();
        updatePlayerInfo();
        requestAnimationFrame(gameLoop);
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
            for (let i = 0; i < Math.min(bossCount, 1); i++)
                createBoss();
        }
    }

    function clearEnemy() {
        const enemiesToRemove = document.querySelectorAll(".doodle.enemy", ".doodle.boss");
        enemiesToRemove.forEach((enemy) => {
            enemy.remove();
            const index = enemies.indexOf(enemy);
            if (index !== -1) {
                enemies.splice(index, 1);
            }
        });
    }

    makeMapEnemies(1);
    gameLoop();
    updatePlayerPosition();

    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("keyup", handleKeyRelease);
});