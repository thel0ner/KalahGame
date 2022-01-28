import { Game } from "../../shared/types/game-dto.type";

export type MoveResponse = {
    game:Game,
    canPlayerPlayAgain: boolean,
    chosenPitsByMachine: number[],
};
