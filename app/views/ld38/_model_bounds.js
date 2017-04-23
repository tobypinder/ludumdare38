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
    if(GameControllerMouse.rightMouseDown)
    {
      GameModelWorld.nudgeTowardsMouse(GameControllerMouse.durationHeld);
    }
    this.rezoom();
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
