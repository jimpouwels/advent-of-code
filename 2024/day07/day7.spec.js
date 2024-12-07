import { readLines } from '../../common/readlines.js';
import run from './day7.js';

describe('day7', () => {

    it('run', () => {
        expect(run(readLines('2024/day07/testdata.txt'))).toEqual(3598800864292);
    });

});