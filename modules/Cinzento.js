var Cinzento;
(function (Cinzento) {

    (function(Estilo){
        var Load = (function(){
            function Load() {
                this.amarela = ["rgba(255,255,0)","rgba(255,255,0,.3)"];
                this.azul = ["#0099ff","rgba(0,150,150,.3)"];
                this.vinho = ["rgba(120,0,220)","rgba(60,0,120,.3)"];
                this.vermelha = ["red","#99000060"];
                this.laranja = ["#ff9900","#ff990060"];
                this.verde = ["#009900","#00990060"];
                this.cinza = ["#aaa","#eaeaea"];
                this.escuro = ["#000","rgba(0,20,20,.3)"];
            }
            //Load.prototype.objCores = function(array){
            //  this.Cores = array;
            //}
            return Load;
        })();
        Estilo.Load = Load;
    })(Cinzento.Estilo || (Cinzento.Estilo = {}));
    var Estilo = Cinzento.Estilo;


    (function (Router) {
        var Load = (function () {
            function Load() {
                //console.log(history.state);
            }
            Load.prototype.View = function (path, containerToRender) {
                document.querySelector(".divLoad").style.display = "block";
                fetch(path).then(function(promise){
                    promise.text().then(function(res){
                        document.querySelector(containerToRender).innerHTML = res;
                        if(path.match(/adiciona/)){
                            new Cinzento.Nota.Load().InitEditor();
                            new Cinzento.Nota.Load().VerNota();
                            PorUrl('adNota');
                        }
                        if(path.match(/home/)){
                            
                            new Cinzento.Home.Load();
                            new Cinzento.Nota.Load().Notas();
                            calendari(document.getElementById('calendari'), new Date());
                            PorUrl('home');
                        }


                        document.querySelector(".divLoad").style.display = "none";
                    })
                })
                
            }
            var PorUrl = function(path){
                var state;
                if(path == "AdNota"){
                    state = "nota/adiciona.html";
                }
                if(path == "home"){
                    state = "home.html";
                }
                window.history.pushState(state,'',path);
            }
            Load.prototype.TrabalhaUrl = function(){
                var state = history.state;
                new Cinzento.Router.Load().View(state,"#app");
            }
            return Load;
        })();
        Router.Load = Load;
    })(Cinzento.Router || (Cinzento.Router = {}));
    var Router = Cinzento.Router;
    
    (function (Nota) {
        var Load = (function () {
            function Load() {
                Nota.Cores = new Estilo.Load().cinza;
            }
            Load.prototype.Modal = function(){
                var clas = Nota;
                document.querySelector(".modalRapido").style.display="block";
                document.querySelector(".rapidoOverlay").addEventListener('click',function(){
                    document.querySelector(".modalRapido").style.display="none";
                })

                var style = new Estilo.Load();
                document.querySelector(".escura").addEventListener('click', function(){
                    document.querySelector(".rapidoConteudo").style.background = style.escuro[0];
                    document.querySelector("#pesquisar").style.color = style.escuro[0];
                    document.querySelector("#salvar").style.background = style.escuro[0];
                    clas.Cores = style.escuro;
                });
                document.querySelector(".vinho").addEventListener('click', function(){
                    document.querySelector(".rapidoConteudo").style.background = style.vinho[0];
                    document.querySelector("#pesquisar").style.color = style.vinho[0];
                    document.querySelector("#salvar").style.background = style.vinho[0];
                    clas.Cores = style.vinho;
                });
                document.querySelector(".azul").addEventListener('click', function(){
                    document.querySelector(".rapidoConteudo").style.background = style.azul[0];
                    document.querySelector("#pesquisar").style.color = style.azul[0];
                    document.querySelector("#salvar").style.background = style.azul[0];
                    clas.Cores = style.azul;
                });
                document.querySelector(".amarela").addEventListener('click', function(){
                    document.querySelector(".rapidoConteudo").style.background = style.amarela[0];
                    document.querySelector("#pesquisar").style.color = style.amarela[0];
                    document.querySelector("#salvar").style.background = style.amarela[0];
                    clas.Cores = style.amarela;
                });
                document.querySelector(".cinza").addEventListener('click', function(){
                    document.querySelector(".rapidoConteudo").style.background = style.cinza[0];
                    document.querySelector("#pesquisar").style.color = style.cinza[0];
                    document.querySelector("#salvar").style.background = style.cinza[0];
                    clas.Cores = style.cinza;
                });
                document.querySelector(".vermelho").addEventListener('click', function(){
                    document.querySelector(".rapidoConteudo").style.background = style.vermelha[0];
                    document.querySelector("#pesquisar").style.color = style.vermelha[0];
                    document.querySelector("#salvar").style.background = style.vermelha[0];
                    clas.Cores = style.vermelha;
                });
                document.querySelector(".laranja").addEventListener('click', function(){
                    document.querySelector(".rapidoConteudo").style.background = style.laranja[0];
                    document.querySelector("#pesquisar").style.color = style.laranja[0];
                    document.querySelector("#salvar").style.background = style.laranja[0];
                    clas.Cores = style.laranja;
                });
                document.querySelector(".verde").addEventListener('click', function(){
                    document.querySelector(".rapidoConteudo").style.background = style.verde[0];
                    document.querySelector("#pesquisar").style.color = style.verde[0];
                    document.querySelector("#salvar").style.background = style.verde[0];
                    clas.Cores = style.verde;
                });


            }
            Load.prototype.FechaModal = function(){
                document.querySelector(".modalRapido").style.display="none";
            }
            Load.prototype.InitEditor = function(){
                //Inicializa o Editor
                var toolbarOptions = [
                    [{ 'color': [] } ], 
                    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                    [{ 'list': 'bullet' }],                        // text direction
            
                    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown         // dropdown with defaults from theme
                    [{ 'align': [] }]
                   // ['clean']                                     // remove formatting button
                    ];
            
                    var quill = new Quill('#editor', {
                    modules: {
                        toolbar: toolbarOptions
                    },
                    theme: 'snow'
                    });
                    var delta = quill.getContents();
                    //console.log(delta);
                    Cinzento.Nota.quill = quill;
                    
            }
            
            Load.prototype.SalvaNota = function(){
                var clas= this;
                var titulo = document.querySelector("#pesquisar").value;
                if(titulo.length < 1){
                    let verif = Cinzento.Nota.quill.getLength();
                    if(verif < 2){
                        //toast("Deve ter um titulo ou algum conteúdo", "fundoVermelho");
                    }else{
                        tbNotas.length().then(function(e){
                            let id = Date.now();
                            let tit = Cinzento.Nota.quill.getText();
                            var titulo = tit.slice(0,20);
                            let d = new Date();
                            let opt = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric',  second: 'numeric'};
                            var cores = Nota.Cores;
                            let tempo = d.toLocaleDateString("pt-BR", opt);
                            let p = Cinzento.Nota.quill.getContents();
                            let opcoes = {'chave': id, 'titulo': titulo, 'tempo': tempo, 'conteudo': p, 'texto':tit,'cores': cores, 'apaga': false };
                            tbNotas.setItem(id.toString(), opcoes).then(function(f){
                                    
                                
                            });
                        });
        
                        let i = document.querySelector('#id').value;
                                    tbNotas.removeItem(i).then(function(g){    
                                        //window.location.href='index.html';
                                })
                        
                    }
                }else{
                    tbNotas.length().then(function(e){
                            let id = Date.now();
                            let tit = Cinzento.Nota.quill.getText();
                            let titulo = document.querySelector("#pesquisar").value; 
                            let d = new Date();
                            let opt = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric',  second: 'numeric'};
                            let tempo = d.toLocaleDateString("pt-BR", opt);
                            var cores = Nota.Cores;
                            //console.log(Cinzento.Nota.quill.getContents());
                            let p = Cinzento.Nota.quill.getContents();
                            let opcoes = {'chave': id, 'titulo': titulo, 'tempo': tempo, 'conteudo': p, 'texto':tit, 'cores': cores, 'apaga': false };
                            tbNotas.setItem(id.toString(), opcoes).then(function(f){
                                    new Cinzento.Router.Load().View('home.html','#app')
                                
                            });
                        });
        
                        let i = document.querySelector('#id').value;
                                    tbNotas.removeItem(i).then(function(g){    
                                        //window.location.href='index.html';
                                })
                }
            }
            Load.prototype.Notas = function(){
                let array = new Array();
                tbNotas.iterate(function(v, k, i){
                    array.push(v);
                }).then(function(){
                    var res ="";
                    array.reverse();
                    for (var arra in array){
                        if(array[arra]["apaga"]){

                        }else{
                            res += '<div id="element" style="border-top:5px solid '+array[arra]["cores"][0]+';background: '+array[arra]["cores"][1]+'">'+
                                    '<div  onclick="Nota.SetBuffer('+array[arra]["chave"]+')"><h4> '+array[arra]["titulo"]+'</h4>'+
                                    '<p id="hora"> '+array[arra]["tempo"]+' </p></div>'+
                            '</div>'
                        }
                    }
                    document.querySelector("#elementos").innerHTML = res;
                });
            }
            Load.prototype.SetBuffer = function(id){
                tbBuffer.setItem("ver_nota",id).then(function(e){
                    console.log(e);
                    new Router.Load().View("nota/adiciona.html","#app");
                })
            }
            Load.prototype.VerNota = function(){
                var clas= this;
                tbBuffer.getItem("ver_nota").then(function(e){
                    //console.log(e);
                    if( e > 10){
                        tbNotas.getItem(e).then(function(f){
                            document.querySelector("#id").value=e;
                            document.querySelector("#pesquisar").value=f.titulo;

                            document.querySelector("#querApagar").style.display="block";
                            
                            document.querySelector(".rapidoConteudo").style.background = f.cores[0];
                            document.querySelector("#pesquisar").style.color = f.cores[0];
                            document.querySelector("#salvar").style.background = f.cores[0];
                            Nota.Cores = f.cores;
                            Nota.quill.setContents(f.conteudo);
                            console.log(clas);
                            console.log(Nota);
                        })
                        
                    }else{
                        document.querySelector(".rapidoConteudo").style.background = Nota.Cores[0];
                        document.querySelector("#pesquisar").style.color = Nota.Cores[0];
                        document.querySelector("#salvar").style.background = Nota.Cores[0];
                    }
                })
            }
            Load.prototype.QuerApagar = function(){
                var x = document.querySelector(".div_apagar");
                if(x.style.display == 'none'){
                    x.style.display = "block";
                }else{
                    x.style.display = "none";
                }
            }
            Load.prototype.ApagaNota = function(){
                tbBuffer.getItem('ver_nota').then(function(e){
                    tbNotas.getItem(e).then(function(i){
                        i.apaga = true;
                        tbNotas.setItem(e,i).then(function(o){
                            tbBuffer.removeItem('ver_nota').then(function(u){
                                new Router.Load().View("home.html","#app");
                            })
                        })
                    })
                });
            }
            return Load;
        })();
        Nota.Load = Load;
    })(Cinzento.Nota || (Cinzento.Nota = {}));
    var Nota = Cinzento.Nota;

    (function (Home) {

        var Load = (function () {
            function Load() {
                document.querySelector("#tela").addEventListener("scroll", (event) => {
                    //var a = document.querySelector("#tela");
                    //let scroll = a.scrollLeft;
                    //console.log(a.scrollWidth);
                    //if(a.scrollLeft > 5 && a.scrollLeft < ((a.scrollWidth / 2) - 5)){
                        //a.scrollLeft = a.scrollWidth / 2;
                    //}
                    //console.log(a.scrollLeft);
                    //let scrollMax = a.scrollWidth / 2;
                    //console.log(scrollMax);
                });
            }
            Load.prototype.Scroll = function () {
                
            };
            return Load;
        })();
        Home.Load = Load;

        var Wall = (function () {
            function Wall() {
            console.log("Wall constructed");
            }
            return Wall;
        })();

        Home.Wall = Wall;
    })(Cinzento.Home || (Cinzento.Home = {}));
    var Home = Cinzento.Home;
    (function(Def){
        var Load = (function(){
            function Load(){
                
            }
            Load.prototype.AbreDef=function(){
                document.querySelector(".modalDef").style.display = "block";
            }
            Load.prototype.FechaDef=function(){
                document.querySelector(".modalDef").style.display = "none";
            }
            return Load;
        })();
        Def.Load = Load;
    })(Cinzento.Def || (Cinzento.Def={}))
    var Def = Cinzento.Def;
})(Cinzento || (Cinzento = {}));
