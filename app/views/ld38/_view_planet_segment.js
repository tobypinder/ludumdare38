var GameViewPlanetSegment = {
  colors: {
    DAMAGED:     '#ff6666',
    MOUSE_DOWN:  '#ff33ff',
    MOUSE_HOVER: '#ffff66',
    SELECTED:    '#7777ff',
    STANDARD:    '#66ff66'
  },

  frame: function() {
  },
  render: function(segment) {

    this.renderDamageSegment(segment);
    this.checkHover(segment);
    this.checkMouseDown(segment);
    this.renderMainSegment(segment);


    if(segment.mouseDown) {
      Canvas.strokeStyle = this.colors.MOUSE_DOWN
      Canvas.fillStyle   = this.colors.MOUSE_DOWN
    } else if(segment.mouseHover) {
      Canvas.strokeStyle = this.colors.MOUSE_HOVER
      Canvas.fillStyle   = this.colors.MOUSE_HOVER
    } else if(segment === GameControllerMouse.selectedEntity) {
      Canvas.strokeStyle = this.colors.SELECTED
      Canvas.fillStyle   = this.colors.SELECTED
    } else {
      Canvas.strokeStyle = this.colors.STANDARD
      Canvas.fillStyle   = this.colors.STANDARD
    }
    Canvas.fill();
  },

  renderMainSegment(segment) {
    GameView.renderModeWorld();
    Canvas.beginPath();
    Canvas.moveTo(GameModelPlanet.positionX, GameModelPlanet.positionY)
    Canvas.arc(
      segment.planet.positionX,
      segment.planet.positionY,
      segment.sizeOffset(),
      segment.planet.rotation + segment.radialOffset(),
      segment.planet.rotation + segment.radialOffset() + segment.radialSize());
    Canvas.lineTo(GameModelPlanet.positionX, GameModelPlanet.positionY)
    Canvas.closePath();


  },
  renderDamageSegment(segment) {
    GameView.renderModeWorld();
    Canvas.beginPath();
    Canvas.moveTo(GameModelPlanet.positionX, GameModelPlanet.positionY)
    Canvas.arc(
      segment.planet.positionX,
      segment.planet.positionY,
      segment.maxSizeOffset(),
      segment.planet.rotation + segment.radialOffset(),
      segment.planet.rotation + segment.radialOffset() + segment.radialSize());
    Canvas.lineTo(GameModelPlanet.positionX, GameModelPlanet.positionY)
    Canvas.closePath();

    Canvas.strokeStyle = this.colors.DAMAGED;
    Canvas.fillStyle   = this.colors.DAMAGED;
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
