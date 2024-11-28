import { readLines } from '../../common/readlines.js';
import day2 from './day2.js';

describe('day2', () => {

    it('runs', () => {
        let result = day2(readLines('2015/day02/testdata.txt'));
        expect(result.part1).toEqual(1606483);
        expect(result.part2).toEqual(3842356);
    });

});