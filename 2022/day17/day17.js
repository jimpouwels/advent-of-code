export default function run(input, rockCount) {
    const jets = input.split('');

    const chamber = new Array(0);

    let currentShape = null;
    let shapeCounter = 0;

    let jetIndex = 0;
    while (shapeCounter < rockCount + 1) {
        if (!currentShape) {
            if (shapeCounter % 5 === 0) {
                currentShape = new HorizontalLineShape(2, 0);
            } else if (shapeCounter % 5 === 1) {
                currentShape = new CrossShape(2, 0);
            } else if (shapeCounter % 5 === 2) {
                currentShape = new ReverseLShape(2, 0);
            } else if (shapeCounter % 5 === 3) {
                currentShape = new VerticalLineShape(2, 0);
            } else if (shapeCounter % 5 === 4) {
                currentShape = new BoxShape(2, 0);
            } 
            shapeCounter++;
            const topRockY = topY(chamber);
            if (topRockY > currentShape.arr[0].length + 3) {
                for (let i = 0; i < topRockY - (currentShape.arr[0].length + 3); i++) {
                    chamber.shift();
                }
            } else if (topRockY < currentShape.arr[0].length + 3) {
                for (let i = 0; i < currentShape.arr[0].length + 3 - topRockY; i++) {
                    chamber.unshift(new Array(7).fill(0));
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
        part1: chamber.length - topY(chamber)
    }
 }

 function topY(chamber) {
    for (let y = 0; y < chamber.length; y++) {
        for (let x = 0; x < chamber[y].length; x++) {
            if (chamber[y][x] > 0) {
                return y;
            }
        }
    }
    return 0;
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
    x = 0;
    y = 0;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    right() {
        return this.x + this.arr.length - 1;
    }

    bottom() {
        return this.y + this.arr[0].length - 1;
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