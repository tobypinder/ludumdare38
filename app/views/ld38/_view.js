var GameView = {
  WINDOW_WIDTH:800,
  WINDOW_HEIGHT:600,
  render_mode: 'game',
  stats: {
    MAX_FPS:60,
    computedFrames:0,
    timeStart:null,
    timeEnd:null,
    frameTime:0,
    fps:0
  },
  init:function(){
    var c=$('#game')[0];
    //window.addEventListener("keydown",GameKeyListener.keyDown,true);
    //window.addEventListener("keyup",GameKeyListener.keyUp,true);
    Canvas = c.getContext('2d');
    Canvas.font="20px electrolizeregular";
    requestAnimationFrame(GameView.frame.bind(this));
  },
  frame:function()
  {
    this.frameClean();
    // render objects.
    GameViewPlanet.frame();
    // UI
    GameViewFPS.frame()
    // Debug
    GameViewMouse.frame();

    this.benchmarkEnd()
    this.benchmarkStart()

    requestAnimationFrame(GameView.frame.bind(this));
  },
  frameClean:function()
  {
    this.renderModeUI();
    Canvas.fillStyle="#000000";
    Canvas.fillRect(0, 0, 800, 600);
  },
  renderModeUI:function()
  {
    Canvas.setTransform(1, 0, 0, 1, -0.5, -0.5)
    this.render_mode = 'ui'
  },
  renderModeGame:function()
  {
    Canvas.setTransform(
      this.gameZoom(),
      0,
      0,
      this.gameZoom(),
      -0.5 + this.xGameOffset(),
      -0.5 + this.yGameOffset()
    )
    this.render_mode = 'game'
  },

  xGameOffset:function()
  {
    var base = this.WINDOW_WIDTH / 2
    return base + (GameModelWorld.offsetX * GameModelWorld.zoom);
  },
  yGameOffset:function()
  {
    var base = this.WINDOW_HEIGHT / 2
    return base + (GameModelWorld.offsetY * GameModelWorld.zoom);
  },
  xGameInverseOffset:function()
  {
    var base = this.WINDOW_WIDTH / 2
    return base + (GameModelWorld.offsetX / GameModelWorld.zoom);
  },
  yGameInverseOffset:function()
  {
    var base = this.WINDOW_HEIGHT / 2
    return base + (GameModelWorld.offsetY);
  },
  gameZoom:function()
  {
    return GameModelWorld.zoom
  },

  benchmarkStart:function() {
    this.stats.timeStart = new Date().getTime()
  },
  benchmarkEnd:function(){
    this.stats.timeEnd = new Date().getTime()
    this.stats.frameTime = this.stats.timeEnd - this.stats.timeStart
    if(this.stats.frameTime > 0 )
    {
      this.stats.fps = Math.round(1000/this.stats.frameTime)
    }
  }
}
