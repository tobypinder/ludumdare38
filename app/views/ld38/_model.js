var GameModel = {
  engineTimer: null, //timer to clear when not in game!
  stats: {
    MAX_FPS:60,
    computedFrames:0,
    timeStart:new Date().getTime(),
    timeEnd:new Date().getTime(),
    frameTime:0,
    fps:0
  },
  init:function() {
    GameModelWorld.init();
    GameModelPlanet.init();
    this.engineTimer = setInterval(GameModel.frame.bind(this), (1000 / GameModel.stats.MAX_FPS));
  },
  frame:function(){
    var ms = GameModel.stats.frameTime
    GameState.advanceTime(ms);
    if(ms >= 1) {
      // Only work if at least a millisecond has elapsed!
      GameModelWorld.frame(ms)
    }

    GameControllerMouse.frame(ms);
    this.timingEnd();
    this.timingStart();
  },
  timingStart:function() {
    this.stats.timeStart = new Date().getTime()
  },
  timingEnd:function(){
    this.stats.timeEnd = new Date().getTime()
    this.stats.frameTime = this.stats.timeEnd - this.stats.timeStart
    if(this.stats.frameTime > 1000) {
      console.warn('Model Frame time too large: ', this.stats.frameTime)
      this.stats.frameTime = 1000
    }
    if(this.stats.frameTime > 0 )
    {
      this.stats.fps = Math.round(1000/this.stats.frameTime)
    }
  }
}
