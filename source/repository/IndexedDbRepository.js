import { IndexedDbTablesRepository } from './IndexedDbTablesRepository.js'
import { IndexedDbExeption } from '../exceptions/IndexedDbExeption.js'

export class IndexedDbRepository extends IndexedDbTablesRepository {
    constructor(alerts = true) {
        super()
        this.exeption = new IndexedDbExeption(alerts)
        this.suport = true
        this.opened = false
        this.database = undefined
        this.transaction = undefined

        if (window.indexedDB) {
            console.log('IndexedDB suportado')
        }
        else {
            console.log(new Error('IndexedDB nao suportado'))
            this.suport = false
            this.exeption.error()
        }
    }

    open() {
        return new Promise((resolve, reject) => {
            if (this.opened) {
                resolve(false)
            }
            else {
                if (this.suport) {
                    this.database = window.indexedDB.open(this.name, this.version)
                    this.database.onerror = () => {
                        this.exeption.openError()
                        reject(false)
                    }
                    this.database.onupgradeneeded = (upgrade) => {
                        this.onUpgrade(upgrade)
                        this.exeption.construct()
                    }
                    this.database.onsuccess = () => {
                        this.exeption.opened()
                        this.opened = true
                        resolve(true)
                    }
                }
                else {
                    this.exeption.noOpen()
                    reject(false)
                }
            }
        })
    }

    close() {
        if (this.opened) {
            this.database.result.close()
            this.opened = false
            this.exeption.close()
            return true
        }
        else {
            return false
        }
    }

    dropDataBase() {
        return new Promise((resolve, reject) => {
            if (window.indexedDB) {
                this.database = window.indexedDB.deleteDatabase(this.name)
                this.database.onerror = () => {
                    this.exeption.errorDeletedDatabase()
                    reject(false)
                }
                this.database.onsuccess = () => {
                    this.exeption.deletedDatabase()
                    this.opened = false
                    resolve(true)
                }
            }
            else {
                this.exeption.error()
                reject(false)
            }
        })
    }

    setTransaction(tables) {
        if (this.opened) {
            if (typeof tables == 'object') {
                if (Array.isArray(tables)) {
                    this.transaction = this.database.result.transaction(tables, "readwrite")
                    this.transaction.onerror = () => {
                        this.exeption.transactionError()
                    }
                    this.transaction.onsuccess = () => {
                        this.transaction = undefined
                        this.exeption.transactionSuccess()
                    }
                    return true
                }
                else {
                    this.exeption.tableError()
                }
            }
            else {
                this.exeption.tableError()
            }
        }
        else {
            this.exeption.isNotOpen()
        }
        return false
    }

    getTransactionComplete() {
        return new Promise((resolve, reject) => {
            if (this.transaction) {
                this.transaction.oncomplete = () => {
                    resolve(true)
                }
                this.transaction.onabort = () => {
                    reject(false)
                }
            }
            else {
                reject(false)
            }
        })
    }

    objectStoreAdd(table, obj) {
        return new Promise((resolve, reject) => {
            if (typeof table == 'string') {
                if (this.transaction) {
                    if (typeof obj == 'object') {
                        let request = this.transaction.objectStore(table).add(obj)
                        request.onerror = () => {
                            this.exeption.insertError()
                            reject(null)
                        }
                        request.onsuccess = () => {
                            this.exeption.insertSuccess()
                            resolve(request.result)
                        }
                    }
                    else {
                        this.exeption.insertNull()
                        reject(null)
                    }
                }
                else {
                    this.exeption.isNotTransaction()
                    reject(null)
                }
            }
            else {
                this.exeption.tableError()
                reject(null)
            }
        })
    }

    objectStoreGet(table, id) {
        return new Promise((resolve, reject) => {
            if (typeof table == 'string') {
                if (this.transaction) {
                    id = parseInt(id)
                    if (!isNaN(id)) {
                        let request = this.transaction.objectStore(table).get(id)
                        request.onerror = () => {
                            this.exeption.selectError()
                            reject(null)
                        }
                        request.onsuccess = () => {
                            if (request.result) {
                                this.exeption.selectSuccess()
                                resolve(request.result)
                            }
                            else {
                                this.exeption.selectNone()
                                reject(null)
                            }
                        }
                    }
                    else {
                        this.exeption.idNone()
                        reject(null)
                    }
                }
                else {
                    this.exeption.isNotTransaction()
                    reject(null)
                }
            }
            else {
                this.exeption.tableError()
                reject(null)
            }
        })
    }

