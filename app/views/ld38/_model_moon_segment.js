var GameModelMoonSegment = function(moon, index)
{
  this.moon       = moon;
  this.index      = index;
  this.mouseHover = false;
  this.mouseDown  = false;
  this.maxOffset  = 0;

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
  this.frame = function(ms)
  {
    //
  }
}
