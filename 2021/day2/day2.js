export default function run(input) {
    const moves = input.map(line => parseMove(line));
    const part1Submargin = new BasicSubmarine();
    const part2Submargin = new AdvancedSubmarine();
    [ part1Submargin, part2Submargin ].forEach(s => moves.forEach(m => s.move(m)));
    return {
        part1: part1Submargin.getPosition(),
        part2: part2Submargin.getPosition()
    }
}

class Submarine {

    location = { horizontal: 0, depth: 0, aim: 0 };

    move(move) {
        switch (move.direction) {
            case 'forward':
                this.forward(move.value);
                break;
            case 'up':
                this.up(move.value);
                break;
            case 'down':
                this.down(move.value);
                break;
        }    
    }

    getPosition() {
        return this.location.horizontal * this.location.depth;
    }

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
    return { direction: split[0], value: parseInt(split[1]) };
}
