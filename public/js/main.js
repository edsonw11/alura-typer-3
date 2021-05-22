

var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(function() {
   
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
   
    $("#botao-reiniciar").click(reiniciaJogo);
    montarGrafico();
    $('ul.tabs').tabs();

});

function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var numPalavras  = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");

    tamanhoFrase.text(numPalavras);
}

function inicializaContadores() {
    campo.on("input", function() {
        var conteudo = campo.val();

        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras);

        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
}

function inicializaMarcadores() {
    var frase = $(".frase").text();
    campo.on("input", function() {
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);

        if (digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
}

function inicializaCronometro() {
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function() {
    	var cronometroID = setInterval(function() {
    		tempoRestante--;
    		$("#tempo-digitacao").text(tempoRestante);
    		if (tempoRestante < 1) {
                clearInterval(cronometroID);
                finalizaJogo();
    		}
    	}, 1000);
    });
}

function finalizaJogo() {
    campo.attr("disabled", true);
    campo.toggleClass("campo-desativado");
    inserePlacar();
}

function reiniciaJogo() {
   
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text(0);
    $("#contador-caracteres").text(0);
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}

$("#botao-grafico").click(montarGrafico);

function montarGrafico() {
    console.log("*******  clicado   *******")
    var ctx = $('#myChart');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['23','25', '26',],
            datasets: [{
                label: 'Rentabilidade',
                data: [23, -25, 26],
                backgroundColor: 'transparent',
                borderColor: [
                    'rgba(77, 166, 253, 0.85)',  
                ],
                borderWidth: 2
            },
        {
            label: 'No Vencimento',
            data: [-20, 15, -30],
            backgroundColor: 'transparent',
            borderColor: [
                'rgba(6, 204, 6, 0.85)',  
            ],
            borderWidth: 2

            
        }]
        },
        options: {
            title : {
                display : true,
                fontSize :20,
                text : "Estrategia TRF"
            },
            labels: {
                fontStyle : "bold"
            },
            scales: {
                x: {
                    type: 'linear'
                },
                y:{
                    type: 'linear'
                }
            }
        }
    });
}





