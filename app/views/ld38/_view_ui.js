var GameViewUI = {
  PANEL_WIDTH:   300,
  PANEL_HEIGHT:  400,
  PANEL_PADDING: 5,
  TEXT_PADDING: 5,
  TEXT_HEIGHT: 20,
  COLOR_BLACK: '0, 0, 0',
  COLOR_WHITE: '255, 255, 255',
  hovering: false,

  frame: function()
  {
    GameView.renderModeUI()
    if(GameControllerMouse.selectedEntity && GameControllerMouse.selectedEntity.name) {
      this.renderElementPanel(GameControllerMouse.selectedEntity);
    }
  },
  renderElementPanel: function(element) {
    Canvas.font        = Util.Font.Small;
    Canvas.fillStyle   = this.color(this.COLOR_BLACK)
    Canvas.strokeStyle = this.color(this.COLOR_WHITE)

    Canvas.beginPath();
    Canvas.rect(GameView.WINDOW_WIDTH - this.PANEL_WIDTH - this.PANEL_PADDING, this.PANEL_PADDING, this.PANEL_WIDTH, this.PANEL_HEIGHT);
    this.hovering = Canvas.isPointInPath(
      GameControllerMouse.mouseX,
      GameControllerMouse.mouseY
    );
    Canvas.fill();
    Canvas.stroke();

    this.renderElementName(element);
    this.renderElementName(element);
  },
  renderElementName: function(element) {
    Canvas.strokeStyle = this.color(this.COLOR_WHITE)
    Canvas.fillStyle = this.color(this.COLOR_WHITE)
    Canvas.textAlign = 'right'
    Canvas.fillText(element.name, GameView.WINDOW_WIDTH - this.PANEL_PADDING - this.TEXT_PADDING, this.PANEL_PADDING + this.TEXT_HEIGHT);
  },
  color: function(colorString)
  {
    transparency = this.hovering ? '0.2' : '0.8'

    return 'rgba(' + colorString + ', ' + transparency + ')'
  }
}
