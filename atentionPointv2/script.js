// Contadores
let contDesviations = 1;
let contImprovements = 1;

// Containers do formulário
const desviosContainer = document.getElementById("desviationsContainer");
const melhoriasContainer = document.getElementById("improvementsContainer");

// ULs no imageBlock
const ulDesvios = document.getElementById("itensDetour");
const ulMelhorias = document.getElementById("itensImprovement");

// Função para calcular e atualizar a nota automaticamente

function atualizarPontuacao() {
    // Seleciona apenas inputs preenchidos
    const inputsPreenchidos = desviosContainer.querySelectorAll("input");
    let qtdDesviosPreenchidos = 0;

    inputsPreenchidos.forEach(input => {
        if(input.value.trim() !== "") qtdDesviosPreenchidos++;
    });

    let totalPontos = 100 - (qtdDesviosPreenchidos * 6.25);
    if(totalPontos < 0) totalPontos = 0;

    // Atualiza o span dentro do imageBlock
    document.getElementById("notice").textContent = totalPontos.toFixed(2).replace(".", ",") + "%";
}
    const zeroButton = document.getElementById("zeroButton");
    zeroButton.addEventListener("click", function(){
    document.getElementById("notice").textContent = "0,00%"
    })


// Função para criar novo campo de Desvio
function criarNovoDesvio() {
    contDesviations++;
    const novoDesvio = document.createElement("input");
    novoDesvio.type = "text";
    novoDesvio.className = "desviationsCamp";
    novoDesvio.placeholder = `Desvio ${contDesviations}`;
    desviosContainer.appendChild(novoDesvio);

    // Atualiza a nota sempre que o usuário digitar
    novoDesvio.addEventListener("input", () => {
        atualizarPontuacao();
        if(novoDesvio.value.trim() !== "" && novoDesvio === desviosContainer.lastElementChild){
            criarNovoDesvio();
        }
    });

    atualizarPontuacao();
}

// Função para criar novo campo de Melhoria
function criarNovaMelhoria() {
    contImprovements++;
    const novaMelhoria = document.createElement("input");
    novaMelhoria.type = "text";
    novaMelhoria.className = "improvementsCamp";
    novaMelhoria.placeholder = `Melhoria ${contImprovements}`;
    melhoriasContainer.appendChild(novaMelhoria);

    // Nota não é afetada pelas melhorias
    novaMelhoria.addEventListener("input", () => {
        if(novaMelhoria.value.trim() !== "" && novaMelhoria === melhoriasContainer.lastElementChild){
            criarNovaMelhoria();
        }
    });
}

// Listeners iniciais nos primeiros campos
desviosContainer.firstElementChild.addEventListener("input", () => {
    atualizarPontuacao();
    if(desviosContainer.firstElementChild.value.trim() !== "" && desviosContainer.firstElementChild === desviosContainer.lastElementChild){
        criarNovoDesvio();
    }
});

melhoriasContainer.firstElementChild.addEventListener("input", () => {
    if(melhoriasContainer.firstElementChild.value.trim() !== "" && melhoriasContainer.firstElementChild === melhoriasContainer.lastElementChild){
        criarNovaMelhoria();
    }
});

// Envio do formulário
document.getElementById("formCamp").addEventListener("submit", function(event){
    event.preventDefault();

    const name = document.getElementById("analistName").value;
    const context = document.getElementById("context").value;
    const idProtocol = document.getElementById("idProtocol").value;

    // Atualiza os dados principais do imageBlock
    document.getElementById("Name").textContent = name;
    document.getElementById("subject").textContent = context;
    document.getElementById("id").textContent = idProtocol;

    // Limpa ULs antes de atualizar
    ulDesvios.innerHTML = "";
    ulMelhorias.innerHTML = "";

    // Preenche UL de Desvios
    desviosContainer.querySelectorAll("input").forEach(input => {
        if(input.value.trim() !== ""){
            const li = document.createElement("li");
            li.textContent = input.value;
            ulDesvios.appendChild(li);
        }
    });

    // Preenche UL de Melhorias
    melhoriasContainer.querySelectorAll("input").forEach(input => {
        if(input.value.trim() !== ""){
            const li = document.createElement("li");
            li.textContent = input.value;
            ulMelhorias.appendChild(li);
        }
    });
});

// Gerar imagem
document.getElementById('createImg').addEventListener('click', () => {
    const div = document.getElementById('imageBlock');
    html2canvas(div, {scale: 2}).then(canvas => {
        const link = document.createElement('a');
        let Name = document.getElementById("analistName").value;
        let archiveName = "PontoDeAtencao_" + Name + ".jpg";
        link.download = archiveName;
        link.href = canvas.toDataURL();
        link.click();
    });
});

const date = new Date().toLocaleDateString('pt-BR');
document.getElementById("today").textContent = date; 


// Inicializa nota na primeira carga
atualizarPontuacao();