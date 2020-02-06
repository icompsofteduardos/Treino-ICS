class NegociacaoService {
    
    constructor() {
        
        this._http = new HttpService();
    }
    
    obterNegociacoesDaSemana() {
               
        return this._http
            .get('negociacoes/semana')
            .then(negociacoes => {
                console.log(negociacoes);
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana');
            });  
    }
    
    obterNegociacoesDaSemanaAnterior() {
               
        return this._http
            .get('negociacoes/anterior')
            .then(negociacoes => {
                console.log(negociacoes);
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana anterior');
            });   
    }
    
    obterNegociacoesDaSemanaRetrasada() {
               
        return this._http
            .get('negociacoes/retrasada')
            .then(negociacoes => {
                console.log(negociacoes);
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana retrasada');
            });  
        
    }
    
    obterNegociacoes() {
        
        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ]).then(periodos => {

            let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), [])
                .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor ));

            return negociacoes;
        }).catch(erro => {
            throw new Error(erro);
        });
	}
	cadastra(negociacao){
        return ConnectionFactory
                .getConnection()
                .then(connection => new NegociacaoDao(connection))
                .then(dao => dao.adiciona(negociacao))
                .then(() => "Negociação adicionada com sucesso")
                .catch(() => {
                    throw new Error ("Não foi possível adicionar a negociação")
                });
    }
    lista(){
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .catch(erro => {
                console.log(erro);
                throw new Error("Não foi possível obter as negociações")
            })
    }
    apaga(){
        return ConnectionFactory
            .getConnection()
            .then(connection => NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(() => "Negocições apagadas com sucesso")
            .catch(erro => {
                console.log(erro);
                throw  new Error("Não foi possivel apagar as negociações")
        })
    }
    importa(){
        return this.obterNegociacoes(listaAtual)
            .then(negociacoes =>
                    negociacoes.filter(negociacao =>
                        !listaAtual.some(negociacaoExistente =>
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
            .catch(erro => {
                console.log(erro);
                throw new Error("Não foi possível buscar negociações para importar");
            })
    }
}
