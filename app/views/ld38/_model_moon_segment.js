var GameModelMoonSegment = function(moon, index)
{
  this.moon       = moon;
  this.index      = index;
  this.mouseHover = false;
  this.mouseDown  = false;
  this.maxOffset  = 0;
  this.name       = this.moon.name + ": Sector " + Util.Generator.Greek[index]
  this.turret     = null;

  if(Math.random() < 0.1) {
    this.turret = new GameModelTurret(this);
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
  this.frame = function(ms) {
    this.updatePosition();
    if(this.turret) {
      this.turret.frame(ms);
    }
  }

  this.rotationOffset = function() {
    return (Util.Angle.FULL_PLANET / this.moon.segmentCount) * (this.index + 0.5)
  }

  this.updatePosition = function() {
    this.rotation   = this.moon.rotation + this.rotationOffset();
    this.positionX  = this.moon.positionX; // TODO: From edge of segment - use index!
    this.positionY  = this.moon.positionY; // TODO: From edge of segment - use index!
  }

  // Init
  this.updatePosition();
}
