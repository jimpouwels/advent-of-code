import Draw from "./draw.js";
import Game from "./game.js";

export default function run(lines, cubes) {
    let maxDraw = new Draw(cubes.red, cubes.blue, cubes.green);
    let games = parseGames(lines)
    
    let part1 = games.filter(game => game.draws.filter(d => !d.fits(maxDraw)).length == 0)
                                 .reduce((sum, possibleGame) => sum + possibleGame.gameNumber, 0);

    let part2 = games.map(game =>  Math.max(...game.draws.map(d => d.red())) *
                                   Math.max(...game.draws.map(d => d.green())) *
                                   Math.max(...game.draws.map(d => d.blue())))
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