import { readFile } from '../../common/readlines.js';
import { part1, part2 } from './day3.js';

describe('day3', () => {

    it('part1', () => {
        expect(part1(readFile('2024/day03/testdata.txt'), false)).toEqual(185797128);
    });

    it('part2', () => {
        expect(part2(readFile('2024/day03/testdata.txt'), false)).toEqual(89798695);
    });
});