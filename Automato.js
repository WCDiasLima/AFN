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

    temp.clear(); //tenho q zerar o conjunto para depois eu colocar os novos cojun. nele

    for (let p = 0; p < this.estadoAtual.length; p++) { //laço pra pecorrer todos os estados atuais

      for (let pp = 0; pp < this.delta[this.estadoAtual[p]][this.posAlfa(letra)].length; pp++) { // pecorrer cada conj de um estado pra determinada letra do alfabeto

        temp.add(this.delta[this.estadoAtual[p]][this.posAlfa(letra)][pp]); //coloco no conjunto obs. nao vai coloar valores repitidos pois é um conj
      }
    }
    this.estadoAtual = []; //depois q pecorri eu tenho q add os novos estados, entao zero ele 
    for (let item of temp) this.estadoAtual.push(item); //insere cada item do conjunto no array 
  }

  posAlfa(letra) {
    for (let i = 0; i < this.alfabeto.length; i++) {
      if (this.alfabeto[i] == letra) return i;
    }
    return -1;
  }

  mostrar() {
    let raio = height / 2 - 80;
    let x, y;
    noStroke();

    temp.clear();

    temp = new Set(this.estadoAtual); //coloco em um coj o array pra usar a função has


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

