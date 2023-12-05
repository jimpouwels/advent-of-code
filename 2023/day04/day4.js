import Card from './card.js';

export default function run(lines) {
    let cards = parseCards(lines);
    let part1 = cards.map(c => score(c))
                     .reduce((sum, val) => sum + val, 0);
    let part2 = cards.map(c => countCards(c, cards))
                     .reduce((sum, val) => sum + val, 0);
    return {
        part1: part1,
        part2: part2
    }
}

function score(card) {
    if (card.matchCount) {
        return card.matchCount;
    }
    let numbers = card.numbers.filter(n => card.winningNumbers.includes(n));
    card.matchCount = numbers.length;
    return numbers.reduce((sum) => sum === 0 ? 1 : sum * 2, 0);
}

function countCards(card, cards) {
    score(card);
    return Array(card.matchCount).fill(null).reduce((sum, _val, i) => {
        if (cards.length >= card.index + i) {
            sum += countCards(cards[card.index + i + 1], cards);
        }
        return sum;
    }, 1);
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