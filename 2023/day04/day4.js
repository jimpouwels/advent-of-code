import Card from './card.js';

export default function run(lines) {
    let cards = parseCards(lines);
    cards.forEach(card => card.score());

    let part1 = cards.reduce((sum, card) => sum + card.getScore(), 0);
    let part2 = cards.map(card => addCopyCount(card, cards))
                     .reduce((sum, val) => sum + val, 0);
    return {
        part1: part1,
        part2: part2
    }
}

function addCopyCount(card, cards) {
    return card.getMatchingNumbers().filter((_, i) => cards.length >= card.getIndex() + i)
                               .reduce((sum, _, i) => sum + addCopyCount(cards[card.getIndex() + i + 1], cards), 1);
}

function parseCards(lines) {
    return lines.map(line => {
        const { index, winningNumbers, numbers } = line.match(/Card( +)(?<index>\d+): (?<winningNumbers>.*) \| (?<numbers>.*)/).groups;
        return new Card(parseInt(index) - 1, parseNumbers(numbers), parseNumbers(winningNumbers));
    });
}

function parseNumbers(numbersString) {
    return numbersString.trim().replaceAll('  ', ' ').split(' ').map(n => parseInt(n));
}