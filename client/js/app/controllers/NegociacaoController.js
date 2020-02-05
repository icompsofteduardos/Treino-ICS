class NegociacaoController{

    constructor(){
        let $ = document.querySelector.bind(document);
        //querySelector passou para a variável $, porém, ainda mantem a função document
        //isso é possível com o .bind
        this._inputData = $("#data");
        this._inputQuant = $("#quantidade");
        this._inputValor = $("#valor");
        this.Lista_neg = new Lista_neg();

        this._View_neg = new View_neg($('#view_neg'));
        this._View_neg.update(this._Lista_neg);
    }

    adiciona(evento){
        event.preventDefault();
        this._Lista_neg.adiciona(this._Criar_neg());
        this._View_neg.update(this._Lista_neg);
        this._Limpar_form();
    }

    _Criar_neg(){
        return new negociacao(
        Date_help.texto_data(this._inputData.value),
        this._inputQuant.value,
        this._inputValor.value);
    }

    _Limpar_form(){
        this._inputData.value = "";
        this._inputQuant.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }
}
/*
... desmembra a data(nesse caso), tornando o primeiro valor do array
como o primeiro do construtor, e assim por diante para todos os outros
valores possíveis
*/

/* 
no momento, esta funcão separa em um array os valores da data
e com a função .map, passa por cada posição para fazer o seguinte
calculo: o valor do item (dia, mês ou ano) - o valor do resto da 
divisão do indice (0, 1 ou 2) por 2;
*nesse caso, somente na posição [1] o calculo terá alguma mudança
*/

/*
"() => {}" - essa é a cara de uma arrow function, nela, o nome function
não é escrito no código, e para as funções com apenas um retorno, não se
faz necessário o uso de chaves e nem do return, pois a própria função já
entende sem os mesmos
*/