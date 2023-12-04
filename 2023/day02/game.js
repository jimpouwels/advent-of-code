import Draw from "./draw.js";

export default class Game {
    gameNumber;
    draws;

    constructor(gameNumber, draws) {
        this.gameNumber = gameNumber;
        this.draws = draws;
    }
}