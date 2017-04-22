var GameViewMoon = {
  render: function(moon)
  {

    GameView.renderModeWorld();
    Canvas.strokeStyle = '#ff9999'
    Canvas.fillStyle = '#ff9999'
    Canvas.textAlign = 'right'
    Canvas.beginPath();
    Canvas.arc(
      moon.positionX,
      moon.positionY,
      moon.radius,
      moon.rotation,
      moon.rotation + Util.Angle.FULL_PLANET);
    Canvas.fill();

    Canvas.strokeStyle = '#ff6666'
    Canvas.beginPath();
    Canvas.arc(
      moon.positionX,
      moon.positionY,
      moon.radius + 10,
      moon.rotation,
      moon.rotation + (Util.Angle.FULL_PLANET / 16));
    Canvas.fill();
  },
}
