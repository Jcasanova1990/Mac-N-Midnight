document.addEventListener("DOMContentLoaded", function() {
  const player = document.getElementById("player");
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
              // Space key for player attack
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
      // For simplicity, let's change the color of the player to indicate an attack
      player.style.backgroundColor = "#f00"; // Change color to red
      setTimeout(() => {
          // Reset color after a short delay
          player.style.backgroundColor = "#00f"; // Change color back to blue
      }, 200); // Adjust the delay (in milliseconds) as needed
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

  document.addEventListener("keydown", handleKeyPress);
  document.addEventListener("keyup", handleKeyRelease);

  function gameLoop() {
      movePlayer();
      requestAnimationFrame(gameLoop);
  }

  gameLoop();
  updatePlayerPosition();
});
