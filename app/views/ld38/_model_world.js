var GameModelWorld = {
  offsetX:  null,
  offsetY:  null,
  zoom:     null,
  MIN_ZOOM: 0.05,
  MAX_ZOOM: 2,

  TEST_SPAWN: 30,
  enemies:  [],
  bullets:  [],

  init: function()
  {
    this.enemies = [],
    this.bullets = [],

    this.offsetX = -200,
    this.offsetY = 0,
    this.zoom    = 0.5

    for(var i=0; i<this.TEST_SPAWN; i++)
    {
      this.addEnemy();
    }
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
  }
}
