import { ProfundidadeClass } from '../util/models/ProfundidadeClass.js'
import { DecisaoClass } from '../util/models/DecisaoClass.js'
import { FormulaAcidezSoloClass } from '../util/models/FormulaAcidezSoloClass.js'
import { AplicacaoClass } from '../util/models/AplicacaoClass.js'
import { ValidityClass } from '../util/services/ValidityClass.js'

const validity = new ValidityClass()

export class AcidezSoloModel {
    constructor(obj = {}) {
        this.id = obj.id || undefined
        this.configuracaoId = obj.configuracaoId || undefined //ATRIBUTOS OBRIGATORIOS
        this.classe = obj.classe || '' //ATRIBUTOS OBRIGATORIOS
        this.cultura = obj.cultura || new Array()
        this.culturaObs = obj.culturaObs || ''
        this.manejo = obj.manejo || '' //ATRIBUTOS OBRIGATORIOS
        this.manejoObs = obj.manejoObs || ''
        this.condicao = obj.condicao || ''
        this.condicaoObs = obj.condicaoObs || ''
        this.profundidade = new ProfundidadeClass(obj.profundidade) //CLASSE DE PROFUNDIDADE //ATRIBUTOS OBRIGATORIOS
        this.profundidadeObs = obj.profundidadeObs || ''
        this.decisao = new DecisaoClass(obj.decisao) //CLASSE DE TOMADA DE DECISAO //ATRIBUTOS OBRIGATORIOS
        this.decisaoObs = obj.decisaoObs || ''
        this.formula = new FormulaAcidezSoloClass(obj.formula) //CLASSE COM FORMULAS PARA CORRECAO DA ACIDEZ //ATRIBUTOS OBRIGATORIOS
        this.formulaObs = obj.formulaObs || ''
        this.aplicacao = new AplicacaoClass(obj.aplicacao) //CLASSE DE APLICACAO //ATRIBUTOS OBRIGATORIOS
        this.aplicacaoObs = obj.aplicacaoObs || ''
    }

    getId() {
        return this.id
    }

    setConfiguracaoId(c) {
        if (typeof c == 'object') {
            if (c.constructor.name == 'ConfiguracaoModel') {
                this.configuracaoId = c.getId()
                return true
            }
        }
        return false
    }

    getConfiguracaoId() {
        return this.configuracaoId
    }

    setClasse(s) {
        this.classe = validity.name(s).toLowerCase()
        if (this.classe) {
            return true
        }
        return false
    }

    getClasse() {
        return this.classe
    }

    setCultura(e) {
        if (Array.isArray(e)) {
            this.resetCultura()
            e.forEach(i => {
                this.addCultura(i)
            })
            return true
        }
        else if (typeof e == 'string') {
            this.resetCultura()
            e.split(',').forEach(i => {
                this.addCultura(i)
            })
            return true
        }
        return false
    }

    addCultura(s) {
        const c = validity.nameObject(s).toLowerCase()
        if (c) {
            this.cultura.push(c)
            return true
        }
        return false
    }

    resetCultura() {
        this.cultura = new Array()
    }

    getCultura(i) {
        if (!isNaN(i)) {
            if (i >= 0 && i < this.cultura.length) {
                return this.cultura[i]
            }
        }
        return ''
    }

    getCulturaAll() {
        return this.cultura
    }

    setCulturaObs(s) {
        this.culturaObs = validity.simpleDescription(s)
    }

    getCulturaObs() {
        return this.culturaObs
    }

    setManejo(s) {
        this.manejo = validity.name(s).toLowerCase()
        if (this.manejo) {
            return true
        }
        return false
    }

    getManejo() {
        return this.manejo
    }

    setManejoObs(s) {
        this.manejoObs = validity.simpleDescription(s)
        if (this.manejoObs) {
            return true
        }
        return false
    }

    getManejoObs() {
        if (this.manejoObs) {
            return this.manejoObs
        }
        return ''
    }

    setCondicao(s) {
        this.condicao = validity.simpleDescription(s).toLowerCase()
        if (this.condicao) {
            return true
        }
        return false
    }

    getCondicao() {
        return this.condicao
    }

    setCondicaoObs(s) {
        this.condicaoObs = validity.simpleDescription(s)
        if (this.condicaoObs) {
            return true
        }
        return false
    }

    getCondicaoObs() {
        return this.condicaoObs
    }

    setProfundidade(c) {
        if (typeof c == 'object') {
            if (c.constructor.name == 'ProfundidadeClass') {
                this.profundidade = new ProfundidadeClass(c)
                return true
            }
        }
        return false
    }

    getProfundidade() {
        return new ProfundidadeClass(this.profundidade)
    }

    setProfundidadeObs(s) {
        this.profundidadeObs = validity.simpleDescription(s)
        if (this.profundidadeObs) {
            return true
        }
        return false
    }

    getProfundidadeObs() {
        return this.profundidadeObs
    }

    setDecisao(c) {
        if (typeof c == 'object') {
            if (c.constructor.name == 'DecisaoClass') {
                this.decisao = new DecisaoClass(c)
                return true
            }
        }
        return false
    }

    getDecisao() {
        return new DecisaoClass(this.decisao)
    }

    setDecisaoObs(s) {
        this.decisaoObs = validity.simpleDescription(s)
        if (this.decisaoObs) {
            return true
        }
        return false
    }

    getDecisaoObs() {
        return this.decisaoObs
    }

    setFormula(c) {
        return this.formula.setFormula(c)
    }

    getFormula() {
        return this.formula.getFormula()
    }

    setFormulaObs(s) {
        this.formulaObs = validity.simpleDescription(s)
        if (this.formulaObs) {
            return true
        }
        return false
    }

    getFormulaObs() {
        return this.formulaObs
    }

    setAplicacao(c) {
        if (typeof c == 'object') {
            if (c.constructor.name == 'AplicacaoClass') {
                this.aplicacao = new AplicacaoClass(c)
                return true
            }
        }
        return false
    }

    getAplicacao() {
        return new AplicacaoClass(this.aplicacao)
    }

    setAplicacaoObs(s) {
        this.aplicacaoObs = validity.simpleDescription(s)
        if (this.aplicacaoObs) {
            return true
        }
        return false
    }

    getAplicacaoObs() {
        return this.aplicacaoObs
    }

    toString() {
        if (
            this.configuracaoId &&
            this.classe &&
            this.manejo &&
            this.profundidade &&
            this.decisao &&
            this.formula &&
            this.aplicacao
        ) {
            return JSON.parse(JSON.stringify({
                id: this.id || undefined,
                configuracaoId: this.configuracaoId,
                classe: this.classe,
                cultura: this.cultura || undefined,
                culturaObs: this.culturaObs || undefined,
                manejo: this.manejo,
                manejoObs: this.manejoObs || undefined,
                condicao: this.condicao || undefined,
                condicaoObs: this.condicaoObs || undefined,
                profundidade: this.profundidade,
                profundidadeObs: this.profundidadeObs || undefined,
                decisao: this.decisao,
                decisaoObs: this.decisaoObs || undefined,
                formula: this.formula,
                formulaObs: this.formulaObs || undefined,
                aplicacao: this.aplicacao,
                aplicacaoObs: this.aplicacaoObs || undefined
            }))
        }
    }
}