function criaContainer(data) {
    this.container = document.createElement('conteudoTarefa' + data);
    return this;
}

function toast(data, classe) {
    var toastHTML = data;
    M.toast({ html: toastHTML, classes: classe });
}
class armazena {
    constructor() {

        this.arr = [];

        this.setArmazena = function(data) {
            this.arr.push(data);
        };
        this.getArmazenado = function() {
            return this.arr;
        };
        this.zera = function() {
            this.arr = [];
        };
    }
}

function meteColor() {
    var arr = [
        "#ffff00",
        "#0099ff",
        "#cc00dd",
        "#ff0000",
        "#ff9900",
        "#009900",
        "#aaa",
        "#000"
    ];
    var qual = Math.floor(Math.random() * 8);
    return arr[qual];
}

function VerTarefas(data) {
    var info = document.querySelector("#infoModal" + data);
    var container = document.querySelector('#conteudoTarefa' + data);
    tbTarefas.getItem(data).then(function(e) {
        var item = " ";
        if (e.tarefas.length > 0) {
            var n = 0;
            for (i = 0; e.tarefas.length > i; i++) {

                if (e.tarefas[i].apaga) {

                } else {
                    let cor = meteColor();
                    document.querySelector("#span" + data).style.border = "2px dashed " + cor;
                    document.querySelector("#modal" + data + " .dataDoModal").style.backgroundColor = cor;
                    //.dataDoModal

                    n += 1;
                    if (e.tarefas[i].feito) {
                        item += '<tarefa-fa feito="feito" check="icones/Feito.png" apaga="icones/apaga.png" tarefa="' + e.tarefas[i].tarefa + '" data="' + data + '" id="' + i + '"></tarefa-fa>';
                    } else {
                        item += '<tarefa-fa feito="naoFeito" check="icones/NaoFeito.png" apaga="icones/apaga.png" tarefa="' + e.tarefas[i].tarefa + '" data="' + data + '" id="' + i + '"></tarefa-fa>';
                    }

                }

            }
            info.innerHTML = n + ' tarefa(s)';
        }
        container.innerHTML = item;
    }).catch(function() {
        info.innerHTML = 'Nenhuma tarefa';
    })
}

function GuardaTarefa(data) {
    var tarefa = document.querySelector("#inputTarefa" + data).value;
    if (tarefa.length < 5) {
        toast('Deve inserir no mínimo cinco caractéres', 'fundoVermelho');
    } else {
        tbTarefas.getItem(data).then(function(e) {
            if (e) {
                e.tarefas.reverse();
                e.tarefas.push({ 'tarefa': tarefa, 'feito': false, 'apaga': false });
                e.tarefas.reverse();
                e.lastUpdate = Date.now();
                var opt = {};
                opt.lastUpdate = e.lastUpdate;
                opt.tarefas = e.tarefas;
                opt.quando = data;

                tbTarefas.setItem(data, opt).then(function() {
                    document.querySelector("#inputTarefa" + data).value = "";
                    VerTarefas(data)
                    toast('Registou mais uma tarefa', 'fundoVerde');
                });
            } else {
                var geneses = new Array({ 'tarefa': tarefa, 'feito': false, 'apaga': false });
                var opt = {};

                opt.lastUpdate = Date.now();
                opt.tarefas = geneses;
                opt.quando = data;

                tbTarefas.setItem(data, opt).then(function() {
                    document.querySelector("#inputTarefa" + data).value = "";
                    VerTarefas(data)
                    toast('Registou a tarefa', 'fundoVerde');
                });
            }
        });
    }

}



//ESCREVO MAIS DE 100 PAGINAS QUINZENALMENTE KKKKKKKK KKKKKKK