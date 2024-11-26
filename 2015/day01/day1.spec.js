import { readFile } from '../../common/readlines.js';
import day1 from './day1.js';

describe('day1', () => {

    it('runs', () => {
        expect(day1(readFile('2015/day01/testdata.txt'))).toEqual(74);
    });

});