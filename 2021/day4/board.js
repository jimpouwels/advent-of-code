export default class Board {
    boxes = [];

    constructor(boxes) {
        this.boxes = boxes;
    }

    check(number) {
        this.boxes.filter(box => box.value == number)
                                 .forEach(box => box.checked = true);
    }
    
    hasBingo() {
        for (let i = 0; i < 5; i++) {
            if (this.boxes.filter(b => b.column == i && b.checked).length == 5 ||
                this.boxes.filter(b => b.row == i && b.checked).length == 5) {
                    return true;
                }
        }
        return false;
    }
}