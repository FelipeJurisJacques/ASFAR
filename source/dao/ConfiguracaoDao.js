import { ConfiguracaoModel } from '../models/ConfiguracaoModel.js'
import { Dao } from './Dao.js'

const dao = new Dao('configuracao', 'ConfiguracaoModel')

export class ConfiguracaoDao {
    constructor() {
        this.db = 'localdb'
    }

    getUrl() {
        return `/${this.db}/configuracao/`
    }

    insert(model) {
        return dao.insert(this.getUrl(), model)
    }

    select(id) {
        return new Promise((resolve, reject) => {
            return dao.select(this.getUrl(), id).then(e => {
                if (Array.isArray(e)) {
                    resolve(e.map(i => new ConfiguracaoModel(i)))
                }
                else {
                    resolve(new ConfiguracaoModel(e))
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