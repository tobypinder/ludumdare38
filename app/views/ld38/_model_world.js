var GameModelWorld = {
  offsetX: 0,
  offsetY: 0,
  zoom:    1,
  init: function()
  {
    this.offsetX = 0,
    this.offsetY = 0,
    this.zoom    = 1
  },

  frame: function(ms)
  {
    GameModelPlanet.frame(ms)
    this.scrollBounds();
    //this.offsetX += (Math.random() - 0.5) / 1000 * ms * 100
    //this.offsetY += (Math.random() - 0.5) / 1000 * ms * 100
  },
  scrollBounds: function()
  {
  }
}
