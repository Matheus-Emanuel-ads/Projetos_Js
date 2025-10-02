class Personagem {
  constructor(nome) {
    this.nome = nome;
    this.pontos = 0;
  }

  adicionar(ponto) {
    this.pontos += ponto;
  }

  resetar() {
    this.pontos = 0;
  }
}

class Alternativa {
  constructor(texto, pontos) {
    this.texto = texto;
    this.pontos = pontos;
  }
}

class Pergunta {
  constructor(enunciado, alternativas) {
    this.enunciado = enunciado;
    this.alternativas = alternativas.map(a => new Alternativa(a.texto, a.pontos));
  }
}

class Quiz {
  constructor(perguntas, personagens, elementosDOM) {
    this.perguntas = perguntas.map(p => new Pergunta(p.enunciado, p.alternativas));
    this.personagens = personagens;
    this.perguntaAtual = 0;
    this.alternativaSelecionada = null;

    this.questionText = elementosDOM.questionText;
    this.optionsList = elementosDOM.optionsList;
    this.nextBtn = elementosDOM.nextBtn;
    this.resultDiv = elementosDOM.resultDiv;

    this.nextBtn.addEventListener("click", () => this.avancar());
  }

  carregarPergunta() {
    const pergunta = this.perguntas[this.perguntaAtual];
    this.questionText.textContent = pergunta.enunciado;
    this.optionsList.innerHTML = "";

    pergunta.alternativas.forEach((alternativa, index) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.className = "option-btn";
      button.textContent = alternativa.texto;
      button.onclick = () => this.selecionarAlternativa(index);
      li.appendChild(button);
      this.optionsList.appendChild(li);
    });
  }

  selecionarAlternativa(indice) {
    this.alternativaSelecionada = indice;
    const botoes = document.querySelectorAll(".option-btn");
    botoes.forEach(btn => btn.classList.remove("selected"));
    botoes[indice].classList.add("selected");
  }

  avancar() {
    if (this.alternativaSelecionada === null) {
      alert("Por favor, selecione uma alternativa.");
      return;
    }

    const alternativa = this.perguntas[this.perguntaAtual].alternativas[this.alternativaSelecionada];
    for (let nome in alternativa.pontos) {
      this.personagens[nome].adicionar(alternativa.pontos[nome]);
    }

    this.perguntaAtual++;
    this.alternativaSelecionada = null;

    if (this.perguntaAtual < this.perguntas.length) {
      this.carregarPergunta();
    } else {
      this.mostrarResultado();
    }
    
    for (let nome in this.personagens) {
      console.log(`${nome}: ${this.personagens[nome].pontos} pontos`);
    }
  }

  mostrarResultado() {
    document.getElementById("question-container").classList.add("hidden");
    this.nextBtn.classList.add("hidden");

    let perfilFinal = "";
    let maiorPontuacao = 0;

    for (let nome in this.personagens) {
      const personagem = this.personagens[nome];
      if (personagem.pontos > maiorPontuacao) {
        maiorPontuacao = personagem.pontos;
        perfilFinal = nome;
      }
    }

    const descricao = {
      Sam: "Você seria a Sam!! Você é uma pessoa estratégica e analítica. Pessoas como a Sam e você costumam tentar manter tudo sob controle por mais difícil que seja, e mesmo que o errado seja o mais fácil, vocês vão sempre ser os certos.",
      Clover: "Você seria a Clover!! Você é uma pessoa vaidosa e impulsiva. Pessoas como você e a Clover tentam sempre cuidar da melhor forma possível da aparência e não levam desaforo pra casa. Quando veem algo errado, não hesitam em responder.",
      Alex: "Você seria a Alex!! Você é uma pessoa competitiva e brincalhona. Pessoas como você e a Alex amam praticar os mais diversos esportes da forma mais divertida possível, não pensando no mundo fora disso."
    };

    const imagens = {
    Sam: "https://i.pinimg.com/736x/54/90/5d/54905db6a983fa17c7e0fa80c7db478a.jpg",
    Clover: "https://i.pinimg.com/564x/ce/41/60/ce4160f7f6084afc31f669bb54d63111.jpg",
    Alex: "https://i.pinimg.com/736x/a4/91/85/a49185bf2ce3f0996b9c4ee3603ac1cb.jpg",
};


   this.resultDiv.innerHTML = `
  <strong class="text">Resultado:</strong><br><br>
  <img src="${imagens[perfilFinal]}" alt="${perfilFinal}" style="width:200px;"><br>
  <p class="p">${descricao[perfilFinal]}</p>
  <strong class="text-points">Pontuação final:</strong> ${maiorPontuacao} pontos<br><br>
  <button id="reiniciar">Recomeçar</button>
`;
    this.resultDiv.classList.remove("hidden");

    document.getElementById("reiniciar").onclick = () => this.reiniciar();
  }

  reiniciar() {
    this.perguntaAtual = 0;
    this.alternativaSelecionada = null;
    for (let nome in this.personagens) {
      this.personagens[nome].resetar();
    }

    this.resultDiv.classList.add("hidden");
    document.getElementById("question-container").classList.remove("hidden");
    this.nextBtn.classList.remove("hidden");

    this.carregarPergunta();
  }
}

