function sequence() {
  const option = parseInt(document.getElementById("option").value);
  const result = document.getElementById("result");

  if (isNaN(option) || option <= 0) {
    alert('digite um numero valido');
    return;
  }

  let number = "";
  let save = 0;
  let calc = "";

  for (let i = 1; i <= option; i++) {
    number += "1"; // constrói o número: "1", "11", "111", ...
    let value = parseInt(number);
    save += value;
    calc += i === option ? `${value}` : `${value} + `;
  }

  result.textContent = `${calc}\n A soma total e: ${save.toLocaleString("pt-BR")}`;
}