    objectStoreCursor(table) {
        return new Promise((resolve, reject) => {
            let r = new Array()
            if (typeof table == 'string') {
                if (this.transaction) {
                    let request = this.transaction.objectStore(table).openCursor()
                    request.onerror = () => {
                        this.exeption.selectError()
                        reject(r)
                    }
                    request.onsuccess = () => {
                        if (request.result) {
                            r.push(request.result.value)
                            request.result.continue()
                        }
                        else {
                            if (r.length > 0) {
                                this.exeption.selectSuccess()
                                resolve(r)
                            }
                            else {
                                this.exeption.selectNone()
                                resolve(r)
                            }
                        }
                    }
                }
                else {
                    this.exeption.isNotTransaction()
                    reject(r)
                }
            }
            else {
                this.exeption.tableError()
                reject(r)
            }
        })
    }

    objectStoreIndex(table, column, value) {
        return new Promise((resolve, reject) => {
            let r = new Array()
            if (typeof table == 'string' && typeof column == 'string') {
                if (this.transaction) {
                    let request
                    try {
                        request = this.transaction.objectStore(table).index(column).openCursor(value)
                    }
                    catch {
                        this.exeption.selectError()
                        reject(r)
                    }
                    request.onerror = () => {
                        this.exeption.selectError()
                        reject(r)
                    }
                    request.onsuccess = () => {
                        if (request.result) {
                            r.push(request.result.value)
                            request.result.continue()
                        }
                        else {
                            if (r.length > 0) {
                                this.exeption.selectSuccess()
                                resolve(r)
                            }
                            else {
                                this.exeption.selectNone()
                                resolve(r)
                            }
                        }
                    }
                }
                else {
                    this.exeption.isNotTransaction()
                    reject(r)
                }
            }
            else {
                this.exeption.tableError()
                reject(r)
            }
        })
    }

    objectStoreDelete(table, id) {
        return new Promise((resolve, reject) => {
            if (typeof table == 'string') {
                if (this.transaction) {
                    id = parseInt(id)
                    if (!isNaN(id)) {
                        let request = this.transaction.objectStore(table).delete(id)
                        request.onerror = () => {
                            this.exeption.deleteError()
                            resolve(false)
                        }
                        request.onsuccess = () => {
                            this.exeption.deleteSuccess()
                            resolve(true)
                        }
                    }
                    else {
                        this.exeption.idNone()
                        reject(null)
                    }
                }
                else {
                    this.exeption.isNotTransaction()
                    reject(null)
                }
            }
            else {
                this.exeption.tableError()
                reject(null)
            }
        })
    }

    objectStorePut(table, obj) {
        return new Promise((resolve, reject) => {
            if (typeof table == 'string') {
                if (this.transaction) {
                    if (typeof obj == 'object') {
                        let request = this.transaction.objectStore(table).put(obj)
                        request.onerror = () => {
                            this.exeption.updateError()
                            reject(false)
                        }
                        request.onsuccess = () => {
                            this.exeption.updateSuccess()
                            resolve(request.result)
                        }
                    }
                    else {
                        this.exeption.updateNull()
                        reject(false)
                    }
                }
                else {
                    this.exeption.isNotTransaction()
                    reject(false)
                }
            }
            else {
                this.exeption.tableError()
                reject(false)
            }
        })
    }

    objectStoreEmpty(table) {
        return new Promise((resolve, reject) => {
            if (typeof table == 'string') {
                if (this.transaction) {
                    let request = this.transaction.objectStore(table).openCursor()
                    request.onerror = () => {
                        this.exeption.selectError()
                        reject(null)
                    }
                    request.onsuccess = () => {
                        if (request.result) {
                            resolve(false)
                        }
                        else {
                            resolve(true)
                        }
                    }
                }
                else {
                    this.exeption.isNotTransaction()
                    reject(null)
                }
            }
            else {
                this.exeption.tableError()
                reject(null)
            }
        })
    }

    objectStoreIndexEmpty(table, column, value) {
        return new Promise((resolve, reject) => {
            if (typeof table == 'string' && typeof column == 'string') {
                if (this.transaction) {
                    let request
                    try {
                        request = this.transaction.objectStore(table).index(column).openCursor(value)
                    }
                    catch {
                        this.exeption.selectError()
                        reject(null)
                    }
                    request.onerror = () => {
                        this.exeption.selectError()
                        reject(false)
                    }
                    request.onsuccess = () => {
                        if (request.result) {
                            resolve(false)
                        }
                        else {
                            resolve(true)
                        }
                    }
                }
                else {
                    this.exeption.isNotTransaction()
                    reject(null)
                }
            }
            else {
                this.exeption.tableError()
                reject(null)
            }
        })
    }

