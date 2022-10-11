//EJERCICIO 1 

/*Demanar a l’usuari un número i mostrar per pantalla la taula de multiplicar d’aquest número en format 
(1 x Numero = Resultat...). No cal utilitzar taules HTML per a la presentació de la solució. */

/* num = prompt('inserte un número');
for (let index = 0; index <= 10; index++) {
    console.log(`${num} x ${num * index}`);
}
 */


//EJERCICIO 2
//Calcular els primers 20 números de la sèrie de Fibonacci, tenint present que a1=1, a2=1 y que an=an-1+an-2.

/* a = 0;
b = 1;
for (let i = 0; i < 21; i++) {
    c = a + b;
    console.log(c);
    a = b;
    b = c;
}
 */

//EJERCICIO 3
/* Demanar a l’usuari dos numeros (a i b) i mostrar el resultat de calcular ab. 
Fes-ho mitjançant bucle i mitjançant la fòrmula de Math. Calcula el temps d’execució en ambdós casos. */

/* base = prompt('introduce num 1');
potencia = prompt('introduce num 2');
result=1;
console.time();
console.log(`resultado Math: ${Math.pow(base,potencia)}`);
console.timeEnd();


console.time();
for (let i = 0; i < potencia; i++) {
    result *= base;
}
console.log(`resultado bucle ${result}`);
console.timeEnd(); */


//EJERCICIO 4
/* Fes un programa que demani tres números a l’usuari i mostri la mitjana, el major i el menor.  */
/* a = Number.parseInt(prompt('num 1'));
b = Number.parseInt(prompt('num 2'));
c = Number.parseInt(prompt('num 3'));

console.log(`media: ${(a+b+c)/3}`);
console.log(`mayor: ${Math.max(a,b,c)}`);
console.log(`mayor: ${Math.min(a,b,c)}`); */

//EJERCICIO 5
/* Crear una aplicació que permeti realitzar la conversió entre temperatures de  ºC a ºF  i de ºF a ºC, d’acord amb la següent fórmula: 
            ºF = (9.0/5.0)* (ºC)+32. 
Primer pregunta quina conversió vol fer, si ºC → ºF o ºF → ºC 
Si l’usuari respon 1 hauràs de preguntar els ºC i respondre l’equivalent en ºF
Si l’usuari respon 2 hauràs de preguntar els ºF i respondre l’equivalent en ºC
 */

/* a = prompt('pulse 1 para pasar de ºC a ºF \n pulse 2 para pasar de ºF a ºC');
num = Number.parseInt(prompt('introduce número'));
result = 1;
if(a == '1'){
    result = 1.8 * num+32.
}else{
    result = (num - 32)/1.8;
}
console.log(result); */




