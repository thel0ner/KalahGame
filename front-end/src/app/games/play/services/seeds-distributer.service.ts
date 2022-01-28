import { Injectable } from '@angular/core';
import { Game } from '../../shared/types/game-dto.type';
@Injectable()
export class SeedsDistributerService {
  constructor() { }

  public distributeSeeds(game: Game, chosenPit: number): Promise<Game> {
    return new Promise(
      (resolve) => {
        const playerPits: number[] = game.playerPits;
        const opponentPits: number[] = game.machinePits;
        let playerStore = game.playerStore;
        let opponentStore = game.machineStore;
        let totalSeeds = playerPits[chosenPit];
        let counter = chosenPit;
        let counterInOpponentPits = 0;
        while (totalSeeds > 0) {
          if (counter >= 5) {
            if (counter === playerPits.length + 1) {
              playerStore++;
            } else {
              opponentPits[counterInOpponentPits] = opponentPits[counterInOpponentPits] + 1;
              counterInOpponentPits++;
            }
          } else {
            let isLastSeed = (totalSeeds - 1) === 0
            if (isLastSeed && playerPits[counter] === 0 && opponentPits[5 - counter] > 0) {
              playerStore = totalSeeds + opponentPits[5 - counter];
            } else {
              playerPits[counter] = playerPits[counter] + 1;
            }
          }
          totalSeeds--;
          counter++;
        }
        playerPits[chosenPit] = 0;
        game.playerPits = playerPits;
        game.playerStore = playerStore;
        game.machinePits = opponentPits;
        game.machineStore = opponentStore;
        resolve(game)
        // let totalPitsOfPlayer = 5;
        // let totalPitsOfOpponent = 5;
        // let playerCounter = chosenPit + 1;
        // let availablePits = 5 - chosenPit;
        // let opponentIteration = 0;
        // let toCheck = totalPitsOfPlayer + 1;
        // // let canPlayerHaveExtraMove = false;
        // while (totalSeeds > 0) {
        //   if (availablePits <= totalPitsOfPlayer) {
        //     let isLastSeed = totalSeeds - 1 == 0;
        //     if (isLastSeed && playerPits[availablePits] == 0 && opponentPits[totalPitsOfOpponent - availablePits] > 0) {
        //       playerStore = playerStore + (totalSeeds + opponentPits[availablePits]);
        //       opponentPits[availablePits] = 0;
        //       totalSeeds = 0;
        //     } else {
        //       playerPits[availablePits] = playerPits[availablePits] + 1;
        //     }
        //   } else {
        //     if (availablePits == toCheck) {
        //       playerStore = playerStore + 1;
        //       totalSeeds--;
        //     } else {
        //       if (opponentIteration >= totalPitsOfOpponent) {
        //         playerStore = playerStore + totalSeeds;
        //         totalSeeds = 0;
        //       }
        //       opponentPits[opponentIteration] = opponentPits[opponentIteration] + 1;
        //       opponentIteration++;
        //     }
        //   }
        //   availablePits--;
        //   totalSeeds--;
        // if (availablePits == toCheck && totalSeeds == 1) {
        // canPlayerHaveExtraMove = true;
        // }
        // }
        // playerPits[chosenPit] = 0;
        // game.playerPits = playerPits;
        // game.machinePits = opponentPits;
        // game.playerStore = playerStore;
        // game.machineStore = opponentStore;
        // resolve(game);
      }
    );
  }

  updateByChosenPitOnBehalfOfMachine(chosenPit: number, state: Game) {
    const fakeState: Game = {
      endDate: state.endDate,
      id: state.id,
      machinePits: state.playerPits,
      machineStore: state.playerStore,
      playerPits: state.machinePits,
      playerStore: state.machineStore,
      startDate: state.startDate,
      status: state.status,
      username: state.username,
      won: state.won,
    };
    return this.distributeSeeds(fakeState, chosenPit);
  }
}
