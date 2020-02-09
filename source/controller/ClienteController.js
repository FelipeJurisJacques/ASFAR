import { ClienteDao } from '../dao/ClienteDao.js'
import { ClienteModel } from '../models/ClienteModel.js'
import { RequestUrlResource } from '../resource/RequestUrlResource.js'

const dao = new ClienteDao()

export class ClienteController {
    constructor(listing = true) {
        this.listing = false
        this.id = undefined
        this.list = new Array()
        this.cliente = null
        if (typeof listing == 'boolean') {
            this.listing = listing
        }
        const requestUrl = new RequestUrlResource().getItens()
        if (requestUrl.clienteId) {
            this.id = requestUrl.clienteId
        }
        //console.log(this)
    }

    get load() {
        return new Promise((resolve, reject) => {
            if (!isNaN(this.id) || this.listing) {
                dao.select(this.id).then(e => {
                    if (Array.isArray(e)) {
                        this.list = e
                    }
                    else {
                        this.cliente = e
                    }
                    resolve(true)
                }).catch(() => {
                    reject(false)
                })
            }
            else {
                this.cliente = new ClienteModel()
                resolve(true)
            }
        })
    }

    save(model, url) {
        if (isNaN(this.id)) {
            dao.insert(model).then(e => {
                if (window.navbar && typeof url == 'string') {
                    window.navbar.save()
                    window.navbar.goTab(`${url}?clienteId=${e}`)
                }
            }).catch(() => { })
        }
        else {
            dao.update(model).then(() => {
                if (window.navbar && typeof url == 'string') {
                    window.navbar.save()
                    window.navbar.goTab(`${url}?clienteId=${this.id}`)
                }
            }).catch(() => { })
        }
    }

    delete(model, url) {
        if (window.layout) {
            window.layout.confirm('Você tem certeza que deseja eliminar esse cliente do projeto?').then(e => {
                if (e) {
                    dao.delete(model).then(() => {
                        if (window.navbar && typeof url == 'string') {
                            window.navbar.save()
                            window.navbar.goTab(url)
                        }
                    })
                }
            }).catch(() => { })
        }
    }
}