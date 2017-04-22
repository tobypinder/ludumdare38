var GameViewPlanetSegment = {
  frame: function() {

  },
  render: function(segment) {
    GameView.renderModeWorld();
    // Take the line out unless mouseovered
    Canvas.beginPath();
    Canvas.moveTo(GameModelPlanet.positionX, GameModelPlanet.positionY)
    Canvas.arc(
      segment.planet.positionX,
      segment.planet.positionY,
      segment.planet.radius   + segment.sizeOffset(),
      segment.planet.rotation + segment.radialOffset(),
      segment.planet.rotation + segment.radialOffset() + segment.radialSize());

    console.log(
      segment.planet.positionX,
      segment.planet.positionY,
      segment.planet.radius   + segment.sizeOffset(),
      segment.planet.rotation + segment.radialOffset(),
      segment.planet.rotation + segment.radialOffset() + segment.radialSize()
    )
    Canvas.lineTo(GameModelPlanet.positionX, GameModelPlanet.positionY)
    Canvas.closePath();

    var inSegment = Canvas.isPointInPath(GameControllerMouse.mouseX, GameControllerMouse.mouseY)
    if(inSegment) {
      segment.mouseHover = true;
      Canvas.strokeStyle = '#ffff66'
      Canvas.fillStyle   = '#ffff66'
    } else {
      segment.mouseHover = false;
      Canvas.strokeStyle = '#66ff66'
      Canvas.fillStyle   = '#66ff66'
    }
    Canvas.fill();
  },
}
