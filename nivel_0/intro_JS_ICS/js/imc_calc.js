var pacientes = document.querySelectorAll(".paciente");

for (var i = 0; i < pacientes.length; i++) {

    var paciente = pacientes[i];

    var tdPeso = paciente.querySelector(".info-peso");
    var peso = tdPeso.textContent;

    var tdAltura = paciente.querySelector(".info-altura");
    var altura = tdAltura.textContent;

    var tdImc = paciente.querySelector(".info-imc");

    var pesoEhValido = validar_peso(peso);
    var alturaEhValida = validar_altura(altura);

    if (!pesoEhValido) {
        console.log("Peso inválido!");
        pesoEhValido = false;
        tdImc.textContent = "Peso inválido";
    }

    if (!alturaEhValida) {
        console.log("Altura inválida!");
        alturaEhValida = false;
        tdImc.textContent = "Altura inválida";
    }

  if (alturaEhValida && pesoEhValido) {
        var imc = peso / (altura * altura);
        tdImc.textContent = imc;
    }
}

function calc_imc(peso,altura){
    var imc = 0;

    imc = peso/(altura/altura);

    return imc.toFixed(2);
}

function validar_peso(peso){
    if(peso > 0 && peso < 1000){
        return true;
    }
    else{
        return false;
    }
}

function validar_altura(altura){
    if(altura > 0 && altura < 2.5){
        return true;
    }
    else{
        return false;
    }
}