var GameModelTurret = function(segment)
{
  this.segment    = segment
  this.moon       = segment.moon;
  this.positionX  = segment.positionX;
  this.positionY  = segment.positionY;
  this.rotation   = segment.rotation;

  this.damage           = 100;
  this.visibilityRadius = 2000;

  this.fireRate       = 1000 + (400 * Math.random()); //ms
  this.firingCooldown = Math.random() * 500;

  this.bulletSpeed = 60;

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
    target = Util.Sample(GameModelWorld.enemies)
    if(this.firingCooldown <= 0 && target) {
      this.fire(target);
    }
  }

  this.fire = function(target) {
    // target is a random Enemy
    // TODO: Vision cones etc

    GameModelWorld.addBullet(this, target);
    this.firingCooldown = this.fireRate;
  }

  this.ejectionSpeed = function() {
    return this.bulletSpeed;
  }

  // Init
  this.updatePosition();
}
