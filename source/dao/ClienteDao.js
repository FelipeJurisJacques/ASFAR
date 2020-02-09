import { ClienteModel } from '../models/ClienteModel.js'
import { Dao } from './Dao.js'

const dao = new Dao('cliente', 'ClienteModel')

export class ClienteDao {
    constructor() {
        this.db = 'localdb'
    }

    getUrl() {
        return `/${this.db}/cliente/`
    }

    insert(model) {
        return dao.insert(this.getUrl(), model)
    }

    select(id) {
        return new Promise((resolve, reject) => {
            return dao.select(this.getUrl(), id).then(e => {
                if (Array.isArray(e)) {
                    resolve(e.map(i => new ClienteModel(i)))
                }
                else {
                    resolve(new ClienteModel(e))
                }
            }).catch(() => {
                reject(null)
            })
        })
    }

    update(model) {
        return dao.update(this.getUrl(), model)
    }

    delete(model) {
        return dao.delete(this.getUrl(), model)
    }
}