"use string";
// el postfijo no se forma bien con condicionales (solo con operaciones aritmeticas) no me calcula bien el resultado
var espacios = {"a" : 0};
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
        
        console.log('¡Parentesis correctos!');
        console.log();
        console.log("Evaluando Operandos...");

          console.log("¡Operandos correctos!")
          console.log();
          console.log("Separando ecuacion...");
          console.log(tokenize(VALO)); 
          console.log("¡Ecuacion separada!")
          console.log("Evaluando signos no permitidos...")
          let {consigers,  erers} = validarErrSig(VALO);
          
          if(consigers === true){
              //console.log("¡Se detectó un error en la expresión!");
              console.log("¡Se hallaron caracteres invalidos!");
              console.log(erers);
          }else{
            console.log("¡No se detecto signo no permitido!")
            console.log();
            console.log("Pasando a Postfijo...");
            console.log(infixToPostfix(tokenize(VALO))); 
            console.log();
            console.log("Evaluando y resolviendo RPN...");
            console.log(RPN(infixToPostfix(tokenize(VALO)))); 
            console.log();
            console.log("FINALIZADO");
        }            
      } else {
        console.log();
        console.log('¡Se detectó un error en los parentesis, verifique su expresion!');
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

//Convierte el arreglo original a postfijo
function infixToPostfix(infix){
const presedences = ["-", "+", "*", "/", "^", ">", "<",  ">=", "<=", "&&", "||"];

var opsStack = [],
  postfix = [];

for(let token of infix){
  // Step 1
  
  // if("number" === typeof token){
  //if(presedences.includes(token)){
  if(token != "+" && token != "*" && token != "-" && token != "/" && token != "(" && 
  token != ")" && token != "^" && token != ">" && token != "<" && token != ">=" && 
  token != "<=" && token != "&&" && token != "||"){
      postfix.push(token); continue;
  }
  let topOfStack = opsStack[opsStack.length - 1];

  // Step 2
  // Si abre parentesis agregar a arreglo provisional
  if(!opsStack.length || topOfStack == "("){
      opsStack.push(token); continue;
  }
  // Step 3
  if(token == "("){
      opsStack.push(token); continue;
  }
  // Step 4
  if(token == ")"){
    //si cierra parentesis obtiene dato de arreglo provisional y lo mete a arreglo postfix
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

// Método que divide la cadena principal en un arreglo con todos los componentes a evaluar
function tokenize(exp){
  exp = exp.replace(/\s/g, "");
  //reemplazar || por OR para evaluar expresion regular
  exp = exp.replace("||", "OR");

  //Expresion regular que evalua y divide la cadena en un arreglo con todas las partes a covnertir a postfijo
  var outs = exp.match(/\d+|OR|&&|<=|>=|[^]|[\+-\/x()<>=*]/g);

  // For que sustituye "OR" por "||", se pone asi ya que en la expresion regular no se pudo reconocer "||".
  for(var c = 0; c < outs.length; c++) {
      if(outs[c] == "OR") {
          outs[c] = "||";
      }
  }
  return outs;
}

function log(obj){
document.querySelector("pre").textContent += JSON.stringify(obj) + "\n";
}



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
//Este metodo resuelve el problema teniendolo ya en postfijo
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

//Valida si los caracteres son correctos, caracteres ajenos van a ser invalidos
function validarErrSig(ecu){ // 2 + 2
let erss = [];
let ers = 0;
let signos = ['{','[', '(', ')', ']', '}','+', '-', '*', '/', ' ','=', '^','|','||','&','&&', '<', '>', '<>', '<=', '>=','1','2','3','4','5','6','7','8','9','0'];

for (let i = 0; i < ecu.length; i++) {
if(signos.includes(ecu[i])){
  
}else{
  erss.push(ecu[i]);
  ers++;
}
}

if(ers > 0){
return {consigers: true ,  erers: erss} 
}else{
return {consigers: false ,  erers: 'Todo Correcto'} 
}

}

Array.prototype.unique=function(a){
return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});

main();