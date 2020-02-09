import { AcidezSoloDao } from '../dao/AcidezSoloDao.js'
import { AcidezSoloModel } from '../models/AcidezSoloModel.js'
import { RequestUrlResource } from '../resource/RequestUrlResource.js'

const dao = new AcidezSoloDao()

export class AcidezSoloController {
    constructor(listing = true) {
        this.listing = false
        this.id = undefined
        this.list = new Array()
        this.configuracao = null
        this.acidezSolo = null
        if (typeof listing == 'boolean') {
            this.listing = listing
        }
        const requestUrl = new RequestUrlResource().getItens()
        if (requestUrl.acidezSoloId) {
            this.id = requestUrl.acidezSoloId
        }
        //console.log(this)
    }

    load(configuracaoController) {
        return new Promise((resolve, reject) => {
            if (typeof configuracaoController == 'object') {
                if (configuracaoController.constructor.name == 'ConfiguracaoController') {
                    this.configuracao = configuracaoController.configuracao
                    if (!isNaN(this.id) || this.listing) {
                        dao.select(this.configuracao, this.id).then(e => {
                            if (Array.isArray(e)) {
                                this.list = e
                            }
                            else {
                                this.acidezSolo = e
                            }
                            resolve(true)
                        }).catch(() => {
                            reject(false)
                        })
                    }
                    else {
                        this.acidezSolo = new AcidezSoloModel()
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
        if (isNaN(this.id && this.configuracao != null)) {
            dao.insert(this.configuracao, model).then(e => {
                if (window.navbar && typeof url == 'string') {
                    window.navbar.save()
                    window.navbar.goTab(`${url}?configuracaoId=${this.configuracao.getId()}&acidezSoloId=${e}`)
                }
            }).catch(() => { })
        }
        else {
            dao.update(this.configuracao, model).then(() => {
                if (window.navbar && typeof url == 'string') {
                    window.navbar.save()
                    window.navbar.goTab(`${url}?configuracaoId=${this.configuracao.getId()}&acidezSoloId=${this.id}`)
                }
            }).catch(() => { })
        }
    }

    goEdit(tagButton, model, url) {
        if (typeof tagButton == 'object' && typeof model == 'object') {
            if (tagButton.tagName == 'BUTTON' || tagButton.tagName == 'A') {
                if (model.constructor.name == 'AcidezSoloModel' && this.configuracao != null) {
                    tagButton.setAttribute('data-href', `${url}?configuracaoId=${this.configuracao.getId()}&acidezSoloId=${model.getId()}`)
                }
            }
        }
    }

    delete(model, url) {
        if (window.layout && this.configuracao != null) {
            window.layout.confirm('Você tem certeza que deseja eliminar esse pacote de correção do projeto?').then(e => {
                if (e) {
                    dao.delete(this.configuracao, model).then(() => {
                        if (window.navbar && typeof url == 'string') {
                            window.navbar.save()
                            window.navbar.goTab(`${url}?configuracaoId=${this.configuracao.getId()}`)
                        }
                    })
                }
            }).catch(() => { })
        }
    }
}