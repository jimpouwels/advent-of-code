export default class Draw {
    
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