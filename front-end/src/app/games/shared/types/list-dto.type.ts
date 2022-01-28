import { Game } from "./game-dto.type";

export type GamesListDTO = {
    totalItems: number,
    games: Game[],
    totalPages: number,
    currentPage: number,
};
