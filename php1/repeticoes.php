<?php
$contador = 1;
while($contador <= 15){
    echo "Número = $contador\n";
    $contador++;
}
//while também é igual a liguagem C
for($contar = 0; $contar <= 15; $contar++){
    echo "Número = $contar\n";
}
//com o for não seria diferente
for($i = 0; $i <= 15; $i++){
    if($i == 13){
        continue;
    }
    echo "$i\n";
}
//se a variavel for equivalente ao valor, passa pra próxima execução
for($j = 0; $j <= 15; $j++){
    if($j == 13){
        break;
    }
    echo "$j\n";
}
//se a variavel for equivalente ao valor, para ali mesmo