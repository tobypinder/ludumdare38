var GameModelTurretFactory = {
  upgrades: {
    baseCost: {
      red:   0,
      green: 2,
      blue:  8
    }
  },
  missile: {
    cost: {
      red:   20,
      green: 20,
      blue:  0
    },
    add: function(segment){
      var turret = new GameModelTurret(segment)
      turret.type             = 'missile'
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
    cost: {
      red:   25,
      green: 25,
      blue:  0
    },
    add: function(segment){
      var turret = new GameModelTurret(segment)
      turret.type             = 'sniper'
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
    cost: {
      red:   40,
      green: 10,
      blue:  0
    },
    add: function(segment){
      var turret = new GameModelTurret(segment)
      turret.type             = 'shotgun'
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
    GameModelWorld.depleteResources(GameModelTurretFactory[type].cost)
    return GameModelTurretFactory[type].add(segment);
  },
  canAfford: function(type) {
    return GameModelWorld.canAffordResources(GameModelTurretFactory[type].cost)
  }

  // Check affordability!
}
