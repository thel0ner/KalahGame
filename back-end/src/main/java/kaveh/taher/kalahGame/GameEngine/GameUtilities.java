package kaveh.taher.kalahGame.GameEngine;

import kaveh.taher.kalahGame.models.Game;
import kaveh.taher.kalahGame.models.GameRoundResult;

import java.util.Date;

public class GameUtilities {
    private Game playerState;
    private int totalPitsOfPlayer = 5;
    private int totalPitsOfOpponent = 5;
    private int playerCounter = 0;
    private int opponentCounter = 6;
    private int availableSeeds;
    private boolean canPlayerHaveExtraMove;

    public GameUtilities(
            Game playerState
    ){
        this.playerState = playerState;
    }

    private void updatePlayerStore(int newEntries){
        int currentSeedsInStore = playerState.getPlayerStore();
        playerState.setPlayerStore(currentSeedsInStore + newEntries);
    }

    private void distributeSeeds(){
        int[] playerPits = playerState.getPlayerPits();
        int[] opponentPits = playerState.getMachinePits();
        int totalSeeds = playerPits[playerCounter];
        int availablePits = playerCounter + 1;
        int opponentIteration = 0;
        int toCheck = totalPitsOfPlayer + 1;
        while(totalSeeds > 0){
            if(availablePits <= totalPitsOfPlayer){
                //if the last sown seed lands in an empty house and the opposite house contains seeds,
                //both the last seed and opposite seeds are captured in player's store
                boolean isLastSeed = totalSeeds - 1 == 0;
                if(isLastSeed && playerPits[availablePits] == 0 && opponentPits[totalPitsOfOpponent - availablePits] > 0){
                    updatePlayerStore(totalSeeds + opponentPits[availablePits]);
                    opponentPits[availablePits] = 0;
                    totalSeeds = 0;
                }else{
                    //normally updates the player's pit
                    playerPits[availablePits] = playerPits[availablePits] + 1;
                }
            }else{
                //last sown seed lands in player's store.
                if(availablePits == toCheck){
                    updatePlayerStore(1);
                    totalSeeds--;
                }else{
                    //if finished iteration of opponent pits, remaining seeds will be captured in player's store.
                    if(opponentIteration >= totalPitsOfOpponent){
                        updatePlayerStore(totalSeeds);
                        totalSeeds = 0;
                    }
                    //normally updates the opponent pit
                    opponentPits[opponentIteration] = opponentPits[opponentIteration] + 1;
                    opponentIteration++;
                }
            }
            availablePits++;
            totalSeeds--;
            //if last sown seed lands in player's store, player gets additional move
            if(availablePits == toCheck && totalSeeds == 1){
                canPlayerHaveExtraMove = true;
            }
        }
        playerState.setPlayerPits(playerPits);
        playerState.setMachinePits(opponentPits);
    }

    private void emptySelectedPit(int chosenPit){
        int[] pits = playerState.getPlayerPits();
        pits[chosenPit] = 0;
        playerState.setPlayerPits(pits);
    }

    private boolean detectEndOfGame(Game game){
        int[] playerPits = game.getPlayerPits();
        int[] machinePits = game.getMachinePits();
        boolean areAllPlayerPitsEmpty = true;
        boolean areAllMachinePlayerPitsEmpty = true;
        for(int i = 0; i <= totalPitsOfPlayer; i++){
            areAllPlayerPitsEmpty = playerPits[i] == 0;
            if (areAllPlayerPitsEmpty == false) break;
        }
        for(int j = 0; j <= totalPitsOfOpponent; j++){
            areAllMachinePlayerPitsEmpty = machinePits[j] == 0;
            if(areAllMachinePlayerPitsEmpty == false) break;
        }
        return areAllPlayerPitsEmpty || areAllMachinePlayerPitsEmpty;
    }

    public GameRoundResult player(int chosenPit){
        availableSeeds = playerState.getPlayerPits()[chosenPit];
        playerCounter = chosenPit;
        distributeSeeds();
        emptySelectedPit(chosenPit);
        if(detectEndOfGame(playerState)){
            playerState.setStatus(true);
            playerState.setEndDate(new Date());
            playerState.setWon(playerState.getPlayerStore() > playerState.getMachineStore());
        }
        GameRoundResult response = new GameRoundResult(
                playerState,
                canPlayerHaveExtraMove
        );
        return response;
    }
}
