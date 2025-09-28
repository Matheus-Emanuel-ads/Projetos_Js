const perguntas = [
  {
    enunciado: "Qual é a sua cor favorita?",
    alternativas: [
      { texto: "Verde", pontos: { Sam: 5, Clover: 1, Alex: 3 } },
      { texto: "Vermelho", pontos: { Sam: 1, Clover: 5, Alex: 3 } },
      { texto: "Amarelo", pontos: { Sam: 3, Clover: 1, Alex: 5 } }
    ]
  },
  {
    enunciado: "O que você valoriza mais?",
    alternativas: [
      { texto: "Conhecimento", pontos: { Sam: 5, Clover: 3, Alex: 1 } },
      { texto: "Dinheiro", pontos: { Sam: 3, Clover: 5, Alex: 1 } },
      { texto: "Força", pontos: { Sam: 1, Clover: 3, Alex: 5 } }
    ]
  },
  {
    enunciado: "Seu estilo de roupa é mais",
    alternativas: [
      { texto: "Elegante e discreto", pontos: { Sam: 5, Clover: 1, Alex: 3 } },
      { texto: "Fashion e chamativo", pontos: { Sam: 3, Clover: 5, Alex: 1 } },
      { texto: "Confortável e esportivo", pontos: { Sam: 3, Clover: 1, Alex: 5 } }
    ]
  },
  {
    enunciado: "Como você reage a uma missão difícil?",
    alternativas: [
      { texto: "Planejo tudo nos mínimos detalhes", pontos: { Sam: 5, Clover: 3, Alex: 1 } },
      { texto: "Elaboro uma estratégia no momento", pontos: { Sam: 3, Clover: 5, Alex: 1 } },
      { texto: "Me jogo com coragem, mesmo sem saber tudo", pontos: { Sam: 1, Clover: 3, Alex: 5 } }
    ]
  },
  {
    enunciado: "O que mais te irrita?",
    alternativas: [
      { texto: "Falta de lógica ou organização", pontos: { Sam: 5, Clover: 3, Alex: 1 } },
      { texto: "Roubar seu destaque", pontos: { Sam: 1, Clover: 5, Alex: 3 } },
      { texto: "Perder", pontos: { Sam: 3, Clover: 1, Alex: 5 } }
    ]
  },
  {
    enunciado: "Se você fosse uma espiã, qual ferramenta escolheria?",
    alternativas: [
      { texto: "Um computador portátil super avançado", pontos: { Sam: 5, Clover: 3, Alex: 1 } },
      { texto: "Um batom explosivo ou salto com laser", pontos: { Sam: 3, Clover: 5, Alex: 1 } },
      { texto: "Um skate turbo ou mochila multifuncional", pontos: { Sam: 1, Clover: 3, Alex: 5 } }
    ]
  },
  {
    enunciado: "Se você tivesse um dia livre, o que faria?",
    alternativas: [
      { texto: "Ler um livro ou assistir a um documentário", pontos: { Sam: 5, Clover: 1, Alex: 3 } },
      { texto: "Ir ao salão ou fazer compras", pontos: { Sam: 3, Clover: 5, Alex: 1 } },
      { texto: "Jogar com os amigos", pontos: { Sam: 1, Clover: 3, Alex: 5 } }
    ]
  },
  {
    enunciado: "Qual dessas matérias você mais gostava na escola?",
    alternativas: [
      { texto: "Ciências", pontos: { Sam: 5, Clover: 3, Alex: 1 } },
      { texto: "Artes", pontos: { Sam: 3, Clover: 5, Alex: 1 } },
      { texto: "Educação física", pontos: { Sam: 3, Clover: 1, Alex: 5 } }
    ]
  },
  {
    enunciado: "Como você se vê em um grupo?",
    alternativas: [
      { texto: "A estrategista que pensa antes de agir", pontos: { Sam: 5, Clover: 3, Alex: 1 } },
      { texto: "A estrela que chama atenção", pontos: { Sam: 1, Clover: 5, Alex: 3 } },
      { texto: "A amiga que cuida de todos", pontos: { Sam: 3, Clover: 1, Alex: 5 } }
    ]
  },
  {
    enunciado: "Como você reage quando alguém te provoca?",
    alternativas: [
      { texto: "Ignora", pontos: { Sam: 5, Clover: 1, Alex: 3 } },
      { texto: "Dá uma resposta afiada", pontos: { Sam: 1, Clover: 5, Alex: 3 } },
      { texto: "Faz uma piada com a situação", pontos: { Sam: 3, Clover: 1, Alex: 5 } }
    ]
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
    button.textContent = alternativa.texto;
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
}


nextBtn.addEventListener("click", () => {
  if (alternativaSelecionada === null) {
    alert("Por favor, selecione uma alternativa.");
    return;
  }

  
  const pontos = perguntas[perguntaAtual].alternativas[alternativaSelecionada].pontos;
  pontuacoes.Sam += pontos.Sam;
  pontuacoes.Clover += pontos.Clover;
  pontuacoes.Alex += pontos.Alex;

  perguntaAtual++;
  alternativaSelecionada = null;

 
  if (perguntaAtual < perguntas.length) {
    carregarPergunta();
  } else {
    mostrarResultado();
  }
  console.log(pontuacoes);
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


  resultDiv.innerHTML = `
    <strong>Resultado:</strong><br><br>
    <em>${descricao[perfilFinal]}</em><br><br>
    <strong>Pontuação final:</strong> ${maiorPontuacao} pontos<br><br>
    <button id="reiniciar">Recomeçar</button>
  `;
  resultDiv.classList.remove("hidden");


  document.getElementById("reiniciar").onclick = reiniciar;
}



function reiniciar() {
  perguntaAtual = 0;
  alternativaSelecionada = null;
  pontuacoes = { Sam: 0, Clover: 0, Alex: 0 };

  resultDiv.classList.add("hidden");
  document.getElementById("question-container").classList.remove("hidden");
  nextBtn.classList.remove("hidden");

  carregarPergunta();
}
carregarPergunta();
