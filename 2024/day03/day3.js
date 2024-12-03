export default function run(input, enableSwitch) {
    let on = true;
    return input.matchAll(/mul\((?<d1>(\d+)),(?<d2>(\d+))\)|don't\(\)|do\(\)/g).reduce((sum, val) => {
        if (val[0] == 'do()') {
            on = true;
            return sum;
        } else if (val[0] == 'don\'t()') {
            on = false;
            return sum;
        }
        return sum += on || !enableSwitch ? (parseInt(val.groups.d1) * parseInt(val.groups.d2)) : 0;
    }, 0);
}