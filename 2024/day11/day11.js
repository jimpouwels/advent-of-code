export default function run(input, blinkCnt) {
    let map = new Map();
    input.split(' ').map(n => parseInt(n)).forEach(n => map.set(n, 1));

    for (let i = 0; i < 25; i++) {
        let add = [];
        let remove = [];
        map.keys().forEach(key => {
            let cnt = map.get(key);
            for (let i = 0; i < cnt; i++) {
                let keyStr = key.toString();
                if (key == 0) {
                    remove.push(0);
                    add.push(1);
                } else if (keyStr.length % 2 == 0) {
                    remove.push(key);
                    add.push(parseInt(keyStr.substring(0, keyStr.length / 2)));
                    add.push(parseInt(keyStr.substring(keyStr.length / 2, keyStr.length)));
                } else {
                    remove.push(key);
                    add.push(key * 2024);
                }
            }
        });
        add.forEach(a => {
            if (!map.has(a))
                map.set(a, 1);
            else
                map.set(a, map.get(a) + 1);
        });
        remove.forEach(a => {
            if (!map.has(a))
                map.set(a, 0);
            else
                map.set(a, map.get(a) - 1);
        });
    }
    let total = 0;
    map.forEach((value, key) => total += (value > 0 ? value : 0));
    return total;
}