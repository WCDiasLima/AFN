/*
Copyright 2019 Joyce Emanuele, Wellington Cesar
This file is part of AFN.
*/

let temp = new Set();

class Autonomo {
  constructor(arq) {
    this.alfabeto = arq.alfabeto;
    this.qtdEstados = arq.qtdEstados;
    this.estadoAtual = arq.estadoInicial;
    this.estadosFinais = new Set(arq.estadosFinais);
    this.delta = arq.delta;
  }

  passo(letra) {
    if(this.posAlfa(letra) == -1){
      print("Terminado");
      noLoop();
      return;
    }

    temp.clear();

    for (let p = 0; p < this.estadoAtual.length; p++) {

      for (let pp = 0; pp < this.delta[this.estadoAtual[p]][this.posAlfa(letra)].length; pp++) { 

        temp.add(this.delta[this.estadoAtual[p]][this.posAlfa(letra)][pp]);
      }
    }
    this.estadoAtual = [];
    for (let item of temp) this.estadoAtual.push(item);
  }

  posAlfa(letra) {
    for (let i = 0; i < this.alfabeto.length; i++) {
      if (this.alfabeto[i] == letra) return i;
    }
    return -1;
  }
  
  ligacoes(){
    let raio = height / 2 - 80, x, y;
    let coor = [];
    let alf =[];
    let i,j,m;
      
    for(i=0;i<this.qtdEstados;i++){
       alf[i]=[];
      for (j=0;j<this.qtdEstados;j++){
        alf[i][j]=[];
    }}
     
    for(i = 0; i < this.qtdEstados; i++) {
      x = raio * cos(map(i, 0, this.qtdEstados, 0, TAU)) + width / 2;
      y = raio * sin(map(i, 0, this.qtdEstados, 0, TAU)) + height / 2 - 50;
        coor[i]=[x,y];}
    
    for(i=0;i<this.qtdEstados;i++){
      for (j=0;j<this.alfabeto.length;j++){
        for(m=0;m<this.delta[i][j].length;m++){
        alf[i][this.delta[i][j][m]][alf[i][this.delta[i][j][m]].length]= this.alfabeto[j];
    } } }
    
    let k=0;
    for(i=0;i<this.qtdEstados;i++){
      for(j=0;j<this.alfabeto.length;j++){
        for(m=0;m<this.delta[i][j].length;m++){
        line(coor[i][k],coor[i][k+1],coor[this.delta[i][j][m]][k],coor[this.delta[i][j][m]][k+1])
          
          if(i==this.delta[i][j][m]){
           let PointM;
           push();
           if(coor[i][k+1]<height/2){
            triangle(coor[i][k], coor[i][k+1]-25, coor[i][k]+10, coor[i][k+1]-35, coor[i][k]-10, coor[i][k+1]-35);
            PointM = createVector(((coor[i][k]+10)+(coor[i][k]-10))/2+15,((coor[i][k+1]-35)+(coor[i][k+1]-35))/2); 
          }
           else{
            triangle(coor[i][k], coor[i][k+1]+25, coor[i][k]+10, coor[i][k+1]+35, coor[i][k]-10, coor[i][k+1]+35);
            PointM = createVector(((coor[i][k]+10)+(coor[i][k]-10))/2,((coor[i][k+1]+35)+(coor[i][k+1]+35))/2);
          }
          push();
          textSize(20);
          text(alf[i][this.delta[i][j]],PointM.x,PointM.y+10);
          pop();
          pop();
         }
         else{
          push();
          var angulo = atan2(coor[i][k+1]-coor[this.delta[i][j][m]][k+1],coor[i][k]-coor[this.delta[i][j][m]][k]);
          let pM = createVector((coor[i][k]+coor[this.delta[i][j][m]][k])/2,(coor[i][k+1]+coor[this.delta[i][j][m]][k+1])/2);
          
          translate((pM.x+coor[this.delta[i][j][m]][k])/2,(pM.y+coor[this.delta[i][j][m]][k+1])/2); 
          rotate(angulo-HALF_PI);
          triangle(-10*0.5, 10, 10*0.5, 10, 0, -10/2);  
          pop();
        
          push();
          textSize(20);
          text(alf[i][this.delta[i][j][m]],(pM.x+coor[this.delta[i][j][m]][k])/2,(pM.y+coor[this.delta[i][j][m]][k+1])/2+20);
          pop(); } 
    } } }
  }

  mostrar() {
    let raio = height / 2 - 80;
    let x, y;
    noStroke();

    temp.clear();

    temp = new Set(this.estadoAtual);


    for (let i = 0; i < this.qtdEstados; i++) {
      x = raio * cos(map(i, 0, this.qtdEstados, 0, TAU)) + width / 2;
      y = raio * sin(map(i, 0, this.qtdEstados, 0, TAU)) + height / 2 - 50;


      if (temp.has(i)) fill(255, 22, 84);

      else fill(243, 255, 189);


      circle(x, y, 25);
      fill(0);
      text(i, x - 15, y + 2);
    }
  }
}

