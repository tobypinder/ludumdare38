var GameViewFPS = {
  frame: function(ctx)
  {
    GameView.renderModeUI()
    ctx.strokeStyle = '#ffffff'
    ctx.fillStyle = '#ffffff'
    ctx.textAlign = 'right'
    ctx.fillText(GameModel.stats.fps+" fps /"+ GameView.stats.fps + " fps", GameView.WINDOW_WIDTH-150, GameView.WINDOW_HEIGHT-5);
  }
}
