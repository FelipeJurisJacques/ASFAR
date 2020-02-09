import { RequestResource } from '../resource/RequestResource.js'
import { AlertsSyncClass } from '../../script/class/AlertsSyncClass.js'

const request = new RequestResource()
const alert = new AlertsSyncClass()

export class Dao {
    constructor(node, modelName) {
        this.node = ''
        this.modelName = ''
        if (typeof node == 'string') {
            this.node = node
        }
        if (typeof modelName == 'string') {
            this.modelName = modelName
        }
    }

    insert(url, model) {
        return new Promise((resolve, reject) => {
            if (url != null) {
                if (typeof model == 'object') {
                    if (model.constructor.name == this.modelName) {
                        const data = model.toString()
                        if (data) {
                            request.POST(url, data).then(e => {
                                alert.add('Banco de dados', `${this.node} adicionado com sucesso`, 1, 3, 3000)
                                resolve(e)
                            }).catch(() => {
                                alert.add('Banco de dados', `não foi possível adicionar ${this.node}`, 3, 3, 3000)
                                reject(null)
                            })
                        }
                        else {
                            alert.add('Banco de dados', `não foi possível adicionar ${this.node}`, 3, 3, 3000)
                            reject(null)
                        }
                    }
                    else {
                        console.log(new Error('model is not defined'))
                        reject(null)
                    }
                }
                else {
                    console.log(new Error('model is not defined'))
                    reject(null)
                }
            }
            else {
                console.log(new Error('all models is not defined'))
                reject(null)
            }
        })
    }


    select(url, id) {
        return new Promise((resolve, reject) => {
            if (url != null) {
                if (!isNaN(id)) {
                    request.GET(`${url}${id}`).then(e => {
                        resolve(e)
                    }).catch(() => {
                        alert.add('Banco de dados', `nenhum ${this.node} retornado`, 3, 3, 3000)
                        reject(null)
                    })
                }
                else {
                    request.GET(url).then(e => {
                        resolve(e)
                    }).catch(() => {
                        alert.add('Banco de dados', `nenhum ${this.node} retornado`, 2, 3, 3000)
                        reject(null)
                    })
                }
            }
            else {
                console.log(new Error('all models is not defined'))
                reject(null)
            }
        })
    }

    update(url, model) {
        return new Promise((resolve, reject) => {
            if (url != null) {
                if (typeof model == 'object') {
                    if (model.constructor.name == this.modelName) {
                        request.PUT(`${url}${model.getId()}`, model.toString()).then(() => {
                            alert.add('Banco de dados', `${this.node} atualizado com sucesso`, 1, 3, 3000)
                            resolve(true)
                        }).catch(() => {
                            alert.add('Banco de dados', `não foi possível atualizar ${this.node}`, 3, 3, 3000)
                            reject(false)
                        })
                    }
                    else {
                        console.log(new Error('model is not defined'))
                        reject(false)
                    }
                }
                else {
                    console.log(new Error('model is not defined'))
                    reject(false)
                }
            }
            else {
                console.log(new Error('all models is not defined'))
                reject(false)
            }
        })
    }

    delete(url, model) {
        return new Promise((resolve, reject) => {
            if (url != null) {
                if (typeof model == 'object') {
                    if (model.constructor.name == this.modelName) {
                        if (!isNaN(model.getId())) {
                            request.DELETE(`${url}${model.getId()}`).then(() => {
                                alert.add('Banco de dados', `${this.node} eliminado`, 1, 3, 3000)
                                resolve(true)
                            }).catch(() => {
                                alert.add('Banco de dados', `exclusão de ${this.node} recusada. Verifique se não há dados relacionados e essa informação.`, 3, 3, 3000)
                                reject(false)
                            })
                        }
                        else {
                            console.log(new Error('id is not defined'))
                            reject(false)
                        }
                    }
                    else {
                        console.log(new Error('model is not defined'))
                        reject(false)
                    }
                }
                else {
                    console.log(new Error('model is not defined'))
                    reject(false)
                }
            }
            else {
                console.log(new Error('all models is not defined'))
                reject(false)
            }
        })
    }
}