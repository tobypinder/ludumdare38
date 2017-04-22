var GameModel = {
  engineTimer: null, //timer to clear when not in game!
  stats: {
    MAX_FPS:60,
    computedFrames:0,
    timeStart:null,
    timeEnd:null,
    frameTime:0,
    fps:0
  },
  init:function() {
    this.engineTimer = setInterval(GameController.loop, (1000 / GameModel.stats.MAX_FPS));
  },
  frame:function(){
    // do stuff.
    this.benchmarkEnd();
    this.benchmarkStart();
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
