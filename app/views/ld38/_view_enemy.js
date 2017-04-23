var GameViewEnemy = {
  colors: {
    MOUSE_DOWN:  '#ff33ff',
    MOUSE_HOVER: '#ffff66',
    SELECTED:    '#7777ff',
    STANDARD:    '#ffffff'
  },

  render: function(enemy) {
    this.renderEnemyBody(enemy);
    this.checkHover(enemy);
    this.checkMouseDown(enemy);

    if(enemy.mouseDown) {
      Canvas.strokeStyle = this.colors.MOUSE_DOWN
      Canvas.fillStyle   = this.colors.MOUSE_DOWN
    } else if(enemy.mouseHover) {
      Canvas.strokeStyle = this.colors.MOUSE_HOVER
      Canvas.fillStyle   = this.colors.MOUSE_HOVER
    } else if(enemy === GameControllerMouse.selectedEntity) {
      Canvas.strokeStyle = this.colors.SELECTED
      Canvas.fillStyle   = this.colors.SELECTED
    } else {
      Canvas.strokeStyle = this.colors.STANDARD
      Canvas.fillStyle   = this.colors.STANDARD
    }
    Canvas.fill();
  },

  renderEnemyBody(enemy) {
    GameView.renderModeWorld();
    Canvas.beginPath();
    Canvas.moveTo(enemy.positionX, enemy.positionY)
    Canvas.arc(
      enemy.positionX,
      enemy.positionY,
      enemy.radius,
      0,
      Util.Angle.FULL_PLANET);
    Canvas.lineTo(enemy.positionX, enemy.positionY)
    Canvas.closePath();

    //Canvas.strokeStyle = this.colors.STANDARD;
    //Canvas.fillStyle   = this.colors.STANDARD;
    //Canvas.fill();
  },
  checkHover: function(enemy)
  {
    var hovering = Canvas.isPointInPath(
      GameControllerMouse.mouseX,
      GameControllerMouse.mouseY
    )

    if(hovering) {
      enemy.isFocused();
    } else {
      enemy.isUnfocused();
    }
  },
  checkMouseDown:function(enemy)
  {
    var mouseDown = Canvas.isPointInPath(
      GameControllerMouse.clickX,
      GameControllerMouse.clickY
    )

    if(mouseDown && GameControllerMouse.unhandledMouseDown) {
      // Handle the mouse down by selecting this enemy
      enemy.isSelected();
    } else if(!GameControllerMouse.mouseDown) {
      // If the mouse isn't physically down we can deselect the element.
      enemy.mouseDown = false;
    }
  }
}
