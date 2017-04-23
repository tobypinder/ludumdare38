GameModelBounds = {
  bounds: {
    x: 100,
    y: 100
  },
  magnitude: {
    x: 7,
    y: 7
  },

  frame: function()
  {
    if(GameControllerMouse.mouseX && GameControllerMouse.mouseY && GameControllerMouse.mouseDown)
    {
      this.scrollLeft();
      this.scrollRight();
      this.scrollUp();
      this.scrollDown();
    }
    this.rezoom();
  },
  scrollLeft: function(){
    if(GameControllerMouse.mouseX < this.bounds.x)
    {
      var multiplier = 1 - (GameControllerMouse.mouseX / this.bounds.x)
      multiplier = Math.pow(multiplier, 0.5)
      GameModelWorld.offsetX += this.magnitude.x * multiplier / GameModelWorld.zoom
    }
  },
  scrollRight: function(){
    if(GameControllerMouse.mouseX > (GameView.WINDOW_WIDTH - this.bounds.x))
    {
      var multiplier = 1 - ((GameView.WINDOW_WIDTH - GameControllerMouse.mouseX) / this.bounds.x)
      multiplier = Math.pow(multiplier, 0.5)
      GameModelWorld.offsetX -= this.magnitude.x * multiplier / GameModelWorld.zoom
    }
  },
  scrollUp: function(){
    if(GameControllerMouse.mouseY < this.bounds.y)
    {
      var multiplier = 1 - (GameControllerMouse.mouseY / this.bounds.y)
      multiplier = Math.pow(multiplier, 0.5)
      GameModelWorld.offsetY += this.magnitude.y * multiplier / GameModelWorld.zoom
    }
  },
  scrollDown: function(){
    if(GameControllerMouse.mouseY > (GameView.WINDOW_HEIGHT - this.bounds.y))
    {
      var multiplier = 1 - ((GameView.WINDOW_HEIGHT - GameControllerMouse.mouseY) / this.bounds.y)
      multiplier = Math.pow(multiplier, 0.5)
      GameModelWorld.offsetY -= this.magnitude.y * multiplier / GameModelWorld.zoom
    }
  },
  rezoom: function()
  {
    if(GameControllerMouse.unhandledWheelDown)
    {
      var newZoom = Math.floor((GameModelWorld.zoom / 1.025) * 100) / 100 - 0.01
      if(newZoom < GameModelWorld.MIN_ZOOM) {
        newZoom = GameModelWorld.MIN_ZOOM
      }
      GameModelWorld.teleportAwayFromMouse();
      GameModelWorld.changeZoom(newZoom);
      GameControllerMouse.unhandledWheelDown = false
      GameControllerMouse.updateMouseWorldPosition();
    }

    if(GameControllerMouse.unhandledWheelUp)
    {
      var newZoom = Math.floor((GameModelWorld.zoom * 1.025) * 100) / 100 + 0.01
      if(newZoom > GameModelWorld.MAX_ZOOM) {
        newZoom = GameModelWorld.MAX_ZOOM
      }
      GameModelWorld.teleportTowardsMouse();
      GameModelWorld.changeZoom(newZoom);
      GameControllerMouse.unhandledWheelUp = false
      GameControllerMouse.updateMouseWorldPosition();
    }
  }
}
