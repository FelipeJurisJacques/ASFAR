import { LaudoQuimicoSoloModel } from '../../models/LaudoQuimicoSoloModel.js'

export class DecisaoClass {
    constructor(obj = {}) {
        this.decisao = new Array()
        this.contraDecisao = new Array()
        if (obj.decisao) {
            if (Array.isArray(obj.decisao)) {
                this.decisao = obj.decisao.map(e => new LogicoClass(e))
            }
        }
        if (obj.contraDecisao) {
            if (Array.isArray(obj.contraDecisao)) {
                this.contraDecisao = obj.contraDecisao.map(e => new LogicoClass(e))
            }
        }
    }

    resetDecisao() {
        this.decisao = new Array()
    }

    resetContraDecisao() {
        this.contraDecisao = new Array()
    }

    pushDecisao(e) {
        if (typeof e == 'object') {
            if (e.constructor.name == 'LogicoClass') {
                if (e.is()) {
                    this.decisao.push(e)
                    return true
                }
            }
        }
        return false
    }

    pushContraDecisao(e) {
        if (typeof e == 'object') {
            if (e.constructor.name == 'LogicoClass') {
                if (e.is()) {
                    this.contraDecisao.push(e)
                    return true
                }
            }
        }
        return false
    }

    getFormula() {
        let r = this._getFormulaDecisao(this.decisao)
        if (this.contraDecisao.length > 0) {
            r = `(${r}) && !(${this._getFormulaDecisao(this.contraDecisao)})`
        }
        return r
    }

    _getFormulaDecisao(a) {
        let r = ''
        for (let i = 0; i < a.length; i++) {
            if (i > 0) {
                r += ` ${a[i - 1].getOperadorPrecedencia()} `
            }
            r += a[i].getFormula()
        }
        return r
    }

    getElementos() {
        let r = new Array()
        this.decisao.forEach(e => {
            r.push([e.getElemento(), e.getUnidade()])
        })
        this.contraDecisao.forEach(e => {
            r.push([e.getElemento(), e.getUnidade()])
        })
        return r
    }

    is(LaudoQuimicoSoloModel) {
        if (LaudoQuimicoSoloModel) {
            let r = this._buildDecisao(this.decisao, LaudoQuimicoSoloModel)
            if (this.contraDecisao.length > 0) {
                r = `(${r}) && !(${this._buildDecisao(this.contraDecisao, LaudoQuimicoSoloModel)})`
            }
            return eval(r)
        }
        return false
    }

    _buildDecisao(a, l) {
        let r = ''
        for (let i = 0; i < a.length; i++) {
            if (i > 0) {
                r += ` ${a[i - 1].getOperadorPrecedencia()} `
            }
            r += a[i].buildDecisao(l)
        }
        return r
    }

    toString() {
        if (
            this.decisao.length > 0 ||
            this.contraDecisao.length > 0
        ) {
            let decisao = this.decisao.map(e => e.toString())
            let contraDecisao = this.contraDecisao.map(e => e.toString())
            return JSON.parse(JSON.stringify({
                decisao: decisao,
                contraDecisao: contraDecisao
            }))
        }
    }
}

export class LogicoClass {
    constructor(obj = {}) {
        this.elemento = obj.elemento || undefined
        this.unidade = obj.unidade || undefined
        this.operadorLogico = obj.operadorLogico || undefined
        this.operadorCondicional = obj.operadorCondicional || undefined
        this.operadorPrecedencia = obj.operadorPrecedencia || undefined
    }

    setDecisao(elemento, unidade, operadorLogico, operadorCondicional, operadorPrecedencia) {
        if (
            this.setElemento(elemento) &&
            this.setUnidade(unidade) &&
            this.setOperadorLogico(operadorLogico) &&
            this.setOperadorCondicional(operadorCondicional) &&
            this.setOperadorPrecedencia(operadorPrecedencia)
        ) {
            return true
        }
        return false
    }

    setElemento(e) {
        if (typeof e == 'string') {
            e = e.trim()
            const laudo = new LaudoQuimicoSoloModel()
            if (e in laudo) {
                this.elemento = e
                return true
            }
        }
        this.elemento = undefined
        return false
    }

    getElemento() {
        return this.elemento
    }

    setUnidade(e) {
        if (typeof e == 'string') {
            e = e.trim()
            const laudo = new LaudoQuimicoSoloModel()
            if (this.elemento) {
                if (this.elemento in laudo) {
                    if (typeof laudo[this.elemento] === 'object') {
                        if (e in laudo[this.elemento]) {
                            this.unidade = e
                            return true
                        }
                    }
                    else if (e == "value" || e == "valor") {
                        this.unidade = 'value'
                        return true
                    }
                }
            }
        }
        this.unidade = undefined
        return false
    }

    getUnidade() {
        return this.unidade
    }

    setOperadorLogico(e) {
        if (typeof e == 'string') {
            e = e.trim()
            if (e == "<") {
                this.operadorLogico = '<'
                return true
            }
            else if (e == "<=") {
                this.operadorLogico = '<='
                return true
            }
            else if (e == "=" || e == "==") {
                this.operadorLogico = '=='
                return true
            }
            else if (e == ">") {
                this.operadorLogico = '>'
                return true
            }
            else if (e == ">=") {
                this.operadorLogico = '>='
                return true
            }
            else if (e == "!" || e == "!=") {
                this.operadorLogico = '!='
                return true
            }
        }
        this.operadorLogico = undefined
        return false
    }

    getOperadorLogico() {
        return this.operadorLogico
    }

    setOperadorCondicional(e) {
        e = parseFloat(e)
        if (!isNaN(e) && e > 0) {
            this.operadorCondicional = e
            return true
        }
        this.operadorCondicional = undefined
        return false
    }

    getOperadorCondicional() {
        return this.operadorCondicional
    }

    setOperadorPrecedencia(e) {
        if (typeof e == 'string') {
            e = e.trim()
            if (e == "||" || e == "ou" || e == "OU") {
                this.operadorPrecedencia = '||'
                return true
            }
            else if (e == "&&" || e == "e" || e == "E") {
                this.operadorPrecedencia = '&&'
                return true
            }
        }
        this.operadorPrecedencia = undefined
        return false
    }

    getOperadorPrecedencia() {
        return this.operadorPrecedencia
    }

    getFormula() {
        if (this.is()) {
            let elemento = this.elemento
            if (this.unidade != 'value') {
                elemento = `${elemento}.${this.unidade}`
            }
            return `${elemento} ${this.operadorLogico} ${this.operadorCondicional}`
        }
    }

    buildDecisao(l) {
        if (typeof l == 'object') {
            if (l.constructor.name == 'LaudoQuimicoSoloModel') {
                if (this.is()) {
                    let elemento = undefined
                    if (this.unidade != 'value') {
                        elemento = l[this.elemento][this.unidade]
                    }
                    else {
                        elemento = l[this.elemento]
                    }
                    if (!elemento) {
                        elemento = 0
                    }
                    return `${elemento} ${this.operadorLogico} ${this.operadorCondicional}`
                }
            }
        }
        return undefined
    }

    is() {
        if (
            this.elemento &&
            this.unidade &&
            this.operadorLogico &&
            this.operadorCondicional &&
            this.operadorPrecedencia
        ) {
            return true
        }
        return false
    }

    toString() {
        if (this.is()) {
            return {
                elemento: this.elemento,
                unidade: this.unidade,
                operadorLogico: this.operadorLogico,
                operadorCondicional: this.operadorCondicional,
                operadorPrecedencia: this.operadorPrecedencia
            }
        }
    }
}