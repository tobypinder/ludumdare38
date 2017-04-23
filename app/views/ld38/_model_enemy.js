GameModelEnemy = function() {
  this.HP    = 100;
  this.maxHP = 100;

  this.damage             = 10;
  this.positionX          = null;
  this.positionY          = null;
  this.radius             = 10;
  this.rotation           = (Math.random() * Util.Angle.FULL_PLANET) - Util.Angle.HALF_PLANET;
  this.rotationTime       = ((Math.random() * 10) + 20) * Util.Time.SECONDS;
  this.rotationDirection  = -1;
  this.baseDistanceRadius = 1000;
  this.distanceRadius     = 1000;
  this.MINIMUM_RADIUS     = 100; //100

  this.fireRate       = 1200; //ms
  this.firingCooldown = 0;

  this.baseSpeed = 200;

  this.mouseHover = false;
  this.mouseDown  = false;

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
    this.cooldowns(ms);
    this.rotateAroundPlanet(ms);
    this.advanceTowardsPlanet(ms);
  };

  this.cooldowns = function(ms) {
    this.firingCooldown -= ms
  }

  this.advanceTowardsPlanet = function(ms) {
    this.distanceRadius -= this.speed() * ms / Util.Time.SECONDS;
    if(this.distanceRadius < this.MINIMUM_RADIUS)
    {
      this.distanceRadius = this.MINIMUM_RADIUS;
      this.attemptToFire(ms);
    };
    this.positionX = (Math.cos(this.rotation) - Math.sin(this.rotation)) * this.distanceRadius
    this.positionY = (Math.sin(this.rotation) + Math.cos(this.rotation)) * this.distanceRadius
  };

  this.rotateAroundPlanet = function(ms)
  {
    this.rotation += this.rotationDirection * (ms / this.rotationTime) * (Util.Angle.FULL_PLANET)

    if(this.rotation > Util.Angle.HALF_PLANET)
    {
      this.rotation -= Util.Angle.FULL_PLANET
    }
    if(this.rotation < -Util.Angle.HALF_PLANET)
    {
      this.rotation += Util.Angle.FULL_PLANET
    }
  }

  this.attemptToFire = function() {
    if(this.firingCooldown <= 0) {
      this.fire();
      this.firingCooldown = this.fireRate;
    }
  }

  this.fire = function() {
    // target is always the world
    GameModelWorld.addBullet(this, GameModelPlanet); //
  }

  this.speed = function() {
    return ((this.distanceRadius / this.baseDistanceRadius) * this.baseSpeed)
  }
}