const elementosDOM = {
  questionText: document.getElementById("question-text"),
  optionsList: document.getElementById("options-list"),
  nextBtn: document.getElementById("next-btn"),
  resultDiv: document.getElementById("result")
};

const personagens = {
  Sam: new Personagem("Sam"),
  Clover: new Personagem("Clover"),
  Alex: new Personagem("Alex")
};

const perguntas = [
  {
    enunciado: "Qual é a sua cor favorita?",
    alternativas: [
      { texto: "Verde", pontos: { Sam: 7, Clover: 1, Alex: 3 } },
      { texto: "Vermelho", pontos: { Sam: 1, Clover: 7, Alex: 3 } },
      { texto: "Amarelo", pontos: { Sam: 3, Clover: 1, Alex: 7 } }
    ]
  },
  {
    enunciado: "O que você valoriza mais?",
    alternativas: [
      { texto: "Conhecimento", pontos: { Sam: 7, Clover: 3, Alex: 1 } },
      { texto: "Dinheiro", pontos: { Sam: 3, Clover: 7, Alex: 1 } },
      { texto: "Força", pontos: { Sam: 1, Clover: 3, Alex: 7 } }
    ]
  },
  {
    enunciado: "Seu estilo de roupa é mais",
    alternativas: [
      { texto: "Elegante e discreto", pontos: { Sam: 7, Clover: 1, Alex: 3 } },
      { texto: "Fashion e chamativo", pontos: { Sam: 3, Clover: 7, Alex: 1 } },
      { texto: "Confortável e esportivo", pontos: { Sam: 3, Clover: 1, Alex: 7 } }
    ]
  },
  {
    enunciado: "Como você reage a uma missão difícil?",
    alternativas: [
      { texto: "Planejo tudo nos mínimos detalhes", pontos: { Sam: 7, Clover: 3, Alex: 1 } },
      { texto: "Elaboro uma estratégia no momento", pontos: { Sam: 3, Clover: 7, Alex: 1 } },
      { texto: "Me jogo com coragem, mesmo sem saber tudo", pontos: { Sam: 1, Clover: 3, Alex: 7 } }
    ]
  },
  {
    enunciado: "O que mais te irrita?",
    alternativas: [
      { texto: "Falta de lógica ou organização", pontos: { Sam: 7, Clover: 3, Alex: 1 } },
      { texto: "Roubar seu destaque", pontos: { Sam: 1, Clover: 7, Alex: 3 } },
      { texto: "Perder", pontos: { Sam: 3, Clover: 1, Alex: 7 } }
    ]
  },
  {
    enunciado: "Se você fosse uma espiã, qual ferramenta escolheria?",
    alternativas: [
      { texto: "Um computador portátil super avançado", pontos: { Sam: 7, Clover: 3, Alex: 1 } },
      { texto: "Um batom explosivo ou salto com laser", pontos: { Sam: 3, Clover: 7, Alex: 1 } },
      { texto: "Um skate turbo ou mochila multifuncional", pontos: { Sam: 1, Clover: 3, Alex: 7 } }
    ]
  },
  {
    enunciado: "Se você tivesse um dia livre, o que faria?",
    alternativas: [
      { texto: "Ler um livro ou assistir a um documentário", pontos: { Sam: 7, Clover: 1, Alex: 3 } },
      { texto: "Ir ao salão ou fazer compras", pontos: { Sam: 3, Clover: 7, Alex: 1 } },
      { texto: "Jogar com os amigos", pontos: { Sam: 1, Clover: 3, Alex: 7 } }
    ]
  },
  {
    enunciado: "Qual dessas matérias você mais gostava na escola?",
    alternativas: [
      { texto: "Ciências", pontos: { Sam: 7, Clover: 3, Alex: 1 } },
      { texto: "Artes", pontos: { Sam: 3, Clover: 7, Alex: 1 } },
      { texto: "Educação física", pontos: { Sam: 3, Clover: 1, Alex: 7 } }
    ]
  },
  {
    enunciado: "Como você se vê em um grupo?",
    alternativas: [
      { texto: "A estrategista que pensa antes de agir", pontos: { Sam: 7, Clover: 3, Alex: 1 } },
      { texto: "A estrela que chama atenção", pontos: { Sam: 1, Clover: 7, Alex: 3 } },
      { texto: "A amiga que cuida de todos", pontos: { Sam: 3, Clover: 1, Alex: 7 } }
    ]
  },
  {
    enunciado: "Como você reage quando alguém te provoca?",
    alternativas: [
      { texto: "Ignora", pontos: { Sam: 7, Clover: 1, Alex: 3 } },
      { texto: "Dá uma resposta afiada", pontos: { Sam: 1, Clover: 7, Alex: 3 } },
      { texto: "Faz uma piada com a situação", pontos: { Sam: 3, Clover: 1, Alex: 7 } }
    ]
  }
];
const quiz = new Quiz(perguntas, personagens, elementosDOM);
quiz.carregarPergunta();
