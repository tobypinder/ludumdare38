GameModelBullet = function(source, target) {

  this.source               = source
  this.target               = target
  this.duration             = 1000
  this.damage               = source.damage
  this.positionX            = source.positionX;
  this.positionY            = source.positionY;
  this.radius               = 5;
  this.rotation             = source.rotation;   //Math.atan2((target.positionY - source.positionY), (target.positionX - source.positionX))
  // -0.25 * Math.PI +
  this.rotationSpeed        = 1000
  this.baseSpeed            = this.source.speed();

  this.mouseHover = false;
  this.mouseDown  = false;
  this.destroyed  = false;

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
    this.advanceTowardsTarget(ms);
    this.rotateTowardsTarget(ms);
    this.checkForCollision()
    this.decay(ms);
  };

  this.decay = function(ms) {
    // TODO: Reduce health
  }

  this.advanceTowardsTarget = function(ms) {
    var speed      = this.speed() * (ms / 1000);
    this.positionX -= ((Math.cos(this.rotation) - Math.sin(this.rotation)) * speed);
    this.positionY -= ((Math.sin(this.rotation) + Math.cos(this.rotation)) * speed);
  };

  this.checkForCollision = function() {
    if(!this.destroyed && target.containsPoint(this.positionX, this.positionY))
    {
      this.target.shotBy(this)
      this.destroyed = true
    }
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
