export default function run(input) {
    return input.matchAll(/mul\((?<d1>(\d+)),(?<d2>(\d+))\)/g).reduce((sum, val) =>
        sum + (parseInt(val.groups.d1) * parseInt(val.groups.d2)), 0);
}