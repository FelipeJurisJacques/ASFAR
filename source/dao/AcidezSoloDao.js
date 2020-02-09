import { AcidezSoloModel } from '../models/AcidezSoloModel.js'
import { Dao } from './Dao.js'

const dao = new Dao('acidezSolo', 'AcidezSoloModel')

export class AcidezSoloDao {
    constructor() {
        this.db = 'localdb'
    }

    getUrl(configuracaoModel) {
        if (typeof configuracaoModel == 'object') {
            if (configuracaoModel.constructor.name == 'ConfiguracaoModel') {
                if (!isNaN(configuracaoModel.getId())) {
                    return `/${this.db}/configuracao/${configuracaoModel.getId()}/acidezSolo/`
                }
            }
        }
        return null
    }

    insert(configuracaoModel, model) {
        if (typeof model == 'object') {
            if (model.constructor.name == 'AcidezSoloModel') {
                model.setConfiguracaoId(configuracaoModel)
            }
        }
        return dao.insert(this.getUrl(configuracaoModel), model)
    }

    select(configuracaoModel, id) {
        return new Promise((resolve, reject) => {
            return dao.select(this.getUrl(configuracaoModel), id).then(e => {
                if (Array.isArray(e)) {
                    resolve(e.map(i => new AcidezSoloModel(i)))
                }
                else {
                    resolve(new AcidezSoloModel(e))
                }
            }).catch(() => {
                reject(null)
            })
        })
    }

    update(configuracaoModel, model) {
        return dao.update(this.getUrl(configuracaoModel), model)
    }

    delete(configuracaoModel, model) {
        return dao.delete(this.getUrl(configuracaoModel), model)
    }
}