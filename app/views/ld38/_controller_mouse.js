var GameControllerMouse = {
  mouseX: 0,
  mouseY: 0,
  mouseWorldX: 0,
  mouseWorldY: 0,
  clickX: 0,
  clickY: 0,
  clickWorldX: 0,
  clickWorldY: 0,
  unhandledMouseDown: false,

  init:function()
  {
    CanvasElement.addEventListener('mousemove', this.onMouseMove.bind(this))
    CanvasElement.addEventListener('mousedown', this.onMouseDown.bind(this))
    CanvasElement.addEventListener('mouseup',   this.onMouseUp.bind(this))
  },
  onMouseMove: function(event)
  {
    this.updateMousePosition(event);
  },
  onMouseDown: function(event)
  {
    this.unhandledMouseDown = true;
    // TODO: Handle!
    event.preventDefault();
  },
  onMouseUp: function(event)
  {
    this.unhandledMouseDown = false;
    // TODO: Handle!
    event.preventDefault();
  },

  updateMousePosition: function(event)
  {
    var rect    = CanvasElement.getBoundingClientRect();
    this.mouseX = event.clientX - rect.left,
    this.mouseY = event.clientY - rect.top

    var matrix = new Transform(
      GameView.gameZoom(),
      0,
      0,
      GameView.gameZoom(),
      -0.5 + GameView.xGameOffset(),
      -0.5 + GameView.yGameOffset()
    );

    matrix.invert()
    var gamePoint = matrix.transformPoint(this.mouseX, this.mouseY)
    this.worldMouseX = gamePoint[0]
    this.worldMouseY = gamePoint[1]
  }
}
