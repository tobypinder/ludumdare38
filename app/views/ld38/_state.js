var GameState = {
  state: 'init',
  showAllViewCones: true,
  load:function(token)
  {
    this.state = 'ingame';
    $('.game-area').html("<canvas id=\"game\" width=\"800\" height=\"600\"></canvas>")
    GameController.init();
  }
}
