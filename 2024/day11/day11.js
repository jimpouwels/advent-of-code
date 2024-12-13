export default function run(input, blinkCnt) {
    let numbers = new Numbers(input.split(' ').map(n => parseInt(n)));

    for (let i = 0; i < blinkCnt; i++) {
        let add = [];
        let remove = [];
        numbers.keys().forEach(key => {
            let cnt = numbers.get(key);
            let keyStr = key.toString();
            if (key == 0) {
                remove.push(new Delta(0, cnt));
                add.push(new Delta(1, cnt));
            } else if (keyStr.length % 2 == 0) {
                remove.push(new Delta(key, cnt));
                add.push(new Delta(parseInt(keyStr.substring(0, keyStr.length / 2)), cnt));
                add.push(new Delta(parseInt(keyStr.substring(keyStr.length / 2, keyStr.length)), cnt));
            } else {
                remove.push(new Delta(key, cnt));
                add.push(new Delta(key * 2024, cnt));
            }
        });
        add.forEach(a => numbers.increase(a));
        remove.forEach(a => numbers.decrease(a));

    };
    let total = 0;
    numbers.map.forEach(value => total += (value > 0 ? value : 0));
    return total;
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

    increase(delta) {
        if (!this.map.has(delta.number))
            this.map.set(delta.number, delta.count);
        else
            this.map.set(delta.number, this.map.get(delta.number) + delta.count);
    }

    decrease(delta) {
        if (this.map.has(delta.number))
            this.map.set(delta.number, this.map.get(delta.number) - delta.count);
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