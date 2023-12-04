import { readFile } from '../../common/readlines.js';
import run from './day6.js';

describe('day6', () => {

    it('runs', () => {
        expect(run(readFile('2021/day06/testdata.txt'), 256)).toEqual(1634946868992);
    });

});