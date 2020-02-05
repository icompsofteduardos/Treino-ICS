class Date_help{

    constructor(){
        throw new Error("Date_help não pode ser instanciada");
    }

    static data_texto(data){
        
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;

    }

    static texto_data(texto){

        if(!/\d{4}-\d{2}-\d{2}/.test(texto)){
            throw new Error("Deve estar no formato yyyy-mm-dd");
        }
        return new Date(...texto.split('-').map((item, indice) => item - indice % 2));
    
    }
}
/*
usar a crase e os conchetes serve para colocar um arquivo dentro
de uma string
*/