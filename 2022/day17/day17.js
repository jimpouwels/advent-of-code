export default function run(input, rockCount) {
    const jets = input.split('');

    const chamber = new Array(0);

    let currentShape = null;
    let rockCounter = 0;

    const shapes = [
        new HorizontalLineShape(),
        new CrossShape(),
        new ReverseLShape(),
        new VerticalLineShape(),
        new BoxShape()
    ]

    let jetIndex = 0;
    let topOfStack = 0;
    while (rockCounter < rockCount + 1) {
        if (!currentShape) {
            currentShape = shapes[rockCounter % 5];
            rockCounter++;
            const previousTopOfStack = topOfStack;
            if (previousTopOfStack > currentShape.height() + 3) {
                for (let i = 0; i < previousTopOfStack - (currentShape.height() + 3); i++) {
                    chamber.shift();
                    topOfStack--;
                }
            } else if (previousTopOfStack < currentShape.height() + 3) {
                for (let i = 0; i < currentShape.height() + 3 - previousTopOfStack; i++) {
                    chamber.unshift(new Array(7).fill(0));
                    topOfStack++;
                }
            }
        }
        let previousX = currentShape.x;
        if (jets[jetIndex] === '<') {
            currentShape.x -= 1;
            if (currentShape.x < 0 || hits(chamber, currentShape, 0)) {
                currentShape.x = previousX;
            }
        } else {
            currentShape.x += 1;
            if (currentShape.right() === chamber[0].length || hits(chamber, currentShape, 0)) {
                currentShape.x = previousX;
            }
        }
        if (currentShape.bottom() === chamber.length - 1 || hits(chamber, currentShape, 1)) {
            addToChamber(currentShape, chamber);
            if (rockCounter % 1000 === 0) {
                console.log(rockCounter);
            }
            if (currentShape.y < topOfStack || topOfStack === 0) {
                topOfStack = currentShape.y;
            }
            currentShape.reset();
            currentShape = null;
        } else {
            currentShape.y += 1;
        }
        if (jetIndex === jets.length - 1) {
            jetIndex = 0;
        } else {
            jetIndex++;
        }
    }

    return {
        part1: chamber.length - topOfStack
    }
 }

 function hits(chamber, currentShape, yOffset) {
    if (chamber.length === 0) {
        return false;
    }
    for (let x = 0; x < currentShape.arr.length; x++) {
        for (let y = 0; y < currentShape.arr[x].length; y++) {
            if (currentShape.arr[x][y] > 0 && chamber[y + currentShape.y + yOffset][x + currentShape.x] > 0) {
                return true;
            }
        }
    }
    return false;
 }

 function addToChamber(shape, chamber) {
    for (let x = 0; x < shape.arr.length; x++) {
        for (let y = 0; y < shape.arr[x].length; y++) {
            chamber[y + shape.y][x + shape.x] = Math.max(chamber[y + shape.y][x + shape.x], shape.arr[x][y]);
        }
    }
 }

 function drawChamber(chamber) {
    let chamberAsString = '';
    for (let y = 0; y < chamber.length; y++) {
        chamberAsString += "|";
        for (let x = 0; x < chamber[y].length; x++) {
            chamberAsString += chamber[y][x] === 1 ? '#' : '.';
        }
        chamberAsString += "|\n";
    }
    chamberAsString += `+-------+`;
    console.log(chamberAsString);
 }

class Shape {
    x = 2;
    y = 0;

    right() {
        return this.x + this.arr.length - 1;
    }

    bottom() {
        return this.y + this.arr[0].length - 1;
    }

    height() {
        return this.arr[0].length;
    }

    reset() {
        this.x = 2;
        this.y = 0;
    }
}

class HorizontalLineShape extends Shape {
    arr = [[1], [1], [1], [1]];

}

class VerticalLineShape extends Shape  {
    arr = [[1, 1, 1, 1]];
}
 
class CrossShape extends Shape  {
    arr = [[0, 1, 0], [1, 1, 1], [0, 1, 0]];
}

class ReverseLShape extends Shape  {
    arr = [[0, 0, 1], [0, 0, 1], [1, 1, 1]];
}

class BoxShape extends Shape  {
    arr = [[1, 1], [1, 1]];
}