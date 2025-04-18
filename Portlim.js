//transition para a pg
window.addEventListener('DOMContentLoaded', () =>{
    document.body.classList.add('loaded');
});

const links = document.querySelectorAll('a[href]');

links.forEach(link => {
const href = link.getAttribute('href');

// Só aplicar se for um link interno
if (!href.startsWith('http') && !href.startsWith('#')) {
    link.addEventListener('click', function(event){
        event.preventDefault();
        document.body.classList.remove('loaded');

        setTimeout(() => {
        window.location.href = href;
            }, 300);
        });
    }
});

let currentIndex = 1; // Começa do segundo slide como centro

//funcao que atualiza a aparencia dos slides a cada clique(ou ao iniciar)
function atualizarSlides() {
    const slides = document.querySelectorAll('.carousel-slide'); //pega todos os elementos com a classe "carousel-slide"

    //removendo a classe "active" de todos os slides - isso "reseta" os estilos antes de aplicar no slide certo
    slides.forEach((slide) => {
    slide.classList.remove('active');
    });

    //adiciona a classe "active" somente ao slide atual (o que deve ficar maior e mais visivel)
    if (slides[currentIndex]) {
    slides[currentIndex].classList.add('active');
    }

    // rolar os slides para mostrar o central
    //calcula o quanto o carrossel precisa "mover para o lado" para centralizar o slide atual
    const offset = (currentIndex - 2) * (slides[0].offsetWidth + 20); // 20 = gap(espaco entre os slides), e offsetwidth a largura do slide
    document.querySelector('.carousel-track').style.transform = `translateX(-${offset}px)`;//aplica movimentacao no carrossel, deslizando ele para a esquerda para centralizar o slide ativo

    const descricaoEl = document.getElementById('descricao-projeto');
    const descricaoAtual = slides[currentIndex]?.dataset.desc || '';
    if (descricaoEl) {
        descricaoEl.textContent = descricaoAtual;
    }
}

//cria a funcao que muda o slide atual(quando clica em um dos botoes)
function mudarCarrossel(direcao) {
    const slides = document.querySelectorAll('.carousel-slide');//pega todos os slides novamente dentro desta funcao
    currentIndex = (currentIndex + direcao + slides.length) % slides.length;//atualiza o indice atua, somando a direcao(-1 ou 1)
    //o % slides.lenght faz o carrossel voltar para o comeco ou fim, criando o efeito de "loop infinito"
    
    atualizarSlides();//chama a funcao que atualiza o carrossel com base no novo currentIndex
}

window.onload = atualizarSlides;
//quando a pagina carregar, garante que o carrossel ja apareca com o slide do meio destacado

function openMenu(event){
    const buttonTest = event.currentTarget;//garante que o botao e o alvo principal
    console.log("Menu aberto")
    const menu = document.getElementById('menu')
    menu.classList.toggle('show');
}

function goTo(pagina, event){
    const buttonTest = event.currentTarget;
    window.location.href = pagina;
}

window.onclick = function(event){
    if(!event.target.closest('.menu-button')){
        const dropdowns = document.getElementsByClassName('menu-container');
        for(let x = 0; x < dropdowns.length; x++){
            dropdowns[x].classList.remove('show');
        }
    }
}

function copiar(idTexto, mensagemTexto = 'Copiado para área de transferência') {
    const texto = document.getElementById(idTexto).innerText;

    navigator.clipboard.writeText(texto).then(() => {
        mostrarMensagemFlutuante(mensagemTexto);
    }).catch(err => {
        console.log('Erro ao copiar:', err);
    });
}

function mostrarMensagemFlutuante(texto) {
    const msg = document.createElement('div');
    msg.innerText = texto;
    msg.className = 'mensagem-flutuante';
    document.body.appendChild(msg);

    setTimeout(() => {
    msg.classList.add('visible');
    }, 10); // tempo mínimo pra ativar o transition

    setTimeout(() => {
    msg.classList.remove('visible');
    setTimeout(() => msg.remove(), 300);
    }, 2000);
}