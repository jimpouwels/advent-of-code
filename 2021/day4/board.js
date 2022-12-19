export default class Board {
    boxes = [];
    score = 0;
    lastNumber = -1;

    constructor(boxes) {
        this.boxes = boxes;
    }

    check(number) {
        this.lastNumber = number;
        this.boxes.filter(box => box.value == number)
                  .forEach(box => box.checked = true);
    }
    
    hasBingo() {
        for (let i = 0; i < 5; i++) {
            if (this.boxes.filter(b => b.column == i && b.checked).length == 5 ||
                this.boxes.filter(b => b.row == i && b.checked).length == 5) {
                    this.calculateScore();
                    return true;
                }
        }
        return false;
    }

    calculateScore() {
        this.score = this.boxes.reduce((sum, val) => sum + (!val.checked ? val.value : 0), 0) * this.lastNumber;
    }
}