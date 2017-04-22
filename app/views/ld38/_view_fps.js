var GameViewFPS = {
  frame: function()
  {
    GameView.renderModeUI()

    Canvas.strokeStyle = '#ffffff'
    Canvas.fillStyle = '#ffffff'
    Canvas.textAlign = 'right'
    Canvas.fillText(GameControllerMouse.mouseX + ", " + GameControllerMouse.mouseY, GameView.WINDOW_WIDTH-450, GameView.WINDOW_HEIGHT-35);

    Canvas.strokeStyle = '#ffffff'
    Canvas.fillStyle = '#ffffff'
    Canvas.textAlign = 'right'
    Canvas.fillText(GameControllerMouse.worldMouseX + ", " + GameControllerMouse.worldMouseY, GameView.WINDOW_WIDTH-450, GameView.WINDOW_HEIGHT-5);

    Canvas.strokeStyle = '#ffffff'
    Canvas.fillStyle = '#ffffff'
    Canvas.textAlign = 'right'
    Canvas.fillText(GameModel.stats.fps+" fps /"+ GameView.stats.fps + " fps", GameView.WINDOW_WIDTH-150, GameView.WINDOW_HEIGHT-5);
  }
}
