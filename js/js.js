function start() {
    //criada a func do inicio do jogo
    $("#inicio").hide(); //vai ocultar a div inicio
    // vai adicionar os elementos na area do jogo
    $("#fundoGame").append("<div id ='jogador' class='anima1' ></div>");
    $("#fundoGame").append("<div id ='inimigo1' class='anima2'></div>");
    $("#fundoGame").append("<div id ='inimigo2' ></div>");
    $("#fundoGame").append("<div id ='amigo' class = 'anima3'></div>");

    var jogo = {};

    var tecla = {
        W: 87,
        S: 83,
        D: 68,
    };

    jogo.pressionou = [];

    //verificar se o jogador pressionou

    $(document).keydown(function (e) {
        jogo.pressionou[e.which] = true;
        console.log(`apertou ${e.which}`);
    });

    $(document).keyup(function (e) {
        jogo.pressionou[e.which] = false;
        console.log(e.which);
    });

    //loop
    jogo.timer = setInterval(loop, 30);

    function loop() {
        movefundo();
        movejogador();
    }

    // vai fazer a moviementacao do background
    function movefundo() {
        esquerda = parseInt($("#fundoGame").css("background-position"));
        $("#fundoGame").css("background-position", esquerda - 1);
    }

    function movejogador() {
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
    }
}
