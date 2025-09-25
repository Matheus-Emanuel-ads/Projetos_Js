document.addEventListener("DOMContentLoaded", () => {
  const botao = document.getElementById("criar");
  botao.addEventListener("click", criarElemento);
});

function criarElemento() {
  const tipo = document.getElementById("elemento").value;
  const container = document.getElementById("resultado");
  container.innerHTML = "";

  switch (tipo) {
    case "paragrafo":
      const p = document.createElement("p");
      p.textContent = "Este é um parágrafo criado dinamicamente.";
      container.appendChild(p);
      break;

    case "lista":
      const ul = document.createElement("ul");
      ["Item 1", "Item 2", "Item 3"].forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
      });
      container.appendChild(ul);
      break;

    case "link":
      const a = document.createElement("a");
      a.href = "https://www.google.com";
      a.textContent = "Clique aqui para visitar o site";
      a.target = "_blank";
      container.appendChild(a);
      break;

    case "tabela":
      const tabela = document.createElement("table");
      tabela.border = "1";
      const linha = tabela.insertRow();
      ["Nome", "Idade", "Cidade"].forEach(cabecalho => {
        const celula = linha.insertCell();
        celula.textContent = cabecalho;
      });
      container.appendChild(tabela);
      break;
  }
}