function evaluate(values) {
    // var input = prompt("Please enter your input string\n\nExamples of input strings:\n\n\t1. 10 4 5 + *\n\t2. 10 4 5 + * 2 +\n\t3. 10 8 *");
    // var values = input.split(" ");
    var array = new Array();
    for (i in values) {
        if (values[i] != "+" && values[i] != "*" && values[i] != "-" && values[i] != "/") {
            array.push(parseInt(values[i]));
        } else {
            var operator = values[i];
            var val2 = array.pop();
            var val1 = array.pop();
            switch (operator) {
                case "+":
                    array.push(eval("val1 + val2"));
                    break;
                case "*":
                    array.push(eval("val1 * val2"));
                    break;
                case "-":
                    array.push(eval("val1 - val2"));
                    break;
                case "/":
                    array.push(eval("val1 / val2"));
                    break;
            }
        }
    }
    if (values.lenght == 0) {
        console.log("Oops, based on your input we have nothing to calculate for you!");
    } else {
        console.log("Your RPN calculation is: ");
        console.log(array);
    }
}

function infixToPostfix(infix){
    const presedences = ["-", "+", "*", "/"];
    
	var opsStack = [],
    	postfix = [];
    
    for(let token of infix){
        // Step 1
        
    	// if("number" === typeof token){
        if(token != "+" && token != "*" && token != "-" && token != "/" && token != "(" && token != ")" ){
        	postfix.push(token); continue;
        }
        let topOfStack = opsStack[opsStack.length - 1];
        // Step 2
        if(!opsStack.length || topOfStack == "("){
        	opsStack.push(token); continue;
        }
        // Step 3
        if(token == "("){
	        opsStack.push(token); continue;
        }
        // Step 4
        if(token == ")"){
        	while(opsStack.length){
            	let op = opsStack.pop();
                if(op == "(")	break;
                postfix.push(op);
            }
            continue;
        }
        // Step 5
		let prevPresedence = presedences.indexOf(topOfStack),
        	currPresedence = presedences.indexOf(token);
        while(currPresedence < prevPresedence){
            let op = opsStack.pop();
            postfix.push(op);
            prevPresedence = presedences.indexOf(opsStack[opsStack.length - 1]);
        }
        opsStack.push(token);
	}
    // Step 6
    while(opsStack.length){
        let op = opsStack.pop();
        if(op == "(")	break;
        postfix.push(op);
    }
    
    return postfix;
}

function tokenize(exp){

    exp = exp.replace(/\s/g, "");
    var outs = exp.match(/\d+\s?\d+|\d+|[\+-\/x()*]/g);
    return outs;
}

function log(obj){
	document.querySelector("pre").textContent += JSON.stringify(obj) + "\n";
}

function RPN(seq) {

    if (seq.length <= 2) {
      console.log('Please enter valid RPN');
      return
    }
  
    var operands = ['+', '-', '*', '/' ]
    var stack = []
    var i = 0
  
    stack.push(seq[i])
    i++
  
    while(i <= seq.length) {
      var item = seq[i]
      var index = operands.indexOf(item)
      if (index < 0) {
        stack.push(seq[i])
      } else {
        if (index == 0) {
          var a = parseInt(stack.splice(-1)[0], 10)
          var b = parseInt(stack.splice(-1)[0], 10)
          stack.push(a+b)
        }
        if (index == 1) {
        var a = parseInt(stack.splice(-1)[0], 10)
          var b = parseInt(stack.splice(-1)[0], 10)
          stack.push(b-a)
        }
        if (index == 2) {
        var a = parseInt(stack.splice(-1)[0], 10)
          var b = parseInt(stack.splice(-1)[0], 10)
          stack.push(a*b)
        }
        if (index == 3) {
        var a = parseInt(stack.splice(-1)[0], 10)
          var b = parseInt(stack.splice(-1)[0], 10)
          stack.push(b/a)
        }
      }
       i++
    }
  
    return parseInt(stack[0],10)
  };

console.log(tokenize("3 * (8 + 32) - 3")); 
console.log(infixToPostfix(tokenize("3 * (8 + 32) - 3"))); 
console.log(RPN(infixToPostfix(tokenize("3 * (8 + 32) - 3")))); 