export default function run(input, blinkCnt) {
    let map = new Map();
    input.split(' ').map(n => parseInt(n)).forEach(n => map.set(n, 1));

    for (let i = 0; i < 25; i++) {
        let add = [];
        let remove = [];
        map.keys().forEach(key => {
            let cnt = map.get(key);
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
        add.forEach(a => {
            if (!map.has(a.number))
                map.set(a.number, a.count);
            else
                map.set(a.number, map.get(a.number) + a.count);
        });
        remove.forEach(a => {
            if (map.has(a.number))
                map.set(a.number, map.get(a.number) - a.count);
        });
    }
    let total = 0;
    map.forEach((value, key) => total += (value > 0 ? value : 0));
    return total;
}

class Delta {
    number;
    count;

    constructor(number, count) {
        this.number = number;
        this.count = count;
    }
}