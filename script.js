
document.addEventListener("DOMContentLoaded", function () {
    const player = document.getElementById("player");
    console.log(player.style.left, player.style.top);
    let attacking = false;

    document.addEventListener("keydown", function (event) {
      handleKeyPress(event.key);
    });

    document.addEventListener("keyup", function (event) {
      if (event.key === " ") {
        stopAttack();
      }
    });

    function handleKeyPress(key) {
      const stepSize = 10;

      switch (key) {
        case "ArrowUp":
          movePlayer(0, -stepSize);
          break;
        case "ArrowDown":
          movePlayer(0, stepSize);
          break;
        case "ArrowLeft":
          movePlayer(-stepSize, 0);
          break;
        case "ArrowRight":
          movePlayer(stepSize, 0);
          break;
        case " ":
          startAttack();
          break;
      }
    }

    function movePlayer(deltaX, deltaY) {
      const player = document.getElementById("player");
      const stepSize = 10;

      const currentLeft = parseInt(player.style.left) || 0;

      const currentTop = parseInt(player.style.top) || 0;
      console.log(player.style.left, player.style.top);
      const newLeft = currentLeft + deltaX;
      const newTop = currentTop + deltaY;

      // Set boundaries for left and right
      const maxWidth = document.getElementById("game").offsetWidth;
      const maxHeight = document.getElementById("game").offsetHeight;

      // Ensure the new position is within bounds
      const boundedLeft = Math.max(
        0,
        Math.min(newLeft, maxWidth - player.clientWidth),
      );
      const boundedTop = Math.max(
        0,
        Math.min(newTop, maxHeight - player.clientHeight),
      );

      player.style.left = `${boundedLeft}px`;
      player.style.top = `${boundedTop}px`;

      if (!attacking) {
        player.style.transform = "translate(-50%, -50%)"; // Reset transform for non-attack movement
      }
    }

    function startAttack() {
      attacking = true;
      player.style.transform = "translate(-50%, -50%) scale(1.5)"; // Example: Increase size for attack
    }

    function stopAttack() {
      attacking = false;
      player.style.transform = "translate(-50%, -50%)"; // Reset transform after attack
    }
  });