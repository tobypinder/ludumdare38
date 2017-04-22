var GameModelPlanet = {
  radius: 0,
  positionX: 0,
  positionY: 0,
  rotation: 0,
  rotationTime: 0, // x Util.Time.SECONDS
  rotationDirection: 1, //or -1
  moons: [],

  init: function()
  {
    this.radius            = 100
    this.positionX         = 0
    this.positionY         = 0
    this.rotation          = 0
    this.rotationTime      = 10 * Util.Time.SECONDS
    this.rotationDirection = 1

    this.addMoon(200);
    this.addMoon(300);
    this.addMoon(400);
    this.addMoon(500);
    this.addMoon(600);
    this.addMoon(800);
    this.addMoon(1000);
  },

  addMoon: function(distance)
  {
    var moon = new GameModelMoon();
    moon.init(distance);
    this.moons.push(moon)
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
