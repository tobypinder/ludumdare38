var GameModelPlanetSegment = function(planet, index)
{
  this.planet       = planet;
  this.index        = index;
  this.mouseHover   = false;
  this.mouseDown    = false;
  this.maxOffset    = 10;

  this.HP    = Math.random() * 500 + 500
  this.maxHP = 1000

  this.isSelected = function()
  {
    GameControllerMouse.unhandledMouseDown = false
    this.mouseDown = true;
    GameControllerMouse.selectEntity(this);
  },
  this.isFocused = function()
  {
    this.mouseHover = true;
  },
  this.isUnfocused = function()
  {
    this.mouseHover = false;
  },
  this.sizeOffset = function()
  {
    return (this.planet.radius + this.maxOffset) * (this.HP / this.maxHP);
  }
  this.maxSizeOffset = function()
  {
    return this.planet.radius + this.maxOffset;
  }
  this.radialOffset = function() {
    var percentage = this.index / this.planet.segmentCount

    return percentage * Util.Angle.FULL_PLANET
  }
  this.radialSize = function(){
    return (Util.Angle.FULL_PLANET / this.planet.segmentCount)
  }
  this.frame = function(ms)
  {
    //
  }
}
