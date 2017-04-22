var GameView = {
  WINDOW_WIDTH:800,
  WINDOW_HEIGHT:600,
  ctx:null,
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
    var ctx=c.getContext('2d');
    this.ctx = ctx;
    //GameViewParticles.init();
    ctx.font="20px electrolizeregular";
    requestAnimationFrame(GameView.frame.bind(this));
  },
  frame:function(_this)
  {
    this.frameClean();
    //render objects.
    GameViewFPS.frame(this.ctx);

    this.benchmarkEnd()
    this.benchmarkStart()

    requestAnimationFrame(GameView.frame.bind(this));
  },
  frameClean:function()
  {
    this.renderModeUI();
    this.ctx.fillStyle="#000000";
    this.ctx.fillRect(0, 0, 800, 600);
  },
  renderModeUI:function()
  {
    this.ctx.setTransform(1, 0, 0, 1, -0.5, -0.5)
    //GameModel.rendering.mode = 'ui'
  },
  renderModeGame:function()
  {
    this.ctx.setTransform(
      1,
      0,
      0,
      1,
      -0.5,
      -0.5
    )
    //GameModel.rendering.mode='game'
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
