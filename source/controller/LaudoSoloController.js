import { LaudoSoloDao } from '../dao/LaudoSoloDao.js'
import { LaudoSoloModel } from '../../source/models/LaudoSoloModel.js'
import { RequestUrlResource } from '../resource/RequestUrlResource.js'
import { NutrienteCorrecaoClass } from '../util/models/NutrienteCorrecaoClass.js'
import { LaudoAcidezSoloModel } from '../models/LaudoAcidezSoloModel.js'
import { LaudoFertilidadeSoloModel } from '../models/LaudoFertilidadeSoloModel.js'

const dao = new LaudoSoloDao()

export class LaudoSoloController {
    constructor(listing = true) {
        this.listing = false
        this.id = undefined
        this.list = new Array()
        this.cliente = null
        this.talhao = null
        this.analiseSolo = null
        this.laudoSolo = null
        this.coordenadasList = new Array()
        if (typeof listing == 'boolean') {
            this.listing = listing
        }
        const requestUrl = new RequestUrlResource().getItens()
        if (requestUrl.laudoSoloId) {
            this.id = requestUrl.laudoSoloId
        }
        console.log(this)
    }

    load(analiseSoloController, analiseSoloModel) {
        this.list = new Array()
        this.laudoSolo = null
        this.tempCoordenadas = undefined
        return new Promise((resolve, reject) => {
            if (typeof analiseSoloController == 'object') {
                if (analiseSoloController.constructor.name == 'AnaliseSoloController') {
                    this.cliente = analiseSoloController.cliente
                    this.talhao = analiseSoloController.talhao
                    this.analiseSolo = analiseSoloController.analiseSolo || analiseSoloModel
                    if (!isNaN(this.id) || this.listing) {
                        dao.select(this.cliente, this.talhao, this.analiseSolo, this.id).then(e => {
                            if (Array.isArray(e)) {
                                this.list = e
                            }
                            else {
                                this.laudoSolo = e
                            }
                            resolve(true)
                        }).catch(() => {
                            reject(false)
                        })
                    }
                    else {
                        this.laudoSolo = new LaudoSoloModel()
                        resolve(true)
                    }
                }
                else {
                    reject(false)
                }
            }
            else {
                reject(false)
            }
        })
    }

    save(model, url) {
        if (
            window.navbar &&
            typeof url == 'string' &&
            this.cliente != null &&
            this.talhao != null &&
            this.analiseSolo != null
        ) {
            if (isNaN(this.id)) {
                dao.insert(this.cliente, this.talhao, this.analiseSolo, model).then(e => {
                    window.navbar.save()
                    window.navbar.goTab(`${url}?clienteId=${this.cliente.getId()}&talhaoId=${this.talhao.getId()}&analiseSoloId=${this.analiseSolo.getId()}&laudoSoloId=${e}`)
                }).catch(() => { })
            }
            else {
                dao.update(this.cliente, this.talhao, this.analiseSolo, model).then(() => {
                    window.navbar.save()
                    window.navbar.goTab(`${url}?clienteId=${this.cliente.getId()}&talhaoId=${this.talhao.getId()}&analiseSoloId=${this.analiseSolo.getId()}`)
                }).catch(() => { })
            }
        }
    }

    delete(model, url) {
        if (window.layout && this.cliente != null && this.talhao != null) {
            window.layout.confirm('Você tem certeza que deseja eliminar esse talhão do projeto?').then(e => {
                if (e) {
                    dao.delete(this.cliente, this.talhao, this.analiseSolo, model).then(() => {
                        if (window.navbar && typeof url == 'string') {
                            window.navbar.save()
                            window.navbar.goTab(`${url}?clienteId=${this.cliente.getId()}&talhaoId=${this.talhao.getId()}&analiseSoloId=${this.analiseSolo.getId()}`)
                        }
                    })
                }
            }).catch(() => { })
        }
    }

    getCoordenadasList() {
        if (this.coordenadasList.length == 0 && this.list.length > 0) {
            this.coordenadasList = ordenarPorCoordenadas(this.list)
        }
        return this.coordenadasList
    }

