export default function run(input, blinkCnt) {
    let numbers = new Numbers(input.split(' ').map(n => parseInt(n)));

    for (let i = 0; i < blinkCnt; i++) {
        let deltas = [];
        numbers.keys().forEach(key => {
            let cnt = numbers.get(key);
            let keyStr = key.toString();
            if (key == 0) {
                deltas.push(new Delta(0, -cnt));
                deltas.push(new Delta(1, cnt));
            } else if (keyStr.length % 2 == 0) {
                deltas.push(new Delta(key, -cnt));
                deltas.push(new Delta(parseInt(keyStr.substring(0, keyStr.length / 2)), cnt));
                deltas.push(new Delta(parseInt(keyStr.substring(keyStr.length / 2, keyStr.length)), cnt));
            } else {
                deltas.push(new Delta(key, -cnt));
                deltas.push(new Delta(key * 2024, cnt));
            }
        });
        deltas.forEach(d => numbers.handle(d));
    };
    return numbers.count();
}

class Numbers {
    map = new Map();

    constructor(data) {
        data.forEach(n => this.map.set(n, 1));
    }

    keys() {
        return this.map.keys();
    }

    get(key) {
        return this.map.get(key);
    }

    handle(delta) {
        if (!this.map.has(delta.number))
            this.map.set(delta.number, 0);

        this.map.set(delta.number, this.map.get(delta.number) + delta.count);
    }

    count() {
        let total = 0;
        this.map.forEach(value => total += (value > 0 ? value : 0));
        return total;
    }
}

class Delta {
    number;
    count;

    constructor(number, count) {
        this.number = number;
        this.count = count;
    }
}