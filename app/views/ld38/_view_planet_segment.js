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
    } else {
      segment.mouseHover = false;
    }

    var inSegment = Canvas.isPointInPath(GameControllerMouse.clickX, GameControllerMouse.clickY)
    if(inSegment && GameControllerMouse.unhandledMouseDown) {
      // Handle the mouse down by selecting this segment
      GameControllerMouse.unhandledMouseDown = false
      segment.mouseDown = true;
    } else if(!GameControllerMouse.mouseDown){
      // If the mouse isn't physically down we can deselect the element.
      segment.mouseDown = false;
    }

    if(segment.mouseDown) {
      Canvas.strokeStyle = '#ff7777'
      Canvas.fillStyle   = '#ff7777'
    } else if(segment.mouseHover) {
      Canvas.strokeStyle = '#ffff66'
      Canvas.fillStyle   = '#ffff66'
    } else {
      Canvas.strokeStyle = '#66ff66'
      Canvas.fillStyle   = '#66ff66'
    }


    Canvas.fill();
  },
}
