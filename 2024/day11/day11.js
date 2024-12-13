import Numbers from "./model/delta";
import Delta from "./model/numbers";

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