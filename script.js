window.addEventListener('load',()=>{
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");

  function startGame() {
    console.log('start game');
    //document.getElementById ('game-intro').style.diplay = 'none'
    //document.getElementById ('game-screen').style.diplay = 'block'
    const game = new Game ()
    game.start()
  }

  startButton.addEventListener('click', function () {
    startGame();
  });
})