var GameModelPlanetSegment = function(planet, index)
{
  this.planet       = planet;
  this.index        = index;
  this.mouseHover   = false;
  this.mouseDown    = false;
  this.maxOffset    = 0;

  this.HP    = Math.random() * 250 + 750
  this.maxHP = 1000
  this.name  = this.planet.name + ": Sector " + Util.Generator.Greek[index]

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
  this.applyDamage = function(amount) {
    this.HP -= amount;

    if(this.HP <= 0) {
      this.kill();
    }
  }

  this.kill = function() {

    this.HP = 0
    this.destroyed = true;
    GameControllerMouse.deselectEntity(this);
    GameState.exitGame();
  }

  this.sizeOffset = function()
  {
    hp = Math.max(0, (this.HP / this.maxHP))
    return (this.planet.radius + this.maxOffset) * hp;
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
  this.radialHalfSize = function(){
    return this.radialSize() / 2
  }
  this.frame = function(ms)
  {
    //
  }

  this.segmentStartAngle = function() {
    return this.segmentMidpointAngle() - this.radialHalfSize()
  }

  this.segmentMidpointAngle = function() {
    return this.planet.rotation + this.radialOffset()
  }

  this.segmentEndAngle = function() {
    return this.segmentMidpointAngle() + this.radialHalfSize()
  },
  this.repair =function() {
    if(GameModelWorld.canAffordResources(this.repairCost()))
    {
      GameModelWorld.depleteResources(this.repairCost())
      this.HP = Math.min(this.HP + 100, this.maxHP)
    }
  },
  this.repairCost = function() {
    return {
      red:   0,
      green: 0,
      blue:  10
    }
  }
}
