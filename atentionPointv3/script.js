document.getElementById('createImg').addEventListener('click', () => {
    const div = document.getElementById('imageBlock');

    html2canvas(div, {scale:2}).then(canvas => {6
        // Criar imagem para exibir na página
        const img = document.createElement('img');
        img.src = canvas.toDataURL('image/png');
        img.style.border = '1px solid #000';
        img.style.marginTop = '10px';


        // Criar link para download
        const link = document.createElement('a');
        link.download = 'PontoDeAtencao.png';
        link.href = canvas.toDataURL();
        link.click();
    });
});
