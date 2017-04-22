var GameControllerMouse = {
  mouseX: 0,
  mouseY: 0,
  worldMouseX: 0,
  worldMouseY: 0,
  clickX: 0,
  clickY: 0,
  worldClickX: 0,
  worldClickY: 0,
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

    var rect    = CanvasElement.getBoundingClientRect();
    this.clickX = event.clientX - rect.left,
    this.clickY = event.clientY - rect.top

    var transform = GameView.worldTransform

    transform.invert()
    var gamePoint = transform.transformPoint(this.clickX, this.clickY)
    this.worldClickX = gamePoint[0]
    this.worldClickY = gamePoint[1]

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

    var transform = GameView.worldTransform

    transform.invert()
    var gamePoint = transform.transformPoint(this.mouseX, this.mouseY)
    this.worldMouseX = gamePoint[0]
    this.worldMouseY = gamePoint[1]
  }
}
