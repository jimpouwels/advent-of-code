export default function run(input, enableSwitch) {
    let on = true;
    return input.matchAll(/mul\((?<d1>(\d+)),(?<d2>(\d+))\)|don't\(\)|do\(\)/g).reduce((sum, val) => {
        on |= val[0] == 'do()';
        on = val[0] == 'don\'t()' ? false : on;
        return sum += val.groups.d1 && (on || !enableSwitch) ? (parseInt(val.groups.d1) * parseInt(val.groups.d2)) : 0;
    }, 0);
}