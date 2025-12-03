export default function run(input) {
    let value = input.map(line => { return { c: line.substring(0, 1), n: parseInt(line.substring(1)) }; }).reduce((sum, rotation) => {
        sum.passZeroCount += Math.floor(rotation.n / 100);
        let rValue = rotation.n % 100;
        let delta = rotation.c == 'R' ? rValue : -rValue;
        
        if ((sum.val + delta > 100) || (sum.val + delta < 0 && sum.val != 0)) {
            sum.passZeroCount++;
        }
        sum.val = (sum.val + delta) % 100;
        sum.val = sum.val < 0 ? sum.val + 100 : sum.val;
        if (sum.val == 0) {
            sum.zeroCount += 1;
            sum.passZeroCount++;
        }
        return sum;
    }, { val: 50, passZeroCount: 0, zeroCount: 0 });

    return {
        part1: value.zeroCount,
        part2: value.passZeroCount
    }
}
