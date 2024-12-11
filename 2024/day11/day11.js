export default function run(input, blinkCnt) {
    let numbers = input.split(' ').map(n => parseInt(n));
    for (let i = 0; i < blinkCnt; i++) {
        numbers = numbers.flatMap(n => {
            let nStr = n.toString();
            if (n == 0) {
                return 1;
            }
            if (nStr.length % 2 == 0) {
                return [parseInt(nStr.substring(0, nStr.length / 2)), parseInt(nStr.substring(nStr.length / 2, nStr.length))]
            }
            return n * 2024;
        });
    }
    return numbers.length;
}