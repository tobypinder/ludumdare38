var GameModelTurret = function(segment)
{
  this.segment      = segment
  this.moon         = segment.moon;
  this.positionX    = segment.positionX;
  this.positionY    = segment.positionY;
  this.rotation     = segment.rotation;
  this.validTargets = []
  this.firingCooldown   = 0

  // Overwrite factory
  this.damage           = 100;
  this.fireRate         = 3000; //ms
  this.bulletSpeed      =  75;
  this.viewConeDistance = 1000
  this.viewConeAngle    = 0

  this.init = function() {
    this.firingCooldown   = 0
    this.updatePosition();
  }

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

    for(var i=enemyCount; i>=0; i--) {
      var enemy = GameModelWorld.enemies[i];
      var dX = enemy.positionX - this.positionX
      var dY = enemy.positionY - this.positionY

      var distance = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2))
      var angle    = Math.atan2(dY, dX);
      var proximity = distance <= this.viewConeSize()
      if(endAngle < startAngle)
      {
        endAngle += Util.Angle.HALF_PLANET
        angle    += Util.Angle.HALF_PLANET
      }

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
    return Util.Angle.Normalize(this.viewConeMidpointAngle() - this.radialViewConeHalfSize())
  }

  this.viewConeMidpointAngle = function() {
    return this.segment.segmentMidpointAngle();
  }

  this.viewConeEndAngle = function() {
    return Util.Angle.Normalize(this.viewConeMidpointAngle() + this.radialViewConeHalfSize())
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
