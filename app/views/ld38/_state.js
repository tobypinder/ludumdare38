var GameState = {
  state: 'init',
  showAllViewCones: false,
  gameTime: 0,
  wave: 0,
  load:function(token)
  {
    this.state = 'ingame';
    $('.game-area').html("<canvas id=\"game\" width=\"800\" height=\"600\"></canvas>")
    GameController.init();
  },
  advanceTime:function(ms) {
    if(this.state== 'ingame') {
      this.gameTime += ms
      if((this.wave * 30000 + 10000) <= this.gameTime) {
        this.addWave(this.wave + 1);
      }
    }
  },
  addWave:function(number){
    var enemies = 10 + Math.floor(Math.random() * Math.pow(number, 1.8))
    GameViewUI.addHint("Wave "+ number +" started!   "+ enemies +" enemies detected")
    for(var i=0; i<enemies; i++){
      GameModelWorld.addEnemy();
    }
    this.wave = number;
  },
  exitGame: function() {
    this.state = 'quit';
    $('.game-area').html('<h2>You lasted '+Math.floor(this.gameTime)+" seconds! (Wave #" + this.wave + ")</h2><h3>Refresh to play again.")
  }

}
