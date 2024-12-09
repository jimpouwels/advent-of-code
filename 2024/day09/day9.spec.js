import { readFile } from '../../common/readlines.js';
import run from './day9.js';

describe('day9', () => {

    it('run', () => {
        expect(run(readFile('2024/day09/testdata.txt'))).toEqual(1928);
    });

});