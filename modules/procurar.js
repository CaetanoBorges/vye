function procurar() {
    var valor = $("#procurar").val();
    if (valor.length > 0) {
        $("#limpaProcurar").show();
    } else {
        $("#limpaProcurar").hide();
    }

    if (valor.length > 0) {
        var array = [];
        tbNotas.iterate(function(v, k, i) {

            if (v.titulo.match(`${valor}`)) {
                array.push(v);
            } else if (v.texto.match(`${valor}`)) {
                array.push(v);
            }
        }).then(function() {
            var res = "";
            for (var arra in array) {
                if (array[arra]["apaga"]) {

                } else {
                    var t = Date.now();
                    res += '<div id="element" class="tirar' + t + '" style="border-top:5px solid ' + array[arra]["cores"][0] + ';background: ' + array[arra]["cores"][1] + '">' +
                        '<div  onclick="SetBuffer(\'' + array[arra]["lastUpdate"] + '\', \'tirar' + t + '\', )"><h4> ' + array[arra]["titulo"] + '</h4>' +
                        '<p id="hora"> ' + array[arra]["tempo"] + ' </p></div>' +
                        '</div>'
                }
            }
            $("#elementosPesq").html(res);
            document.querySelector("#elementosPesq").offsetWidth;

        });
    }

}

function limpaProcurar() {
    $("#procurar").val("");
    $("#limpaProcurar").hide();
}

function procurarr() {
    var array = [];
    $valor = $("#procurar").val();
    tbNotas.iterate(function(v, k, i) {

        array.push(v);
    }).then(function() {
        var res = "";
        array.reverse();
        for (var arra in array) {

            if (array[arra]["apaga"]) {

            } else {
                res += '<div id="element" class="tirar' + t + '" style="border-top:5px solid ' + array[arra]["cores"][0] + ';background: ' + array[arra]["cores"][1] + '">' +
                    '<div  onclick="SetBuffer(\'' + array[arra]["lastUpdate"] + '\', \'tirar' + t + '\', )"><h4> ' + array[arra]["titulo"] + '</h4>' +
                    '<p id="hora"> ' + array[arra]["tempo"] + ' </p></div>' +
                    '</div>'
            }
        }
        document.querySelector("#elementos").innerHTML = res;
    });
}