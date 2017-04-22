var GameViewMoon = {
  render: function(moon)
  {

    GameView.renderModeWorld();
    Canvas.strokeStyle = '#999999'
    Canvas.fillStyle = '#999999'
    Canvas.textAlign = 'right'
    Canvas.beginPath();
    Canvas.arc(
      moon.positionX,
      moon.positionY,
      moon.radius,
      moon.rotation,
      moon.rotation + Util.Angle.FULL_PLANET);
    Canvas.fill();

    $.each(moon.segments, this.renderMoonSegment.bind(this))
  },
  renderMoonSegment: function(index, segment) {
    GameViewMoonSegment.render(segment)
  }
}
