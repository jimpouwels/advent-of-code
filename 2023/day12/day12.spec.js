import { readLines } from '../../common/readlines.js';
import run from './day12.js';

describe('day11', () => {

    it('runs', () => {
        expect(run(readLines('2023/day12/testdata.txt'), 1)).toEqual(7653);
        expect(run(readLines('2023/day12/testdata.txt'), 5)).toEqual(60681419004564);
    });

});