    calculateAcidezCalcario(laudoSoloModel, formulaModificada = undefined) {
        const calcario = new NutrienteCorrecaoClass()
        if (typeof laudoSoloModel == 'object' && this.analiseSolo) {
            if (laudoSoloModel.constructor.name == 'LaudoSoloModel') {
                const laudoQuimicoSolo = laudoSoloModel.getLaudoQuimicoSolo()
                if (typeof formulaModificada == 'object') {
                    const formula = formulaModificada
                    if (formula.getProduto) {
                        calcario.setValor(formula.calculate(laudoQuimicoSolo))
                        calcario.setLegenda(formula.getText())
                        calcario.setModificacao(true)
                    }
                }
                else {
                    const acidezSolo = this.analiseSolo.getAcidezSolo(laudoSoloModel)
                    if (acidezSolo) {
                        const decisao = acidezSolo.getDecisao()
                        const formula = acidezSolo.getFormula()
                        if (formula.getProduto) {
                            if (decisao.is(laudoQuimicoSolo)) {
                                calcario.setValor(formula.calculate(laudoQuimicoSolo))
                                calcario.setLegenda(formula.getText())
                            }
                        }
                    }
                }
            }
        }
        return calcario
    }

    // totalHa(c, nutrienteCorrecaoClass) {
    //     if (typeof nutrienteCorrecaoClass == 'object' && this.talhao) {
    //         if (nutrienteCorrecaoClass.constructor.name == 'NutrienteCorrecaoClass') {
    //             const a = this.talhao.getAreaInt()
    //             const l = this.totalNasCoordenadas(c)
    //             const v = nutrienteCorrecaoClass.getValorInt()
    //             const t = ((v * a) / l)
    //             const kg = t * 1000
    //             return `${kg.toFixed(1)} kg`
    //         }
    //     }
    // }
}

class CoordinatesGroupClass {
    constructor() {
        this.coordenadas = undefined
        this.list = new Array()
        this.tempAcidezTotal = undefined
        this.tempFertilidadeTotal = undefined
    }

    getTotalLaudoAcidezSolo() {
        if (!this.tempAcidezTotal) {
            this.tempAcidezTotal = new LaudoAcidezSoloModel()
            if (this.list.length > 0) {
                this.list.forEach(e => {
                    this.tempAcidezTotal.calcario.valor += e.laudoAcidezSolo.calcario.valor
                    this.tempAcidezTotal.gesso.valor += e.laudoAcidezSolo.gesso.valor
                })
                this.tempAcidezTotal.calcario.setProduto(this.list[0].laudoAcidezSolo.calcario.getProduto())
                this.tempAcidezTotal.gesso.setProduto(this.list[0].laudoAcidezSolo.gesso.getProduto())
            }
        }
        return new LaudoAcidezSoloModel(this.tempAcidezTotal.toString())
    }

    getMediaLaudoAcidezSolo() {
        const r = this.getTotalLaudoAcidezSolo()
        if (this.list.length > 0) {
            r.calcario.valor /= this.list.length
            r.gesso.valor /= this.list.length
        }
        return new LaudoAcidezSoloModel(r.toString())
    }

    getTotalLaudoFertilidadeSolo() {
        if (!this.tempFertilidadeTotal) {
            this.tempFertilidadeTotal = new LaudoFertilidadeSoloModel()
            if (this.list.length > 0) {
                this.list.forEach(e => {
                    this.tempFertilidadeTotal.n.valor += e.laudoFertilidadeSolo.n.valor
                    this.tempFertilidadeTotal.p.valor += e.laudoFertilidadeSolo.p.valor
                    this.tempFertilidadeTotal.k.valor += e.laudoFertilidadeSolo.k.valor
                })
                this.tempFertilidadeTotal.n.setProduto(this.list[0].laudoFertilidadeSolo.n.getProduto())
                this.tempFertilidadeTotal.p.setProduto(this.list[0].laudoFertilidadeSolo.p.getProduto())
                this.tempFertilidadeTotal.k.setProduto(this.list[0].laudoFertilidadeSolo.k.getProduto())
            }
        }
        return new LaudoFertilidadeSoloModel(this.tempFertilidadeTotal.toString())
    }

    getMediaLaudoFertilidadeSolo() {
        const r = this.getTotalLaudoFertilidadeSolo()
        if (this.list.length > 0) {
            r.n.valor /= this.list.length
            r.p.valor /= this.list.length
            r.k.valor /= this.list.length
        }
        return new LaudoFertilidadeSoloModel(r.toString())
    }
}

function ordenarPorCoordenadas(list) {
    let r = new Array()
    list.forEach(e => {
        console.log(e)
        let has = false
        r.forEach(i => {
            if (i.coordenadas.equal(e.coordenadas)) {
                i.list.push(e)
                has = true
            }
        })
        if (!has) {
            const g = new CoordinatesGroupClass()
            g.coordenadas = e.coordenadas
            g.list.push(e)
            console.log(g)
            r.push(g)
        }
    })
    return r
}