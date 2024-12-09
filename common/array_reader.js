import { swap } from '../common/arrays'

export default class ArrayReader {
    arr;
    readIndex = 0;

    constructor(arr) {
        this.arr = arr;
    }

    read(number) {
        let count = 0;
        while (this.arr[this.readIndex] == number) {
            this.readIndex++;
            count++;
        }
        return count;
    }

    end() {
        return this.readIndex == this.arr.length;
    }

    swap(index1, index2) {
        swap(this.arr, index1, index2);
    }

    readUntil(predicate) {
        while (!predicate(this.peek())) {
            this.readNext();
        }
    }

    reset() {
        this.readIndex = 0;
    }

    array() {
        return this.arr;
    }

    findSequence(value, length, before) {
        let targetSpaceIndex = -1;
        while (true) {
            this.readUntil(v => v == value);
            if (this.readIndex > before) break;
            targetSpaceIndex = this.readIndex;
            this.readUntil(v => v != value);
            if (this.readIndex - targetSpaceIndex < length) {
                targetSpaceIndex = -1;
            } else {
                break;
            }
        }
        return targetSpaceIndex;
    }

    readNext() {
        this.readIndex++
        if (this.readIndex >= this.arr.length) return null;
        return this.arr[this.readIndex];
    }

    peek() {
        return this.arr[this.readIndex];
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