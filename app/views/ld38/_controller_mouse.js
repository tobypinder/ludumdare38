var GameControllerMouse = {
  mouseX: null,
  mouseY: null,
  worldMouseX: null,
  worldMouseY: null,
  clickX: null,
  clickY: null,
  worldClickX: null,
  worldClickY: null,
  unhandledMouseDown: false,
  unhandledWheelDown: false,
  unhandledWheelUp: false,

  init:function()
  {
    CanvasElement.addEventListener('mousemove', this.onMouseMove.bind(this))
    CanvasElement.addEventListener('mousedown', this.onMouseDown.bind(this))
    CanvasElement.addEventListener('mouseup',   this.onMouseUp.bind(this))
    CanvasElement.addEventListener('wheel',     this.onWheel.bind(this));
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

    var transform    = GameView.worldTransform.invert()
    var gamePoint    = transform.transformPoint(this.clickX, this.clickY)
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
  onWheel: function(event)
  {
    if(event.deltaY > 0)
    {
      this.unhandledWheelUp = true;
    } else if(event.deltaY < 0)
    {
      this.unhandledWheelDown = true;
    }
    event.preventDefault();
  },

  updateMousePosition: function(event)
  {
    var rect    = CanvasElement.getBoundingClientRect();
    this.mouseX = event.clientX - rect.left,
    this.mouseY = event.clientY - rect.top

    var transform    = GameView.worldTransform.invert()
    var gamePoint    = transform.transformPoint(this.mouseX, this.mouseY)
    this.worldMouseX = gamePoint[0]
    this.worldMouseY = gamePoint[1]
  }
}
