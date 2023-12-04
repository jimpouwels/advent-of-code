export default function run(lines, cubes) {
    
    let games = parseGames(lines);

    let total = games.filter(game =>
        game.draws.filter(d => {
                return d.red() > cubes["red"] || d.green() > cubes["green"] || d.blue() > cubes["blue"];
            }).length == 0
        ).reduce((sum, possibleGame) => sum + possibleGame.gameNumber, 0);

    function parseGames(lines) {
        return lines.map(line => {
            let match = line.match(/Game (\d+): (.*)/);
            let draws = match[2].split('; ');
            let parsedDraws = draws.map(draw => {
                let parsedDraw = new Draw();
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