'use strict';

const input1 = document.getElementById('endereco');
const input2 = document.getElementById('bairro');
const input3 = document.getElementById('cidade');
const input4 = document.getElementById('estado');

input1.disabled = true;
input2.disabled = true;
input3.disabled = true;
input4.disabled = true;



const limparFormulario = (endereco) => {
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}


const preencherFormulario = (endereco) => {
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
    input1.disabled = false;
    input2.disabled = false;
    input3.disabled = false;
    input4.disabled = false;
    
}


const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep);

const pesquisarCep = async () => {
    limparFormulario();

    const cep = document.getElementById('cep').value.replace("-", "");
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)) {
        const dados = await fetch(url);
        const endereco = await dados.json();
        if (endereco.hasOwnProperty('erro')) {
            document.getElementById('valido').innerHTML = 'CEP não encontrado!';
        } else {
            preencherFormulario(endereco);
            document.getElementById('valido').innerHTML = 'CEP valido!';
        }
    } else {
        document.getElementById('valido').innerHTML = 'CEP incorreto!';
    }

}

document.getElementById('cep')
    .addEventListener('focusout', pesquisarCep);

