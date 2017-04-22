var GameViewFPS = {
  frame: function()
  {
    GameView.renderModeUI()
    Canvas.strokeStyle = '#ffffff'
    Canvas.fillStyle = '#ffffff'
    Canvas.textAlign = 'right'
    Canvas.fillText(GameModel.stats.fps+" fps /"+ GameView.stats.fps + " fps", GameView.WINDOW_WIDTH-150, GameView.WINDOW_HEIGHT-5);
  }
}
