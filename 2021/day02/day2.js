export default function run(input) {
    const moves = input.map(line => parseMove(line));
    const part1Submarine = new BasicSubmarine();
    const part2Submarine = new AdvancedSubmarine();
    moves.forEach(move => [ part1Submarine, part2Submarine ].forEach(sub => sub.move(move)));
    return {
        part1: part1Submarine.getPosition(),
        part2: part2Submarine.getPosition()
    }
}

class Submarine {
    location = { horizontal: 0, depth: 0, aim: 0 };
    moves = { 'forward': this.forward, 'up': this.up, 'down': this.down };

    move(move) { this.moves[move.direction].call(this, move.value); }
    getPosition() { return this.location.horizontal * this.location.depth; }
    forward(_value) { throw new Error("Not implemented"); }
    up(_value) { throw new Error("Not implemented"); }
    down(_value) { throw new Error("Not implemented"); }
}

class BasicSubmarine extends Submarine {
    forward(value) { this.location.horizontal += value; }
    up(value) { this.location.depth -= value; }
    down(value) { this.location.depth += value; }
}

class AdvancedSubmarine extends Submarine {
    forward(value) { 
        this.location.horizontal += value;
        this.location.depth += (this.location.aim * value); 
    }
    up(value) { this.location.aim -= value; }
    down(value) { this.location.aim += value; }
}

function parseMove(line) {
    const split = line.split(' ');
    return { direction: split[0], value: +split[1] };
}
