function calculator(operandOne) {

        return {
            add: function getResultAdd(operandTwo) {
                return operandOne + operandTwo
            },

            sub: function getResultSub(operandTwo) {
                return operandOne - operandTwo
            },

            divide: function getResultDivide(operandTwo) {
                return operandOne * operandTwo
            },

            multiplay: function getResultMultiplay(operandTwo) {
                return operandOne/operandTwo
            },

            set: function getResultSet(value) {
                return operandOne = value
            } 
    }

}

let calc = calculator(10);

let result = calc.add(5);
console.log(result);
result = calc.divide(2);
console.log(result);
result = calc.sub(20);
console.log(result);
result = calc.multiplay(2);
console.log(result);

result = calc.set(200);
console.log(result);
result = calc.add(5);
console.log(result);