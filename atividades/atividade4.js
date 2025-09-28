function tree(){
    var option = parseInt(document.getElementById("option").value);
    var result = document.getElementById("result");


    if(isNaN(option) || option <= 0){
        alert('digite um numero valido');
        return;
    }

    let treeGrow = "";

    for (let i = 1; i <= option; i++) {
        treeGrow += "*".repeat(i) + "\n";
    }

    result.textContent = treeGrow;
}
