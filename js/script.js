const chuva = document.getElementById("chuva");
const trovao = document.getElementById("trovao");
let chuvaTocando = false;

// ============= TROCAR DE TELA =============
function mostrarTela(nomeTela) {
    // Pega todas as telas
    const telas = document.querySelectorAll(".tela");
    
    // Esconde todas as telas
    telas.forEach(function (tela) { 
        tela.classList.remove("ativa"); 
    });

    // Procura a tela escolhida
    const telaEscolhida = document.getElementById(nomeTela);
    
    // Mostra a tela escolhida
    if (telaEscolhida) {
        telaEscolhida.classList.add("ativa");
    }

    // Se chegar nas telas da demonstração, começa a chuva
    if (nomeTela === "sem" || nomeTela === "com") { 
        iniciarChuva(); 
    } else { 
        // Se voltar para o início ou tipos, podemos parar a chuva
        pararChuva(); 
    }
}

// ============= INICIAR CHUVA =============
function iniciarChuva() {
    // Se já estiver tocando, não faz nada 
    if (chuvaTocando) { return; } 
    
    chuva.volume = 0.15;
    chuva.play().then(function () {
        chuvaTocando = true;
        document.getElementById("botao-chuva").textContent = "🌧️ Pausar chuva";
    }).catch(function () { 
        console.log("O navegador bloqueou o áudio de fundo."); 
    });
}

// ============= PARAR CHUVA =============
function pararChuva() {
    chuva.pause();
    chuva.currentTime = 0; 
    chuvaTocando = false;
    document.getElementById("botao-chuva").textContent = "🌧️ Ativar chuva";
}

// ============= PAUSAR / CONTINUAR CHUVA =============
function alternarChuva() {
    if (chuvaTocando) {
        chuva.pause();
        chuvaTocando = false;
        document.getElementById("botao-chuva").textContent = "🌧️ Continuar chuva";
    } else {
        chuva.volume = 0.15; 
        chuva.play();
        chuvaTocando = true;
        document.getElementById("botao-chuva").textContent = "🌧️ Pausar chuva";
    }
}

// ============= ACIONAR RAIO =============
function acionarRaio(tipo) {
    let raio;

    // Descobre qual raio deve aparecer
    if (tipo === "sem") {
        raio = document.getElementById("raio-sem");
    } else {
        raio = document.getElementById("raio-com");
    }

    // Reinicia a animação caso o botão seja apertado várias vezes
    raio.classList.remove("raio-ativo");

    // Pequeno atraso para o navegador perceber que a classe foi removida
    setTimeout(function () { 
        raio.classList.add("raio-ativo"); 
    }, 20);

    // ============= SOM DO TROVÃO =============
    trovao.currentTime = 0;
    trovao.volume = 0.8;
    trovao.play();

    // ============= ESCONDER O RAIO DEPOIS =============
    setTimeout(function () { 
        raio.classList.remove("raio-ativo"); 
    }, 700);
}