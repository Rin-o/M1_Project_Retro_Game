class Game {
    constructor() {
      this.startScreen = document.getElementById("game-intro");
      this.gameScreen = document.getElementById("game-screen");
      this.gameEndScreen = document.getElementById("gameOver");
      this.player = new Player(
        this.gameScreen,
        200,
        500,
        100,
        150,
        "./Images/basket_8bit.png"
      );
      //this.height = 500;
      //this.width = 500;
      //this.score = 0;
      //this.lives = 3;
      //this.gameIsOver = false;
    }

start() {
      // Set the height and width of the game screen
      this.gameScreen.style.height = `${this.height}px`;
      this.gameScreen.style.width = `${this.width}px`;
  
      // Hide the start screen
      this.startScreen.style.display = "none";
      
      // Show the game screen
      this.gameScreen.style.display = "block";
  
      // Start the game loop
      this.gameLoop();
    }

    gameLoop() {
        console.log("in the game loop");
    
        // Interrupt the function to stop the loop if "gameIsOver" is set to "true"
        if (this.gameIsOver) {
          return;
        }
    
        this.update();
    
        window.requestAnimationFrame(() => this.gameLoop());
      }
    
      update() {
        console.log("in the update");
      }
    }

    window.onload = function () {
      const startButton = document.getElementById("start-button");
      const restartButton = document.getElementById("restart-button");
    
      startButton.addEventListener("click", function () {
        startGame();
      });
    
      function startGame() {
        console.log("start game");
      }
    };