var numberToFind = 0;

function refresh(){
    
    numberToFind = parseInt(Math.random() * 20) + 1;

    console.log(numberToFind);
}

function verifyNumber(){

    var element = document.getElementById('try').value;
    
    if(element > 20 || element <1){
        alert('Invalido');
        return;
    }
    if(element > numberToFind){
        alert('O numero e menor.');
    }
    if(element < numberToFind){
        alert('O  Numero e maior');
    }
    if(element == numberToFind){
        alert('Acertou, PARABENSSSS!!!!!!');
        refresh();
    }

}



refresh();