var GameViewUI = {
  PANEL_WIDTH:   300,
  PANEL_PADDING: 5,
  TEXT_PADDING: 5,
  TEXT_HEIGHT: 20,
  COLOR_BLACK: '0, 0, 0',
  COLOR_WHITE: '255, 255, 255',
  COLOR_RED: '255, 0, 0',
  COLOR_GREEN: '0, 255, 0',
  COLOR_BLUE: '0, 0, 255',
  COLOR_CYAN: '0, 255, 255',
  hovering: false,
  panelHeight: 0,
  frame: function()
  {
    GameView.renderModeUI()
    Canvas.textBaseline = "bottom";
    Canvas.lineWidth = 1;
    if(GameControllerMouse.selectedEntity && GameControllerMouse.selectedEntity.name) {
      this.renderElementPanel(GameControllerMouse.selectedEntity);
    }
  },
  renderElementPanel: function(element) {
    this.panelHeight = this.PANEL_PADDING; // initial size
    Canvas.font      = Util.Font.Small;


    this.renderElementName(element);
    this.renderElementTurretName(element);
    this.renderElementHP(element);
    this.renderElementMP(element);
    this.renderElementPanelBorder(element);
  },
  renderElementPanelBorder:function(element){
    Canvas.fillStyle   = this.color(this.COLOR_BLACK)
    Canvas.strokeStyle = this.color(this.COLOR_WHITE)

    // add final paddingthis.panelHeight = this.PANEL_PADDING;
    this.panelHeight += this.PANEL_PADDING;

    Canvas.beginPath();
    Canvas.rect(GameView.WINDOW_WIDTH - this.PANEL_WIDTH - this.PANEL_PADDING, this.PANEL_PADDING, this.PANEL_WIDTH, this.panelHeight);
    this.hovering = Canvas.isPointInPath(GameControllerMouse.mouseX, GameControllerMouse.mouseY);
    Canvas.stroke();
  },
  renderElementName: function(element) {
    this.panelHeight +=  this.TEXT_HEIGHT
    Canvas.strokeStyle = this.color(this.COLOR_WHITE)
    Canvas.fillStyle = this.color(this.COLOR_WHITE)
    Canvas.textAlign = 'right'
    Canvas.fillText(element.name, GameView.WINDOW_WIDTH - this.PANEL_PADDING - this.TEXT_PADDING, this.panelHeight);
  },
  renderElementTurretName: function(element) {
    var name = null
    if(element.turret){
      name = element.turret.name;
    } else if (element.canPlaceTurret) {
      name = 'No Turret';
    }

    if(name)
    {
      this.panelHeight +=  this.TEXT_HEIGHT
      Canvas.strokeStyle = this.color(this.COLOR_WHITE)
      Canvas.fillStyle = this.color(this.COLOR_WHITE)
      Canvas.textAlign = 'right'
      Canvas.fillText(name, GameView.WINDOW_WIDTH - this.PANEL_PADDING - this.TEXT_PADDING, this.panelHeight);
    }
  },
  renderElementHP: function(element) {
    if(element.HP && element.maxHP)
    {
      var offsetX    = GameView.WINDOW_WIDTH - this.PANEL_WIDTH - this.PANEL_PADDING
      var offsetY    = this.panelHeight
      var width      = this.PANEL_WIDTH
      var height     = this.TEXT_HEIGHT / 2
      var greenWidth = width * (element.HP / element.maxHP)
      var redWidth   = width - greenWidth
      this.panelHeight += height

      //green
      Canvas.fillStyle   = this.color(this.COLOR_GREEN)
      Canvas.beginPath();
      Canvas.rect(offsetX, offsetY, greenWidth, height);
      Canvas.fill();
      Canvas.closePath();

      //red
      Canvas.fillStyle   = this.color(this.COLOR_RED)
      Canvas.beginPath();
      Canvas.rect(offsetX + greenWidth, offsetY, redWidth, height);
      Canvas.fill();
      Canvas.closePath();
    }
  },
  renderElementMP: function(element) {
    if(element.turret) {
      target = element.turret
    } else {
      target = element
    }

    if(target.fireRate && target.firingCooldown) {
      var offsetX       = GameView.WINDOW_WIDTH - this.PANEL_WIDTH - this.PANEL_PADDING
      var offsetY       = this.panelHeight
      var width         = this.PANEL_WIDTH
      var height        = this.TEXT_HEIGHT / 2
      var blueWidth     = width * (target.firingCooldown / target.fireRate)
      var cyanWidth     = width - blueWidth
      this.panelHeight += height

      //blue
      Canvas.fillStyle   = this.color(this.COLOR_BLUE)
      Canvas.beginPath();
      Canvas.rect(offsetX, offsetY, blueWidth, height);
      Canvas.fill();
      Canvas.closePath();

      //cyan
      Canvas.fillStyle   = this.color(this.COLOR_CYAN)
      Canvas.beginPath();
      Canvas.rect(offsetX + blueWidth, offsetY, cyanWidth, height);
      Canvas.fill();
      Canvas.closePath();
    }
  },


  color: function(colorString)
  {
    transparency = this.hovering ? '0.3' : '0.9'

    return 'rgba(' + colorString + ', ' + transparency + ')'
  }
}
