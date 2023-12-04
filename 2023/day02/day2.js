export default function run(lines, cubes) {
    let maxDraw = new Draw(cubes.red, cubes.blue, cubes.green);
    let games = parseGames(lines)
    
    let part1 = games.filter(game => game.draws.filter(d => !d.fits(maxDraw)).length == 0)
                                 .reduce((sum, possibleGame) => sum + possibleGame.gameNumber, 0);

    let part2 = games.map(game => game.lowestDraw())
                     .map(lowestDraw => lowestDraw.red() * lowestDraw.green() * lowestDraw.blue())
                     .reduce((sum, val) => sum + val, 0);

    return {
        part1: part1,
        part2: part2
    }
}

function parseGames(lines) {
    return lines.map(gameString => {
        let match = gameString.match(/Game (\d+): (.*)/);
        let parsedDraws = match[2].split('; ').map(draw => parseDraw(draw));
        return new Game(parseInt(match[1]), parsedDraws);
    });
}

function parseDraw(drawString) {
    let parsedDraw = new Draw(0, 0, 0);
    drawString.split(', ').forEach(d => {
        let split = d.split(' ');
        parsedDraw.add(split[1], parseInt(split[0]));
    })
    return parsedDraw;
}

class Game {
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