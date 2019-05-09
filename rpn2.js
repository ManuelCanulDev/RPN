function main(){

        var rs = require('readline');

        const resp = rs.createInterface({
            input: process.stdin,
            output: process.stdout
          });

          resp.question('Introduzca lo que vamos a calcular: ', (VALO) => {
            
            console.log("Validando parentesís...");
            let expr = "2 * 3 *(3/3)";
            let {error, index} = verify(VALO);
            if (error === false) {
              console.log();
              console.log('¡Expresión correcta!');
              console.log();
              console.log("Evaluando Operandos...");
              let sig = evaluate(VALO);
              if(sig === true){
                console.log("¡Operandos correctos!")
                console.log();
                console.log("Separando ecuacion...");
                console.log(tokenize(VALO)); 

                let {consigers,  erers} = validarErrSig(VALO);
                
                if(consigers === true){
                    console.log("¡Se detectó un error en la expresión!");
                    console.log("¡Se hallaron caracteres invalidos!");
                    console.log(erers);
                }else{
                  console.log();
                console.log("Pasando a Postfijo...");
                console.log(infixToPostfix(tokenize(VALO))); 
                console.log();
                console.log("Evaluando y resolviendo RPN...");
                console.log(RPN(infixToPostfix(tokenize(VALO)))); 
                console.log();
                console.log("FINALIZADO");
              }
                }
                else{
                  console.log("¡Se detectó un error en la expresión!");
                }
                
            } else {
              console.log();
              console.log(`¡Se detectó un error en la expresión en el indice ${index}!`);
            }
            resp.close();
          });

}

function verify(expr) {
  let stack = [];
  const allSymbols = ['{', '[', '(', ')', ']', '}'];
  const openSymbols = ['{', '[', '('];
  const checkSymbols = { '{': '}', '[': ']', '(': ')' };

  for (let i = 0; i < expr.length; ++i) {
      let token = expr[i];
      if (allSymbols.findIndex(e => e === token) >= 0) {
          if (openSymbols.findIndex(e => e === token) >= 0) {
              stack.push(token);
          } else {
              if (stack.length === 0) {
                  return { error: true, index: i };
              }

              let poppedToken = stack.pop();
              if (checkSymbols[poppedToken] !== token) {
                  return { error: true, index: i };
              }
          }
      }
  }

  if (stack.length > 0) {
      return { error: true, index: expr.length };
  }

  return { error: false, index: -1 };
}

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
        return false;
    } else {
        return true;
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


  function validarErrSig(ecu){
    let erss = [];
    let ers = 0;
    let signos = ['{','[', '(', ')', ']', '}','+', '-', '*', '/', '','1','2','3','4','5','6','7','8','9','0'];
    console.log(signos.length);
    for (let i = 0; i < ecu.length; i++) {
      for (let j = 0; j < signos.length; j++) {
          if(ecu[i] !== signos[j]){
            ers++;
            erss.push(ecu[i]);
          }
      }
      erss.unique();
    }

    if(ers > 0){
      return {consigers: true,  erers: erss};
    }else{
      return {consigers: false,  erers: erss};
    }
  }

  Array.prototype.unique=function(a){
    return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
  });

main();