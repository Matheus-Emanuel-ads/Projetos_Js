document.addEventListener("DOMContentLoaded", () => {
  events();
});

function events() {
  addPrint();
  addKey();
  addForm();
}

function addPrint() {
  const botao = document.getElementById("clickButton");
  const mensagem = document.getElementById("clickMessage");

  botao.addEventListener("click", () => {
    mensagem.textContent = "Você clicou no botão!";
  });
}

function addKey() {
  const campo = document.getElementById("textCamp");
  const mensagem = document.getElementById("messageKey");

  campo.addEventListener("keydown", (evento) => {
    mensagem.textContent = `Você pressionou: ${evento.key}`;
  });
}

function addForm() {
  const form = document.getElementById("form");
  const resultado = document.getElementById("formResult");

  form.addEventListener("submit", (evento) => {
    evento.preventDefault(); // Evita recarregar a página

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    resultado.innerHTML = `
      <h3>Dados recebidos:</h3>
      <p>Nome: ${nome}</p>
      <p>Email: ${email}</p>
    `;
  });
}