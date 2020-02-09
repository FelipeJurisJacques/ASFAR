import { AnaliseSoloModel } from '../models/AnaliseSoloModel.js'
import { Dao } from './Dao.js'

const dao = new Dao('analiseSolo', 'AnaliseSoloModel')

export class AnaliseSoloDao {
    constructor() {
        this.db = 'localdb'
    }

    getUrl(clienteModel, talhaoModel) {
        if (
            typeof clienteModel == 'object' &&
            typeof talhaoModel == 'object'
        ) {
            if (
                clienteModel.constructor.name == 'ClienteModel' &&
                talhaoModel.constructor.name == 'TalhaoModel'
            ) {
                if (
                    !isNaN(clienteModel.getId()) &&
                    !isNaN(talhaoModel.getId())
                ) {
                    return `/${this.db}/cliente/${clienteModel.getId()}/talhao/${talhaoModel.getId()}/analiseSolo/`
                }
            }
        }
        return null
    }

    insert(clienteModel, talhaoModel, model) {
        if (typeof model == 'object') {
            if (model.constructor.name == 'AnaliseSoloModel') {
                model.setTalhaoId(talhaoModel)
            }
        }
        return dao.insert(this.getUrl(clienteModel, talhaoModel), model)
    }

    select(clienteModel, talhaoModel, id) {
        return new Promise((resolve, reject) => {
            return dao.select(this.getUrl(clienteModel, talhaoModel), id).then(e => {
                if (Array.isArray(e)) {
                    resolve(e.map(i => new AnaliseSoloModel(i)))
                }
                else {
                    resolve(new AnaliseSoloModel(e))
                }
            }).catch(() => {
                reject(null)
            })
        })
    }

    update(clienteModel, talhaoModel, model) {
        return dao.update(this.getUrl(clienteModel, talhaoModel), model)
    }

    delete(clienteModel, talhaoModel, model) {
        return dao.delete(this.getUrl(clienteModel, talhaoModel), model)
    }
}