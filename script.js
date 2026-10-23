document.addEventListener('DOMContentLoaded', () => {
    const paises = document.querySelectorAll('.pais-card');
    const continentes = document.querySelectorAll('.continente-box');
    const acertosElemento = document.getElementById('acertos');
    const mensagemVitoria = document.getElementById('mensagem-vitoria');
    
    let acertos = 0;
    const totalPaises = paises.length;

    // 1. Configurar evento de início do arrasto para cada país
    paises.forEach(pais => {
        pais.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', pais.id);
        });
    });

    // 2. Configurar eventos de drop nas caixas dos continentes
    continentes.forEach(box => {
        box.addEventListener('dragover', (e) => {
            e.preventDefault();
            box.classList.add('drag-over');
        });

        box.addEventListener('dragleave', () => {
            box.classList.remove('drag-over');
        });

        box.addEventListener('drop', (e) => {
            e.preventDefault();
            box.classList.remove('drag-over');

            const idPais = e.dataTransfer.getData('text/plain');
            const paisElemento = document.getElementById(idPais);

            if (!paisElemento) return;

            const continentePais = paisElemento.dataset.continente;
            const continenteCaixa = box.dataset.continente;

            // Validação de acerto ou erro[cite: 2]
            if (continentePais === continenteCaixa) {
                // ACERTO
                box.appendChild(paisElemento);
                paisElemento.setAttribute('draggable', 'false'); // Desabilita o drag no país encaixado
                paisElemento.classList.add('correto');
                box.classList.add('acerto');
                box.classList.remove('erro');

                // Esconde a label com o nome do continente se houver um país
                const label = box.querySelector('.label');
                if (label) label.style.display = 'none';

                acertos++;
                acertosElemento.textContent = acertos;

                // Checa se finalizou o jogo
                if (acertos === totalPaises) {
                    mensagemVitoria.classList.add('ativo');
                }
            } else {
                // ERRO
                box.classList.add('erro');
                setTimeout(() => {
                    box.classList.remove('erro');
                }, 800);
            }
        });
    });
});