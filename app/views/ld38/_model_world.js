var GameModelWorld = {
  offsetX:  null,
  offsetY:  null,
  zoom:     null,
  MIN_ZOOM: 0.05,
  MAX_ZOOM: 2,

  enemies:  [],
  bullets:  [],

  resources: {
    red:   100,
    green: 100,
    blue:  100
  },



  init: function()
  {
    this.enemies = [],
    this.bullets = [],

    this.offsetX = 0,
    this.offsetY = 0,
    this.zoom    = 0.5
  },
  frame: function(ms)
  {
    GameModelPlanet.frame(ms)
    GameModelBounds.frame(ms)
    this.frameEnemies(ms);
    this.frameBullets(ms);
  },
  frameEnemies:function(ms){
    var enemyCount = (this.enemies.length - 1)

    for(var i=enemyCount; i>=0; i--) {
      if(this.enemies[i].destroyed) {
        this.enemies.splice(i, 1)
      } else {
        this.enemies[i].frame(ms);
      }
    };
  },
  frameBullets:function(ms){
    var bulletCount = (this.bullets.length - 1)
    for(var i=bulletCount; i>=0; i--) {
      if(this.bullets[i].destroyed) {
        this.bullets.splice(i, 1)
      } else {
        this.bullets[i].frame(ms);
      }
    }
  },
  addEnemy: function() {
    var enemy = new GameModelEnemy(this);
    this.enemies.push(enemy);
  },
  addBullet: function(source, target, validTargets) {
    var bullet = new GameModelBullet(source, target, validTargets)
    this.bullets.push(bullet)
  },

  renderPlanetSegment: function(index, segment) {
    GameViewPlanetSegment.render(segment)
  },
  nudgeTowardsMouse: function(durationHeld){
    durationHeld = durationHeld / 1000
    durationHeld = Math.max(1, Math.sqrt(durationHeld))
    durationHeld = Math.min(durationHeld, 10)

    this.teleportRelativeToMouse(1, 50 / durationHeld);
  },
  teleportTowardsMouse: function(){
    this.teleportRelativeToMouse(1, 5);
  },
  teleportAwayFromMouse: function(){
    this.teleportRelativeToMouse(-1, 5);
  },
  teleportRelativeToMouse: function(direction, magnitude){
    if(GameControllerMouse.mouseX && GameControllerMouse.mouseY) {
      var zoomAmount = GameModelWorld.zoom * magnitude

      var deltaX = (GameControllerMouse.mouseX - (GameView.WINDOW_WIDTH / 2))
      var deltaY = (GameControllerMouse.mouseY - (GameView.WINDOW_HEIGHT / 2))

      this.offsetX -= (deltaX / zoomAmount) * direction;
      this.offsetY -= (deltaY / zoomAmount) * direction;
    }
  },
  changeZoom: function(newZoom) {
    var oldZoom  = this.zoom;
    this.zoom    = newZoom;
    this.offsetX = this.offsetX * (newZoom/oldZoom);
    this.offsetY = this.offsetY * (newZoom/oldZoom);
  },
  canAffordResources: function(resources) {
    var enoughRed   = this.resources.red >= resources.red
    var enoughGreen = this.resources.green >= resources.green
    var enoughBlue  = this.resources.blue >= resources.blue

    return (enoughRed && enoughGreen && enoughBlue)
  },
  depleteResources: function(resources) {
    this.resources.red   -= resources.red
    this.resources.green -= resources.green
    this.resources.blue  -= resources.blue
  }
}
