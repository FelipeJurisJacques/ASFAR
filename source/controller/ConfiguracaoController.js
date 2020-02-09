import { ConfiguracaoDao } from '../dao/ConfiguracaoDao.js'
import { ConfiguracaoModel } from '../models/ConfiguracaoModel.js'
import { RequestUrlResource } from '../resource/RequestUrlResource.js'
import { AlertsSyncClass } from '../../script/class/AlertsSyncClass.js'

const dao = new ConfiguracaoDao()
const alert = new AlertsSyncClass()

export class ConfiguracaoController {
    constructor(listing = true) {
        this.listing = false
        this.id = undefined
        this.list = new Array()
        this.configuracao = null
        if (typeof listing == 'boolean') {
            this.listing = listing
        }
        const requestUrl = new RequestUrlResource().getItens()
        if (requestUrl.configuracaoId) {
            this.id = requestUrl.configuracaoId
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
                        this.configuracao = e
                    }
                    resolve(true)
                }).catch(() => {
                    reject(false)
                })
            }
            else {
                this.configuracao = new ConfiguracaoModel()
                resolve(true)
            }
        })
    }

    save(model, url) {
        if (isNaN(this.id)) {
            dao.insert(model).then(e => {
                if (window.navbar && typeof url == 'string') {
                    window.navbar.save()
                    window.navbar.goTab(`${url}?configuracaoId=${e}`)
                }
            }).catch(() => { })
        }
        else {
            dao.update(model).then(() => {
                if (window.navbar && typeof url == 'string') {
                    window.navbar.save()
                    window.navbar.goTab(`${url}?configuracaoId=${this.id}`)
                }
            }).catch(() => { })
        }
    }

    delete(model, url) {
        if (window.layout) {
            window.layout.confirm('Você tem certeza que deseja eliminar essa configuracao do projeto?').then(e => {
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