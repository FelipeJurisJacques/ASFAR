import { AnaliseSoloDao } from '../dao/AnaliseSoloDao.js'
import { AnaliseSoloModel } from '../../source/models/AnaliseSoloModel.js'
import { RequestUrlResource } from '../resource/RequestUrlResource.js'

const dao = new AnaliseSoloDao()

export class AnaliseSoloController {
    constructor(listing = true) {
        this.listing = false
        this.id = undefined
        this.list = new Array()
        this.cliente = null
        this.talhao = null
        this.analiseSolo = null
        if (typeof listing == 'boolean') {
            this.listing = listing
        }
        const requestUrl = new RequestUrlResource().getItens()
        if (requestUrl.analiseSoloId) {
            this.id = requestUrl.analiseSoloId
        }
        //console.log(this)
    }

    load(talhaoController) {
        return new Promise((resolve, reject) => {
            if (typeof talhaoController == 'object') {
                if (talhaoController.constructor.name == 'TalhaoController') {
                    this.cliente = talhaoController.cliente
                    this.talhao = talhaoController.talhao
                    if (!isNaN(this.id) || this.listing) {
                        dao.select(this.cliente, this.talhao, this.id).then(e => {
                            if (Array.isArray(e)) {
                                this.list = e
                            }
                            else {
                                this.analiseSolo = e
                            }
                            resolve(true)
                        }).catch(() => {
                            reject(false)
                        })
                    }
                    else {
                        this.analiseSolo = new AnaliseSoloModel()
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
        if (isNaN(this.id) && this.cliente != null && this.talhao != null) {
            if (isNaN(model.getConfiguracao().getId())) {
                window.layout.confirm('Você não selecionou nehuma configuração, deseja realizar essa análise de solo por conta própia?').then(e => {
                    if (e) {
                        dao.insert(this.cliente, this.talhao, model).then(e => {
                            if (window.navbar && typeof url == 'string') {
                                window.navbar.save()
                                window.navbar.goTab(`${url}?clienteId=${this.cliente.getId()}&talhaoId=${this.talhao.getId()}&analiseSoloId=${e}`)
                            }
                        }).catch(() => { })
                    }
                })
            }
            else {
                dao.insert(this.cliente, this.talhao, model).then(e => {
                    if (window.navbar && typeof url == 'string') {
                        window.navbar.save()
                        window.navbar.goTab(`${url}?clienteId=${this.cliente.getId()}&talhaoId=${this.talhao.getId()}&analiseSoloId=${e}`)
                    }
                }).catch(() => { })
            }
        }
        else {
            dao.update(this.cliente, model).then(() => {
                if (window.navbar && typeof url == 'string') {
                    window.navbar.save()
                    window.navbar.goTab(`${url}?clienteId=${this.cliente.getId()}&talhaoId=${talhao.getId()}&analiseSoloId=${model.getId()}`)
                }
            }).catch(() => { })
        }
    }

    delete(model, url) {
        if (window.layout && this.cliente != null && this.talhao != null) {
            window.layout.confirm('Você tem certeza que deseja eliminar essa análise de solo por completa do projeto?').then(e => {
                if (e) {
                    dao.delete(this.cliente, this.talhao, model).then(() => {
                        if (window.navbar && typeof url == 'string') {
                            window.navbar.save()
                            window.navbar.goTab(`${url}?clienteId=${this.cliente.getId()}&talhaoId=${this.talhao.getId()}`)
                        }
                    })
                }
            }).catch(() => { })
        }
    }

    getConfiguracaoElementosRequeridos() {
        let r = new Array()
        if (this.analiseSolo) {
            this.analiseSolo.getAcidezSolo().forEach(e => {
                e.getDecisao().getElementos().forEach(i => {
                    let b = true
                    r.forEach(j => {
                        if (j[0] == i[0] && j[1] == i[1]) {
                            b = false
                        }
                    })
                    if (b) {
                        r.push(i)
                    }
                })
                e.getFormula().getElementos().forEach(i => {
                    let b = true
                    r.forEach(j => {
                        if (j[0] == i[0] && j[1] == i[1]) {
                            b = false
                        }
                    })
                    if (b) {
                        r.push(i)
                    }
                })
            })
        }
        return r
    }
}