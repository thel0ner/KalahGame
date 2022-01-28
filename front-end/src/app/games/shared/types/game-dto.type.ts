export type Game = {
    id: string;
    username: string;
    playerPits: number[],
    machinePits: number[],
    playerStore: number,
    machineStore: number,
    won: boolean,
    status: boolean,
    startDate: string,
    endDate: string,
};