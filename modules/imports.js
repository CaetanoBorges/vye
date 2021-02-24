var tela = document.querySelector("#tela");
var cabeca = document.querySelector(".cabeca");
var telaDois = document.querySelector("#telaDois");
var procurar = document.querySelector(".modalPes");
var Nota = {};

var vaiTela = function() {
    document.querySelector(".modalRapidoo").style.display = "none";
    tela.style.display = "block";
    cabeca.style.display = "block";
    document.querySelector("#querApagar").style.display = "none";
    document.querySelector("#id").value = 0;
    location.href = "#home";
}
var vaiTelaDois = function() {
    tela.style.display = "none";
    cabeca.style.display = "none";
    //procurar.style.display = "none";
    location.href = "#nota";
    var id = document.querySelector("#id").value;
    if (id > 100) {
        document.querySelector("#querApagar").style.display = "block";
    } else {
        document.querySelector("#querApagar").style.display = "none";
    }
    if (document.querySelector("#chave").value == 0) {
        Nota.Cores = meteRandomColor();
    }

    document.querySelector("#background").style.background = Nota.Cores[0];
    document.querySelector("#pesquisar").style.color = Nota.Cores[0];
    document.querySelector("#salvar").style.background = Nota.Cores[0];
    document.querySelector("#toolbar-container").style.background = Nota.Cores[0];

}

function Load() {
    document.querySelector(".divLoad").style.display = "block";
}

function stopLoad() {
    document.querySelector(".divLoad").style.display = "none";
}


