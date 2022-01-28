package kaveh.taher.kalahGame.GameEngine;

import kaveh.taher.kalahGame.models.Game;
import kaveh.taher.kalahGame.models.GameResult;
import kaveh.taher.kalahGame.models.GameRoundResult;

public class GamePlayer {
    private Game game;
    private int chosenPit;
    public GamePlayer(
            Game game,
            int chosenPit
    ){
        this.game = game;
        this.chosenPit = chosenPit;
    }

    private GameRoundResult takeCareOfPlayerMove() throws InvalidMove {
        if(game.getPlayerPits()[chosenPit] == 0) throw new InvalidMove("empty pit selected");
        Game playerState = game;
        GameUtilities gameUtilities = new GameUtilities(playerState);
        return gameUtilities.player(chosenPit);
    }

    public GameResult playersResult() throws InvalidMove {
        GameRoundResult playerResult = takeCareOfPlayerMove();
        GameResult result = new GameResult(
                playerResult.getPlayerState(),
                playerResult.canPlayerPlayAgain(),
                null
        );
        return result;
    }
}
