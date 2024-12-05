import { swap } from "../../common/arrays";
import Rule from "./model/rule";

export default function run(input, fixIncorrect = false) {
    let split = input.split('\n\n');
    let rules = split[0].split('\n').map(l => new Rule(l.split('|')[0], l.split('|')[1]));
    let updates = split[1].split('\n').map(l => l.split(',').map(pn => parseInt(pn)));

    return updates.reduce((sum, update) => {
        let allMeet = update.slice(0, -1).filter((_, i) =>
            update.slice(i + 1).filter((_, j) =>
                rules.every(r =>
                    r.meets(update[i], update[i + j + 1], (meets) => { if (!meets && fixIncorrect) swap(update, i, i + j + 1); })
                )).length == update.length - i - 1
        ).length == update.length - 1;
        return sum += (!allMeet && fixIncorrect) || (allMeet && !fixIncorrect) ? update[Math.floor(update.length / 2)] : 0;
    }, 0);
}