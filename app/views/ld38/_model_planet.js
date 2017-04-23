var GameModelPlanet = {
  radius:            0,
  positionX:         0,
  positionY:         0,
  rotation:          0,
  rotationTime:      0, // x Util.Time.SECONDS
  rotationDirection: 1, //or -1
  segmentCount:      12,
  moons:             [],
  segments:          [],
  name:              '',

  init: function()
  {
    this.radius            = 100
    this.positionX         = 0
    this.positionY         = 0
    this.rotation          = 0
    this.rotationTime      = 30 * Util.Time.SECONDS
    this.rotationDirection = 1
    this.segmentCount      = 12,
    this.moons             = [],
    this.segments          = [],
    this.name              = Util.Generator.planet();

    // TODO: n moons in shell at each level - think nuclai.
    this.addMoon(400);
    this.addMoon(500);
    this.addMoon(600);
    this.addMoon(700);
    this.addMoon(800);
    this.addMoon(900);
    this.addMoon(1000);

    for(var i=0; i<this.segmentCount; i++)
    {
      this.addPlanetSegment(i);
    }
  },
  containsPoint: function(x, y)
  {
    var a2 = Math.pow(x - this.positionX, 2)
    var b2 = Math.pow(y - this.positionY, 2)
    var c2 = Math.pow(this.radius, 2)

    return a2 + b2 < c2
  },
  shotBy: function(bullet) {
    //detect segment
    var x     = bullet.positionX - this.positionX
    var y     = bullet.positionY - this.positionY
    var angle = Math.atan2(y, x)
    var segmentAngle = angle - this.rotation
    if(segmentAngle < 0)
    {
      segmentAngle += Util.Angle.FULL_PLANET
    }
    var perSegment   = Util.Angle.FULL_PLANET / this.segmentCount
    var segmentIndex = Math.floor(segmentAngle / perSegment % this.segmentCount)
    this.segments[segmentIndex].applyDamage(bullet.damage);
  },
  addMoon: function(distance)
  {
    var moon = new GameModelMoon();
    moon.init(distance);
    this.moons.push(moon);
  },

  addPlanetSegment: function(index)
  {
    var segment = new GameModelPlanetSegment(this, index);
    this.segments.push(segment);
  },

  frame: function(ms)
  {
    this.rotate(ms);
    $.each(this.moons, this.frameMoon.bind(this))
  },

  frameMoon: function(index, moon)
  {
    moon.frame()
  },

  rotate: function(ms)
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
}
