import { LaudoQuimicoSoloModel } from './LaudoQuimicoSoloModel.js'
import { LaudoAcidezSoloModel } from './LaudoAcidezSoloModel.js'
import { LaudoFertilidadeSoloModel } from './LaudoFertilidadeSoloModel.js'
import { GoogleEarthKmlClass } from '../util/models/GoogleEarthKmlClass.js'
import { ProfundidadeClass } from '../util/models/ProfundidadeClass.js'
import { CoordinatesClass } from '../util/models/CoordinatesClass.js'
import { ValidityClass } from '../util/services/ValidityClass.js'
import { DateClass } from '../util/models/DateClass.js'

const validity = new ValidityClass()

export class LaudoSoloModel {
    constructor(obj = {}) {
        this.id = obj.id || undefined
        this.analiseSoloId = obj.analiseSoloId || undefined
        this.amostra = obj.amostra || ''
        this.entrada = new DateClass(obj.entrada) //DATE
        this.emissao = new DateClass(obj.emissao) //DATE
        this.coletador = obj.coletador || ''
        this.empresa = obj.empresa || ''
        this.profundidade = new ProfundidadeClass(obj.profundidade)
        this.coordenadas = new CoordinatesClass(obj.coordenadas)
        this.kml = new GoogleEarthKmlClass(obj.kml)
        this.descricao = obj.descricao || ''
        this.laudoQuimicoSolo = new LaudoQuimicoSoloModel(obj.laudoQuimicoSolo)
        this.laudoAcidezSolo = new LaudoAcidezSoloModel(obj.laudoAcidezSolo)
        this.laudoFertilidadeSolo = new LaudoFertilidadeSoloModel(obj.laudoFertilidadeSolo)
    }

    getId() {
        return this.id
    }

    setAnaliseSoloId(c) {
        if (typeof c == 'object') {
            if (c.constructor.name == 'AnaliseSoloModel') {
                this.analiseSoloId = c.getId()
                return true
            }
        }
        return false
    }

    setAmostra(s) {
        this.amostra = validity.characterNumber(s)
        if (this.amostra) {
            if (this.amostra.length > 1 && this.amostra.length < 100) {
                return true
            }
        }
        return false
    }

    getAmostra() {
        return this.amostra
    }

    setEntrada(c) {
        if (typeof c == 'object') {
            if (c.constructor.name == 'DateClass') {
                this.entrada = new DateClass(c.toString())
                return true
            }
        }
        return false
    }

    getEntrada() {
        return new DateClass(this.entrada)
    }

    setEmissao(c) {
        if (typeof c == 'object') {
            if (c.constructor.name == 'DateClass') {
                this.emissao = new DateClass(c.toString())
                return true
            }
        }
        return false
    }

    getEmissao() {
        return new DateClass(this.emissao)
    }

    setEmpresa(s) {
        this.empresa = validity.name(s).toUpperCase()
        if (this.empresa) {
            return true
        }
        return false
    }

    getEmpresa() {
        return this.empresa
    }

    setColetador(s) {
        this.coletador = validity.name(s).toUpperCase()
        if (this.coletador) {
            return true
        }
        return false
    }

    getColetador() {
        return this.coletador
    }

    setProfundidade(c) {
        if (typeof c == 'object') {
            if (c.constructor.name == 'ProfundidadeClass') {
                this.profundidade = c
                return true
            }
        }
        return false
    }

    getProfundidade() {
        return new ProfundidadeClass(this.profundidade.toString())
    }

    setDescricao(s) {
        this.descricao = validity.description(s)
        if (this.descricao) {
            return true
        }
        return false
    }

    getDescricao(){
        return this.descricao
    }

    setLaudoQuimicoSolo(c) {
        if (typeof c == 'object') {
            if (c.constructor.name == 'LaudoQuimicoSoloModel') {
                this.laudoQuimicoSolo = c
                return true
            }
        }
        return false
    }

    getLaudoQuimicoSolo() {
        return new LaudoQuimicoSoloModel(this.laudoQuimicoSolo.toString())
    }

    setLaudoAcidezSolo(c) {
        if (typeof c == 'object') {
            if (c.constructor.name == 'LaudoAcidezSoloModel') {
                this.laudoAcidezSolo = c
                return true
            }
        }
        return false
    }

    getLaudoAcidezSolo() {
        return new LaudoAcidezSoloModel(this.laudoAcidezSolo.toString())
    }

    setLaudoFertilidadeSolo(c) {
        if (typeof c == 'object') {
            if (c.constructor.name == 'LaudoFertilidadeSoloModel') {
                this.laudoFertilidadeSolo = c
                return true
            }
        }
        return false
    }

    getLaudoFertilidadeSolo() {
        return new LaudoFertilidadeSoloModel(this.laudoFertilidadeSolo.toString())
    }

    setCoordenadas(c) {
        if (typeof c == 'object') {
            if (c.constructor.name == 'CoordinatesClass') {
                if (
                    this.coordenadas.getLatitude() != c.getLatitude() ||
                    this.coordenadas.getLongitude() != c.getLongitude()
                ) {
                    this.kml = new GoogleEarthKmlClass()
                }
                this.coordenadas = new CoordinatesClass(c.toString())
                return true
            }
        }
        return false
    }

    getCoordenadas() {
        return new CoordinatesClass(this.coordenadas.toString())
    }

    setKml(kml) { //ASSINCRONO
        return new Promise((resolve, reject) => {
            const file = new GoogleEarthKmlClass()
            file.setKml(kml).then(() => {
                if (file.isPoint()) {
                    this.kml = file
                    const c = file.getPoint()
                    if (c) {
                        this.coordenadas.latitude = c[0]
                        this.coordenadas.longitude = c[1]
                    }
                    resolve()
                }
                else {
                    this.kml = new GoogleEarthKmlClass()
                    reject('O arquivo não possuí um polígono')
                }
            }).catch(e => {
                this.kml = new GoogleEarthKmlClass()
                console.log(e)
                reject('Arquivo não pertence ao Google Earth')
            })
        })
    }

    getKml() {
        return new GoogleEarthKmlClass(this.kml.toString())
    }

    toString() {
        if (
            this.analiseSoloId &&
            this.amostra
        ) {
            return JSON.parse(JSON.stringify({
                id: this.id,
                analiseSoloId: this.analiseSoloId,
                amostra: this.amostra,
                entrada: this.entrada.toString(),
                emissao: this.emissao.toString(),
                coletador: this.coletador || undefined,
                empresa: this.empresa || undefined,
                profundidade: this.profundidade.toString(),
                coordenadas: this.coordenadas.toString(),
                kml: this.kml.toString(),
                descricao: this.descricao || undefined,
                laudoQuimicoSolo: this.laudoQuimicoSolo.toString(),
                laudoAcidezSolo: this.laudoAcidezSolo.toString(),
                laudoFertilidadeSolo: this.laudoFertilidadeSolo.toString()
            }))
        }
    }
}