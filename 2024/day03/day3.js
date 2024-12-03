export function part1(input) {
    return input.matchAll(/mul\((?<d1>(\d+)),(?<d2>(\d+))\)/g).reduce((sum, val) =>
        sum + (parseInt(val.groups.d1) * parseInt(val.groups.d2)), 0);
}

export function part2(input) {
    let on = true;
    return input.matchAll(/mul\((?<d1>(\d+)),(?<d2>(\d+))\)|don't\(\)|do\(\)/g).reduce((sum, val) => {
        switch (val[0]) {
            case 'do()':
                on = true;
                break;
            case 'don\'t()':
                on = false;
                break;
            default:
                sum += on ? (parseInt(val.groups.d1) * parseInt(val.groups.d2)) : 0;
        }
        return sum;
    }, 0);
}