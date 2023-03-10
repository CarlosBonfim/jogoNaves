function start() {
    //criada a func do inicio do jogo
    $("#inicio").hide(); //vai ocultar a div inicio
    // vai adicionar os elementos na area do jogo
    $("#fundoGame").append("<div id ='jogador' class='anima1' ></div>");
    $("#fundoGame").append("<div id ='inimigo1' class='anima2'></div>");
    $("#fundoGame").append("<div id ='inimigo2' ></div>");
    $("#fundoGame").append("<div id ='amigo' class = 'anima3'></div>");
    $("#fundoGame").append("<div id='placar'></div>");
    $("#fundoGame").append("<div id='energia'></div>");

    //variavel jogo
    var jogo = {};
    //teclado
    var tecla = {
        W: 87,
        S: 83,
        D: 68,
    };
    //tecla recebida
    jogo.pressionou = [];

    var velocidade = 5;
    var posicaoY = parseInt(Math.random() * 334);
    var podeAtirar = true;
    var fimDeJogo = false;
    var pontos = 0;
    var salvos = 0;
    var perdidos = 0;
    var energiaAtual = 3;
    //sons
    var somDisparo = document.getElementById("somDisparo");
    var somExplosao = document.getElementById("somExplosao");
    var musica = document.getElementById("musica");
    var somGameover = document.getElementById("somGameover");
    var somPerdido = document.getElementById("somPerdido");
    var somResgate = document.getElementById("somResgate");

    //Música em loop
    musica.addEventListener(
        "ended",
        function () {
            musica.currentTime = 0;
            musica.play();
        },
        false
    );
    musica.play();

    //verifica tecla pressionada pelo jogador
    $(document).keydown(function (e) {
        jogo.pressionou[e.which] = true;
    });
    //verifica se o jogador soltou
    $(document).keyup(function (e) {
        jogo.pressionou[e.which] = false;
    });

    //execucao do jogo atraves de um setInterval de 30
    jogo.timer = setInterval(loop, 30);
    //loop do jogo, chama as funcoes do jogo
    function loop() {
        moveFundo();
        moveJogador();
        moveInimigo1();
        moveInimigo2();
        moveAmigo();
        colisao();
        placar();
        energia();
    }

    //moviementacao do background do jogo
    function moveFundo() {
        esquerda = parseInt($("#fundoGame").css("background-position"));
        $("#fundoGame").css("background-position", esquerda - 1);
    }
    //movimentacao do jogador
    function moveJogador() {
        if (jogo.pressionou[tecla.W]) {
            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top", topo - 10);
            if (topo <= 0) {
                $("#jogador").css("top", topo + 10);
            }
        }

        if (jogo.pressionou[tecla.S]) {
            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top", topo + 10);
            if (topo >= 434) {
                $("#jogador").css("top", topo - 10);
            }
        }
        if (jogo.pressionou[tecla.D]) {
            disparo();
        }
    }
    //movimentacao do inimigo 1
    function moveInimigo1() {
        posicaoX = parseInt($("#inimigo1").css("left"));
        $("#inimigo1").css("left", posicaoX - velocidade);
        $("#inimigo1").css("top", posicaoY);

        if (posicaoX <= 0) {
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);
        }
    }

    //movimentacao inimigo 2
    function moveInimigo2() {
        posicaoX = parseInt($("#inimigo2").css("left"));
        $("#inimigo2").css("left", posicaoX - 3);

        if (posicaoX <= 0) {
            $("#inimigo2").css("left", 775);
        }
    }

    //movimentacao amigo
    function moveAmigo() {
        posicaoX = parseInt($("#amigo").css("left"));
        $("#amigo").css("left", posicaoX + 1);

        if (posicaoX > 906) {
            $("#amigo").css("left", 0);
        }
    }
    //disparo do jogador
    function disparo() {
        if (podeAtirar == true) {
            somDisparo.play();
            podeAtirar = false;
            topo = parseInt($("#jogador").css("top"));
            posicaoX = parseInt($("#jogador").css("left"));
            tiroX = posicaoX + 190;
            topoTiro = topo + 37;
            $("#fundoGame").append("<div id ='disparo'></div>");
            $("#disparo").css("top", topoTiro);
            $("#disparo").css("left", tiroX);
            var tempoDisparo = window.setInterval(executaDisparo, 30);
        }
        //realizacao do disparo
        function executaDisparo() {
            posicaoX = parseInt($("#disparo").css("left"));
            $("#disparo").css("left", posicaoX + 10);
            if (posicaoX > 900) {
                window.clearInterval(tempoDisparo);
                tempoDisparo = null;
                $("#disparo").remove();
                podeAtirar = true;
            }
        }
    }
    //colisoes
    function colisao() {
        var colisao1 = $("#jogador").collision($("#inimigo1"));
        var colisao2 = $("#jogador").collision($("#inimigo2"));
        var colisao3 = $("#disparo").collision($("#inimigo1"));
        var colisao4 = $("#disparo").collision($("#inimigo2"));
        var colisao5 = $("#jogador").collision($("#amigo"));
        var colisao6 = $("#inimigo2").collision($("#amigo"));
        //jogador inimigo 1
        if (colisao1.length > 0) {
            energiaAtual--;
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
            explosao1(inimigo1X, inimigo1Y);
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);
        }
        //jogador inimigo 2
        if (colisao2.length > 0) {
            energiaAtual--;
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            explosao2(inimigo2X, inimigo2Y);
            $("#inimigo2").remove();
            reposicionaInimigo2();
        }
        //disparo inimigo 1
        if (colisao3.length > 0) {
            pontos = pontos + 100;
            velocidade = velocidade + 0.3;
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
            explosao1(inimigo1X, inimigo1Y);
            $("#disparo").css("left", 950);
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);
        }
        //disparo inimigo 2
        if (colisao4.length > 0) {
            pontos = pontos + 50;
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            $("#inimigo2").remove();
            explosao2(inimigo2X, inimigo2Y);
            $("#disparo").css("left", 950);
            reposicionaInimigo2();
        }

        //jogador amigo
        if (colisao5.length > 0) {
            salvos++;
            somResgate.play();
            $("#amigo").remove();
            reposicionaAmigo();
        }

        //inimigo 2 amigo
        if (colisao6.length > 0) {
            perdidos++;
            amigoX = parseInt($("#amigo").css("left"));
            amigoY = parseInt($("#amigo").css("top"));
            explosao3(amigoX, amigoY);
            $("#amigo").remove();
            reposicionaAmigo();
        }
    }
    //explosao inimigo 1
    function explosao1(inimigo1X, inimigo1Y) {
        somExplosao.play();
        $("#fundoGame").append("<div id='explosao1'></div>");
        $("#explosao1").css("background-image", "url(imgs/explosao.png)");
        var div = $("#explosao1");
        div.css("top", inimigo1Y);
        div.css("left", inimigo1X);
        div.animate({ width: 300, opacity: 0 }, 500);
        var tempoExplosao = window.setInterval(removeExplosao, 1000);
        function removeExplosao() {
            div.remove();
            window.clearInterval(tempoExplosao);
            tempoExplosao = null;
        }
    }
    //explosao inimigo 2
    function explosao2(inimigo2X, inimigo2Y) {
        somExplosao.play();
        $("#fundoGame").append("<div id='explosao2'></div>");
        let div2 = $("#explosao2");
        div2.css("background-image", "url(imgs/explosao.png)");
        div2.css("top", inimigo2Y);
        div2.css("left", inimigo2X);
        div2.animate({ width: 200, opacity: 0 }, 500);
        var tempoExplosao2 = window.setInterval(removeExplosao2, 1000);
        function removeExplosao2() {
            div2.remove();
            window.clearInterval(tempoExplosao2);
            tempoExplosao2 = null;
        }
    }
    //explosao entre amigo e inimigo 2
    function explosao3(amigoX, amigoY) {
        somPerdido.play();
        $("#fundoGame").append("<div id='explosao3' class='anima4'></div>");
        $("#explosao3").css("top", amigoY);
        $("#explosao3").css("left", amigoX);
        var tempoExplosao3 = window.setInterval(resetaExplosao3, 1000);
        function resetaExplosao3() {
            $("#explosao3").remove();
            window.clearInterval(tempoExplosao3);
            tempoExplosao3 = null;
        }
    }
    //funcao que exibe o placar do jogo
    function placar() {
        $("#placar").html(
            "<h2> Pontos: " +
                pontos +
                " Salvos: " +
                salvos +
                " Perdidos: " +
                perdidos +
                "</h2>"
        );
    }

    function reposicionaInimigo2() {
        var tempoColisao4 = window.setInterval(reposiciona4, 5000);
        function reposiciona4() {
            window.clearInterval(tempoColisao4);
            tempoColisao4 = null;
            if (fimDeJogo == false) {
                $("#fundoGame").append("<div id='inimigo2'></div>");
            }
        }
    }
    
    function reposicionaAmigo() {
        var tempoAmigo = window.setInterval(reposiciona6, 6000);
        function reposiciona6() {
            window.clearInterval(tempoAmigo);
            tempoAmigo = null;
            if (fimDeJogo == false) {
                $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
            }
        }
    }
    //contador de energia do jogador
    function energia() {
        if (energiaAtual == 3) {
            $("#energia").css("background-image", "url(imgs/energia3.png)");
        }
        if (energiaAtual == 2) {
            $("#energia").css("background-image", "url(imgs/energia2.png)");
        }
        if (energiaAtual == 1) {
            $("#energia").css("background-image", "url(imgs/energia1.png)");
        }
        if (energiaAtual == 0) {
            $("#energia").css("background-image", "url(imgs/energia0.png)");
            gameOver();
        }
    }
//funcao game over
    function gameOver() {
        fimDeJogo = true;
        musica.pause();
        somGameover.play();
        window.clearInterval(jogo.timer);
        jogo.timer = null;
        $("#jogador").remove();
        $("#inimigo1").remove();
        $("#inimigo2").remove();
        $("#amigo").remove();

        $("#fundoGame").append("<div id='fim'></div>");
        $("#fim").html(
            "<h1>Fim de Jogo</h1><p>Sua pontuação foi: " +
                pontos +
                "</p>" +
                "<button  id='jogarNovamente' onClick=reiniciaJogo()>Jogar Novamente</button>"
        );
    }
}
//funcao de reinicio do jogo
function reiniciaJogo(){
    somGameover.pause();
    $("#fim").remove();
    start();
}
