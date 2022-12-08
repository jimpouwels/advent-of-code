import run from './day6.js';

describe('day6', () => {

    it('part1', () => {
        expect(run('bvwbjplbgvbhsrlpgdmjqwftvncz', 4)).toEqual(5);
        expect(run('nppdvjthqldpwncqszvftbrmjlhg', 4)).toEqual(6);
        expect(run('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 4)).toEqual(10);
        expect(run('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 4)).toEqual(11);
    });

    it('part2', () => {
        expect(run('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 14)).toEqual(19);
        expect(run('bvwbjplbgvbhsrlpgdmjqwftvncz', 14)).toEqual(23);
        expect(run('nppdvjthqldpwncqszvftbrmjlhg', 14)).toEqual(23);
        expect(run('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 14)).toEqual(29);
        expect(run('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 14)).toEqual(26);
    });

});