function classificarNumero(valor) {
    if(valor > 0 && valor % 2 == 0){
        console.log("Positivo e par");
    }
    else if(valor > 0 && valor % 2 !== 0){
        console.log("Positivo e impar");
    }
    else if(valor < 0 && valor % 2 == 0){
        console.log("Negativo e par");
    }
    else{
        console.log("Negativo e impar");
    }
};
numero = -10;

Nnumero = classificarNumero(numero);
console.log(Nnumero);