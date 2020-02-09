import { ConfiguracaoModel } from './ConfiguracaoModel.js'
import { AcidezSoloModel } from './AcidezSoloModel.js'
import { FertilidadeSoloModel } from './FertilidadeSoloModel.js'
import { ValidityClass } from '../util/services/ValidityClass.js'
import { DateClass } from '../util/models/DateClass.js'

const validity = new ValidityClass()

export class AnaliseSoloModel {
    constructor(obj = {}) {
        // IDs
        this.id = obj.id || undefined
        this.talhaoId = obj.talhaoId || undefined
        // ENTRADAS
        this.configuracao = new ConfiguracaoModel(obj.configuracao)
        this.acidezSolo = new Array()
        if (Array.isArray(obj.acidezSolo)) {
            this.acidezSolo = obj.acidezSolo.map(e => new AcidezSoloModel(e))
        }
        this.fertilidadeSolo = new FertilidadeSoloModel(obj.fertilidadeSolo)
        // INFORMACOES
        this.inicio = new DateClass(obj.inicio)
        this.descricao = obj.descricao || ''
        this.responsavel = obj.responsavel || ''
    }

    getId() {
        return this.id
    }

    setTalhaoId(c) {
        if (typeof c == 'object') {
            if (c.constructor.name == 'TalhaoModel') {
                this.talhaoId = c.getId()
                return true
            }
        }
        return false
    }

    getTalhaoId() {
        return this.talhaoId
    }

    setConfiguracao(c) {
        if (typeof c == 'object') {
            if (c.constructor.name == 'ConfiguracaoModel') {
                this.configuracao = new ConfiguracaoModel(c)
                return true
            }
        }
        return false
    }

    getConfiguracao() {
        return new ConfiguracaoModel(this.configuracao)
    }

    resetAcidezSolo() {
        this.acidezSolo = new Array()
    }

    addAcidezSolo(c) {
        if (typeof c == 'object') {
            if (c.constructor.name == 'AcidezSoloModel') {
                if (this.acidezSolo.length > 0) {
                    const a = this.acidezSolo[this.acidezSolo.length - 1]
                    if (
                        a.configuracaoId == c.configuracaoId &&
                        a.classe == c.classe &&
                        a.manejo == c.manejo &&
                        !a.profundidade.equal(c.profundidade)
                    ) {
                        this.acidezSolo.push(new AcidezSoloModel(c))
                        return true
                    }
                }
                else {
                    this.acidezSolo.push(new AcidezSoloModel(c))
                    return true
                }
            }
        }
        return false
    }

    getAcidezSolo(e) {
        if (typeof e == 'object') {
            if (e.constructor.name == 'LaudoSoloModel') {
                for (let i = 0; i < this.acidezSolo.length; i++) {
                    if (this.acidezSolo[i].profundidade.in(e.profundidade)) {
                        return new AcidezSoloModel(this.acidezSolo[i])
                    }
                }
                return undefined
            }
        }
        else if (!isNaN(e)) {
            if (e >= 0 && e < this.acidezSolo.length) {
                return new AcidezSoloModel(this.acidezSolo[e])
            }
            return undefined
        }
        return this.acidezSolo
    }

    getInicio() {
        return this.inicio
    }

    setResponsavel(e) {
        this.responsavel = validity.name(e).toUpperCase()
        if (this.responsavel) {
            return true
        }
        return false
    }

    getResponsavel() {
        return this.responsavel
    }

    setDescricao(e) {
        this.descricao = validity.description(e)
        if (this.descricao) {
            return true
        }
        return false
    }

    getDescricao() {
        return this.descricao
    }

    toString() {
        if (this.talhaoId) {
            const configuracao = this.configuracao.toString()
            const acidezSolo = this.acidezSolo.map(e => e.toString())
            const fertilidadeSolo = this.fertilidadeSolo.toString()
            if (
                (
                    configuracao && (
                        acidezSolo.length > 0 ||
                        fertilidadeSolo
                    )
                ) || (
                    !configuracao &&
                    acidezSolo.length == 0 &&
                    !fertilidadeSolo
                )
            ) {
                return JSON.parse(JSON.stringify({
                    id: this.id || undefined,
                    talhaoId: this.talhaoId,
                    configuracao: configuracao || undefined,
                    acidezSolo: acidezSolo || undefined,
                    fertilidadeSolo: fertilidadeSolo || undefined,
                    inicio: this.inicio.toString() || undefined,
                    descricao: this.descricao || undefined,
                    responsavel: this.responsavel || undefined
                }))
            }
        }
    }
}