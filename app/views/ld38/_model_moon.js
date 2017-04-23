var GameModelMoon = function()
{
  this.init = function(distance)
  {
    this.radius            = 40;
    this.positionX         = 0;
    this.positionY         = distance;
    this.basePositionX     = this.positionX;
    this.basePositionY     = this.positionY;
    this.orbitPosition     = Math.random() * Util.Angle.FULL_PLANET // angle
    this.orbitTime         = (60 + distance / 5) * Util.Time.SECONDS;
    this.orbitDirection    = 1 //or -1
    this.rotation          = 0
    this.rotationTime      = (10 + (distance / 80)) * Util.Time.SECONDS;
    this.rotationDirection = 1 //or -1
    this.segmentCount      = 8
    this.segments          = []
    this.name              = Util.Generator.moon();

    // Vary constants.
    this.radius       *= (1 + (0.1 * (Math.random() - 0.5)))
    this.orbitTime    *= (1 + (0.2 * (Math.random() - 0.5)))
    //this.orbitDirection = Math.random() > 0.5 ? 1 : -1
    this.rotationTime *= (1 + (0.3 * (Math.random() - 0.5)))
    this.radius       *= (1 + (0.1 * (Math.random() - 0.5)))

    for(var i=0; i<this.segmentCount; i++)
    {
      this.addMoonSegment(i);
    }

    // Make sure initial positions are correct wrt rotations
    this.frame();
  }

  this.addMoonSegment = function(index)
  {
    var segment = new GameModelMoonSegment(this, index);
    this.segments.push(segment);
  },

  this.frame = function()
  {
    var ms = GameModel.stats.frameTime;
    this.rotate(ms);
    this.orbit(ms);

    for(var i=0; i<this.segmentCount; i++)
    {
      this.segments[i].frame(ms);
    }
  }

  this.orbit = function(ms)
  {
    this.orbitPosition += this.orbitDirection * (ms / this.orbitTime) * (Util.Angle.FULL_PLANET)
    this.orbitPosition = Util.Angle.Normalize(this.orbitPosition)

    this.positionX = Math.cos(this.orbitPosition) * this.basePositionX - Math.sin(this.orbitPosition) * this.basePositionY
    this.positionY = Math.sin(this.orbitPosition) * this.basePositionX + Math.cos(this.orbitPosition) * this.basePositionY
  }

  this.rotate = function(ms)
  {
    this.rotation += this.rotationDirection * (ms / this.rotationTime) * (Util.Angle.FULL_PLANET)
    this.rotation = Util.Angle.Normalize(this.rotation)
  }
}
