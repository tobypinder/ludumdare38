var GameViewMoonSegment = {
  colors: {
    MOUSE_DOWN:  '#ff33ff',
    MOUSE_HOVER: '#ffff66',
    SELECTED:    '#7777ff',
    STANDARD:    '#66ff66'
  },

  frame: function() {
  },
  render: function(segment) {

    this.renderMainSegment(segment);
    this.checkHover(segment);
    this.checkMouseDown(segment);

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
    Canvas.moveTo(segment.moon.positionX, segment.moon.positionY)
    Canvas.beginPath();
    Canvas.arc(
      segment.moon.positionX,
      segment.moon.positionY,
      segment.sizeOffset(),
      segment.moon.rotation + segment.radialOffset(),
      segment.moon.rotation + segment.radialOffset() + segment.radialSize());
    Canvas.lineTo(segment.moon.positionX, segment.moon.positionY)
    Canvas.closePath();
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
