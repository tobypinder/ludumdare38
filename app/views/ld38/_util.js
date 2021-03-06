var Util = {
  Angle: {
    HALF_PLANET: (Math.PI),
    FULL_PLANET: (2 * Math.PI),
    Normalize: function(angle) {
      var unchanged = false
      while(!unchanged) {
        unchanged = true;
        if(angle > this.HALF_PLANET)
        {
          unchanged = false
          angle -= this.FULL_PLANET
        }
        if(angle < -this.HALF_PLANET)
        {
          unchanged = false
          angle += this.FULL_PLANET
        }
      }

      return angle
    }
  },
  Time: {
    SECONDS: 1000,
    MINUTES: 60000
  },
  Font: {
    Huge:     "64px electrolizeregular",
    Standard: "20px electrolizeregular",
    Small:    "16px electrolizeregular",
    Tiny:     "12px electrolizeregular"
  },
  Generator: {
    Greek: [
      'Alpha',
      'Beta',
      'Gamma',
      'Delta',
      'Epsilon',
      'Zeta',
      'Eta',
      'Theta',
      'Iota',
      'Kappa',
      'Lambda',
      'Mu',
      'Nu',
      'Xi',
      'Omicron',
      'Pi',
      'Rho',
      'Sigma',
      'Tau',
      'Upsilon',
      'Phi',
      'Chi',
      'Psi',
      'Omega'
    ],
    Moons: [
      'Phobos',
      'Deimos',
      'Io',
      'Europa',
      'Ganymede',
      'Callisto',
      'Amalthea',
      'Himalia',
      'Elara',
      'Pasiphae',
      'Sinope',
      'Lysithea',
      'Carme',
      'Ananke',
      'Leda',
      'Thebe',
      'Adrastea',
      'Metis',
      'Callirrhoe',
      'Themisto',
      'Megaclite',
      'Taygete',
      'Chaldene',
      'Harpalyke',
      'Kalyke',
      'Iocaste',
      'Erinome',
      'Isonoe',
      'Praxidike',
      'Autonoe',
      'Thyone',
      'Hermippe',
      'Aitne',
      'Eurydome',
      'Euanthe',
      'Euporie',
      'Orthosie',
      'Sponde',
      'Kale',
      'Pasithee',
      'Hegemone',
      'Mneme',
      'Aoede',
      'Thelxinoe',
      'Arche',
      'Kallichore',
      'Helike',
      'Carpo',
      'Eukelade',
      'Cyllene',
      'Kore',
      'Herse',
      'Dia',
      'Mimas',
      'Enceladus',
      'Tethys',
      'Dione',
      'Rhea',
      'Titan',
      'Hyperion',
      'Iapetus',
      'Phoebe',
      'Janus',
      'Epimetheus',
      'Helene',
      'Telesto',
      'Calypso',
      'Atlas',
      'Prometheus',
      'Pandora',
      'Pan',
      'Ymir',
      'Paaliaq',
      'Tarvos',
      'Ijiraq',
      'Suttungr',
      'Kiviuq',
      'Mundilfari',
      'Albiorix',
      'Skathi',
      'Erriapus',
      'Siarnaq',
      'Thrymr',
      'Narvi',
      'Methone',
      'Pallene',
      'Polydeuces',
      'Daphnis',
      'Aegir',
      'Bebhionn',
      'Bergelmir',
      'Bestla',
      'Farbauti',
      'Fenrir',
      'Fornjot',
      'Hati',
      'Hyrrokkin',
      'Kari',
      'Loge',
      'Skoll',
      'Surtur',
      'Anthe',
      'Jarnsaxa',
      'Greip',
      'Tarqeq',
      'Aegaeon'
      // https://en.wikipedia.org/wiki/List_of_natural_satellites#Moons_by_primary from Ariel
    ],
    moon: function() {
      return Util.Sample(Util.Generator.Moons)
    },
    planet: function() {
      return Util.Sample(Util.Generator.Moons) + " Prime"
    }
  },
  Sample: function(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  }
}
