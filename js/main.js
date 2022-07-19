const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem('itens')) || [];

itens.forEach(item => {
  criaElemento(item);
});

form.addEventListener('submit', evento => {
  evento.preventDefault();

  const nome = evento.target.elements['nome'];
  const quantidade = evento.target.elements['quantidade'];

  //aqui está verificando se o item que foi digitado já existe no array de itens
  const existe = itens.find(item => item.nome === nome.value);

  const itemAtual = {
    nome: nome.value,
    quantidade: quantidade.value
  };

  if (existe) {
    itemAtual.id = existe.id;

    atualizaElemento(itemAtual);

    itens[itens.findIndex(item => item.id === existe.id)] = itemAtual;
  } else {
    //necessitou atualizar como atribui o id, pois quando deletemos um item poderia dar erro. Agora ele sempre irá procurar o ultimo item da lista de itens e adicionar +1 para o id do proximo item a ser adicionado
    itemAtual.id = itens[itens.length - 1] ? itens[itens.length - 1].id + 1 : 0;

    criaElemento(itemAtual);

    itens.push(itemAtual);
  }

  localStorage.setItem('itens', JSON.stringify(itens));

  nome.value = '';
  quantidade.value = '';
});

function criaElemento(item) {
  const novoItem = document.createElement('li');
  novoItem.classList.add('item');

  const numeroItem = document.createElement('strong');
  numeroItem.innerHTML = item.quantidade;

  numeroItem.dataset.id = item.id;

  //aqui tive que utilizar appendChild, pois como criei o elemento numeroItem através do javascript, ele foi criado como objeto.
  novoItem.appendChild(numeroItem);
  novoItem.innerHTML += item.nome;

  novoItem.appendChild(botaoDeleta(item.id));

  lista.appendChild(novoItem);
}

function atualizaElemento(item) {
  console.log(document.querySelector("[data-id='" + item.id + "']"));
  //document.querySelector("[data-id='item.id+']");
  document.querySelector("[data-id='" + item.id + "']").innerHTML =
    item.quantidade;
}

function botaoDeleta(id) {
  const elementoBotao = document.createElement('button');
  elementoBotao.innerText = 'X';

  elementoBotao.addEventListener('click', function () {
    console.log(this);
    deletaElemento(this.parentNode, id);
  });

  return elementoBotao;
}

function deletaElemento(elemento, id) {
  elemento.remove();

  //remover item do array itens
  itens.splice(
    itens.findIndex(elemento => elemento.id === id),
    1
  );

  localStorage.setItem('itens', JSON.stringify(itens));
}
