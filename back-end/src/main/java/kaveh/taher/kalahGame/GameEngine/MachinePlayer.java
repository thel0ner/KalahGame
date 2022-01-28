package kaveh.taher.kalahGame.GameEngine;

import kaveh.taher.kalahGame.models.Game;
import kaveh.taher.kalahGame.models.GameResult;
import kaveh.taher.kalahGame.models.GameRoundResult;

import java.util.ArrayList;

public class MachinePlayer {
    private Game game;
    private ArrayList<Integer> chosenPits = new ArrayList<Integer>();
    private int chooseRandomPit(){
        int chosen = 0 + (int)(Math.random() * ((5 - 0) + 1));
        while(game.getPlayerPits()[chosen] == 0){
            chosen = 0 + (int)(Math.random() * ((5 - 0) + 1));
        }
        return chosen;
    }
    private Game reverseTable(Game game){
        Game response = new Game();
        response.setWon(game.isWon());
        response.setStatus(game.getStatus());
        response.setId(game.getId());
        response.setStartDate(game.getStartDate());
        response.setEndDate(game.getEndDate());
        response.setUsername(game.getUsername());
        //-------
        response.setMachinePits(game.getPlayerPits());
        response.setMachineStore(game.getPlayerStore());
        response.setPlayerPits(game.getMachinePits());
        response.setPlayerStore(game.getPlayerStore());
        return response;
    }

    private Game roleBackTable(Game game){
        Game response = new Game();
        response.setWon(game.isWon());
        response.setStatus(game.getStatus());
        response.setId(game.getId());
        response.setStartDate(game.getStartDate());
        response.setEndDate(game.getEndDate());
        response.setUsername(game.getUsername());
        //----
        response.setMachineStore(game.getPlayerStore());
        response.setMachinePits(game.getPlayerPits());
        response.setPlayerStore(game.getMachineStore());
        response.setPlayerPits(game.getMachinePits());
        return response;
    }

    private GameRoundResult play(int chosenPit){
        GameUtilities gameUtilities = new GameUtilities(game);
        return gameUtilities.player(chosenPit);
    }
    private GameRoundResult playForMachine(){
        chosenPits.add(chooseRandomPit());
        GameRoundResult result;
        int counter = 1;
        result = play(chosenPits.get(0));
        while(result.canPlayerPlayAgain()){
            chosenPits.add(chooseRandomPit());
            result = play(chosenPits.get(counter));
        }
        return result;
    }

    public MachinePlayer(Game game){
        this.game = game;
    }

    public GameResult playersResult(){
        game = reverseTable(game);
        GameRoundResult finalResult = playForMachine();
        GameResult response = new GameResult(
                roleBackTable(finalResult.getPlayerState()),
                false,
                chosenPits
        );
        return response;
    }
}
