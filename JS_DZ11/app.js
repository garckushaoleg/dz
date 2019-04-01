function calculator(operandOne) {

        return {
            add: function getResultAddition(operandTwo) {
                return operandOne + operandTwo
            },

            sub: function getResultSubtraction(operandTwo) {
                return operandOne - operandTwo
            },

            divide: function getResultDivision(operandTwo) {
                return operandOne/operandTwo
            },

            mult: function getMultiplicationResult(operandTwo) {
                return operandOne*operandTwo
            },

            set: function getChangedBaseValue(value) {
                return operandOne = value
            },

            get: function getBaseValue() {
                return operandOne;
            } 
    }

}

let calc = calculator(10);

let result = calc.add(45);
console.log(result);
result = calc.divide(5);
console.log(result);
result = calc.sub(45);
console.log(result);
result = calc.mult(5);
console.log(result);

result = calc.set(100);
console.log(result);
result = calc.add(5);
console.log(result);
result = calc.get();
console.log(result);
result = calc.mult(5);
console.log(result);