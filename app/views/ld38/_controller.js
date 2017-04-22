var GameController = {
  init:function()
  {
    GameModel.init();
    GameView.init();
  },
  loop:function()
  {
    GameModel.frame();
    GameModel.benchmarkEnd();
    GameModel.benchmarkStart();
  }
}
