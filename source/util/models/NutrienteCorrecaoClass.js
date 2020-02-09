import { ParseClass } from '../services/ParseClass.js'

const number = new ParseClass()

export class NutrienteCorrecaoClass {
    constructor(obj = {}) {
        this.produto = obj.produto || ''
        this.valor = obj.valor || 0
        this.modificacao = obj.modificacao || false
        this.legenda = obj.legenda || ''
    }

    setProduto(s) {
        if (typeof s == 'string') {
            this.produto = s.trim()
            if (this.produto) {
                return true
            }
        }
        return false
    }

    getProduto() {
        if (this.produto) {
            return this.produto
        }
        return 'produto indefinido'
    }

    setValor(n) {
        const value = number.parseFloat(n)
        if (!isNaN(value) && value >= 0) {
            this.valor = value
            return true
        }
        return false
    }

    getValor() {
        return `${this.valor} t/ha`
    }

    getValorInt() {
        return this.valor
    }

    getValorArea(talhaoModel) {
        if (typeof talhaoModel == 'object') {
            if (talhaoModel.constructor.name == 'TalhaoModel') {
                if (this.valor) {
                    if (talhaoModel.area) {
                        return `${this.valor * talhaoModel.area} t para ${talhaoModel.getArea()}`
                    }
                }
            }
        }
        return ''
    }

    setLegenda(e) {
        if (typeof e == 'string') {
            this.legenda = e.trim()
            if (this.legenda) {
                return true
            }
        }
        return false
    }

    getLegenda() {
        return this.legenda
    }

    getLegendaFull() {
        if (this.modificacao) {
            if (this.legenda) {
                return `(Ajustado) ${this.legenda}`
            }
            return '(Ajustado)'
        }
        else if (this.legenda) {
            return this.legenda
        }
        return ''
    }

    getModificacao() {
        if (this.modificacao) {
            return 'Ajustado'
        }
        return ''
    }

    setModificacao(e) {
        if (typeof e == 'boolean') {
            this.modificacao = e
            return true
        }
        return false
    }

    isModificacao() {
        return this.modificacao
    }

    toString() {
        return {
            produto: this.produto || undefined,
            valor: this.valor || 0,
            modificacao: this.modificacao || false,
            legenda: this.legenda || undefined
        }
    }
}