// increse & decrese count
let contador = 0;
const increse = document.getElementById("increse");
const decrese = document.getElementById("decrese");

// show the count
const displayCount = document.createElement("p");
displayCount.textContent = `Contador: ${contador}`;
decrese.insertAdjacentElement("afterend", displayCount);

increse.addEventListener("click", () => {
  contador++;
  displayCount.textContent = `Contador: ${contador}`;
});

decrese.addEventListener("click", () => {
  if (contador > 0) {
    contador--;
    displayCount.textContent = `Contador: ${contador}`;
  } else {
    alert("O contador já está em zero!");
  }
});

// Campo de texto + contador de caracteres + histórico
const textCharacters = document.getElementById("textCharacters");
const countCharacters = document.getElementById("countCharacters");
const textHistoric = document.getElementById("textHistoric");

textCharacters.addEventListener("input", () => {
  countCharacters.textContent = textCharacters.value.length;
});

textCharacters.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && textCharacters.value.trim() !== "") {
    const novoTexto = document.createElement("p");
    novoTexto.textContent = textCharacters.value;
    textHistoric.appendChild(novoTexto);
    textCharacters.value = "";
    countCharacters.textContent = "0";
  }
});

// Lista dinâmica
const listType = document.getElementById("listType");
const addList = document.getElementById("addList");

addList.addEventListener("click", () => {
  const tipo = listType.value; // "ol" ou "ul"
  const lista = document.createElement(tipo);
  const item = document.createElement("li");
  item.textContent = "Novo item";

  const btnRemover = document.createElement("button");
  btnRemover.textContent = "Remover";
  btnRemover.addEventListener("click", () => {
    lista.remove();
  });

  item.appendChild(btnRemover);
  lista.appendChild(item);
  document.body.appendChild(lista);
});