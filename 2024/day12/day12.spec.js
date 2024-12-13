import { readLines } from '../../common/readlines.js';
import run from './day12.js';

describe('day12', () => {

    it('run', () => {
        expect(run(readLines('2024/day12/testdata.txt'))).toEqual(1381056);
    });

});