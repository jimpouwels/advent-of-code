export default class Hand {
    name;
    value;
    beats;
    matches = [];

    constructor(name, value, ...matches) {
        this.name = name;
        this.value = value;
        this.matches = matches;
    }

    battle(other) {
        let score = 0;
        if (other.name === this.name) {
            score += 3;
        } else if (other.name === this.beats.name) {
            score += 6;
        }
        return score + this.value;
    }

    hasMatch(value) {
        return this.matches.includes(value);
    }
}