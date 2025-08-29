var machineOption = 0;

function refresh(){
    
    machineOption = parseInt(Math.random() * 3) + 1;

    console.log(machineOption);
}
function verifyNumber(){
     
    var element = parseInt(document.getElementById('try').value);
        
    if(element == machineOption){
        alert('Empate')
        refresh();
    }
    else if((element == 1) && (machineOption == 2)){
        alert('Maquina ganhou')
        refresh();
    }
    else if((element == 1) && (machineOption == 3)){
        alert('Voce ganhou')
        refresh();
    }
    else if((element == 2) && (machineOption == 1)){
        alert('Voce ganhou')
        refresh();
    }
    else if((element == 2) && (machineOption == 3)){
        alert('Maquina ganhou')
        refresh();
    }
    else if((element == 3) && (machineOption == 1)){
        alert('Maquina ganhou')
        refresh();
    }
    else if((element == 3) && (machineOption == 2)){
        alert('Voce ganhou')
        refresh();
    }
    else{
        alert('Invalido')
    }

}




refresh();