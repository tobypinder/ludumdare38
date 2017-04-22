var GameViewPlanet = {
  ctx:   null,
  frame: function()
  {
    GameView.renderModeWorld();
    Canvas.strokeStyle = '#ffffff'
    Canvas.fillStyle = '#ffffff'
    Canvas.textAlign = 'right'
    Canvas.beginPath();
    Canvas.arc(
      GameModelPlanet.positionX,
      GameModelPlanet.positionY,
      GameModelPlanet.radius,
      GameModelPlanet.rotation,
      GameModelPlanet.rotation + Util.Angle.FULL_PLANET);
    Canvas.fill();


    // Take the line out unless mouseovered
    Canvas.beginPath();
    Canvas.moveTo(GameModelPlanet.positionX, GameModelPlanet.positionY)
    Canvas.arc(
      GameModelPlanet.positionX,
      GameModelPlanet.positionY,
      GameModelPlanet.radius + 10,
      GameModelPlanet.rotation,
      GameModelPlanet.rotation + (Util.Angle.FULL_PLANET / 16));
    Canvas.lineTo(GameModelPlanet.positionX, GameModelPlanet.positionY)
    Canvas.closePath();

    var inSegment = Canvas.isPointInPath(GameControllerMouse.mouseX, GameControllerMouse.mouseY)
    if(inSegment) {
      Canvas.strokeStyle = '#ffff66'
      Canvas.fillStyle   = '#ffff66'
    } else {
      Canvas.strokeStyle = '#66ff66'
      Canvas.fillStyle   = '#66ff66'
    }
    Canvas.fill();

    $.each(GameModelPlanet.moons, this.renderMoon.bind(this))
  },

  renderMoon: function(index, moon)
  {
    GameViewMoon.render(moon)
  }

}
