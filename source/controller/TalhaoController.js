import { TalhaoDao } from '../dao/TalhaoDao.js'
import { TalhaoModel } from '../models/TalhaoModel.js'
import { MapClass } from '../util/services/maps/MapClass.js'
import { RequestUrlResource } from '../resource/RequestUrlResource.js'

const dao = new TalhaoDao()

export class TalhaoController {
    constructor(listing = true) {
        this.listing = false
        this.id = undefined
        this.cliente = null
        this.list = new Array()
        this.talhao = null
        if (typeof listing == 'boolean') {
            this.listing = listing
        }
        const requestUrl = new RequestUrlResource().getItens()
        if (requestUrl.talhaoId) {
            this.id = requestUrl.talhaoId
        }
        //console.log(this)
    }

    load(clienteController) {
        return new Promise((resolve, reject) => {
            if (typeof clienteController == 'object') {
                if (clienteController.constructor.name == 'ClienteController') {
                    this.cliente = clienteController.cliente
                    if (!isNaN(this.id) || this.listing) {
                        dao.select(this.cliente, this.id).then(e => {
                            if (Array.isArray(e)) {
                                this.list = e
                            }
                            else {
                                this.talhao = e
                            }
                            resolve(true)
                        }).catch(() => {
                            reject(false)
                        })
                    }
                    else {
                        this.talhao = new TalhaoModel()
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
        if (isNaN(this.id) && this.cliente != null) {
            dao.insert(this.cliente, model).then(e => {
                if (window.navbar && typeof url == 'string') {
                    window.navbar.save()
                    window.navbar.goTab(`${url}?clienteId=${this.cliente.getId()}&talhaoId=${e}`)
                }
            }).catch(() => { })
        }
        else {
            dao.update(this.cliente, model).then(() => {
                if (window.navbar && typeof url == 'string') {
                    window.navbar.save()
                    window.navbar.goTab(`${url}?clienteId=${this.cliente.getId()}&talhaoId=${model.getId()}`)
                }
            }).catch(() => { })
        }
    }

    delete(model, url) {
        if (window.layout && this.cliente != null) {
            window.layout.confirm('Você tem certeza que deseja eliminar esse talhão do projeto?').then(e => {
                if (e) {
                    dao.delete(this.cliente, model).then(() => {
                        if (window.navbar && typeof url == 'string') {
                            window.navbar.save()
                            window.navbar.goTab(`${url}?clienteId=${this.cliente.getId()}`)
                        }
                    })
                }
            }).catch(() => { })
        }
    }

    setMap(tag, model, s = undefined) {
        if (typeof tag == 'object') {
            if (tag.tagName == 'DIV' || tag.tagName == 'TD') {
                let talhao = this.talhao
                if (typeof model == 'object') {
                    if (model.constructor.name == 'TalhaoModel') {
                        talhao = model
                    }
                }
                if (talhao) {
                    tag.innerHTML = new MapClass(talhao.getKml()).getMapSVG(talhao.getCoordenadas(), s)
                }
            }
        }
    }

    getIcon(model, s = undefined) {
        let talhao = this.talhao
        if (typeof model == 'object') {
            if (model.constructor.name == 'TalhaoModel') {
                talhao = model
            }
        }
        if (talhao) {
            return new MapClass(talhao.getKml()).getIconSVG(s)
        }
        return ''
    }

    setMapAndPoints(tag, arrayLaudoSoloModel, s = undefined) {
        if (typeof tag == 'object') {
            if (tag.tagName == 'DIV' || tag.tagName == 'TD') {
                if (this.talhao) {
                    let c = new Array()
                    arrayLaudoSoloModel.forEach(laudoSoloModel => {
                        if (typeof laudoSoloModel == 'object') {
                            if (laudoSoloModel.constructor.name == 'LaudoSoloModel') {
                                c.push(laudoSoloModel.getCoordenadas())
                            }
                        }
                    })
                    tag.innerHTML = new MapClass(this.talhao.getKml()).getMapAndPointsSVG(this.talhao.getCoordenadas(), c, s)
                }
            }
        }
    }
}