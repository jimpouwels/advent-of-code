import { readLines } from '../readlines.js';
import day6 from './day6.js';

describe('day6', () => {

    it('part1', () => {
        expect(day6('bvwbjplbgvbhsrlpgdmjqwftvncz').part1).toEqual(5);
        expect(day6('nppdvjthqldpwncqszvftbrmjlhg').part1).toEqual(6);
        expect(day6('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg').part1).toEqual(10);
        expect(day6('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw').part1).toEqual(11);
    });

    it('part2', () => {
    });

});