var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function(event) {
    event.preventDefault();

    var form = document.querySelector("#form-adiciona");
    var paciente = obtemPacienteDoFormulario(form);

    var pacienteTr = criarTr(paciente);

    var erro = validar_paciente(paciente);

    if(erro.length > 0){
        exibirErroMensagem(erros);

        return;
    }

    adc_paciente_table(paciente);

    var tabela = document.querySelector("#tabela-pacientes");

    tabela.appendChild(pacienteTr);

    form.reset();

    mensagemErro = document.querySelector("ul");
    mensagemErro.innerHTML = "";
});

function obtemPacienteDoFormulario(form) {

    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }

    return paciente;
}

function criarTr(paciente){
    //cria as tr's que já ficam com classes

    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");

    pacienteTr.appendChild(criarTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(criarTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(criarTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(criarTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(criarTd(paciente.imc, "info-imc"));
    //td's criadas por meio de uma função abaixo dessa (classe já inserida)

    return pacienteTr
}

function criarTd(dado,classe){
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);

    return td;
}

function validar_paciente(paciente){

    var erros = [];

    if(paciente.nome.length == 0){
        erros.push("O nome não pode ser um valor nulo");
    }
    if(!validar_peso(paciente.peso)){   
        erros.push("O peso é inválido");
    }
    if(!validar_altura(paciente.altura)){
        erros.push("A altura é inválida");
    }
    if(paciente.gordura.length == 0){
        erros.push("A gordura não pode ser um valor nulo");
    }
    if(paciente.peso.length == 0){
        erros.push("O peso não pode ser um valor nulo");
    }
    if(paciente.altura.length == 0){
        erros.push("A altura não pode ser um valor nulo");
    }


    return erros;
}

function adc_paciente_table(paciente){
    var pacienteTr = criarTr(paciente);
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);
}

function exibirErroMensagem(erros){
    var ul = document.querySelector("#mensagem_erro");
    ul.innerHTML = ""; //elimina as mensagens de erro do html
    //forEach já sabe quantas vezes irá ser repetido, isso facilita pra krl
    erros.forEach(function(erro) {
        var li = document.createElement("li");
        li.textContent = erro;

        ul.appendChild(li);
    });
}