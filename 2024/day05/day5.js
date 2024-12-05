import Rule from "./model/rule";

export default function run(input, fixIncorrect = false) {
    let split = input.split('\n\n');
    let rules = split[0].split('\n').map(l => new Rule(l.split('|')[0], l.split('|')[1]));
    let updates = split[1].split('\n').map(l => l.split(',').map(pn => parseInt(pn)));

    let result = updates.reduce((sum, update) => {
        let allMeet = update.filter((pn, i) => {
            if (i == update.length - 1) return true;
            let meets = true;
            for (let j = i + 1; j < update.length; j++) {
                meets &= rules.every(r => {
                    let m = r.meets(pn, update[j]);
                    if (!m && fixIncorrect) {
                        update[i] = update[j];
                        update[j] = pn;
                        pn = update[i];
                    }
                    return m;
                });
            }
            return meets;
        }).length == update.length;
        if (fixIncorrect)
            return sum += (!allMeet ? update[Math.floor(update.length / 2)] : 0);
        else
            return sum += (allMeet ? update[Math.floor(update.length / 2)] : 0);
    }, 0);
    return result;
}