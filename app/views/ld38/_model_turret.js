var GameModelTurret = function(segment)
{
  this.segment    = segment
  this.moon       = segment.moon;
  this.positionX  = segment.positionX;
  this.positionY  = segment.positionY;
  this.rotation   = segment.rotation;

  this.visibilityRadius = 2000;

  this.fireRate       = 3000 + (400 * Math.random()); //ms
  this.firingCooldown = Math.random() * 500;

  this.bulletSpeed = 30;

  this.frame = function()
  {
    this.updatePosition();
    var ms = GameModel.stats.frameTime
    this.cooldowns(ms);
    this.attemptToFire(ms);
  }

  this.updatePosition = function()
  {
    this.positionX  = this.segment.positionX;
    this.positionY  = this.segment.positionY;
    this.rotation   = this.segment.rotation;
  }

  this.cooldowns = function(ms) {
    this.firingCooldown -= ms
  }

  this.attemptToFire = function() {
    if(this.firingCooldown <= 0) { //  && this.distanceRadius <= this.MINIMUM_RADIUS
      this.fire();
    }
  }

  this.fire = function() {
    console.log('Turret firing!');
    // target is always the world
    GameModelWorld.addBullet(this, GameModelPlanet);
    this.firingCooldown = this.fireRate;
  }

  this.ejectionSpeed = function() {
    return this.bulletSpeed;
  }

  // Init
  this.updatePosition();
}
