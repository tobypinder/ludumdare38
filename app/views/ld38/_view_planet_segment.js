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
    Canvas.lineTo(GameModelPlanet.positionX, GameModelPlanet.positionY)
    Canvas.closePath();

    this.checkHover(segment);
    this.checkMouseDown(segment);

    if(segment.mouseDown) {
      Canvas.strokeStyle = '#ff7777'
      Canvas.fillStyle   = '#ff7777'
    } else if(segment.mouseHover) {
      Canvas.strokeStyle = '#ffff66'
      Canvas.fillStyle   = '#ffff66'
    } else if(segment === GameControllerMouse.selectedEntity) {
      Canvas.strokeStyle = '#7777ff'
      Canvas.fillStyle   = '#7777ff'
    } else {
      Canvas.strokeStyle = '#66ff66'
      Canvas.fillStyle   = '#66ff66'
    }
    Canvas.fill();
  },
  checkHover: function(segment)
  {
    var hovering = Canvas.isPointInPath(
      GameControllerMouse.mouseX,
      GameControllerMouse.mouseY
    )

    if(hovering) {
      segment.isFocused();
    } else {
      segment.isUnfocused();
    }
  },
  checkMouseDown:function(segment)
  {
    var mouseDown = Canvas.isPointInPath(
      GameControllerMouse.clickX,
      GameControllerMouse.clickY
    )

    if(mouseDown && GameControllerMouse.unhandledMouseDown) {
      // Handle the mouse down by selecting this segment
      segment.isSelected();
    } else if(!GameControllerMouse.mouseDown){
      // If the mouse isn't physically down we can deselect the element.
      segment.mouseDown = false;
    }
  }
}
