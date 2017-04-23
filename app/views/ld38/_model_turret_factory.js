var GameModelTurretFactory = {
  missile: {
    cost: {},
    add: function(segment){
      var turret = new GameModelTurret(segment)
      turret.damage           = 40
      turret.fireRate         = 3000
      turret.name             = 'Missile Turret'
      turret.bulletSpeed      = 75
      turret.viewConeAngle    = Util.Angle.FULL_PLANET / 12
      turret.viewConeDistance = 1000
      turret.init();

      return turret;
    }
  },
  sniper: {
    cost: {},
    add: function(segment){
      var turret = new GameModelTurret(segment)
      turret.damage           = 100
      turret.fireRate         = 8000
      turret.name             = 'Sniper Turret'
      turret.bulletSpeed      = 200
      turret.viewConeAngle    = Util.Angle.FULL_PLANET / 36
      turret.viewConeDistance = 2500
      turret.init();

      return turret;
    }
  },
  shotgun: {
    cost: {},
    add: function(segment){
      var turret = new GameModelTurret(segment)
      turret.damage           = 10
      turret.fireRate         = 200
      turret.name             = 'Shotgun Turret'
      turret.bulletSpeed      = 150
      turret.viewConeAngle    = Util.Angle.FULL_PLANET / 6
      turret.viewConeDistance = 400
      turret.init();

      return turret;
    }
  },
  build: function(segment, type)
  {
    return GameModelTurretFactory[type].add(segment);
  }
  // Check affordability!
}
