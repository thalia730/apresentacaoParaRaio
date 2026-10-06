const chuva = document.getElementById("chuva");
const trovao = document.getElementById("trovao");

let chuvaTocando = false;
let intervaloFade;


function mostrarTela(nomeTela) {

    const telas = document.querySelectorAll(".tela");

    telas.forEach(function(tela) {

        tela.classList.remove("ativa");

    });


    const telaEscolhida = document.getElementById(nomeTela);

    if (telaEscolhida) {

        telaEscolhida.classList.add("ativa");

    }


    fecharModal("sem");
    fecharModal("com");


    if (nomeTela === "sem" || nomeTela === "com") {

        iniciarChuva();

    } else {

        pararChuva();

    }


    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });
}


function iniciarChuva() {

    if (chuvaTocando) {

        ativarChuvaVisual();

        return;

    }


    chuva.volume = 0.15;


    chuva.play()

        .then(function() {

            chuvaTocando = true;

            document.getElementById("botao-chuva").textContent =
                "🌧️ Pausar chuva";

            ativarChuvaVisual();

        })

        .catch(function() {

            console.log(
                "O navegador aguarda uma interação para tocar o áudio."
            );

        });
}


function ativarChuvaVisual() {

    const cenarioSem =
        document.getElementById("cenario-sem");

    const cenarioCom =
        document.getElementById("cenario-com");


    if (cenarioSem) {

        cenarioSem.classList.add("chuva-ativa");

    }


    if (cenarioCom) {

        cenarioCom.classList.add("chuva-ativa");

    }
}


function desativarChuvaVisual() {

    const cenarioSem =
        document.getElementById("cenario-sem");

    const cenarioCom =
        document.getElementById("cenario-com");


    if (cenarioSem) {

        cenarioSem.classList.remove("chuva-ativa");

    }


    if (cenarioCom) {

        cenarioCom.classList.remove("chuva-ativa");

    }
}


function pararChuva() {

    chuva.pause();

    chuva.currentTime = 0;

    chuvaTocando = false;


    document.getElementById("botao-chuva").textContent =
        "🌧️ Ativar chuva";


    desativarChuvaVisual();
}


function alternarChuva() {

    if (chuvaTocando) {

        chuva.pause();

        chuvaTocando = false;


        document.getElementById("botao-chuva").textContent =
            "🌧️ Ativar chuva";


        desativarChuvaVisual();

    } else {

        chuva.volume = 0.15;


        chuva.play()

            .then(function() {

                chuvaTocando = true;


                document.getElementById("botao-chuva").textContent =
                    "🌧️ Pausar chuva";


                ativarChuvaVisual();

            })

            .catch(function() {

                console.log(
                    "Não foi possível iniciar a chuva."
                );

            });
    }
}


function acionarRaio(tipo) {

    let raio;
    let cenario;


    if (tipo === "sem") {

        raio =
            document.getElementById("raio-sem");

        cenario =
            document.getElementById("cenario-sem");

    } else {

        raio =
            document.getElementById("raio-com");

        cenario =
            document.getElementById("cenario-com");

    }


    raio.classList.remove("raio-ativo");

    void raio.offsetWidth;

    raio.classList.add("raio-ativo");


    clearInterval(intervaloFade);


    if (chuvaTocando) {

        chuva.volume = 0.05;

    }


    trovao.currentTime = 0;

    trovao.volume = 0.8;

    trovao.play();


    if (tipo === "sem") {

        const predio =
            document.getElementById("predio-sem");


        setTimeout(function() {

            predio.classList.add("desligado");

        }, 300);


        setTimeout(function() {

            cenario.classList.add("hotspots-ativos");

        }, 700);


        document
            .getElementById("botao-raio-sem")
            .classList.add("hidden");


        setTimeout(function() {

            document
                .getElementById("botao-reset-sem")
                .classList.remove("hidden");

        }, 700);
    }


    if (tipo === "com") {

        /*
         * ATIVA A PROTEÇÃO.
         *
         * O CSS usa esta classe para:
         * - fazer as duas hastes brilharem;
         * - colocar as bolinhas de energia nas duas hastes;
         * - fazer a gaiola de Faraday brilhar;
         * - iluminar o aterramento.
         */

        setTimeout(function() {

            cenario.classList.add("protecao-ativa");

        }, 250);


        setTimeout(function() {

            cenario.classList.add("hotspots-ativos");

        }, 700);


        /*
         * Depois de 2,5 segundos,
         * o brilho da proteção é retirado.
         */

        setTimeout(function() {

            cenario.classList.remove("protecao-ativa");

        }, 2500);


        document
            .getElementById("botao-raio-com")
            .classList.add("hidden");


        setTimeout(function() {

            document
                .getElementById("botao-reset-com")
                .classList.remove("hidden");

        }, 700);
    }


    setTimeout(function() {

        raio.classList.remove("raio-ativo");

    }, 700);


    setTimeout(function() {

        intervaloFade = setInterval(function() {

            if (trovao.volume > 0.05) {

                trovao.volume -= 0.05;

            } else {

                trovao.pause();

                trovao.currentTime = 0;

                trovao.volume = 0.8;

                clearInterval(intervaloFade);


                if (chuvaTocando) {

                    chuva.volume = 0.15;

                }

            }

        }, 100);

    }, 3500);
}


function resetarCenario(tipo) {

    let cenario;


    if (tipo === "sem") {

        cenario =
            document.getElementById("cenario-sem");


        const predio =
            document.getElementById("predio-sem");


        predio.classList.remove("desligado");


        document
            .getElementById("botao-raio-sem")
            .classList.remove("hidden");


        document
            .getElementById("botao-reset-sem")
            .classList.add("hidden");

    } else {

        cenario =
            document.getElementById("cenario-com");


        /*
         * Remove a proteção visual.
         * Como as duas hastes usam a classe
         * .fio-aterramento, as duas voltam
         * ao estado normal juntas.
         */

        cenario.classList.remove("protecao-ativa");


        document
            .getElementById("botao-raio-com")
            .classList.remove("hidden");


        document
            .getElementById("botao-reset-com")
            .classList.add("hidden");
    }


    cenario.classList.remove("hotspots-ativos");


    fecharModal(tipo);
}


function abrirModal(
    tipo,
    icone,
    titulo,
    texto
) {

    const modal =
        document.getElementById(
            "modal-info-" + tipo
        );


    const modalIcone =
        document.getElementById(
            "modal-icone-" + tipo
        );


    const modalTitulo =
        document.getElementById(
            "modal-titulo-" + tipo
        );


    const modalTexto =
        document.getElementById(
            "modal-texto-" + tipo
        );


    modalIcone.textContent = icone;

    modalTitulo.textContent = titulo;

    modalTexto.textContent = texto;


    modal.classList.remove("hidden");
}


function fecharModal(tipo) {

    const modal =
        document.getElementById(
            "modal-info-" + tipo
        );


    if (modal) {

        modal.classList.add("hidden");

    }
}