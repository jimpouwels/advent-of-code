import { readFile } from '../../common/readlines.js';
import day3 from './day3.js';

describe('day3', () => {

    it('runs', () => {
        expect(day3(readFile('2015/day03/testdata.txt'), 1)).toEqual(2572);
        expect(day3(readFile('2015/day03/testdata.txt'), 2)).toEqual(2631);
    });

});