var quill = function() {
    var FontAttributor = Quill.import('attributors/class/font');
    FontAttributor.whitelist = [
        'Comic Sans MS', 'Impact', 'KitchenHome'
    ];
    Quill.register(FontAttributor, true);
    //Inicializa o Editor
    var toolbarOptions = [
        [{ 'color': [] }],
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        [{ 'list': 'bullet' }], // text direction
        [{ 'font': ['Comic Sans MS', 'Impact', 'KitchenHome'] }],
        [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown         // dropdown with defaults from theme
        [{ 'align': [] }]
        // ['clean']                                     // remove formatting button
    ];

    var quill = new Quill('#editor', {
        modules: {
            toolbar: { container: "#toolbar-container" }
        },
        theme: 'snow'
    });
    var delta = quill.getContents();
    //console.log(delta);
    Nota.quill = quill;

}
var NaoPerde = function() {
    Load();
    var titulo = document.querySelector("#pesquisar").value;
    if (titulo.length < 1) {
        let verif = Nota.quill.getLength();
        if (verif < 2) {
            //toast("Deve ter um titulo ou algum conteúdo", "fundoVermelho");


            //Notas();
            stopLoad();
        } else {
            tbNotas.length().then(function(e) {
                let id = Date.now();
                let tit = Nota.quill.getText();
                var titulo = tit.slice(0, 20);
                let chave = document.querySelector("#chave").value;
                if (chave == 0) {
                    chave = id;
                }
                let d = new Date();
                let opt = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
                var cores = Nota.Cores;
                let tempo = d.toLocaleDateString("pt-BR", opt);
                let p = Nota.quill.getContents();
                let opcoes = { 'lastUpdate': id, 'chave': chave, 'titulo': titulo, 'tempo': tempo, 'conteudo': p, 'texto': tit, 'cores': cores, 'apaga': false };
                tbNotas.setItem(id.toString(), opcoes).then(function(f) {
                    soSalva(f)
                });
            });

            let i = document.querySelector('#id').value;
            tbNotas.removeItem(i).then(function(g) {
                //Notas();
                document.querySelector("#pesquisar").value = "";
                document.querySelector("#chave").value = 0;
                Nota.quill.setText('');

                document.querySelector("#querApagar").style.display = "block";
                stopLoad();
            })

        }
    } else {
        tbNotas.length().then(function(e) {
            let id = Date.now();
            let tit = Nota.quill.getText();
            let titulo = document.querySelector("#pesquisar").value;
            let chave = document.querySelector("#chave").value;
            if (chave == 0) {
                chave = id;
            }
            let d = new Date();
            let opt = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
            let tempo = d.toLocaleDateString("pt-BR", opt);
            var cores = Nota.Cores;
            //console.log(Nota.quill.getContents());
            let p = Nota.quill.getContents();
            let opcoes = { 'lastUpdate': id, 'chave': chave, 'titulo': titulo, 'tempo': tempo, 'conteudo': p, 'texto': tit, 'cores': cores, 'apaga': false };
            tbNotas.setItem(id.toString(), opcoes).then(function(f) {
                //window.location.href = '#cabeca';
                soSalva(f)
            });
        });

        let i = document.querySelector('#id').value;
        tbNotas.removeItem(i).then(function(g) {
            //Notas();

            document.querySelector("#pesquisar").value = "";
            document.querySelector("#chave").value = 0;
            Nota.quill.setText('');

            document.querySelector("#querApagar").style.display = "block";
            stopLoad();
        })
    }
}

function soSalva(f) {
    var s = Date.now();
    let frag = document.createRange().createContextualFragment('<div id="element" class="tirar' + s + ' animated backInRight" style="border-top:5px solid ' + f["cores"][0] + ';background: ' + f["cores"][1] + '">' +
        '<div  onclick="SetBuffer(\'' + f["lastUpdate"] + '\', \'tirar' + s + '\', )"><h4> ' + f["titulo"] + '</h4>' +
        '<p id="hora"> ' + f["tempo"] + ' </p></div>' +
        '</div>');
    var um = document.querySelectorAll("#element")[0];
    document.querySelector("#elementos").insertBefore(frag, um);
}
var SalvaNota = function() {
    var clas = this;
    var titulo = document.querySelector("#pesquisar").value;
    if (titulo.length < 1) {
        let verif = Nota.quill.getLength();
        if (verif < 2) {
            //toast("Deve ter um titulo ou algum conteúdo", "fundoVermelho");
        } else {
            Load();
            tbNotas.length().then(function(e) {
                let id = Date.now();
                let tit = Nota.quill.getText();
                var titulo = tit.slice(0, 20);
                let chave = document.querySelector("#chave").value;
                if (chave == 0) {
                    chave = id;
                }
                let d = new Date();
                let opt = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
                var cores = Nota.Cores;
                let tempo = d.toLocaleDateString("pt-BR", opt);
                let p = Nota.quill.getContents();
                let opcoes = { 'lastUpdate': id, 'chave': chave, 'titulo': titulo, 'tempo': tempo, 'conteudo': p, 'texto': tit, 'cores': cores, 'apaga': false };
                tbNotas.setItem(id.toString(), opcoes).then(function(f) {
                    soSalva(f)

                });
            });

            let i = document.querySelector('#id').value;

            tbNotas.removeItem(i).then(function(g) {
                vaiTela();
                //Notas();



                document.querySelector("#pesquisar").value = "";
                document.querySelector("#chave").value = 0;
                Nota.quill.setText('');

                document.querySelector("#querApagar").style.display = "block";
                stopLoad();
            })

        }
    } else {
        Load();
        tbNotas.length().then(function(e) {
            let id = Date.now();
            let tit = Nota.quill.getText();
            let titulo = document.querySelector("#pesquisar").value;
            let chave = document.querySelector("#chave").value;
            if (chave == 0) {
                chave = id;
            }
            let d = new Date();
            let opt = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
            let tempo = d.toLocaleDateString("pt-BR", opt);
            var cores = Nota.Cores;
            //console.log(Nota.quill.getContents());
            let p = Nota.quill.getContents();
            let opcoes = { 'lastUpdate': id, 'chave': chave, 'titulo': titulo, 'tempo': tempo, 'conteudo': p, 'texto': tit, 'cores': cores, 'apaga': false };
            tbNotas.setItem(id.toString(), opcoes).then(function(f) {
                //window.location.href = '#cabeca';
                soSalva(f)
            });
        });

        let i = document.querySelector('#id').value;
        tbNotas.removeItem(i).then(function(g) {
            vaiTela();
            //Notas();

            document.querySelector("#pesquisar").value = "";
            document.querySelector("#chave").value = 0;
            Nota.quill.setText('');

            document.querySelector("#querApagar").style.display = "block";
            stopLoad();
        })
    }
}
var Notas = function() {
    Nota.Cores = ["#aaa", "#eaeaea"];
    let array = new Array();
    tbNotas.iterate(function(v, k, i) {
        array.push(v);
    }).then(function() {
        var res = "";
        array.reverse();
        for (var arra in array) {

            if (array[arra]["apaga"]) {

            } else {
                res += '<div id="element" class="tirar' + arra + ' animated backInRight" style="border-top:5px solid ' + array[arra]["cores"][0] + ';background: ' + array[arra]["cores"][1] + '">' +
                    '<div  onclick="SetBuffer(\'' + array[arra]["lastUpdate"] + '\', \'tirar' + arra + '\', )"><h4> ' + array[arra]["titulo"] + '</h4>' +
                    '<p id="hora"> ' + array[arra]["tempo"] + ' </p></div>' +
                    '</div>'
            }
        }
        document.querySelector("#elementos").innerHTML = res;
    });
}
var SetBuffer = function(id, arra) {
    Load();
    localStorage.setItem("tirarDaUi", arra);
    tbNotas.getItem(id).then(function(f) {

        document.querySelector("#id").value = f.lastUpdate;
        document.querySelector("#chave").value = f.chave;
        document.querySelector("#pesquisar").value = f.titulo;




        Nota.Cores = f.cores;
        Nota.quill.setContents(f.conteudo);
        //console.log(Nota); 
        Nota.quill.disable();
        document.querySelector("#pesquisar").disabled = true;
        document.querySelector("#modalQua").disabled = true;
        vaiTelaDois();
        stopLoad();
    })
}
var QuerApagar = function() {
    var x = document.querySelector(".div_apagar");
    if (x.style.display == 'none') {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
var ApagaNota = function() {
    Load();
    var id = document.querySelector("#id").value;
    document.querySelector("#modalInfo").style.display = "none";
    tbNotas.getItem(id).then(function(i) {
        i.apaga = true;
        tbNotas.setItem(id, i).then(function(o) {
            vaiTela();
            Notas();
            document.querySelector("#pesquisar").value = "";
            document.querySelector("#id").value = "";
            document.querySelector("#chave").value = 0;
            Nota.quill.setText('');
            document.querySelector("#querApagar").style.display = "none";
            stopLoad();
        })
    })

}

function meteRandomColor() {
    var arr = [
        ["rgba(255,255,0)", "rgba(255,255,0,.3)"],
        ["#0099ff", "rgba(0,150,150,.3)"],
        ["rgba(120,0,220)", "rgba(60,0,120,.3)"],
        ["red", "#99000060"],
        ["#ff9900", "#ff990060"],
        ["#009900", "#00990060"],
        ["#aaa", "#eaeaea"],
        ["#000", "rgba(0,20,20,.3)"]
    ];
    var qual = Math.floor(Math.random() * 8);
    return arr[qual];
}

var Modal = function() {
    var cores = {
        amarela: ["rgba(255,255,0)", "rgba(255,255,0,.3)"],
        azul: ["#0099ff", "rgba(0,150,150,.3)"],
        vinho: ["rgba(120,0,220)", "rgba(60,0,120,.3)"],
        vermelha: ["red", "#99000060"],
        laranja: ["#ff9900", "#ff990060"],
        verde: ["#009900", "#00990060"],
        cinza: ["#aaa", "#eaeaea"],
        escuro: ["#000", "rgba(0,20,20,.3)"]
    };


    document.querySelector(".modalRapidoo").style.display = "block";
    document.querySelector(".rapidoOverlayy").addEventListener('click', function() {
        document.querySelector(".modalRapidoo").style.display = "none";
    })

    var style = cores;
    document.querySelector(".escura").addEventListener('click', function() {
        document.querySelector("#background").style.background = style.escuro[0];
        document.querySelector("#pesquisar").style.color = style.escuro[0];
        document.querySelector("#salvar").style.background = style.escuro[0];
        document.querySelector("#toolbar-container").style.background = style.escuro[0];
        Nota.Cores = style.escuro;
    });
    document.querySelector(".vinho").addEventListener('click', function() {
        document.querySelector("#background").style.background = style.vinho[0];
        document.querySelector("#pesquisar").style.color = style.vinho[0];
        document.querySelector("#salvar").style.background = style.vinho[0];
        document.querySelector("#toolbar-container").style.background = style.vinho[0]
        Nota.Cores = style.vinho;
    });
    document.querySelector(".azul").addEventListener('click', function() {
        document.querySelector("#background").style.background = style.azul[0];
        document.querySelector("#pesquisar").style.color = style.azul[0];
        document.querySelector("#salvar").style.background = style.azul[0];
        document.querySelector("#toolbar-container").style.background = style.azul[0]
        Nota.Cores = style.azul;
    });
    document.querySelector(".amarela").addEventListener('click', function() {
        document.querySelector("#background").style.background = style.amarela[0];
        document.querySelector("#pesquisar").style.color = style.amarela[0];
        document.querySelector("#salvar").style.background = style.amarela[0];
        document.querySelector("#toolbar-container").style.background = style.amarela[0]
        Nota.Cores = style.amarela;
    });
    document.querySelector(".cinza").addEventListener('click', function() {
        document.querySelector("#background").style.background = style.cinza[0];
        document.querySelector("#pesquisar").style.color = style.cinza[0];
        document.querySelector("#salvar").style.background = style.cinza[0];
        document.querySelector("#toolbar-container").style.background = style.cinza[0]
        Nota.Cores = style.cinza;
    });
    document.querySelector(".vermelho").addEventListener('click', function() {
        document.querySelector("#background").style.background = style.vermelha[0];
        document.querySelector("#pesquisar").style.color = style.vermelha[0];
        document.querySelector("#salvar").style.background = style.vermelha[0];
        document.querySelector("#toolbar-container").style.background = style.vermelha[0]
        Nota.Cores = style.vermelha;
    });
    document.querySelector(".laranja").addEventListener('click', function() {
        document.querySelector("#background").style.background = style.laranja[0];
        document.querySelector("#pesquisar").style.color = style.laranja[0];
        document.querySelector("#salvar").style.background = style.laranja[0];
        document.querySelector("#toolbar-container").style.background = style.laranja[0]
        Nota.Cores = style.laranja;
    });
    document.querySelector(".verde").addEventListener('click', function() {
        document.querySelector("#background").style.background = style.verde[0];
        document.querySelector("#pesquisar").style.color = style.verde[0];
        document.querySelector("#salvar").style.background = style.verde[0];
        document.querySelector("#toolbar-container").style.background = style.verde[0]
        Nota.Cores = style.verde;
    });


}
var FechaModal = function() {
    document.querySelector(".modalRapidoo").style.display = "none";
}



//Nota
function veSeSalva() {
    if (Nota.quill.isEnabled()) {
        SalvaNota()
    } else {
        //console.log('Faça duplo click se deseja editar. Para voltar aperte voltar');
    }
}

function ativaEditor() {

    Nota.quill.enable();

    document.querySelector("#pesquisar").disabled = false;
    document.querySelector("#modalQua").disabled = false;

}

function doubleTap() {
    var currentTime = new Date().getTime();
    var tapLength = currentTime - lastTap;
    clearTimeout(timeout);
    if (tapLength < 500 && tapLength > 0) {
        var tirar = localStorage.getItem("tirarDaUi");
        document.querySelector("." + tirar).remove();
        ativaEditor();
    } else {
        veSeSalva();
        timeout = setTimeout(function() {
            clearTimeout(timeout);
        }, 1000);
    }
    lastTap = currentTime;
}

var elm1 = document.querySelector('#salvar');
var elm2 = document.querySelector('#pesquisar');
var elm3 = document.querySelector('#editor');
var timeout;
var lastTap = 0;
elm1.addEventListener('touchend', doubleTap);
elm2.addEventListener('touchend', function() {
    if (elm2.disabled) {
        doubleTap();
    } else {}
});
elm3.addEventListener('touchend', function() {
    if (Nota.quill.isEnabled()) {

    } else {
        doubleTap();
    }
});
//Calendario
function fechaMod(id) {
    console.log(id);
    document.querySelector('#modal' + id).style.display = "none";
}

//Def
var AbreDef = function() {
    document.querySelector(".modalDef").style.display = "block";
    location.hash = "conectar-se"
}

var FechaDef = function() {
    history.back();
}

//Pes
var AbrePes = function() {
    document.querySelector(".modalPes").style.display = "block";
    location.hash = "procurar"
}

var FechaPes = function() {
    history.back();
}


//Home Funções
quill();

location.href = "#home";