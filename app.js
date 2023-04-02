const pizzaTable = document.querySelector('#pizza');
const bebidaTable = document.querySelector('#bebida');
const resumoDisplay = document.querySelector('.conteudoResumo');
const botao = document.querySelector('button')
const nomeCliente = document.querySelector('#nome');
const enderecoCliente = document.querySelector('#endereco');
const telefoneCliente = document.querySelector('#telefone');


const resumo = {
    idPedido: getRandomNumber(),
    cliente: {
        nome: nomeCliente.value,
        endereco: enderecoCliente.value,
        telefone: telefoneCliente.value
    },
    pedido: {
        pizza: [],
        bebida: []
    }
}

let preco = 0;

pizzaTable.addEventListener('click', (e) => {
    zeraResumo();
    botao.innerText = 'Faça agora seu pedido';
    botao.style.backgroundColor = '#ff8c00';
    if (e.target.innerText[0] !== 'R') return;
    else {
        e.target.classList.toggle('selected')

        let tamanho = '';
        if (e.target.innerText.substr(-2) === '10') tamanho = 'Pequena';
        else if (e.target.innerText.substr(-2) === '15') tamanho = 'Média';
        else if (e.target.innerText.substr(-2) === '20') tamanho = 'Grande';
        else tamanho = 'Família';

        if (e.target.classList.contains('selected')) {
            resumo.pedido.pizza.push({
                item: e.target.parentElement.id,
                tamanho: tamanho
            })
            preco = preco + parseInt(e.target.innerText.substr(-2));
        }
        else {
            resumo.pedido.pizza.filter(p => {
                if (p.item === e.target.parentElement.id && p.tamanho === tamanho) {
                    delete resumo.pedido.pizza[resumo.pedido.pizza.indexOf(p)];
                    preco = preco - parseInt(e.target.innerText.substr(-2));
                }
            })
        }
    }
})

bebidaTable.addEventListener('click', (e) => {
    zeraResumo();
    botao.innerText = 'Faça agora seu pedido';
    botao.style.backgroundColor = '#ff8c00';
    if (e.target.innerText[0] !== 'R') return;
    else {
        e.target.classList.toggle('selected')

        let tamanho = '';
        if (e.target.innerText.substr(-1) === '5') tamanho = '300mL';
        else if (e.target.innerText.substr(-1) === '8') tamanho = '700mL';
        else tamanho = 'Litrão';

        if (e.target.classList.contains('selected')) {
            resumo.pedido.bebida.push({
                item: e.target.parentElement.id,
                tamanho: tamanho
            })

            preco = preco + parseInt(e.target.innerText.substr(-2));
        }
        else {
            resumo.pedido.bebida.filter(p => {
                if (p.item === e.target.parentElement.id && p.tamanho === tamanho) {
                    delete resumo.pedido.bebida[resumo.pedido.bebida.indexOf(p)];
                    preco = preco - parseInt(e.target.innerText.substr(-2));
                }
            })
        }
    }
})

function createLi(content) {
    const item = document.createElement('li');
    item.innerText = content;
    return item;
}

function criaSpan(content) {
    const span = document.createElement('span');
    span.innerText = content;
    span.className = 'validacao';
    return span;
}

function validaResumo() {
    resumoDisplay.classList.add('displayBlock');
    if (resumo.cliente.nome.length === 0) return 'Preencha o nome do cliente.';
    if (resumo.cliente.endereco.length === 0) return 'É necessário o endereço do cliente.';
    if (resumo.cliente.telefone.length === 0) return 'Insira o telefone do cliente.';
    if (resumo.pedido.pizza.length === 0 && resumo.pedido.bebida.length === 0 ) return 'Selecione ao menos 01 item no seu pedido.';
    return 'OK';
}

function montaResumo() {
    resumoDisplay.innerHTML = '';
    let validacao = validaResumo();
    if(validacao === 'OK') {
        zeraResumo();
        resumoDisplay.style.display = 'block';
        let lista = document.createElement('ul');
        let liArr = [];
        for (let i in resumo.pedido.pizza) {
            liArr.push(createLi(`${resumo.pedido.pizza[i].item} - ${resumo.pedido.pizza[i].tamanho}`));
        }
        for (let i in resumo.pedido.bebida) {
            liArr.push(createLi(`${resumo.pedido.bebida[i].item} - ${resumo.pedido.bebida[i].tamanho}`));
        }
        let count = 1;
        for (let l of liArr) {
            l.innerHTML = `${count++})` + l.innerHTML;
            lista.appendChild(l);
        }
        resumoDisplay.innerHTML = `
        <h5>Pizzaria Farinha de Barata</h5>
        <h6>PEDIDO Nº ${resumo.idPedido < 100 ? resumo.idPedido < 10 ? '00' + resumo.idPedido : '0' + resumo.idPedido : resumo.idPedido}</h6>
        <p>Cliente: <strong>${resumo.cliente.nome}</strong></p>
        <p>Endereço: <strong>${resumo.cliente.endereco}</strong></p>
        <p>Telefone: <strong>${resumo.cliente.telefone}</strong></p>
        <div class="divisor"></div>
        <span>Pedido:</span><br />
        ${lista.innerHTML}
        <p class="preco">Preço: R$ ${preco}</p>
        `
        botao.innerText = 'Confirmar pedido';
        botao.style.backgroundColor = '#23f134';
    }
    else {
        resumoDisplay.classList.add('displayBlock');
        resumoDisplay.appendChild(criaSpan(validacao));
    }
    return;
}

function zeraResumo() {
    resumoDisplay.innerHTML = '';
    resumoDisplay.classList.remove('displayBlock');
    resumoDisplay.style.display = 'none';
    botao.innerText = 'Faça agora seu pedido';
    botao.style.backgroundColor = '#ff8c00';
}

function getRandomNumber() {
    return Math.floor(Math.random() * (999 - 1 + 1)) + 1;
  }

function updateCliente(e, local) {
    zeraResumo();
    if (local === 'nome') return resumo.cliente.nome = e
    if (local === 'endereco') return resumo.cliente.endereco = e
    if (local === 'telefone') return resumo.cliente.telefone = e
}