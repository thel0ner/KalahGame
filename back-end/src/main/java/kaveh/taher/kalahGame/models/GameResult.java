package kaveh.taher.kalahGame.models;

import kaveh.taher.kalahGame.models.Game;

import java.util.ArrayList;

public class GameResult {
    private Game game;
    private boolean canPlayerPlayAgain;
    private ArrayList<Integer> chosenPitsByMachine;

    public GameResult(
            Game game,
            boolean canPlayerPlayAgain,
            ArrayList<Integer> chosenPitsByMachine
    ){
        this.game = game;
        this.canPlayerPlayAgain = canPlayerPlayAgain;
        this.chosenPitsByMachine = chosenPitsByMachine;
    }

    public Game getGame() {
        return game;
    }

    public boolean getCanPlayerPlayAgain() {
        return canPlayerPlayAgain;
    }

    public ArrayList<Integer> getChosenPitsByMachine() {
        return chosenPitsByMachine;
    }
}
