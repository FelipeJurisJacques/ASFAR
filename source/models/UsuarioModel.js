export class UsuarioModel{
    constructor(obj={}){
        this.nome = obj.nome || undefined
        this.apelido = obj.apelido || undefined
        this.crea = obj.crea || undefined
        this.email = obj.email || undefined
        this.cell = obj.cell || undefined
        this.inicio = obj.inicio || undefined
    }
}