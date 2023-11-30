document.addEventListener("DOMContentLoaded", function () {
  const player = document.getElementById("player");
  let playerX = 300;
  let playerY = 250;
  let heldDirection = null;

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
        playerY -= Speed;
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