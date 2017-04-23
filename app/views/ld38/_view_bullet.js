var GameViewBullet = {
  colors: {
    MOUSE_DOWN:  '255, 51, 255',
    MOUSE_HOVER: '255, 255, 102',
    SELECTED:    '119, 119, 255',
    STANDARD:    '255, 255, 255',
    HIT:         '255, 0, 0'
  },

  render: function(bullet) {
    this.renderBody(bullet);
    this.checkHover(bullet);
    this.checkMouseDown(bullet);

    if(bullet.destroyed) {
      Canvas.strokeStyle = "rgba(" + this.colors.HIT + ", " + this.transparency(bullet) + ')'
      Canvas.fillStyle   = "rgba(" + this.colors.HIT + ", " + this.transparency(bullet) + ')'
    }else if(bullet.mouseDown) {
      Canvas.strokeStyle = "rgba(" + this.colors.MOUSE_DOWN + ", " + this.transparency(bullet) + ')'
      Canvas.fillStyle   = "rgba(" + this.colors.MOUSE_DOWN + ", " + this.transparency(bullet) + ')'
    } else if(bullet.mouseHover) {
      Canvas.strokeStyle = "rgba(" + this.colors.MOUSE_HOVER + ", " + this.transparency(bullet) + ')'
      Canvas.fillStyle   = "rgba(" + this.colors.MOUSE_HOVER + ", " + this.transparency(bullet) + ')'
    } else if(bullet === GameControllerMouse.selectedEntity) {
      Canvas.strokeStyle = "rgba(" + this.colors.SELECTED + ", " + this.transparency(bullet) + ')'
      Canvas.fillStyle   = "rgba(" + this.colors.SELECTED + ", " + this.transparency(bullet) + ')'
    } else {
      Canvas.strokeStyle = "rgba(" + this.colors.STANDARD + ", " + this.transparency(bullet) + ')'
      Canvas.fillStyle   = "rgba(" + this.colors.STANDARD + ", " + this.transparency(bullet) + ')'
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
  },
  transparency:function(bullet){
    var ratio  = bullet.HP / bullet.maxHP
    ratio = (Math.sin(ratio * Math.PI * 0.5));
    ratio = (ratio * 0.9) + 0.1;
    return ratio
  }

}
