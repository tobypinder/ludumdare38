var GameModelMoonSegment = function(moon, index)
{
  this.moon       = moon;
  this.index      = index;
  this.mouseHover = false;
  this.mouseDown  = false;
  this.maxOffset  = 0;
  this.name       = this.moon.name + ": Sector " + Util.Generator.Greek[index]
  this.turret     = null;

  this.positionRadiusMultiplier = 0.8

  this.canPlaceTurret = function() {
    return !(this.turret)
  }

  this.purchaseTurret = function(type) {
    if(GameModelTurretFactory.canAfford(type))
    {
      GameViewUI.addHint('You bought a '+ type + ' turret!')
      this.turret = new GameModelTurretFactory.build(this, type);
    } else {
      GameViewUI.addHint('You cannot afford this item!')
    }
  }

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
  this.sizeOffset = function() {
    return (this.moon.radius + this.maxOffset);
  }
  this.maxSizeOffset = function() {
    return (this.moon.radius + this.maxOffset);
  }
  this.radialOffset = function() {
    var percentage = this.index / this.moon.segmentCount

    return percentage * Util.Angle.FULL_PLANET
  }
  this.radialSize = function(){
    return (Util.Angle.FULL_PLANET / this.moon.segmentCount)
  }
  this.radialHalfSize = function(){
    return this.radialSize() / 2
  }
  this.frame = function(ms) {
    this.updatePosition();
    if(this.turret) {
      this.turret.frame(ms);
    }
  }

  this.rotationOffset = function() {
    return (Util.Angle.FULL_PLANET / this.moon.segmentCount) * (this.index - 0.5)
  }

  this.updatePosition = function() {
    this.rotation   = this.moon.rotation + this.rotationOffset();
    this.positionX = this.moon.positionX + (Math.cos(this.rotation) - Math.sin(this.rotation)) * (this.moon.radius * this.positionRadiusMultiplier)
    this.positionY = this.moon.positionY + (Math.sin(this.rotation) + Math.cos(this.rotation)) * (this.moon.radius * this.positionRadiusMultiplier)
  }

  this.segmentStartAngle = function() {
    return this.segmentMidpointAngle() - this.radialHalfSize()
  }

  this.segmentMidpointAngle = function() {
    return this.moon.rotation + this.radialOffset()
  }

  this.segmentEndAngle = function() {
    return this.segmentMidpointAngle() + this.radialHalfSize()
  }

  this.killTurret = function(){
    GameViewUI.addHint('Your '+ this.turret.name + "recycled.")
    this.turret = null
  }


  // Init
  this.updatePosition();
}
