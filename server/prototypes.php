<?php

class Bezinha {

    private $chave;

    private $itens;
    private $index;

   function __construct($chave) {
        $this->chave = $chave;   
    }   

    
    //COMEÇA O ITERADOR

    //INICIALIZA O ITERADOR
    public function Iterator($itens){
        $this->itens = $itens;
        $this->index = 0 ;
    }

    public function hasNext(){
        return $this->index < count($this->itens);
    }

    public function next(){
        return $this->itens[$this->index++];
    }
    //------------------------------------------------------------


   public function store() {
        global $pdo;
        $query = $pdo -> prepare("SELECT * FROM objectstore WHERE chave_user = ?");
        $query -> bindValue(1,$this->chave);
        $query -> execute();
        $res = $query -> fetchAll();

        $json = array();
        foreach($res as $r){
            array_push($json, json_decode($r['store']));
        }

        return json_encode($json);
   }

   public function salva($array) {
        $this->Iterator($array);
        $chave = $this->chave;
        while($this->hasNext()){
            $item = (array)$this->next();
            
            global $pdo;
            $query = $pdo -> prepare("SELECT * FROM objectstore WHERE chave_user = ? AND chave_nota = ?");
            $query -> bindValue(1, $chave);
            $query -> bindValue(2, $item["chave"]);
            $query -> execute();
            $res = $query -> fetch();

            //var_dump($res);
            if($res){
                if($res['lastUpdate'] != $item['lastUpdate']){

                    global $pdo;
                    $query = $pdo -> prepare("UPDATE objectstore SET store = ?, lastUpdate = ? WHERE chave_user = ? AND chave_nota = ?");
                    $query -> bindValue(1,json_encode($item));
                    $query -> bindValue(2,$item['lastUpdate']);
                    $query -> bindValue(3,$chave);
                    $query -> bindValue(4,$item['chave']);
                    $query -> execute();

                }else{
                    //echo "deixa";

                }
            }else{
                global $pdo;
                $query = $pdo -> prepare("INSERT INTO objectstore (chave_user, chave_nota, store, lastUpdate) VALUES (?, ?, ?, ?)");
                $query -> bindValue(1,$this->chave);
                $query -> bindValue(2,$item['chave']);
                $query -> bindValue(3,json_encode($item));
                $query -> bindValue(4,$item['chave']);
                $query -> execute();
            }
            
        }


   }

}


class Bezinho {

    private $chave;

    private $itens;
    private $index;

   function __construct($chave) {
        $this->chave = $chave;   
    }   

    
    //COMEÇA O ITERADOR

    //INICIALIZA O ITERADOR
    public function Iterator($itens){
        $this->itens = $itens;
        $this->index = 0 ;
    }

    public function hasNext(){
        return $this->index < count($this->itens);
    }

    public function next(){
        return $this->itens[$this->index++];
    }
    //------------------------------------------------------------


   public function store() {
        global $pdo;
        $query = $pdo -> prepare("SELECT * FROM calendario WHERE chave_user = ?");
        $query -> bindValue(1,$this->chave);
        $query -> execute();
        $res = $query -> fetchAll();

        $json = array();
        foreach($res as $r){
            array_push($json, json_decode($r['store']));
        }

        return json_encode($json);
   }

   public function salva($array) {
        $this->Iterator($array);
        $chave = $this->chave;
        while($this->hasNext()){
            $item = (array)$this->next();
            
            global $pdo;
            $query = $pdo -> prepare("SELECT * FROM calendario WHERE chave_user = ? AND quando = ?");
            $query -> bindValue(1, $chave);
            $query -> bindValue(2, $item["quando"]);
            $query -> execute();
            $res = $query -> fetch();

            //var_dump($res);
            if($res){
                if($res['lastUpdate'] != $item['lastUpdate']){

                    global $pdo;
                    $query = $pdo -> prepare("UPDATE calendario SET store = ?, lastUpdate = ? WHERE chave_user = ? AND quando = ?");
                    $query -> bindValue(1,json_encode($item));
                    $query -> bindValue(2,$item['lastUpdate']);
                    $query -> bindValue(3,$chave);
                    $query -> bindValue(4,$item['quando']);
                    $query -> execute();

                }else{
                    //echo "deixa";

                }
            }else{
                global $pdo;
                $query = $pdo -> prepare("INSERT INTO calendario (chave_user, quando, store, lastUpdate) VALUES (?, ?, ?, ?)");
                $query -> bindValue(1,$this->chave);
                $query -> bindValue(2,$item['quando']);
                $query -> bindValue(3,json_encode($item));
                $query -> bindValue(4,$item['lastUpdate']);
                $query -> execute();
            }
            
        }


   }

}





?>