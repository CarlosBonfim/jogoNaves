function start(){ //criada a func do inicio do ogo
    $("#inicio").hide(); //vai ocultar a div inicio

    $("#fundoGame").append("<div id ='jogador' class='anima1' ></div>")
    $("#fundoGame").append("<div id ='inimigo1' class='anima2'></div>")
    $("#fundoGame").append("<div id ='inimigo2' ></div>")
    $("#fundoGame").append("<div id ='amigo' class = 'anima3'></div>")
}