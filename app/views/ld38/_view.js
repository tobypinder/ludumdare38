var GameView = {
  WINDOW_WIDTH:800,
  WINDOW_HEIGHT:600,
  renderMode: 'world',
  worldTransform: null,
  uiTransform: null,
  stats: {
    MAX_FPS:60,
    computedFrames:0,
    timeStart:null,
    timeEnd:null,
    frameTime:0,
    fps:0
  },
  init:function(){
    this.worldTransform = new Transform()
    this.uiTransform    = new Transform()
    GameViewUI.init();

    CanvasElement = document.getElementById('game');
    //window.addEventListener("keydown",GameKeyListener.keyDown,true);
    //window.addEventListener("keyup",GameKeyListener.keyUp,true);
    Canvas = CanvasElement.getContext('2d');
    Canvas.font=Util.Font.Standard;
    requestAnimationFrame(GameView.frame.bind(this));
  },
  frame:function()
  {
    this.frameClean();

    switch(GameState.state) {
      case "menu":
        this.frameRenderStart();
        break;
      case "ingame":
        this.renderResources();
        this.frameRenderWorld();
        this.frameRenderUI();
        //this.frameRenderDebug();
        break;
    }

    this.benchmarkEnd();
    this.benchmarkStart();

    requestAnimationFrame(GameView.frame.bind(this));
  },
  frameRenderWorld: function()
  {
    GameViewPlanet.frame();
    $.each(GameModelWorld.enemies, this.frameRenderEnemy.bind(this))
    $.each(GameModelWorld.bullets, this.frameRenderBullet.bind(this))
  },
  frameRenderUI: function()
  {
    // TODO
    GameViewUI.frame();
  },
  frameRenderEnemy:function(index, enemy) {
    GameViewEnemy.render(enemy);
  },
  frameRenderBullet:function(index, bullet) {
    GameViewBullet.render(bullet);
  },
  frameRenderDebug:function()
  {
    GameViewFPS.frame();
    GameViewMouse.frame();
  },
  frameClean:function()
  {
    this.renderModeUI();
    Canvas.fillStyle="#000000";
    Canvas.fillRect(0, 0, 800, 600);
  },
  renderModeUI:function()
  {
    this.uiTransform = new Transform(1, 0, 0, 1, -0.5, -0.5)

    this.renderMode = 'ui'
    this.applyTransform(this.uiTransform);
  },
  renderModeWorld:function()
  {
    this.worldTransform = new Transform(
      GameView.gameZoom(),
      0,
      0,
      GameView.gameZoom(),
      -0.5 + GameView.xGameOffset(),
      -0.5 + GameView.yGameOffset()
    );

    this.renderMode = 'world'
    this.applyTransform(this.worldTransform);
  },
  frameRenderStart:function(){
    Canvas.font=Util.Font.Huge;
    Canvas.strokeStyle = "#ffffff"
    Canvas.fillStyle = "#ffffff"
    Canvas.textAlign = 'center'
    Canvas.fillText(
      'Click to Begin',
      GameView.WINDOW_WIDTH / 2,
      GameView.WINDOW_HEIGHT / 2
    );
  },

  renderResources: function(element) {
    var resourcesRed   = "[R] x " +  GameModelWorld.resources.red
    var resourcesGreen = "[G] x " +  GameModelWorld.resources.green
    var resourcesBlue  = "[B] x " +  GameModelWorld.resources.blue

    if(GameViewUI.visibleResourceCosts) {
      var costs = GameViewUI.visibleResourceCosts
      resourcesRed   += " ( -" + costs.red   + ")";
      resourcesGreen += " ( -" + costs.green + ")";
      resourcesBlue  += " ( -" + costs.blue  + ")";
    }


    Canvas.font = Util.Font.Tiny;
    Canvas.textAlign   = 'left'
    Canvas.strokeStyle = '#ff6666'
    Canvas.fillStyle   = '#ff6666'
    Canvas.fillText(
      resourcesRed,
      GameViewUI.TEXT_PADDING,
      GameViewUI.TEXT_PADDING + GameViewUI.TINY_TEXT_HEIGHT
    );
    Canvas.strokeStyle = '#66ff66'
    Canvas.fillStyle   = '#66ff66'
    Canvas.fillText(
      resourcesGreen,
      GameViewUI.TEXT_PADDING,
      GameViewUI.TEXT_PADDING + GameViewUI.TINY_TEXT_HEIGHT * 2
    );
    Canvas.strokeStyle = '#6666ff'
    Canvas.fillStyle   = '#6666ff'
    Canvas.fillText(
      resourcesBlue,
      GameViewUI.TEXT_PADDING,
      GameViewUI.TEXT_PADDING + GameViewUI.TINY_TEXT_HEIGHT * 3
    );
  },
  applyTransform: function(t)
  {
    var m = t.toArray(); //matrix pieces
    Canvas.setTransform(m[0], m[1], m[2], m[3], m[4], m[5])
  },

  xGameOffset:function()
  {
    var base = this.WINDOW_WIDTH / 2;
    return base + (GameModelWorld.offsetX * GameModelWorld.zoom);
  },
  yGameOffset:function()
  {
    var base = this.WINDOW_HEIGHT / 2;
    return base + (GameModelWorld.offsetY * GameModelWorld.zoom);
  },
  gameZoom:function()
  {
    return GameModelWorld.zoom;
  },

  benchmarkStart:function() {
    this.stats.timeStart = new Date().getTime();
  },
  benchmarkEnd:function(){
    this.stats.timeEnd = new Date().getTime();
    this.stats.frameTime = this.stats.timeEnd - this.stats.timeStart;
    if(this.stats.frameTime > 0 )
    {
      this.stats.fps = Math.round(1000/this.stats.frameTime)
    }
  }
}
