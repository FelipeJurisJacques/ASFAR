import { ValidityClass } from '../util/services/ValidityClass.js'

const validity = new ValidityClass()

export class ConfiguracaoModel {
    constructor(obj = {}) {
        this.id = obj.id || undefined
        this.titulo = obj.titulo || ''
        this.ano = obj.ano || NaN
        this.autor = obj.autor || ''
        this.tipo = obj.tipo || ''
        this.regiao = obj.regiao || ''
    }

    getId() {
        return this.id
    }

    setTitulo(s) {
        this.titulo = validity.nameObject(s).toUpperCase()
        if (this.titulo) {
            return true
        }
        return false
    }

    getTitulo() {
        return this.titulo
    }

    setAno(e) {
        e = parseInt(e)
        if (!isNaN(e) && e >= 1950) {
            this.ano = e
            return true
        }
        return false
    }

    getAno() {
        return this.ano
    }

    setAutor(s) {
        this.autor = validity.nameObject(s).toUpperCase()
        if (this.autor) {
            return true
        }
        return false
    }

    getAutor() {
        return this.autor
    }

    setTipo(s){
        this.tipo = validity.nameObject(s).toLowerCase()
        if (this.tipo) {
            return true
        }
        return false
    }

    getTipo(){
        return this.tipo
    }

    setRegiao(s){
        this.regiao = validity.simpleDescription(s)
        if (this.regiao) {
            return true
        }
        return false
    }

    getRegiao(){
        return this.regiao
    }

    toString() {
        if (
            this.titulo &&
            this.ano &&
            this.autor &&
            this.tipo &&
            this.regiao
        ) {
            return JSON.parse(JSON.stringify({
                id: this.id,
                titulo: this.titulo,
                ano: this.ano,
                autor: this.autor,
                tipo: this.tipo,
                regiao: this.regiao
            }))
        }
    }
}