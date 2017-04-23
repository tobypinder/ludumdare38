var GameViewBullet = {
  colors: {
    MOUSE_DOWN:  '#ff33ff',
    MOUSE_HOVER: '#ffff66',
    SELECTED:    '#7777ff',
    STANDARD:    '#ffffff'
  },

  render: function(bullet) {
    this.renderBody(bullet);
    this.checkHover(bullet);
    this.checkMouseDown(bullet);

    if(bullet.mouseDown) {
      Canvas.strokeStyle = this.colors.MOUSE_DOWN
      Canvas.fillStyle   = this.colors.MOUSE_DOWN
    } else if(bullet.mouseHover) {
      Canvas.strokeStyle = this.colors.MOUSE_HOVER
      Canvas.fillStyle   = this.colors.MOUSE_HOVER
    } else if(bullet === GameControllerMouse.selectedEntity) {
      Canvas.strokeStyle = this.colors.SELECTED
      Canvas.fillStyle   = this.colors.SELECTED
    } else {
      Canvas.strokeStyle = this.colors.STANDARD
      Canvas.fillStyle   = this.colors.STANDARD
    }
    Canvas.fill();
  },

  renderBody(bullet) {
    GameView.renderModeWorld();
    Canvas.beginPath();
    Canvas.moveTo(bullet.positionX, bullet.positionY)
    Canvas.arc(
      bullet.positionX,
      bullet.positionY,
      bullet.radius,
      0,
      Util.Angle.FULL_PLANET);
    Canvas.lineTo(bullet.positionX, bullet.positionY)
    Canvas.closePath();

    //Canvas.strokeStyle = this.colors.STANDARD;
    //Canvas.fillStyle   = this.colors.STANDARD;
    //Canvas.fill();
  },
  checkHover: function(bullet)
  {
    var hovering = Canvas.isPointInPath(
      GameControllerMouse.mouseX,
      GameControllerMouse.mouseY
    )

    if(hovering) {
      bullet.isFocused();
    } else {
      bullet.isUnfocused();
    }
  },
  checkMouseDown:function(bullet)
  {
    var mouseDown = Canvas.isPointInPath(
      GameControllerMouse.clickX,
      GameControllerMouse.clickY
    )

    if(mouseDown && GameControllerMouse.unhandledMouseDown) {
      // Handle the mouse down by selecting this bullet
      bullet.isSelected();
    } else if(!GameControllerMouse.mouseDown) {
      // If the mouse isn't physically down we can deselect the element.
      bullet.mouseDown = false;
    }
  }
}
