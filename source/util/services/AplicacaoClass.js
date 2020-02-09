import { ProfundidadeClass } from './ProfundidadeClass.js.js.js'

export class AplicacaoClass {
    constructor(obj = {}) {
        this.modo = obj.modo || undefined
        this.area = obj.area || undefined
        this.profundidade = new ProfundidadeClass(obj.profundidade) //CLASSE DE PROFUNDIDADE
    }

    setModo(e) {
        if (typeof e == 'string') {
            e = e.trim().toLowerCase()
            if (e != '') {
                this.modo = e
                return true
            }
        }
        this.modo = undefined
        return false
    }

    getModo() {
        if (this.modo) {
            return this.modo
        }
        return ''
    }

    setArea(e) {
        if (typeof e == 'string') {
            e = e.trim().toLowerCase()
            if (e != '') {
                this.area = e
                return true
            }
        }
        this.area = undefined
        return false
    }

    getArea() {
        if (this.area) {
            return this.area
        }
        return ''
    }

    setProfundidade(e) {
        if (typeof e == 'object') {
            if (e.constructor.name == 'ProfundidadeClass') {
                this.profundidade = e
                return true
            }
        }
        this.profundidade = new ProfundidadeClass()
        return false
    }

    getProfundidade() {
        return this.profundidade
    }

    toString() {
        if (
            this.modo
        ) {
            return {
                modo: this.modo,
                area: this.area,
                profundidade: this.profundidade.toString()
            }
        }
    }
}