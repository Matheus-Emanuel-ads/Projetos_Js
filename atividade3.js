function createTabuada(){
    var option = parseInt(document.getElementById("option").value);
    var result = document.getElementById("result");


if(isNaN(option)){
    result.textContent = "Digite um numero valido";
    return;
}
var tabuada = `Tabuada do ${option}:\n\n`;
  for (let i = 1; i <= 10; i++) {
    tabuada += `${option} x ${i} = ${option * i}\n`;
  }

  result.textContent = tabuada;
}
