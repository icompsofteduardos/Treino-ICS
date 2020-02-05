var botaoAdc = document.querySelector("#buscar_paciente");

botaoAdc.addEventListener("click", function(){
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes");

    xhr.addEventListener("load", function(){
        var erroAjax = document.querySelector("#erro_ajax");
        if(xhr.status == 200){
            erroAjax.classList.add("esconde");
            var resposta = xhr.responseText;
            var pacientes = JSON.parse(resposta);
    
            pacientes.forEach(function(paciente){
                adc_paciente_table(paciente)
            });
        }
        else{
            erroAjax.classList.remove("esconde");
        }
    });

    xhr.send();

});