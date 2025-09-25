const carrinho = [];

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("addButton").addEventListener("click", addIten);
  document.getElementById("rmvButton").addEventListener("click", rmvIten);
});

function addIten() {
  const item = document.getElementById("itemInput").value.trim();
  if (item) {
    carrinho.push(item);
    updateList();
    document.getElementById("itemInput").value = "";
  }
}

function rmvIten() {
  const item = document.getElementById("itemInput").value.trim();
  const index = carrinho.indexOf(item);
  if (index !== -1) {
    carrinho.splice(index, 1);
    updateList();
    document.getElementById("itemInput").value = "";
  }
}

function updateList() {
  const lista = document.getElementById("list");
  lista.innerHTML = "";
  carrinho.forEach((item, i) => {
    const li = document.createElement("li");
    li.textContent = `${i + 1}. ${item}`;
    lista.appendChild(li);
  });
}