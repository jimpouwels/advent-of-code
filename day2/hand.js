export default class Hand {
    value;
    beats;
    matches = [];

    constructor(value, ...matches) {
        this.value = value;
        this.matches = matches;
    }

    fight(other) {
        let score = 0;
        if (other === this) {
            score += 3;
        } else if (other === this.beats) {
            score += 6;
        }
        return score + this.value;
    }

    hasMatch(value) {
        return this.matches.includes(value);
    }
}