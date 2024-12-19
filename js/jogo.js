// Declaração das variáveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

// Captura os botões pelos ids e adiciona um evento de clique
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

// Função que zera os valores das variáveis controladoras
function reiniciar() {
    desempenho = 0;
    tentativas = 0;
    acertos = 0;
    jogar = true;
    jogarNovamente();
    atualizaPlacar(0, 0);
    btnJogarNovamente.className = 'visivel';
    btnReiniciar.className = 'invisivel';
}

// Função jogar novamente
function jogarNovamente() {
  jogar = true;
  let divis = document.getElementsByTagName("div");
  for (let i = 0; i < divis.length; i++) {
      if (divis[i].id == 0 || divis[i].id == 1 || divis[i].id == 2 || divis[i].id == 3) {
          divis[i].className = "inicial";
      }
      // Remove a imagem de erro, se existir
      const imgErro = divis[i].querySelector("#imagemErro");
      if (imgErro) {
          imgErro.remove();
      }
  }

  let imagem = document.getElementById("imagem");
  if (imagem) {
      imagem.remove();
  }
}

// Função que atualiza o placar
function atualizaPlacar(acertos, tentativas) {
    desempenho = (acertos / tentativas) * 100;
    document.getElementById("resposta").innerHTML = "Placar - Acertos: " + acertos + " Tentativas: " + tentativas + " Desempenho: " + Math.round(desempenho) + "%";
}

// Função executada quando o jogador acertou
function acertou(obj) {
    obj.className = "acertou";
    const img = new Image(100);
    img.id = "imagem";
    img.src = "https://cdn.britannica.com/09/188709-050-03BF34CB/Michael-Jordan.jpg?w=300";
    obj.appendChild(img);
}

// Função que sorteia um número aleatório entre 0 e 3 e verifica se o jogador acertou
function verifica(obj) {
    if (jogar) {
        jogar = false;
        tentativas++;
        if (tentativas == 4) { // Mudado para 4
            btnJogarNovamente.className = 'invisivel';
            btnReiniciar.className = 'visivel';
        }
        let sorteado = Math.floor(Math.random() * 4); // Mudado para 4
        if (obj.id == sorteado) {
            acertou(obj);
            acertos++;
        } else {
            obj.className = "errou";
            const objSorteado = document.getElementById(sorteado);
            acertou(objSorteado);
        }
        atualizaPlacar(acertos, tentativas);
    } else {
        alert('Clique em "Jogar novamente"');
    }
}
// Função que executa quando o jogador errou
function errou(obj) {
  obj.className = "errou";
  const img = new Image(100); // Ajuste a largura conforme necessário
  img.id = "imagemErro";
  img.src = "https://cdn.esbrasil.com.br/wp-content/uploads/2024/09/6d2nqshw9lodueisju2k2bwyl.jpg"; // URL da imagem de erro
  obj.appendChild(img);
}
function verifica(obj) {
  if (jogar) {
      jogar = false;
      tentativas++;
      if (tentativas == 4) {
          btnJogarNovamente.className = 'invisivel';
          btnReiniciar.className = 'visivel';
      }
      let sorteado = Math.floor(Math.random() * 4);
      if (obj.id == sorteado) {
          acertou(obj);
          acertos++;
      } else {
          errou(obj); // Chama a nova função de erro
          const objSorteado = document.getElementById(sorteado);
          acertou(objSorteado);
      }
      atualizaPlacar(acertos, tentativas);
  } else {
      alert('Clique em "Jogar novamente"');
  }
}

// Adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);
