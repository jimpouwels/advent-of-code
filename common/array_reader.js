export default class ArrayReader {
    arr;
    readIndex = 0;

    constructor(arr) {
        this.arr = arr;
    }

    read(number) {
        while (this.arr[0] == -1) {
            this.shift();
        }
        let count = 0;
        while (this.arr[0] == number) {
            this.shift();
            count++;
        }
        return count;
    }

    shift() {
        this.readIndex++;
        return this.arr.shift();
    }

    at(i) {
        return this.arr[i];
    }

    length() {
        return this.arr.length;
    }
}