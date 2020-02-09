import { TalhaoModel } from '../models/TalhaoModel.js'
import { Dao } from './Dao.js'

const dao = new Dao('talhao', 'TalhaoModel')

export class TalhaoDao {
    constructor() {
        this.db = 'localdb'
    }

    getUrl(clienteModel) {
        if (typeof clienteModel == 'object') {
            if (clienteModel.constructor.name == 'ClienteModel') {
                if (!isNaN(clienteModel.getId())) {
                    return `/${this.db}/cliente/${clienteModel.getId()}/talhao/`
                }
            }
        }
        return null
    }

    insert(clienteModel, model) {
        if (typeof model == 'object') {
            if (model.constructor.name == 'TalhaoModel') {
                model.setClienteId(clienteModel)
            }
        }
        return dao.insert(this.getUrl(clienteModel), model)
    }

    select(clienteModel, id) {
        return new Promise((resolve, reject) => {
            return dao.select(this.getUrl(clienteModel), id).then(e => {
                if (Array.isArray(e)) {
                    resolve(e.map(i => new TalhaoModel(i)))
                }
                else {
                    resolve(new TalhaoModel(e))
                }
            }).catch(() => {
                reject(null)
            })
        })
    }

    update(clienteModel, model) {
        return dao.update(this.getUrl(clienteModel), model)
    }

    delete(clienteModel, model) {
        return dao.delete(this.getUrl(clienteModel), model)
    }
}