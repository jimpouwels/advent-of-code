import { swap } from "../../common/arrays";
import Rule from "./model/rule";

export default function run(input, fixIncorrect = false) {
    let split = input.split('\n\n');
    let rules = split[0].split('\n').map(l => new Rule(l.split('|')[0], l.split('|')[1]));
    let updates = split[1].split('\n').map(l => l.split(',').map(pn => parseInt(pn)));

    let result = updates.reduce((sum, update) => {
        let allMeet = update.filter((_, i) => {
            if (i == update.length - 1) return true;
            return update.slice(i + 1).filter((_, j) =>
                rules.every(r => {
                    let m = r.meets(update[i], update[i + j + 1]);
                    if (!m && fixIncorrect) {
                        swap(update, i, i + j + 1);
                    }
                    return m;
                })
            ).length == update.slice(i + 1).length;
        }).length == update.length;
        return sum += (!allMeet && fixIncorrect) || (allMeet && !fixIncorrect) ? update[Math.floor(update.length / 2)] : 0;
    }, 0);
    return result;
}