
export default function run(lines) {
    let cards = parseCards(lines);
    let part1 = cards.map(card => card.numbers.filter(n => card.winningNumbers.includes(n)))
                     .map(winningNumbers => winningNumbers.reduce((sum) => sum === 0 ? 1 : sum * 2, 0))
                     .reduce((sum, val) => sum + val, 0);

    return {
        part1: part1,
        part2: 0
    }
}

function parseCards(lines) {
    return lines.map(line => {
        const { winningNumbers, numbers } = line.match(/Card( +)(\d+): (?<winningNumbers>.*) \| (?<numbers>.*)/).groups;
        return new Card(parseNumbers(numbers), parseNumbers(winningNumbers));
    });
}

function parseNumbers(numbersString) {
    return numbersString.replaceAll('  ', ' ').split(' ').map(n => parseInt(n));
}

class Card {
    numbers = [];
    winningNumbers = [];

    constructor(numbers, winningNumbers) {
        this.numbers = numbers;
        this.winningNumbers = winningNumbers;
    }
}