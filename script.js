document.addEventListener("DOMContentLoaded", function () {
  const player = document.getElementById("player");
  let playerX = 300;
  let playerY = 250;
  let heldDirection = null;
  let currentMapIndex = 0;

  const maps = [
      [
          // Map 1
          "#########",
          "#       #",
          "#       #",
          "#       #",
          "#       #",
          "#########",
      ],
      [
          // Map 2
          "#########",
          "#       #",
          "#  ###  #",
          "#       #",
          "#       #",
          "#########",
      ],
      [
          // Map 3
          "#########",
          "#   #   #",
          "#   #   #",
          "#   #   #",
          "#   #   #",
          "#########",
      ],
  ];

  function buildMap() {
    const currentMap = maps[currentMapIndex];
    const mapContainer = document.getElementById("game-container");

    mapContainer.innerHTML = "";

    for (let row = 0; row < currentMap.length; row++) {
        for (let col = 0; col < currentMap[row].length; col++) {
            const tile = document.createElement("div");
            tile.className = "tile";
            tile.style.left = col * 40 + "px";
            tile.style.top = row * 40 + "px";

            if (currentMap[row][col] === "#") {
                tile.classList.add("obstacle");
            }

            mapContainer.appendChild(tile);
        }
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

  buildMap();
  
  function gameLoop() {
    movePlayer();
    requestAnimationFrame(gameLoop);
  }

  gameLoop();
  updatePlayerPosition();
});
