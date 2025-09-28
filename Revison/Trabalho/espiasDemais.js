const perguntas = [
  {
    enunciado: "Qual é a sua cor favorita?",
    alternativas: ["Verde", "Vermelho", "Amarelo"]
  },
  {
    enunciado: "O que você valoriza mais?",
    alternativas: ["Conhecimento", "Dinheiro", "Força"]
  },
  {
    enunciado: "Seu estilo de roupa é mais",
    alternativas: ["Elegante e discreto", "Fashion e chamativo", "Confortável e esportivo"]
  },
  {
    enunciado: "Como você reage a uma missão difícil?",
    alternativas: ["Planejo tudo nos mínimos detalhes", "Elaboro uma estratégia no momento", "Me jogo com coragem, mesmo sem saber tudo"]
  },
  {
    enunciado: "O que mais te irrita?",
    alternativas: ["Falta de lógica ou organização", "Roubar seu destaque", "Perder"]
  },
  {
    enunciado: "Se você fosse uma espiã, qual ferramenta escolheria?",
    alternativas: ["Um computador portátil super avançado", "Um batom explosivo ou salto com laser", "Um skate turbo ou mochila multifuncional"]
  },
  {
    enunciado: "Se você tivesse um dia livre, o que faria?",
    alternativas: ["Ler um livro ou assistir a um documentário", "Ir ao salão ou fazer compras", "Jogar com os amigos"]
  },
  {
    enunciado: "Qual dessas matérias você mais gostava na escola?",
    alternativas: ["Ciências", "Artes", "Educação física"]
  },
  {
    enunciado: "Como você se vê em um grupo?",
    alternativas: ["A estrategista que pensa antes de agir", "A estrela que chama atenção", "A amiga que cuida de todos"]
  },
  {
    enunciado: "Como você reage quando alguém te provoca?",
    alternativas: ["Ignora", "Dá uma resposta afiada", "Faz uma piada com a situação"]
  }
];

let perguntaAtual = 0;
let alternativaSelecionada = null;

let pontuacoes = {
  Sam: 0,
  Clover: 0,
  Alex: 0
};

const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options-list");
const nextBtn = document.getElementById("next-btn");
const resultDiv = document.getElementById("result");

function carregarPergunta() {
  const pergunta = perguntas[perguntaAtual];
  questionText.textContent = pergunta.enunciado;
  optionsList.innerHTML = "";

  pergunta.alternativas.forEach((alternativa, index) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.className = "option-btn";
    button.textContent = alternativa;
    button.onclick = () => selecionarAlternativa(index);
    li.appendChild(button);
    optionsList.appendChild(li);
  });
}

function selecionarAlternativa(indice) {
  alternativaSelecionada = indice;

  const botoes = document.querySelectorAll(".option-btn");
  botoes.forEach(btn => btn.classList.remove("selected"));
  botoes[indice].classList.add("selected");

  logAlternativa(indice); 
}

nextBtn.addEventListener("click", () => {
  if (alternativaSelecionada === null) {
    alert("Por favor, selecione uma alternativa.");
    return;
  }

  if (alternativaSelecionada === 0) pontuacoes.Sam++;
  else if (alternativaSelecionada === 1) pontuacoes.Clover++;
  else if (alternativaSelecionada === 2) pontuacoes.Alex++;

  perguntaAtual++;
  alternativaSelecionada = null;

  if (perguntaAtual < perguntas.length) {
    carregarPergunta();
  } else {
    mostrarResultado();
  }
});

function mostrarResultado() {
  document.getElementById("question-container").classList.add("hidden");
  nextBtn.classList.add("hidden");

  let perfilFinal = "";
  let maiorPontuacao = 0;

  for (let perfil in pontuacoes) {
    if (pontuacoes[perfil] > maiorPontuacao) {
      maiorPontuacao = pontuacoes[perfil];
      perfilFinal = perfil;
    }
  }

  const descricao = {
    Sam: "Você seria a Sam!! Você é uma pessoa estratégica e analítica. Pessoas como a Sam e você costumam tentar manter tudo sob controle por mais difícil que seja, e mesmo que o errado seja o mais fácil, vocês vão sempre ser os certos.",
    Clover: "Você seria a Clover!! Você é uma pessoa vaidosa e impulsiva. Pessoas como você e a Clover tentam sempre cuidar da melhor forma possível da aparência e não levam desaforo pra casa. Quando veem algo errado, não hesitam em responder.",
    Alex: "Você seria a Alex!! Você é uma pessoa competitiva e brincalhona. Pessoas como você e a Alex amam praticar os mais diversos esportes da forma mais divertida possível, não pensando no mundo fora disso."
  };

resultDiv.innerHTML =
  `<strong>Resultado:</strong><br><br>
  <em>${descricao[perfilFinal]}</em><br><br>
  <strong>Pontuação final:</strong> ${maiorPontuacao} pontos`;
  resultDiv.classList.remove("hidden");
}

function logAlternativa(indice) {
  const botoes = document.querySelectorAll(".option-btn");
  botoes.forEach(btn => btn.classList.remove("selected"));
  botoes[indice].classList.add("selected");

  const pontuacaoTemporaria = { ...pontuacoes };

  if (indice === 0) pontuacaoTemporaria.Sam++;
  else if (indice === 1) pontuacaoTemporaria.Clover++;
  else if (indice === 2) pontuacaoTemporaria.Alex++;

  console.log("Pontuação em tempo real:");
  console.log("Sam:", pontuacaoTemporaria.Sam);
  console.log("Clover:", pontuacaoTemporaria.Clover);
  console.log("Alex:", pontuacaoTemporaria.Alex);
}
function reiniciar(){
  perguntaAtual = 0;
  alternativaSelecionada = null;

  pontuacoes = {
    Sam: 0,
    Clover: 0,
    Alex: 0
  };

  resultDiv.classList.add("hidden");

  document.getElementById("question-container").classList.remove("hidden");
  nextBtn.classList.remove("hidden");

  carregarPergunta();
}
carregarPergunta();