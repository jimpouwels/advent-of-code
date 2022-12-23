import { readLines } from '../../common/readlines.js';
import run from './day2.js';

describe('day2', () => {

    it('part1', () => {
        const result = run(readLines('2022/day2/testdata.txt'));
        expect(result.part1).toEqual(15572);
    });

    it('part2', () => {
        const result = run(readLines('2022/day2/testdata.txt'));
        expect(result.part2).toEqual(16098);
    });

});