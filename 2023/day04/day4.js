import Card from './card.js';

export default function run(lines) {
    let cards = parseCards(lines);
    cards.forEach(card => card.score());

    let part1 = cards.reduce((sum, card) => sum + card.getScore(), 0);
    let part2 = cards.map(card => addCopies(card, cards))
                     .reduce((sum, val) => sum + val, 0);
    return {
        part1: part1,
        part2: part2
    }
}

function addCopies(card, cards) {
    return card.matchingNumbers.filter((_x, i) => cards.length >= card.index + i)
                               .reduce((sum, _val, i) => sum + countCards(cards[card.index + i + 1], cards), 1);
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