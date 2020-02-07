<?php
/*for($contador = 0; $contador <= 100; $contador++){
    if($contador % 2 == 0){
        continue;
    }
    echo "...$contador\n";
} //mostrar números ímpares entre 0 até 100

for($tab = 1; $tab < 11; $tab++){
    echo "Tabuada do $tab\n";
    for($num = 1; $num < 11; $num++){
        echo "$tab x $num = " . $tab * $num. PHP_EOL;
    }
} //mostrar tabuada de 1 até 10
*/
$altura = readline("Digite a sua altura: ");
$peso = readline("Digite o seu peso: ");
$imc = $peso / $altura**2;
if($imc < 18.5){
    echo "Seu imc é igual a $imc, e você está abaixo do peso";
}
elseif($imc >= 18.5 and $imc < 25){
    echo "Seu imc é igual a $imc, e você está com o peso normal";
}
else{
    echo "Seu imc é igual a $imc, e você deve se cuidar, está acima do peso";
}