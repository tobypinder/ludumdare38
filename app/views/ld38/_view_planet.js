var GameViewPlanet = {
  frame: function() {
    GameView.renderModeWorld();
    Canvas.strokeStyle = '#ffffff'
    Canvas.fillStyle = '#ffffff'
    Canvas.textAlign = 'right'
    Canvas.beginPath();
    Canvas.arc(
      GameModelPlanet.positionX,
      GameModelPlanet.positionY,
      GameModelPlanet.radius,
      GameModelPlanet.rotation,
      GameModelPlanet.rotation + Util.Angle.FULL_PLANET);
    Canvas.fill();

    $.each(GameModelPlanet.segments, this.renderPlanetSegment.bind(this))
    $.each(GameModelPlanet.moons,    this.renderMoon.bind(this))
  },

  renderMoon: function(index, moon) {
    GameViewMoon.render(moon)
  },
  renderPlanetSegment: function(index, segment) {
    GameViewPlanetSegment.render(segment)
  }
}
