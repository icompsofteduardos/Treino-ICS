class negociacao{
    constructor(data, quantidade, valor){
        this.data = new Date(data.getTime());
        //data do momento, tornando ela imutável
        this.quantidade = quantidade;
        this.valor = valor;
        Object.freeze(this);
    }

    get volume(){
        return this._quantidade * this._valor;
        //underline define que as propriedades só podem ser acessadas pelos métodos da classe
        //ninguém que não seja um método pode acessar
    }
    get data(){
        return new Date(this._data.getTime());
        //programação defensiva
    }
    get quant(){
        return this._quantidade;
    }
    get valor(){
        return this._valor;
    }
}