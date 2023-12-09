import { readLines } from '../../common/readlines.js';
import run from './day8.js';

describe('day8', () => {

    it('runs', () => {
        let result = run(readLines('2023/day08/testdata.txt'));
        expect(result).toEqual(18024643846273);
    });

});