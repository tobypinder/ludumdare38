var GameControllerMouse = {
  mouseX: null,
  mouseY: null,
  worldMouseX: null,
  worldMouseY: null,
  clickX: null,
  clickY: null,
  worldClickX: null,
  worldClickY: null,
  mouseDown: false,
  unhandledMouseDown: false,
  unhandledWheelDown: false,
  unhandledWheelUp: false,
  selectedEntity: null,
  durationHeld: 0,

  init:function() {
    CanvasElement.addEventListener('mousemove',   this.onMouseMove.bind(this))
    CanvasElement.addEventListener('mousedown',   this.onMouseDown.bind(this))
    CanvasElement.addEventListener('mouseup',     this.onMouseUp.bind(this))
    CanvasElement.addEventListener('wheel',       this.onWheel.bind(this));
    CanvasElement.addEventListener('click',       this.onClick.bind(this));
    CanvasElement.addEventListener('contextmenu', this.onContextMenu.bind(this));
    this.durationHeld = 0
  },
  frame: function(ms) {
    if(this.mouseDown) {
      this.durationHeld += ms
    } else {
      this.durationHeld = 0
    }
  },

  onMouseMove: function(event) {
    this.updateMousePosition(event);
  },
  onMouseDown: function(event) {
    this.mouseDown = true;
    this.unhandledMouseDown = true;
    // TODO: Handle!

    var rect    = CanvasElement.getBoundingClientRect();
    this.clickX = event.clientX - rect.left,
    this.clickY = event.clientY - rect.top

    var transform    = GameView.worldTransform.invert()
    var gamePoint    = transform.transformPoint(this.clickX, this.clickY)
    this.worldClickX = gamePoint[0]
    this.worldClickY = gamePoint[1]

    if(event.button == 2) {// Right
      this.rightMouseDown = true
    }

    event.preventDefault();
  },
  onMouseUp: function(event) {
    this.mouseDown = false;
    this.rightMouseDown = false;
    this.unhandledMouseDown = false;
    this.clickX      = null
    this.clickY      = null
    this.worldClickX = null
    this.worldClickY = null
    // TODO: Handle!
    event.preventDefault();
  },
  onWheel: function(event) {
    if(event.deltaY < 0) {
      this.unhandledWheelUp = true;
    } else if(event.deltaY > 0) {
      this.unhandledWheelDown = true;
    }
    event.preventDefault();
  },
  onClick: function(event) {
    event.preventDefault();
  },
  onContextMenu: function(event) {
    event.preventDefault();
  },
  selectEntity: function(entity) {
    this.selectedEntity = entity;
  },
  deselectEntity: function(entity) {
    if(this.selectedEntity == entity) {
      this.selectedEntity = null;
    }
  },
  updateMousePosition: function(event)
  {
    var rect    = CanvasElement.getBoundingClientRect();
    this.mouseX = event.clientX - rect.left,
    this.mouseY = event.clientY - rect.top

    this.updateMouseWorldPosition();
  },
  updateMouseWorldPosition: function()
  {
    var transform    = GameView.worldTransform.invert()
    var gamePoint    = transform.transformPoint(this.mouseX, this.mouseY)
    this.worldMouseX = gamePoint[0]
    this.worldMouseY = gamePoint[1]
  }

}
