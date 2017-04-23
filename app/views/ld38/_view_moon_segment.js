var GameViewMoonSegment = {
  colors: {
    MOUSE_DOWN:               '#ff33ff',
    MOUSE_HOVER:              '#ffff66',
    SELECTED:                 '#7777ff',
    STANDARD:                 '#66ff66',
    TURRETED:                 'rgba(0, 0, 0, 0.5)',
    VIEWCONE:                 'rgba(255, 255, 255, 0.1)',
    VIEWCONE_BORDER:          'rgba(255, 255, 255, 0.3)',
    SELECTED_VIEWCONE:        'rgba(119, 119, 255, 0.3)',
    SELECTED_VIEWCONE_BORDER: 'rgba(119, 119, 255, 1)',
    DETECTED_VIEWCONE:        'rgba(255, 255, 102, 0.3)',
    DETECTED_VIEWCONE_BORDER: 'rgba(255, 255, 102, 1)'
  },

  frame: function() {
  },
  render: function(segment) {
    this.renderTurretViewCone(segment);
    this.renderMainSegment(segment);
    this.checkHover(segment);
    this.checkMouseDown(segment);
    this.colorMainSegment(segment);
    this.renderTurretSegment(segment);
  },

  colorMainSegment(segment) {
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

  renderMainSegment: function(segment) {
    GameView.renderModeWorld();
    Canvas.moveTo(segment.moon.positionX, segment.moon.positionY)
    Canvas.beginPath();
    Canvas.arc(
      segment.moon.positionX,
      segment.moon.positionY,
      segment.sizeOffset(),
      segment.segmentStartAngle(),
      segment.segmentEndAngle())
    Canvas.lineTo(segment.moon.positionX, segment.moon.positionY)
    Canvas.closePath();
  },
  renderTurretSegment: function(segment) {
    if(segment.turret) {
      Canvas.moveTo(segment.moon.positionX, segment.moon.positionY)
      Canvas.beginPath();
      Canvas.arc(
        segment.moon.positionX,
        segment.moon.positionY,
        segment.sizeOffset(),
        segment.segmentStartAngle(),
        segment.segmentEndAngle())
      Canvas.lineTo(segment.moon.positionX, segment.moon.positionY)
      Canvas.closePath();
      Canvas.fillStyle = this.colors.TURRETED;
      Canvas.fill();
    }
  },
  renderTurretViewCone: function(segment) {
    //
    var selected  = (segment == GameControllerMouse.selectedEntity)
    var show      = GameState.showAllViewCones || selected


    if(segment.turret) {
      var turret    = segment.turret;
      var targeting = turret.validTargets.length > 0
      Canvas.moveTo(segment.moon.positionX, segment.moon.positionY)
      Canvas.beginPath();
      Canvas.arc(
        segment.positionX,
        segment.positionY,
        turret.viewConeSize(),
        turret.viewConeStartAngle(),
        turret.viewConeEndAngle())
      Canvas.lineTo(segment.moon.positionX, segment.moon.positionY)

      Canvas.lineWidth = 8;

      if(show && targeting) {
        Canvas.fillStyle = this.colors.DETECTED_VIEWCONE;
        Canvas.strokeStyle = this.colors.DETECTED_VIEWCONE_BORDER;
      } else if(selected) {
        Canvas.fillStyle = this.colors.SELECTED_VIEWCONE;
        Canvas.strokeStyle = this.colors.SELECTED_VIEWCONE_BORDER;
      } else if(show) {
        Canvas.fillStyle = this.colors.VIEWCONE;
        Canvas.strokeStyle = this.colors.VIEWCONE_BORDER;
      }


      Canvas.closePath();

      if(show) {
        Canvas.stroke();
        Canvas.fill();
      }
    }
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
