import { readLines } from '../../common/readlines.js';
import run from './day10.js';

describe('day10', () => {

    it('run', () => {
        expect(run(readLines('2024/day10/testdata.txt'))).toEqual(512);
    });

});