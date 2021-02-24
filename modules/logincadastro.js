var ve = function(){
    tbAuth.getItem("chave").then(function(i){
        if(i){
            $("#scrollConexao").hide();
            $("#divAuthTrue").show();
        }else{
            $("#scrollConexao").show();
            $("#divAuthTrue").hide();
        }
    });    
}

function hora(){
    let d = new Date();
    let opt = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric',  second: 'numeric'};
    let tempo = d.toLocaleDateString("pt-BR", opt);

    return tempo;
}
function Sincroniza(token){
    let array = new Array();
            tbNotas.iterate(function(v, k, i){
                array.push(v);
            }).then(function(e){
                //https://academiadeautoresdahuila.net/confidencial
                $.post("https://academiadeautoresdahuila.net/confidencial/cinzento/init.php",{objecto: JSON.stringify(array), token : token}).done(function(data){
                    //console.log(data);
                    //console.log(data);
                    //alert(data);
                    var i = JSON.parse(data);
                    for(var o = 0; o < i.length ; o++){
                        tbNotas.setItem(i[o]['lastUpdate'], i[o]);
                    }
                });

            });
}


function SincronizaCalendario(token){
    let array = new Array();
            tbTarefas.iterate(function(v, k, i){
                array.push(v);
            }).then(function(e){
                //https://academiadeautoresdahuila.net/confidencial
                $.post("https://academiadeautoresdahuila.net/confidencial/cinzento/calendario.php",{objecto: JSON.stringify(array), token : token }).done(function(data){
                    //console.log(data);
                    //console.log(data);
                    //alert(data);
                    var i = JSON.parse(data);
                    for(var o = 0; o < i.length ; o++){
                        tbTarefas.setItem(i[o]['quando'], i[o]).then(function(e){
                        });
                    }

                });

            });
}

function lastSync(){
    tbAuth.getItem("lastSync").then(function(i){
        document.querySelector("#lastSync").innerHTML = i;    
    });
}

function sync(){
    $(".divLoad").show();
    document.querySelector("#botaoSincronizar").disabled = true;
    document.querySelector("#img-sync").src = "icones/sync.gif";
    var string = "";
    tbAuth.getItem("chave").then(function(i){    
        Sincroniza(i);
        SincronizaCalendario(i);
    });
    string += '<span style="color:green">OK</span>: '+hora()+' <br>';
    document.querySelector("#img-sync").src = "icones/sync.png";
    tbAuth.setItem("lastSync",string).then(function(i){
        lastSync();
        Notas();
        calendari(document.getElementById('calendari'), new Date());
    }).finally(function(){
        document.querySelector("#botaoSincronizar").disabled = false;
        $(".divLoad").hide();
    })
    
}
function conectar(){
    document.querySelector("#botaConectar").disabled = true;
    var email = document.querySelector("#email_conectar").value;
    var pass = document.querySelector("#pass_conectar").value;

    if(email.length < 8){
        document.querySelector("#botaoConectar").disabled = false;
    }else{
        $.get("https://academiadeautoresdahuila.net/confidencial/cinzento/login.php",{objecto: JSON.stringify({email: email, pass: pass})}).done(function(data){
            //console.log(data);
            if(data != 0){
                tbAuth.setItem('chave', data).then(function(){
                    ve();
                    sync();
                    document.querySelector("#email_conectar").value = "";
                    document.querySelector("#pass_conectar").value = "";
                });
                document.querySelector("#botaConectar").disabled = false;
            }else{
                document.querySelector("#botaConectar").disabled = false;
            }
                //console.log(data);
                //alert(data);
        });
    }
   
}

function cadastrar(){
    document.querySelector("#botaoCadastrar").disabled = true;
    var email = document.querySelector("#reg_email").value;
    var pas = document.querySelector("#reg_pas").value;
    var pass = document.querySelector("#reg_pass").value;

    if(email.length < 8){
        document.querySelector("#botaoCadastrar").disabled = false;
    }else{
        if(pas != pass){
            document.querySelector("#botaoCadastrar").disabled = false;
        }else{
            $.get("https://academiadeautoresdahuila.net/confidencial/cinzento/registar.php",{objecto: JSON.stringify({email: email, pass: pass})}).done(function(data){
                //console.log(data);
                if(data != "Erro"){
                    tbAuth.setItem('chave', data).then(function(){
                        ve();
                        sync();
                        document.querySelector("#reg_email").value = "";
                        document.querySelector("#reg_pas").value = "";
                        document.querySelector("#reg_pass").value = "";
                    });
                    document.querySelector("#botaoCadastrar").disabled = false;
                }else{
                    document.querySelector("#botaoCadastrar").disabled = false;
                }
                //console.log(data);
                //alert(data);
            });
        }
    }
}


function desconectar(){
    tbAuth.removeItem("chave").then(function(i){
        ve();
    })
}

function esqueciPasse(){
    var email = document.querySelector("#esqueci-passeEmail").value;
    if(email.length > 8){
        $(".divLoad").show();
        $.get("https://academiadeautoresdahuila.net/confidencial/cinzento/recuperar.php", { email: email }).done(function(data){
            if(data == "certo"){
                tbAuth.setItem("email", email).then(function(i){
                    location.href = "#renovar-passe";
                }).finally(function(e){
                    document.querySelector("#esqueci-passeEmail").value="";
                    temEmail();
                    $(".divLoad").hide();
                });
            }else{
                $(".divLoad").hide();
            }
        });
    }else{

    }
}

function temEmail(){
    tbAuth.getItem("email").then(function(i){
        if(i){
            document.querySelector("#esqueci-passeEmail").disabled = true;
        }
    })
}

function repetirRenovacao(){
    tbAuth.removeItem("email").then(function(i){
        history.back();
        history.back();
    });
}

function renovaPasse(){
    var num = document.querySelector("#NumVerify").value;
    var pas = document.querySelector("#NumPas").value; 
    var pass = document.querySelector("#NumPass").value;

    if(num.length < 10){
        console.log(false);
        return false;
    }else{
        
        if(pas != pass){

        }else{
            $(".divLoad").show();
            tbAuth.getItem("email").then(function(o){
                $.get("https://academiadeautoresdahuila.net/confidencial/cinzento/recupera.php", { email: o, pass: pass, num: num }).done(function(data){
                    
                    if( data.length > 40 ){
                        tbAuth.removeItem("email").then(function(i){
                            tbAuth.setItem("chave", data).then(function(e){

                            })
                        }).finally(function(e){
                            history.back();
                            history.back();
                            ve();
                            $(".divLoad").hide();
                            sync();
                        });
                    }else{
                        $(".divLoad").hide();
                    }
                    
                });
            });
            
        }
    }

}

ve();
sync();