GameModelEnemy = function() {
  this.HP    = 100;
  this.maxHP = 100;

  this.damage             = 100;
  this.positionX          = null;
  this.positionY          = null;
  this.radius             = 10;
  this.rotation           = (Math.random() * Util.Angle.FULL_PLANET) - Util.Angle.HALF_PLANET;
  this.rotationTime       = ((Math.random() * 30) + 150) * Util.Time.SECONDS;
  this.rotationDirection  = -1;
  this.baseDistanceRadius = 1000 + 200 * Math.random();
  this.distanceRadius     = 1000;
  this.MINIMUM_RADIUS     = 100; //100
  this.destroyed          = false;
  this.name               = 'Enemy' // TODO
  this.shape              = 'box'

  this.fireRate       = 3000 + (400 * Math.random()); //ms
  this.firingCooldown = Math.random() * 500;

  this.baseSpeed  = 20;
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
    this.attemptToFire(ms);
  };

  this.containsPoint = function(x, y)
  {
    var a2 = Math.pow(x - this.positionX, 2)
    var b2 = Math.pow(y - this.positionY, 2)
    var c2 = Math.pow(this.radius, 2)

    return a2 + b2 < c2
  },

  this.shotBy = function(bullet) {
    this.applyDamage(bullet.damage)
  };

  this.applyDamage = function(amount) {
    this.HP -= amount;

    if(this.HP <= 0) {
      this.kill();
    }
  }

  this.kill = function() {
    console.log("Enemy killed!")
    this.destroyed = true;
  }

  this.cooldowns = function(ms) {
    this.firingCooldown = Math.max(this.firingCooldown - ms, 0)
  }

  this.advanceTowardsPlanet = function(ms) {
    this.distanceRadius -= this.speed() * ms / Util.Time.SECONDS;
    if(this.distanceRadius < this.MINIMUM_RADIUS)
    {
      this.distanceRadius = this.MINIMUM_RADIUS;
    };
    this.positionX = (Math.cos(this.rotation) - Math.sin(this.rotation)) * this.distanceRadius
    this.positionY = (Math.sin(this.rotation) + Math.cos(this.rotation)) * this.distanceRadius
  };

  this.rotateAroundPlanet = function(ms)
  {
    this.rotation += this.rotationDirection * (ms / this.rotationTime) * (Util.Angle.FULL_PLANET)
    this.rotation = Util.Angle.Normalize(this.rotation)
  }

  this.attemptToFire = function() {
    if(this.firingCooldown <= 0 && this.distanceRadius <= this.MINIMUM_RADIUS) {
      this.fire();
    }
  }

  this.fire = function() {
    // target is always the world
    GameModelWorld.addBullet(this, GameModelPlanet);
    this.firingCooldown = this.fireRate;
  }

  this.speed = function() {
    return ((this.distanceRadius / this.baseDistanceRadius) * this.baseSpeed)
  }
  this.ejectionSpeed = function() {
    return this.speed() + 2;
  }
}
