

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

    $(".chart").slideToggle(2000);
  
    var ctx = $('#myChart');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['10','20', '30', '40','50'],
            datasets: [{
                label: 'Rentabilidade',
                data: [-5, 14, -15, -15],
                backgroundColor: 'transparent',
                borderColor: [
                    'rgba(77, 166, 253, 0.85)',  
                ],
                borderWidth: 2
            },
        {
            label: 'No Vencimento',
            data: [17, 18, -21],
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
            }
        
        }
    });

    
}


/*

listaAtivos = document.getElementsByClassName("ag-row ag-row-no-focus ag-row-odd ag-row-no-animation ag-row-level-0")

for (let index in listaAtivos) {
  if (index <= listaAtivos.length) {
    console.log(listaAtivos[index]);
  }
}

let listaAtivos = document.getElementsByClassName("ag-row ag-row-no-focus ag-row-odd ag-row-no-animation ag-row-level-0")
let i = 0;
for (let ativo of listaAtivos) {
    i++ 
  console.log(ativo.getAttribute("row-id"));
  if(i>10)
  break
}

let listaStrike = document.getElementsByClassName("ag-cell ag-cell-not-inline-editing ag-cell-no-focus ag-numeric-cell ag-cell-value")
for (let strike of listaStrike) {
   
  console.log(strike.getAttribute("comp-id"));
 

}
================= pegando todas as info da grid para montar o POJO =================
pegar all

let listaAtivos = document.getElementsByClassName("ag-body-container")

for (let listaAsset of listaAtivos) {
    console.log(listaAsset);
   for(let asset of listaAsset.children ){
        console.log(" ****** " + asset.getAttribute("row-id") + " ****** ");
      for(let field of asset.children){
        console.log(field.getAttribute("col-id") + " : " + field.innerText);
 
      }
     break;
   }  
}
================= pegando todas as info da grid para montar o POJO =================





============ Para Descobrir Europeia/Americana ============

let listAssetFrom = document.getElementsByClassName("ag-pinned-left-cols-container")

for (let listaAsset of listAssetFrom) {
   
    console.log(listaAsset.children);

 for(let asset of listaAsset.children ){
      console.log(asset.children.length)
     if (asset.children.length > 1 ) {
        console.log(" ****** " + asset.getAttribute("row-id") + " ****** ");
        console.log(asset.children[1].innerText + " : " + 
                    asset.children[1].getElementsByTagName( 'img' )[0].alt );
     }else{
        console.log(" ****** " + asset.getAttribute("row-id") + " ****** ");
        console.log(asset.children[1].innerText + " : " + "Americana" );
     }
        break;
   }  
}
============ Para Descobrir Europeia/Americana ============



col-id="moneyness"

col-id="strike"

col-id="variation"

col-id="bid"

col-id="ask"

col-id="vi"

col-id="ve"
 
col-id="mid"

col-id="implied-volatility"

col-id="financial-volume"

col-id="bs-price"

col-id="delta"

col-id="gamma"

col-id="theta"

col-id="vega"

col-id="liquidity-level"

col-id="volume"

col-id="profit-rate"

col-id="protection-rate"

col-id="rho"




*/


