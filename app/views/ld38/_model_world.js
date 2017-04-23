var GameModelWorld = {
  offsetX:  0,
  offsetY:  0,
  zoom:     1,
  MIN_ZOOM: 0.05,
  MAX_ZOOM: 2,

  TEST_SPAWN: 10,
  enemies:  [],
  bullets:  [],

  init: function()
  {
    this.offsetX = 0,
    this.offsetY = 0,
    this.zoom    = 1

    for(var i=0; i<this.TEST_SPAWN; i++)
    {
      this.addEnemy();
    }
  },
  frame: function(ms)
  {
    GameModelPlanet.frame(ms)
    GameModelBounds.frame(ms)
    for(var i=0; i<this.enemies.length; i++)
    {
      this.enemies[i].frame(ms);
    }
    for(var i=0; i<this.bullets.length; i++)
    {
      this.bullets[i].frame(ms);
    }
  },
  addEnemy: function() {
    var enemy = new GameModelEnemy(this);
    this.enemies.push(enemy);
  },
  addBullet: function(source, target) {
    var bullet = new GameModelBullet(source, target)
    this.bullets.push(bullet)
  },

  renderPlanetSegment: function(index, segment) {
    GameViewPlanetSegment.render(segment)
  }
}