    defaultInsert(table, model, modelName = 'Object') {
        return new Promise((resolve, reject) => {
            if (typeof modelName == 'string') {
                if (typeof model == 'object') {
                    if (model.constructor.name == modelName) {
                        this.open().then(() => {
                            this.setTransaction([table])
                            let obj = undefined
                            if (modelName == 'Object') {
                                obj = model
                            }
                            else {
                                obj = model.toString()
                            }
                            this.objectStoreAdd(table, obj).then(e => {
                                resolve(e)
                            }).catch(e => {
                                reject(e)
                            })
                            this.close()
                        }).catch(() => {
                            reject(null)
                        })
                    }
                    else {
                        this.exeption.insertNull()
                        reject(null)
                    }
                }
                else {
                    this.exeption.insertNull()
                    reject(null)
                }
            }
            else {
                reject(null)
            }
        })
    }

    defaultSelectGet(table, id) {
        return new Promise((resolve, reject) => {
            this.open().then(() => {
                this.setTransaction([table])
                this.objectStoreGet(table, id).then(e => {
                    resolve(e)
                }).catch(e => {
                    reject(e)
                })
                this.close()
            }).catch(() => {
                reject(null)
            })
        })
    }

    defaultSelectCursor(table) {
        return new Promise((resolve, reject) => {
            this.open().then(() => {
                this.setTransaction([table])
                this.objectStoreCursor(table).then(e => {
                    resolve(e)
                }).catch(e => {
                    reject(e)
                })
                this.close()
            }).catch(() => {
                reject(new Array())
            })
        })
    }

    defaultSelectStoreIndex(table, column, model, modelName) {
        return new Promise((resolve, reject) => {
            if (typeof model == 'object') {
                if (model.constructor.name == modelName) {
                    if (!isNaN(model.getId())) {
                        this.open().then(() => {
                            this.setTransaction([table])
                            this.objectStoreIndex(table, column, model.getId()).then(e => {
                                resolve(e)
                            }).catch(e => {
                                reject(e)
                            })
                            this.close()
                        }).catch(() => {
                            reject(new Array())
                        })
                    }
                    else {
                        this.exeption.idNone()
                        reject(new Array())
                    }
                }
                else {
                    reject(new Array())
                }
            }
            else {
                reject(new Array())
            }
        })
    }

    defaultDelete(table, id) {
        return new Promise((resolve, reject) => {
            if (typeof id == 'number') {
                this.open().then(() => {
                    this.setTransaction([table])
                    this.objectStoreDelete(table, id).then(e => {
                        resolve(e)
                    }).catch(e => {
                        reject(e)
                    })
                    this.close()
                }).catch(() => {
                    reject(false)
                })
            }
            else {
                this.exeption.idNone()
                reject(false)
            }
        })
    }

    defaultPut(table, model, modelName) {
        return new Promise((resolve, reject) => {
            if (typeof modelName == 'string') {
                if (typeof model == 'object') {
                    if (model.constructor.name == modelName) {
                        this.open().then(() => {
                            this.setTransaction([table])
                            this.objectStorePut(table, model.toString()).then(e => {
                                resolve(e)
                            }).catch(e => {
                                reject(e)
                            })
                            this.close()
                        }).catch(() => {
                            reject(false)
                        })
                    }
                    else {
                        this.exeption.updateNull()
                        reject(false)
                    }
                }
                else {
                    this.exeption.updateNull()
                    reject(false)
                }
            }
            else {
                reject(false)
            }
        })
    }

    defaultStoreEmpty(table) {
        return new Promise((resolve, reject) => {
            this.open().then(() => {
                this.setTransaction([table])
                this.objectStoreEmpty(table).then(e => {
                    resolve(e)
                }).catch(e => {
                    reject(e)
                })
                this.close()
            }).catch(() => {
                reject(null)
            })
        })
    }

    defaultStoreIndexEmpty(table, column, model, modelName) {
        return new Promise((resolve, reject) => {
            if (typeof model == 'object') {
                if (model.constructor.name == modelName) {
                    if (!isNaN(model.getId())) {
                        this.open().then(() => {
                            this.setTransaction([table])
                            this.objectStoreIndexEmpty(table, column, model.getId()).then(e => {
                                resolve(e)
                            }).catch(e => {
                                reject(e)
                            })
                            this.close()
                        }).catch(() => {
                            reject(null)
                        })
                    }
                    else {
                        this.exeption.idNone()
                        reject(null)
                    }
                }
                else {
                    reject(null)
                }
            }
            else {
                reject(null)
            }
        })
    }
}