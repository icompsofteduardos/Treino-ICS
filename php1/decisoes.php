<?php
$idade = 16;
$numPessoas = 1;

echo "Você só pode entrar sozinho se tiver a partir de 18 anos, \nou se tiver 16 ou mais, porém, acompanhado\n";

if($idade >= 18){
    //operadores lógicos seguem o padrão(&&, ||)
    //utilizar por extenso também funciona(and, or)
    echo "Você tem $idade anos,\nPode entrar meu chapa";
}
elseif($idade > 15 && $numPessoas > 1){
    echo "Você tem $idade anos e está acompanhado,\nPode entrar meu chapa";
}
elseif($idade > 15 && $numPessoas == 1){
    echo "Você tem $idade anos, porém, não está acompanhado. Vaza!";
}
else{
    echo "Some daqui meu";
}
//estrutura de decisão em php é praticamente igual ao C
