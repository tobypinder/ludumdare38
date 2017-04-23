GameModelBullet = function(source, target, validTargets) {
  this.source               = source
  this.target               = target
  this.validTargets         = validTargets
  this.duration             = 1000
  this.damage               = source.damage
  this.positionX            = source.positionX;
  this.positionY            = source.positionY;
  this.radius               = 5;
  this.rotation             = source.rotation;   //Math.atan2((target.positionY - source.positionY), (target.positionX - source.positionX))
  // -0.25 * Math.PI +
  this.rotationSpeed        = 1000
  this.baseSpeed            = this.source.ejectionSpeed();

  this.mouseHover = false;
  this.mouseDown  = false;
  this.destroyed  = false;

  this.name = "Bullet"

  this.HP  = 20
  this.maxHP = this.HP

  this.isSelected = function() {
    GameControllerMouse.unhandledMouseDown = false
    this.mouseDown = true;
    GameControllerMouse.selectEntity(this);
  },
  this.isFocused = function() {
    this.mouseHover = true;
  }
  this.isUnfocused = function() {
    this.mouseHover = false;
  }

  this.frame = function() {
    var ms = GameModel.stats.frameTime

    this.advance(ms);
    if(!this.target || this.target.destroyed) {
      this.target = null
    } else {
      this.rotateTowardsTarget(ms);
    }

    this.checkForCollision()
    this.decay(ms);
  };

  this.decay = function(ms) {
    this.HP = this.HP - (ms / 1000)
    if(this.HP <= 0) {
      this.kill();
    }
    // TODO: Reduce health
  }

  this.advance = function(ms) {
    var speed      = this.speed() * (ms / 1000);
    this.positionX -= ((Math.cos(this.rotation) - Math.sin(this.rotation)) * speed);
    this.positionY -= ((Math.sin(this.rotation) + Math.cos(this.rotation)) * speed);
  };

  this.checkForCollision = function() {
    if(!this.destroyed)
    {
      this.checkCollisionWith(this.target)
      if(this.validTargets) {
        for(var i=0; i<this.validTargets.length; i++) {
          this.checkCollisionWith(this.validTargets[i]);
        }
      }
    }
  };

  this.checkCollisionWith = function(target) {
    if(target && target.containsPoint(this.positionX, this.positionY)) {
      target.shotBy(this)
      this.kill();
    }
  };

  this.kill = function() {
    this.destroyed = true
  }

  this.rotateTowardsTarget = function(ms) {
    var deltaX  = this.positionX - this.target.positionX
    var deltaY  = this.positionY - this.target.positionY

    this.targetRotation = Math.atan2(deltaY, deltaX)

    this.rotation = this.targetRotation //* (ms / this.rotationSpeed)
    //this.rotation  = this.targetRotation
    if(this.rotation > Util.Angle.HALF_PLANET)
    {
      this.rotation -= Util.Angle.FULL_PLANET
    }
    if(this.rotation < -Util.Angle.HALF_PLANET)
    {
      this.rotation += Util.Angle.FULL_PLANET
    }
  }

  this.speed = function(){
    return this.baseSpeed;
  }
}
