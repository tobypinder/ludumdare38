var GameViewMouse = {
  frame: function()
  {
    GameView.renderModeUI()
    if(GameControllerMouse.unhandledMouseDown)
    {
      Canvas.strokeStyle = '#ff0000'
      Canvas.fillStyle = '#ff0000'
    } else {
      Canvas.strokeStyle = '#ff99ff'
      Canvas.fillStyle = '#ff99ff'
    }
    Canvas.textAlign = 'right'
    Canvas.beginPath();
    Canvas.arc(
      GameControllerMouse.mouseX,
      GameControllerMouse.mouseY,
      10,
      0,
      Util.Angle.FULL_PLANET
    );
    Canvas.fill();

    GameView.renderModeGame()
    if(GameControllerMouse.unhandledMouseDown)
    {
      Canvas.strokeStyle = '#0000ff'
      Canvas.fillStyle = '#0000ff'
    } else {
      Canvas.strokeStyle = '#99ffff'
      Canvas.fillStyle = '#99ffff'
    }
    Canvas.textAlign = 'right'
    Canvas.beginPath();
    Canvas.arc(
      GameControllerMouse.worldMouseX,
      GameControllerMouse.worldMouseY,
      10 / GameView.gameZoom(),
      0,
      Util.Angle.FULL_PLANET
    );
    Canvas.fill();
  }
}
