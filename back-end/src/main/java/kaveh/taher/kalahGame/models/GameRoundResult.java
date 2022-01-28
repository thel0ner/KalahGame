package kaveh.taher.kalahGame.models;

public class GameRoundResult {
    private Game playerState;
    private boolean canPlayerPlayAgain;

    public GameRoundResult(
            Game playerState,
            boolean canPlayerPlayAgain
    ){
        this.playerState = playerState;
        this.canPlayerPlayAgain = canPlayerPlayAgain;
    }
    public Game getPlayerState() {
        return playerState;
    }
    public boolean canPlayerPlayAgain() {
        return canPlayerPlayAgain;
    }
}
