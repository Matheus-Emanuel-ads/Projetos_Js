// Contadores
let contDesviations = 1;
let contImprovements = 1;

// Containers do formulário
const desviosContainer = document.getElementById("desviationsContainer");
const melhoriasContainer = document.getElementById("improvementsContainer");

// ULs no imageBlock
const ulDesvios = document.getElementById("itensDetour");
const ulMelhorias = document.getElementById("itensImprovement");

// Função para criar novo campo de Desvio
function criarNovoDesvio() {
    contDesviations++;
    const novoDesvio = document.createElement("input");
    novoDesvio.type = "text";
    novoDesvio.className = "desviationsCamp";
    novoDesvio.placeholder = `Desvio ${contDesviations}`;
    desviosContainer.appendChild(novoDesvio);

    novoDesvio.addEventListener("input", () => {
        if(novoDesvio.value.trim() !== "" && novoDesvio === desviosContainer.lastElementChild){
            criarNovoDesvio();
        }
    });
}

// Função para criar novo campo de Melhoria
function criarNovaMelhoria() {
    contImprovements++;
    const novaMelhoria = document.createElement("input");
    novaMelhoria.type = "text";
    novaMelhoria.className = "improvementsCamp";
    novaMelhoria.placeholder = `Melhoria ${contImprovements}`;
    melhoriasContainer.appendChild(novaMelhoria);

    novaMelhoria.addEventListener("input", () => {
        if(novaMelhoria.value.trim() !== "" && novaMelhoria === melhoriasContainer.lastElementChild){
            criarNovaMelhoria();
        }
    });
}

// Listeners iniciais nos primeiros campos
desviosContainer.firstElementChild.addEventListener("input", () => {
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
    const notice = document.getElementById("noticeData").value;

    // Atualiza os dados principais do imageBlock
    document.getElementById("Name").textContent = name;
    document.getElementById("subject").textContent = context;
    document.getElementById("id").textContent = idProtocol;
    document.getElementById("notice").textContent = notice + "%";


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
        link.download = 'PontoDeAtencao.jpg';
        link.href = canvas.toDataURL();
        link.click();
    });
});
