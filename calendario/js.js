var mesos = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
];

var dies = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sabado'
];

var dies_abr = [
    'Dom',
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
    'Sab'
];

Number.prototype.pad = function(num) {
    var str = '';
    for (var i = 0; i < (num - this.toString().length); i++)
        str += '0';
    return str += this.toString();
}

function calendari(widget, data) {

    var armazenagem = new armazena();
    var original = widget.getElementsByClassName('actiu')[0];

    if (typeof original === 'undefined') {
        original = document.createElement('table');
        original.setAttribute('data-actual',
            data.getFullYear() + '/' +
            data.getMonth().pad(2) + '/' +
            data.getDate().pad(2))
        widget.appendChild(original);
    }

    var diff = data - new Date(original.getAttribute('data-actual'));

    diff = new Date(diff).getMonth();

    var e = document.createElement('table');

    e.className = diff === 0 ? 'amagat-esquerra' : 'amagat-dreta';
    e.innerHTML = '';

    widget.appendChild(e);

    e.setAttribute('data-actual',
        data.getFullYear() + '/' +
        data.getMonth().pad(2) + '/' +
        data.getDate().pad(2))
    var plus = "";
    var fila = document.createElement('tr');
    var titol = document.createElement('th');
    titol.setAttribute('colspan', 7);

    var boto_prev = document.createElement('button');
    boto_prev.className = 'boto-prev';
    boto_prev.innerHTML = '&#9666;';

    var boto_next = document.createElement('button');
    boto_next.className = 'boto-next';
    boto_next.innerHTML = '&#9656;';

    titol.appendChild(boto_prev);
    titol.appendChild(document.createElement('span')).innerHTML =
        mesos[data.getMonth()] + '<span class="any">' + data.getFullYear() + '</span>';

    titol.appendChild(boto_next);


    //-------------------------------------------------------------------------

    boto_prev.onclick = function() {
        data.setMonth(data.getMonth() - 1);
        calendari(widget, data);
        for (i = 0; armazenagem.arr.length > i; i++) {
            VerTarefas(armazenagem.arr[i]);
        }
        armazenagem.zera();
    };

    boto_next.onclick = function() {
        data.setMonth(data.getMonth() + 1);
        calendari(widget, data);
        for (i = 0; armazenagem.arr.length > i; i++) {
            VerTarefas(armazenagem.arr[i]);
        }
        armazenagem.zera()
    };

    fila.appendChild(titol);
    e.appendChild(fila);

    fila = document.createElement('tr');

    for (var i = 1; i < 7; i++) {
        if (i == 6) {
            fila.innerHTML += '<th style="color:blue">' + dies_abr[i] + '</th>';
        } else {
            fila.innerHTML += '<th>' + dies_abr[i] + '</th>';
        }

    }

    fila.innerHTML += '<th style="color:red">' + dies_abr[0] + '</th>';
    e.appendChild(fila);

    /* Obtinc el dia que va acabar el mes anterior */
    var inici_mes =
        new Date(data.getFullYear(), data.getMonth(), -1).getDay();

    var actual = new Date(data.getFullYear(),
        data.getMonth(), -inici_mes);

    /* 6 setmanes per cobrir totes les posiblitats
     *  Quedaria mes consistent alhora de mostrar molts mesos 
     *  en una quadricula */
    for (var s = 0; s < 6; s++) {
        var fila = document.createElement('tr');


        for (var d = 1; d < 8; d++) {
            armazenagem.setArmazena(actual.getDate() + '-' + actual.getMonth() + '-' + actual.getFullYear());
            var cela = document.createElement('td');
            cela.id = 'celaId' + actual.getDate() + '-' + actual.getMonth() + '-' + actual.getFullYear();
            if (d == 6) {
                cela.id = "sabado";
            }
            if (d == 7) {
                cela.id = "domingo";
            }
            var span = document.createElement('span');
            span.id = "span" + actual.getDate() + "-" + actual.getMonth() + "-" + actual.getFullYear();
            cela.appendChild(span);
            cela.className = "modalTrigger";

            cela.setAttribute("id", "l" + actual.getDate() + "-" + actual.getMonth() + "-" + actual.getFullYear());
            plus += '<div id="modal' + actual.getDate() + '-' + actual.getMonth() + '-' + actual.getFullYear() + '" class="modalRapido">' +
                '<div class="rapidoOverlay" onclick="fechaMod(\'' + actual.getDate() + '-' + actual.getMonth() + '-' + actual.getFullYear() + '\')"></div>' +
                '<div class="rapidoConteudo noPadding">' +
                '<h5 class="dataDoModal">' + actual.getDate() + ' de ' + mesos[data.getMonth()] + ' de ' + actual.getFullYear() + '</h5>' +
                '<h6 class="infoModal" id="infoModal' + actual.getDate() + '-' + actual.getMonth() + '-' + actual.getFullYear() + '" ></h6>' +
                '<div class="padding" id="conteudoTarefa' + actual.getDate() + '-' + actual.getMonth() + '-' + actual.getFullYear() + '">' +
                '</div>' +

                '<input type="text" maxlength="30" placeholder="Escreva a tarefa (30 letras)" class="inputCal" id="inputTarefa' + actual.getDate() + '-' + actual.getMonth() + '-' + actual.getFullYear() + '">' +
                '<img src="icones/botaoAd.png" class="inputBotao" onclick="GuardaTarefa(\'' + actual.getDate() + '-' + actual.getMonth() + '-' + actual.getFullYear() + '\')" ><p style="opacity:0;clear:both;line-height:8px">-</p>' +

                '</div>' +
                '</div>';

            cela.addEventListener('click', function() {
                var id = this.getAttribute('id');
                document.querySelector('#moda' + id).style.display = "block";
            });


            span.innerHTML = actual.getDate();

            if (actual.getMonth() !== data.getMonth())
                cela.className = 'fora';

            /* Si es avui el decorem */
            if (data.getDate() == actual.getDate() &&
                data.getMonth() == new Date().getMonth())
                cela.classList.add('avui');

            actual.setDate(actual.getDate() + 1);
            fila.appendChild(cela);



        }

        e.appendChild(fila);
    }
    document.querySelector(".modales").innerHTML = plus;
    setTimeout(function() {
        e.className = 'actiu';
        original.className +=
            diff === 0 ? ' amagat-dreta' : ' amagat-esquerra';
    }, 20);

    original.className = 'inactiu';

    setTimeout(function() {
        var inactius = document.getElementsByClassName('inactiu');
        for (var i = 0; i < inactius.length; i++)
            widget.removeChild(inactius[i]);
    }, 1000);



    //console.log(armazenagem);
    for (i = 0; armazenagem.arr.length > i; i++) {
        VerTarefas(armazenagem.arr[i]);
    }
    armazenagem.zera();
}