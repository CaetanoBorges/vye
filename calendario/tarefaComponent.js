const template = document.createElement('template');
template.innerHTML = `

    <style>
        .item{display:block;width: 98%; margin:0 auto 0 auto;  border-bottom: 1px solid #eaeaea;padding:7px 7px 7px 0;font-weight:lighter;}
        .p{margin: 0;color:#000;margin-top: 2px;font-size:16px;}
        .check{display: block !important;width: 10% !important;float: left !important;margin-right: 5px;}
        .apaga {display: block !important;width: 5% !important; float: right !important;opacity: .7;margin-left: 3px;clear:right;}
    </style>


    <div class="item">
        <img class="check">
        <img class="apaga">
        <p class="p"></p>
    </div>

`;

class Tarefa extends HTMLElement{
    constructor(){
        super();

        this.feito = false;

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.fez = this.getAttribute('feito');
        this.shadowRoot.querySelector('.check').src = this.getAttribute('check'); 
        this.shadowRoot.querySelector('.apaga').src = this.getAttribute('apaga'); 
        this.shadowRoot.querySelector('p').innerText = this.getAttribute('tarefa'); 

        if(this.fez == "feito"){
            this.shadowRoot.querySelector('p').style.textDecoration = "line-through";
        }
        
    }
    toggleCheck(){

        this.feito = !this.feito;
        var data = this.getAttribute('data');
        var id = this.getAttribute('id');
        const check = this.shadowRoot.querySelector('.check');
        const p = this.shadowRoot.querySelector('p');
        if(this.feito){
            tbTarefas.getItem(data).then(function(e){
                e.tarefas[id].feito = true;
                tbTarefas.setItem(data, e).then(function(e){       
                    check.src = "icones/Feito.png";
                    p.style.textDecoration = "line-through";
                });
            })
        }else{
            tbTarefas.getItem(data).then(function(e){
                e.tarefas[id].feito = false;
                tbTarefas.setItem(data, e).then(function(e){       
                    check.src = "icones/NaoFeito.png";
                    p.style.textDecoration = "none";
                    
                });
            })
        }
    }

    apaga() {
        var data = this.getAttribute('data');
        var id = this.getAttribute('id');
        tbTarefas.getItem(data).then(function(e){
            e.tarefas[id].apaga = true;
            tbTarefas.setItem(data, e).then(function(e){       
                VerTarefas(data);
            });
        })
    }

    connectedCallback(){
        this.shadowRoot.querySelector(".check").addEventListener('click', () => this.toggleCheck());
        this.shadowRoot.querySelector(".apaga").addEventListener('click', () => this.apaga());
    }
    disconnectedCallback(){
        this.shadowRoot.querySelector(".check").removeEventListener('click', () => this.toggleCheck());
        this.shadowRoot.querySelector(".apaga").removeEventListener('click', () => this.apaga());
    }
}
window.customElements.define('tarefa-fa',Tarefa);