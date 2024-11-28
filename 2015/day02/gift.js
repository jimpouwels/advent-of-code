export default class Gift {

    length;
    width;
    height;

    constructor(length, width, height) {
        this.length = length;
        this.width = width;
        this.height = height;
    }

    getPaperSize() {
        let side1 = this.length * this.width;
        let side2 = this.width * this.height;
        let side3 = this.length * this.height;
        return (2 * side1) +
            (2 * side2) +
            (2 * side3) +
            Math.min(side1, side2, side3);
    }

    getRibbonSize() {
        let order = [this.width, this.height, this.length].sort();
        let shortestDistance = (order[0] * 2) + (order[1] * 2);
        let smallestPerimiter = Math.min(this.length * 2 + this.width * 2, this.width * 2 + this.height * 2, this.length * 2 + this.height * 2);
        return (Math.min(shortestDistance, smallestPerimiter)) + (this.length * this.width * this.height);
    }
}