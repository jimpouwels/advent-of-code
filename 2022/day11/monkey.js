export default class Monkey {
    
    items = [];
    operation;
    testDivision;
    throwToMonkeyIfTrue;
    throwToMonkeyIfFalse;
    throwHandler;
    limit = 0;
    handleCount = 0;
    divideBy3;

    constructor(divideBy3) {
        this.divideBy3 = divideBy3;
    }

    throw(item, targetMonkey) {
        this.throwHandler(item, targetMonkey);
    }

    inspectAndThrow() {
        this.items.forEach(item => {
            item %= this.limit;

            let valueToThrow = 0;
            valueToThrow = this.operation(item);
            if (this.divideBy3) {
                valueToThrow = Math.floor(valueToThrow /= 3);
            }
            this.throw(valueToThrow, this.isDivisable(valueToThrow) ? 
                                        this.throwToMonkeyIfTrue : 
                                        this.throwToMonkeyIfFalse);
            this.handleCount++;
        });
        this.items = [];
    }

    isDivisable(value) {
        return value % this.testDivision === 0;
    }
}