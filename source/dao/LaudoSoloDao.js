
import { LaudoSoloModel } from '../models/LaudoSoloModel.js'
import { Dao } from './Dao.js'

const dao = new Dao('laudoSolo', 'LaudoSoloModel')

export class LaudoSoloDao {
    constructor() {
        this.db = 'localdb'
        this.table = 'laudoSolo'
        this.column = 'analiseSoloId'
        this.modelName = 'LaudoSoloModel'
    }

    getUrl(clienteModel, talhaoModel, analiseSoloModel) {
        if (
            typeof clienteModel == 'object' &&
            typeof talhaoModel == 'object' &&
            typeof analiseSoloModel == 'object'
        ) {
            if (
                clienteModel.constructor.name == 'ClienteModel' &&
                talhaoModel.constructor.name == 'TalhaoModel' &&
                analiseSoloModel.constructor.name == 'AnaliseSoloModel'
            ) {
                if (
                    !isNaN(clienteModel.getId()) &&
                    !isNaN(talhaoModel.getId()) &&
                    !isNaN(analiseSoloModel.getId())
                ) {
                    return `/${this.db}/cliente/${clienteModel.getId()}/talhao/${talhaoModel.getId()}/analiseSolo/${analiseSoloModel.getId()}/laudoSolo/`
                }
            }
        }
        return null
    }

    insert(clienteModel, talhaoModel, analiseSoloModel, model) {
        if (typeof model == 'object') {
            if (model.constructor.name == 'LaudoSoloModel') {
                model.setAnaliseSoloId(analiseSoloModel)
            }
        }
        return dao.insert(this.getUrl(clienteModel, talhaoModel, analiseSoloModel), model)
    }

    select(clienteModel, talhaoModel, analiseSoloModel, id) {
        return new Promise((resolve, reject) => {
            return dao.select(this.getUrl(clienteModel, talhaoModel, analiseSoloModel), id).then(e => {
                if (Array.isArray(e)) {
                    resolve(e.map(i => new LaudoSoloModel(i)))
                }
                else {
                    resolve(new LaudoSoloModel(e))
                }
            }).catch(() => {
                reject(null)
            })
        })
    }

    update(clienteModel, talhaoModel, analiseSoloModel, model) {
        return dao.update(this.getUrl(clienteModel, talhaoModel, analiseSoloModel), model)
    }

    delete(clienteModel, talhaoModel, analiseSoloModel, model) {
        return dao.delete(this.getUrl(clienteModel, talhaoModel, analiseSoloModel), model)
    }
}