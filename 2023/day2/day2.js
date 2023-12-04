export default function run(lines, cubes) {
    let maxDraw = new Draw(cubes["red"], cubes["blue"], cubes["green"]);
    let total = parseGames(lines).filter(game => game.draws.filter(d => !d.fits(maxDraw)).length == 0)
                                 .reduce((sum, possibleGame) => sum + possibleGame.gameNumber, 0);

    function parseGames(lines) {
        return lines.map(line => {
            let match = line.match(/Game (\d+): (.*)/);
            let draws = match[2].split('; ');
            let parsedDraws = draws.map(draw => {
                let parsedDraw = new Draw(0, 0, 0);
                draw.split(', ').map(d => {
                    let split = d.split(' ');
                    parsedDraw.add(split[1], parseInt(split[0]));
                })
                return parsedDraw;
            });
            return new Game(parseInt(match[1]), parsedDraws);
        });
    }

    return {
        part1: total,
    }
}

class Game {
    gameNumber;
    draws;

    constructor(gameNumber, draws) {
        this.gameNumber = gameNumber;
        this.draws = draws;
    }
}

class Draw {
    cubes = {
        "red": 0,
        "blue": 0,
        "green": 0
    };

    constructor(red, blue, green) {
        this.cubes["red"] = red;
        this.cubes["blue"] = blue;
        this.cubes["green"] = green;
    }

    fits(otherDraw) {
        // console.log(this);
        // console.log("vs");
        // console.log(otherDraw);
        return this.red() <= otherDraw.red() &&
               this.green() <= otherDraw.green() &&
               this.blue() <= otherDraw.blue();
    }

    red() {
        return this.cubes["red"];
    }

    blue() {
        return this.cubes["blue"];
    }

    green() {
        return this.cubes["green"];
    }

    add(key, val) {
        this.cubes[key] = val;
    }
}