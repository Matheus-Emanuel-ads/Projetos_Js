async function carregarFeedbacks() {
    const res = await fetch('/api/feedbacks');
    const feedbacks = await res.json();
    const container = document.getElementById('feedbackContainer');

    container.innerHTML = '';

    if (feedbacks.length === 0) {
        container.innerHTML = '<p>Nenhum feedback ainda.</p>';
        return;
    }

    feedbacks.forEach((f, index) => {
    const div = document.createElement('div');
    div.className = 'feedback';
    div.innerHTML = `
        <strong>${f.nome}</strong><br>
        <p>${f.comentario}</p>
        <form action="/feedbacks/remover" method="POST">
        <input type="hidden" name="index" value="${index}">
        <button type="submit">Remover</button>
        </form>
        `;
        container.appendChild(div);
      });
}

carregarFeedbacks();