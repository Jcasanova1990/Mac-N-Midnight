<!-- psuedo code -->
<!-- <!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Legend of Zelda Game</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <style>
    body {
      margin: 0;
      overflow: hidden;
    }

    #game {
      width: 800px;
      height: 600px;
      margin: 50px auto;
      position: relative;
      background-color: #87ceeb; /* Sky Blue */
    }

    #player {
      width: 50px;
      height: 50px;
      background-color: #8b4513; /* Saddle Brown */
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  </style>

  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Legend of Zelda Game</title>
      <link rel="stylesheet" href="styles.css" />
      <style>
        body {
          margin: 0;
          overflow: hidden;
        }

        #game {
          width: 800px;
          height: 600px;
          margin: 50px auto;
          position: relative;
          background-color: #87ceeb; /* Sky Blue */
        }

        #player {
          width: 50px;
          height: 50px;
          background-color: #8b4513; /* Saddle Brown */
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      </style>

      <script defer>
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
      </script>
    </head>
    <body>
      <div id="game">
        <div id="player"></div>
      </div>
    </body>
  </html> -->
  <!--type of game -->
  <!-- tmnt vertical beat em up with souls like elements
  
  -power up/items to use 3 -enemys undead
noodle ppl -add boss -proceed to next area -add buildings/decor -add minimap
-clcik through tutorial -add character animation change when using attacks and items
as well as enemy attacks -add sounds and music -leave area and end game display
message that displays demo end thank you for playing - add score modifier for
each enemy and add timer for each level - add dodge key press - add hp and
stamina- allow stamina to be affected by attacks and dodge -make random items drop from enemys and objects-make trashcans breakable and droip items -->
</html>
