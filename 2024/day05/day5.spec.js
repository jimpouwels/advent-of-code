import { readFile } from '../../common/readlines.js';
import run from './day5.js';

describe('day5', () => {

    it('part1', () => {
        expect(run(readFile('2024/day05/testdata.txt'))).toEqual(5129);
    });

    it('part2', () => {
        expect(run(readFile('2024/day05/testdata.txt'), true)).toEqual(4077);
    });
});