import Rule from "./model/rule";

export default function run(input) {
    let split = input.split('\n\n');
    let rules = split[0].split('\n').map(l => new Rule(l.split('|')[0], l.split('|')[1]));
    let updates = split[1].split('\n').map(l => l.split(',').map(pn => parseInt(pn)));

    return updates.reduce((sum, update) => {
        let allMeet = update.filter((pn, i) => {
            if (i == update.length - 1) return true;
            let meets = true;
            for (let j = i + 1; j < update.length; j++) {
                if (!rules.every(r => r.meets(pn, update[j]))) {
                    meets = false;
                }
            }
            return meets;
        }).length == update.length;
        return sum += (allMeet ? update[Math.floor(update.length / 2)] : 0);
    }, 0);
}