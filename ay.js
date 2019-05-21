function addition(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}

function subtract(a, b) {
    return a - b;
}

function divide(a, b) {
    return a / b;
}

function exponent(a,b){
    return Math.pow(b, a)
}

function RPN(input) {
    let stack = [];
    for (let i=0; i < input.length; i++) {
        element = parseFloat(input[i]);
        if (!Number.isNaN(element)) {
            stack.push(element);
        } else {
            if (input[i] === '+') {
                let b = stack.pop();
                let a = stack.pop();
                stack.push(addition(a, b));
            }
            if (input[i] === '*') {
                let b = stack.pop();
                let a = stack.pop();
                stack.push(multiply(a, b));
            }
            if (input[i] === '/') {
                let b = stack.pop();
                let a = stack.pop();
                stack.push(divide(a, b));
            }
            if (input[i] === '-') {
                let b = stack.pop();
                let a = stack.pop();
                stack.push(subtract(a, b));
            }

            if (input[i] === '^') {
                let b = stack.pop();
                let a = stack.pop();
                stack.push(exponent(b, a));
            }
            
        }
    }
    return stack;
}

console.log(RPN(['3','4','11', '+', '*', '22', '/','.']));  // 2.04545
console.log(RPN(['2', '2', '+', '.']));  // 4
console.log(RPN(['2', '+', '.']));// error, too few items on the stack

console.log(RPN([ '5',
'2',
'3',
'2',
'^',
'*',
'+',
'5',
'3',
'8',
'7',
'-',
'/',
'-',
'/',
'3',
'^',
'1',
'+',
'7',
'3',
'7',
'*',
'+',
'1',
'2',
'/',
'^',
'/' ]))