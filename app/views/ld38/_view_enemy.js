var GameViewEnemy = {
  colors: {
    MOUSE_DOWN:  '#ff33ff',
    MOUSE_HOVER: '#ffff66',
    SELECTED:    '#7777ff',
    STANDARD:    '#ffffff'
  },
  shapes: {
    box: [
      {
        points: [
          [-1, -1],
          [-1,  1],
          [1,   1],
          [1,  -1]
        ],
        meta: {
          lineWidth: 4,
          rotationMultiplier: 8
        },
      },
      {
        points: [
          [-0.4, -0.4],
          [-0.4,  0.4],
          [0.4,   0.4],
          [0.4,  -0.4]
        ],
        meta: {
          lineWidth: 2,
          rotationMultiplier: 32
        }
      }
    ],
    tri: [
      {
        points: [
          [-1, -1],
          [0,   0],
          [1,  -1]
        ],
        meta: {
          lineWidth: 4,
          rotationMultiplier: -16
        },
      }
    ]
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
    Canvas.stroke();
  },

  renderEnemyBody(enemy) {
    GameView.renderModeWorld();
    Canvas.beginPath();
    Canvas.moveTo(enemy.positionX, enemy.positionY)

    var shapes =  GameViewEnemy.shapes[enemy.shape]
    for(var j=0; j<shapes.length; j++)
    {
      var plan   = shapes[j]
      var meta   = plan.meta;
      var points = plan.points;
      var p = [];

      Canvas.lineWidth = meta.lineWidth || 2
      for(var i=0; i<points.length; i++) {
        p.push(this.translatePoint(enemy, points[i], meta))
      }

      if(p.length > 0) {
        Canvas.moveTo(p[p.length-1][0], p[p.length-1][1])
        for(i=0; i<p.length; i++) {
          Canvas.lineTo(p[i][0], p[i][1])
        }
      }

      Canvas.closePath();
    }
    // Canvas.arc(
    //   enemy.positionX,
    //   enemy.positionY,
    //   enemy.radius,
    //   0,
    //   Util.Angle.FULL_PLANET);
    // Canvas.lineTo(enemy.positionX, enemy.positionY)
    // Canvas.closePath();

    //Canvas.strokeStyle = this.colors.STANDARD;
    //Canvas.fillStyle   = this.colors.STANDARD;
    //Canvas.fill();
  },
  translatePoint: function(enemy, point, meta) {
    if(!meta.rotationMultiplier) {
      meta.rotationMultiplier = 1
    }
    var ex  = enemy.positionX
    var ey  = enemy.positionY
    var rad = enemy.radius
    var rot = enemy.rotation * meta.rotationMultiplier
    var tx  = point[0]
    var ty  = point[1]

    return [
      ex + ((tx * Math.cos(rot) - ty * Math.sin(rot)) * rad),
      ey + ((tx * Math.sin(rot) + ty * Math.cos(rot)) * rad)
    ]
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
