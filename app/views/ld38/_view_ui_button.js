var GameViewUIButton = function(text, action, hint, resourceCosts) {
  this.text          = text
  this.hint          = hint
  this.action        = action
  this.resourceCosts = resourceCosts

  var ui = GameViewUI

  ui.panelHeight +=  ui.TEXT_HEIGHT

  Canvas.textAlign = 'center'
  Canvas.lineWidth = 4;
  Canvas.beginPath();

  this.x1 = ui.OFFSET_X + ui.PANEL_PADDING
  this.y1 = ui.panelHeight - ui.TEXT_HEIGHT
  this.w = ui.PANEL_WIDTH - ui.PANEL_PADDING * 2
  this.h = ui.TEXT_HEIGHT

  Canvas.rect(this.x1, this.y1, this.w, this.h)

  this.containsPoint = function(x, y) {
    var inX = (x > this.x1) && (x < (this.x1 + this.w))
    var inY = (y > this.y1) && (y < (this.y1 + this.h));

    return (inX && inY)
  }

  if(this.containsPoint(GameControllerMouse.clickX, GameControllerMouse.clickY)) {
    Canvas.strokeStyle = ui.color(ui.COLOR_RED)
    Canvas.fillStyle = ui.color(ui.COLOR_RED)
    if(GameControllerMouse.unhandledMouseDown) {
      GameControllerMouse.unhandledMouseDown = false
      this.action();
    }
  } else if(this.containsPoint(GameControllerMouse.mouseX, GameControllerMouse.mouseY)) {
    Canvas.strokeStyle = ui.color(ui.COLOR_GREEN)
    Canvas.fillStyle = ui.color(ui.COLOR_GREEN)
    ui.addHint(this.hint);
    ui.addResourceCosts(this.resourceCosts)
  } else {
    Canvas.strokeStyle = ui.color(ui.COLOR_GREY)
    Canvas.fillStyle = ui.color(ui.COLOR_DARK_GREY)
  }

  Canvas.fill();
  Canvas.stroke();

  Canvas.beginPath();

  Canvas.strokeStyle = ui.color(ui.COLOR_WHITE)
  Canvas.fillStyle = ui.color(ui.COLOR_WHITE)
  Canvas.fillText(text, this.x1 + (this.w / 2), ui.panelHeight);


}
