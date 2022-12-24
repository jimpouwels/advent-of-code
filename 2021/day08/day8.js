export default function run(lines) {
    const outputDigits = lines.map(line => {
        const { d1, d2, d3, d4 } = line.match(/.+ \| (?<d1>([a-z]+)) (?<d2>([a-z]+)) (?<d3>([a-z]+)) (?<d4>([a-z]+))/).groups;
        return [ d1, d2, d3, d4 ];
    });

    const lengths = [ 2, 3, 4, 7 ];
    return {
        part1: outputDigits.reduce((sum, val) => sum + val.reduce((sum, val) => sum + (lengths.includes(val.length) ? 1 : 0), 0), 0)
    }
}
