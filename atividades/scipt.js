let idade = document.getElementById("idade").value;

let printar = document.getElementById("btnenviar").addEventListener("click", function(){

    let idade = document.getElementById("idade").value;
    if(idade > 17){
        console.log("Passou");
    }
    else{
        console.log("Reprovado")
    }   

})

