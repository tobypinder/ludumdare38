var GameModelPlanetSegment = function(planet, index)
{
  this.planet       = planet;
  this.index        = index;
  this.mouseHover   = false;
  this.mouseDown    = false;
  this.sizeOffset   = function()
  {
    return 10;
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
