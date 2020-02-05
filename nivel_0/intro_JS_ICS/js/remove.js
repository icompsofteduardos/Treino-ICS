var pacientes = document.querySelectorAll(".paciente");

var tabela = document.querySelector("#tabela-pacientes");

tabela.addEventListener("dblclick", function(event){

    event.target.parentNode.classList.add("excluir");
    setTimeout(function(){
        event.target.parentNode.remove();
    }, 500);
    });

//essa função exclui da tabela aquele que for clicado duas vezes em cima
//pacientes.forEach(function(paciente){
//    paciente.addEventListener("dblclick", function(){
//        this.remove(); //aquele que é dono do evento (this)
//   });
//});