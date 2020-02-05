var campo_filtro = document.querySelector("#filtrar_tab");

campo_filtro.addEventListener("input", function(){
    this.value;
    var pacientes = document.querySelectorAll(".paciente");

    if(this.value.length > 0){
        for(var i = 0; i < pacientes.length; i++){
            var paciente = pacientes[i];
            var tdNome = paciente.querySelector(".info-nome");
            var nome = paciente.textContent;
            var express = new RegExp(this.value, "i");
    
            if(!express.test(nome)){
                paciente.classList.add("esconde");
            }
            else{
                paciente.classList.remove("esconde");
            }
        }
    }
    else{
        for(var i = 0; i < pacientes.length; i++){
            var paciente = pacientes[i];
            paciente.classList.remove("esconde");
        }
    }
});