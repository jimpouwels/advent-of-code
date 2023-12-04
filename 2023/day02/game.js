import Draw from "./draw.js";

export default class Game {
    gameNumber;
    draws;

    constructor(gameNumber, draws) {
        this.gameNumber = gameNumber;
        this.draws = draws;
    }

    lowestDraw() {
        let red = Number.MIN_VALUE;
        let blue = Number.MIN_VALUE;
        let green = Number.MIN_VALUE;
        this.draws.forEach(draw => {
            red = draw.red() > red ? draw.red() : red;
            blue = draw.blue() > blue ? draw.blue() : blue;
            green = draw.green() > green ? draw.green() : green;
        });
        return new Draw(red, blue, green);
    }
}