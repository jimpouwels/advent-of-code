export default function run(input) {
    const sum = input
                  .map(line => line.split(''))
                  .map(chars => {
                    let firstNum = "";
                    let secondNum = "";
                    chars.forEach(element => {
                        if (!isNaN(element) && !firstNum) {
                            firstNum = element;
                        } else if (!isNaN(element)) {
                            secondNum = element;
                        }
                    });
                    return firstNum + (secondNum ? secondNum : firstNum);
                  })
                  .reduce((sum, val) => {
                    return sum + parseInt(val)
                  }, 0);

    return {
        part1: sum
    }
}
