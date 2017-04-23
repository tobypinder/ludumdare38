var GameModelTurret = function(segment)
{
  this.segment      = segment
  this.moon         = segment.moon;
  this.positionX    = segment.positionX;
  this.positionY    = segment.positionY;
  this.rotation     = segment.rotation;
  this.validTargets = []

  this.damage           = 100;
  this.visibilityRadius = 2000;

  this.fireRate       = 3000; //ms
  this.firingCooldown = Math.random() * this.fireRate;
  this.name           = 'Plain Turret'
  this.bulletSpeed    = 25;

  this.viewConeAngle    = Util.Angle.FULL_PLANET / 4
  this.viewConeDistance = 2000

  this.frame = function()
  {
    this.updatePosition();
    this.retarget();
    var ms = GameModel.stats.frameTime
    this.cooldowns(ms);
    this.attemptToFire(ms);
  }

  this.retarget = function(){
    var targets       = []
    var enemyCount = GameModelWorld.enemies.length - 1

    var startAngle = this.viewConeStartAngle();
    var endAngle   = this.viewConeEndAngle();

    console.log(
      Math.round(startAngle / Math.PI * 180),
      Math.round(endAngle / Math.PI * 180)
    )

    for(var i=enemyCount; i>=0; i--) {
      var enemy = GameModelWorld.enemies[i];
      var dX = this.positionX - enemy.positionX
      var dY = this.positionY - enemy.positionY

      var distance = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2))
      var angle    = Math.atan2(dY, dX);
      var proximity = distance <= this.viewConeSize()
      var included  = (angle >= startAngle) && (angle <= endAngle);
      if(proximity && included){
        targets.push(enemy)
      }
    }
    this.validTargets = targets;
  }

  this.updatePosition = function()
  {
    this.positionX  = this.segment.positionX;
    this.positionY  = this.segment.positionY;
    this.rotation   = this.segment.rotation;
  }

  this.cooldowns = function(ms) {
    this.firingCooldown = Math.max(this.firingCooldown - ms, 0)
  }

  this.attemptToFire = function() {
    target = Util.Sample(this.validTargets)
    if(this.firingCooldown <= 0 && target) {
      this.fire(target);
    }
  }

  this.radialViewConeHalfSize =function() {
    return this.viewConeAngle / 2
  }

  this.viewConeStartAngle = function() {
    return this.viewConeMidpointAngle() - this.radialViewConeHalfSize()
  }

  this.viewConeMidpointAngle = function() {
    return this.segment.segmentMidpointAngle();
  }

  this.viewConeEndAngle = function() {
    return this.viewConeMidpointAngle() + this.radialViewConeHalfSize()
  }

  this.fire = function(target) {
    GameModelWorld.addBullet(this, target, GameModelWorld.enemies);
    this.firingCooldown = this.fireRate;
  }

  this.ejectionSpeed = function() {
    return this.bulletSpeed;
  }

  this.viewConeSize = function() {
    return this.viewConeDistance;
  }

  // Init
  this.updatePosition();
}
