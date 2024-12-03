export default function run(input, enableSwitch) {
    let on = true;
    return input.matchAll(/mul\((?<d1>(\d+)),(?<d2>(\d+))\)|don't\(\)|do\(\)/g).reduce((sum, val) => {
        switch (val[0]) {
            case 'do()':
                on = true;
                return sum;
            case 'don\'t()':
                on = false;
                return sum;
        }
        return sum += on || !enableSwitch ? (parseInt(val.groups.d1) * parseInt(val.groups.d2)) : 0;
    }, 0);
}