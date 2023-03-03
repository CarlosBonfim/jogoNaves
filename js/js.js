function start() {
    //criada a func do inicio do jogo
    $("#inicio").hide(); //vai ocultar a div inicio
    // vai adicionar os elementos na area do jogo
    $("#fundoGame").append("<div id ='jogador' class='anima1' ></div>");
    $("#fundoGame").append("<div id ='inimigo1' class='anima2'></div>");
    $("#fundoGame").append("<div id ='inimigo2' ></div>");
    $("#fundoGame").append("<div id ='amigo' class = 'anima3'></div>");
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

    //verifica tecla pressionada pelo jogador
    $(document).keydown(function (e) {
        jogo.pressionou[e.which] = true;
        // console.log(`apertou ${e.which}`);
    });
    //verifica se o jogador soltou
    $(document).keyup(function (e) {
        jogo.pressionou[e.which] = false;
        // console.log(e.which);
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
    //disparo helicoptero jogador
    function disparo() {
        if (podeAtirar === true) {
            podeAtirar = false;
            topo = parseInt($("#jogador").css("top"));
            posicaoX = parseInt($("#jogador").css("left"));
            tiroX = posicaoX + 190;
            topoTiro = topo + 37;
            $("#fundoGame").append("<div id ='disparo' ></div>");
            $("#disparo").css("top", topoTiro);
            $("#disparo").css("left", tiroX);
        }
        var tempoDisparo = window.setInterval(executaDisparo, 30);
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
    //colisao jogador inimigo 1
    function colisao() {
        var colisao1 = $("#jogador").collision($("#inimigo1"));
        if (colisao1.length > 0) {
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
            explosao1(inimigo1X, inimigo1Y);
            console.log("chamar explosao");

            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);
        }
    }
    function explosao1(inimigo1X, inimigo1Y) {
        $("#fundoGame").append("<div id='explosao1'></div>");
        $("#explosao1").css("background-image", "url(imgs/explosao.png)");
        var div = $("#explosao1");
        div.css("top", inimigo1Y);
        div.css("left", inimigo1X);
        div.animate({ width: 200, opacity: 0 }, "slow");
        console.log("entrou explosao 1")

        var tempoExplosao = window.setInterval(removeExplosao, 1000);
        function removeExplosao() {
            div.remove();
            window.clearInterval(tempoExplosao);
            tempoExplosao = null;
        }
    }
}
