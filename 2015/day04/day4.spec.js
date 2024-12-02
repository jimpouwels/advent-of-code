import day4 from './day4.js';

describe('day4', () => {

    it('runs', () => {
        expect(day4('iwrupvqb', 5)).toEqual(346386);
        // Takes too long for the tests to be quick, uncomment to get the result
        // expect(day4('iwrupvqb', 6)).toEqual(9958218);
    });

});