import { TabelaSmpClass } from '../services/TabelaSmpClass.js'
import { ParseClass } from '../services/ParseClass.js'

const number = new ParseClass()

export class FormulaAcidezSoloClass {
    constructor(obj = {}) {
        //formula por smp
        this.smp = undefined
        //formula por saturacao de bases
        this.saturacaoBases = undefined
        //toneladas por hactare
        this.tHa = undefined

        if (obj.smp) {
            this.smp = new SMPclass(obj.smp)
        }
        else if (obj.saturacaoBases) {
            this.saturacaoBases = new SaturacaoBasesClass(obj.saturacaoBases)
        }
        else if (obj.tHa) {
            this.tHa = new THaClass(obj.tHa)
        }
    }

    setFormula(e) {
        if (typeof e == 'object') {
            if (e.constructor.name == 'SMPclass') {
                this.smp = e
                this.saturacaoBases = undefined
                this.tHa = undefined
                console.log(this)
                return true
            }
            else if (e.constructor.name == 'SaturacaoBasesClass') {
                this.smp = undefined
                this.saturacaoBases = e
                this.tHa = undefined
                console.log(this)
                return true
            }
            else if (e.constructor.name == 'THaClass') {
                this.smp = undefined
                this.saturacaoBases = undefined
                this.tHa = e
                console.log(this)
                return true
            }
        }
        return false
    }

    getFormula() {
        if (this.smp) {
            return this.smp
        }
        else if (this.saturacaoBases) {
            return this.saturacaoBases
        }
        else if (this.tHa) {
            return this.tHa
        }
    }

    getElementos() {
        if (this.smp) {
            return this.smp.getElementos()
        }
        else if (this.saturacaoBases) {
            return this.saturacaoBases.getElementos()
        }
        else if (this.tHa) {
            return this.tHa.getElementos()
        }
        else return new Array()
    }

    toString() {
        if (this.smp) {
            return {
                smp: this.smp.toString()
            }
        }
        else if (this.saturacaoBases) {
            return {
                saturacaoBases: this.saturacaoBases.toString()
            }
        }
        else if (this.tHa) {
            return {
                tHa: this.tHa.toString()
            }
        }
    }
}

export class SMPclass {
    constructor(obj = {}) {
        this.quantidade = obj.quantidade || undefined
        this.pHreferencia = obj.pHreferencia || undefined
    }

    setQuantidade(e) {
        e = parseFloat(e)
        if (!isNaN(e) && e > 0) {
            this.quantidade = e
            return true
        }
        this.quantidade = undefined
        return false
    }

    getQuantidade() {
        if (this.quantidade) {
            return this.quantidade
        }
        return ''
    }

    setpHreferencia(e) {
        e = parseFloat(e)
        if (!isNaN(e) && e >= 1 && e <= 14) {
            this.pHreferencia = e
            return true
        }
        this.pHreferencia = undefined
        return false
    }

    getpHreferencia() {
        if (this.pHreferencia) {
            return this.pHreferencia
        }
        return ''
    }

    getText() {
        return `${this.quantidade} SMP para pH ${this.pHreferencia}`
    }

    getType() {
        return 'SMP'
    }

    getProduto() {
        return 'calcário PRNT 100%'
    }

    getElementos() {
        return [['SMP', 'value']]
    }

    calculate(laudoQuimicoSolo) {
        if (
            this.quantidade &&
            this.pHreferencia
        ) {
            if (typeof laudoQuimicoSolo == 'object') {
                if (laudoQuimicoSolo.constructor.name == 'LaudoQuimicoSoloModel') {
                    if (laudoQuimicoSolo.SMP) {
                        return new TabelaSmpClass().get(laudoQuimicoSolo.SMP, this.pHreferencia) * this.quantidade
                    }
                }
            }
        }
        return 0
    }

    toString() {
        if (
            this.quantidade &&
            this.pHreferencia
        ) {
            return {
                quantidade: this.quantidade,
                pHreferencia: this.pHreferencia
            }
        }
    }
}

export class SaturacaoBasesClass {
    constructor(obj = {}) {
        this.Vreferencia = obj.Vreferencia || undefined
    }

    setVreferencia(e) {
        e = number.parseFloat(e)
        if (!isNaN(e) && e > 0 && e <= 100) {
            this.Vreferencia = e
            return true
        }
        this.Vreferencia = undefined
        return false
    }

    getVreferencia() {
        return `${this.Vreferencia} %`
    }

    getText() {
        return `NC=[(${this.Vreferencia}% - V%) / 100] * CTCph7`
    }

    getType() {
        return 'Saturação por Bases'
    }

    getProduto() {
        return 'calcário PRNT 100%'
    }

    getElementos() {
        return [
            ['V', 'percentage'],
            ['CTCph7', 'cmolcdm3']
        ]
    }

    calculate(laudoQuimicoSolo) {
        if (this.Vreferencia) {
            if (typeof laudoQuimicoSolo == 'object') {
                if (laudoQuimicoSolo.constructor.name == 'LaudoQuimicoSoloModel') {
                    if (
                        laudoQuimicoSolo.V &&
                        laudoQuimicoSolo.CTCph7
                    ) {
                        return [(this.Vreferencia - laudoQuimicoSolo.V.percentage) / 100] * laudoQuimicoSolo.CTCph7.cmolcdm3
                    }
                }
            }
        }
        return 0
    }

    toString() {
        return {
            Vreferencia: this.Vreferencia
        }
    }
}

export class THaClass {
    constructor(obj = {}) {
        this.tHa = obj.tHa || undefined
    }

    settHa(e) {
        e = parseFloat(e)
        if (!isNaN(e) && e > 0) {
            this.tHa = e
            return true
        }
        this.tHa = undefined
        return false
    }

    gettHa() {
        return `${this.tHa} t/ha`
    }

    getText() {
        return `${this.tHa} t/ha`
    }

    getType() {
        return 'Tonelada por Hectare'
    }

    getProduto() {
        return 'calcário PRNT 100%'
    }

    getElementos() {
        return new Array()
    }

    calculate() {
        return this.tHa
    }

    toString() {
        return {
            tHa: this.tHa
        }
    }
}