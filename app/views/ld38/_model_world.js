var GameModelWorld = {
  offsetX:  0,
  offsetY:  0,
  zoom:     1,
  MIN_ZOOM: 0.05,
  MAX_ZOOM: 2,
  init: function()
  {
    this.offsetX = 0,
    this.offsetY = 0,
    this.zoom    = 1
  },
  frame: function(ms)
  {
    GameModelPlanet.frame(ms)
    GameModelBounds.frame(ms)
  }
}
