class NegociacaoController {
    
    constructor() {
        
        let $ = document.querySelector.bind(document);
        
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
         
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(), 
            new NegociacoesView($('#negociacoesView')), 
            'adiciona', 'esvazia' , 'ordena', 'inverteOrdem');
       
        this._mensagem = new Bind(
            new Mensagem(), new MensagemView($('#mensagemView')),
            'texto');    
            
        this._ordemAtual = '';

        this._service = new NegociacaoService();

        this._init();
    }

    _init(){

        this._service
            .lista()
            .then(negociacoes =>
                negociacoes.forEach(negociacao =>
                    this._listaNegociacoes.adiciona(negociacao)))

            .catch(erro => this._mensagem.texto = erro);


        setInterval(() => {
            this.importaNegociacoes();
        }, 5000);
    }

    adiciona(event) {

        event.preventDefault();

        this._service
            .cadastra(negociacao)
            .then(mensagem => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = mensagem;
                this._limpaFormulario();
            })
            .catch(erro => this._mensagem.texto = erro);
    }
    
    importaNegociacoes() {

        this._service
            .importa(this._listaNegociacoes.negociacoes)
            .then(negociacoes => negociacoes.forEach(negociacao => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = "Negociações do período importadas"
            }))
            .catch(erro => this._mensagem.texto = erro);

        this._service
            .obterNegociacoes()
            .then(negociacoes =>
                negociacoes.filter(negociacao =>
                    !this._listaNegociacoes.negociacoes.some(negociacaoExistente =>
                        JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)))
                /*
                    temos aqui um caso onde é necessário fazer um filtro para ver se
                    os arquivos importados estão repetidos na tela. Utilizar o indexOf
                    se faz uma solução falha, porque ele usa comparação equivalente,
                    onde o endereço na memória apontado sempre será diferente toda vez
                    que o indexOf fizer a passagem pelas posições da memória.

                    para isso, utilizamos o JSON.stringify. Então qual o processo de funcionamento
                    do filtro? pega a lista de negociações, aplica o filtro, que equivale a um forEach,
                    que passa pelas posições do array. No primeiro array que for testado para ver se ele
                    vai ou não ir para o novo array, é pedido pra lista de negociações para que ela
                    verifique se cada item existente nela equivale a negociação que está sendo filtrada.
                    Se ela for, a função some retorna imediatamente 'true', entrando no filtro de negociações.

                    Porém, nesse caso, ele retorna verdadeiro caso a função some tenha ido até o final do array
                    e não encontrou nada, retornando assim 'false'
                */
            )
            .then(negociacoes => negociacoes.forEach(negociacao => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = 'Negociações do período importadas'   
            }))
            .catch(erro => this._mensagem.texto = erro);                              
    }
    
    apaga() {

        this._service
            .apaga()
            .then(mensagem => {
                   this._mensagem.texto = mensagem;
                   this._listaNegociacoes.esvazia();
            })
            .catch(error => this._mensagem.text )
    }
    
    _criaNegociacao() {
        
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value));
    }
    
    _limpaFormulario() {
     
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();   
    }
    
    ordena(coluna) {
        
        if(this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem(); 
        } else {
            this._listaNegociacoes.ordena((p, s) => p[coluna] - s[coluna]);    
        }
        this._ordemAtual = coluna;    
    }
}