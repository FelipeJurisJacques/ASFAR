import { RequestResource } from '../resource/RequestResource.js'
import { AlertsSyncClass } from '../../script/class/AlertsSyncClass.js'

const request = new RequestResource()
const alert = new AlertsSyncClass()

export class ProjetoDao {
    constructor() {
        this.db = 'localdb'
    }

    insert(obj) {
        return new Promise((resolve, reject) => {
            request.POST(`/${this.db}/`, obj).then(() => {
                alert.add('Banco de dados', `novo projeto inserido`, 2, 3, 3000)
                resolve(true)
            }).catch(() => {
                alert.add('Banco de dados', `erro na insersão do projeto`, 3, 3, 3000)
                reject(false)
            })
        })
    }

    select() {
        return request.GET(`/${this.db}/`)
    }

    update(obj) {
        return new Promise((resolve, reject) => {
            request.PUT(`/${this.db}/`, obj).then(() => {
                resolve(true)
            }).catch(() => {
                reject(false)
            })
        })
    }

    delete() {
        return new Promise((resolve, reject) => {
            request.DELETE(`/${this.db}/`).then(() => {
                alert.add('Banco de dados', `novo projeto`, 2, 3, 3000)
                resolve(true)
            }).catch(() => {
                alert.add('Banco de dados', `não foi possível apagar o banco de dados atual`, 3, 3, 3000)
                reject(false)
            })
        })
    }

    ConvertToBinaryTree(dbtables) {
        this.database = new Object()
        return new Promise((resolve, reject) => {
            const tables = this._ConvertToBinaryTreePart1(dbtables)
            if (tables.length > 0) {
                const database = new IndexedDbRepository()
                database.open().then(() => {
                    database.setTransaction(tables)
                    this._ConvertToBinaryTreePart2(database, dbtables).then(e => {
                        resolve(e)
                    }).catch(() => {
                        reject(null)
                    })
                }).catch(() => {
                    reject(null)
                })
            }
            else {
                reject(null)
            }
        })
    }

    _ConvertToBinaryTreePart1(child) {
        let r = new Array()
        if (Array.isArray(child)) {
            child.forEach(e => {
                if (e.table) {
                    r.push(e.table)
                    if (e.child) {
                        this._ConvertToBinaryTreePart1(e.child).forEach(i => {
                            r.push(i)
                        })
                    }
                }
            })
        }
        return r
    }

    _ConvertToBinaryTreePart2(database, tables) {
        return new Promise((resolve, reject) => {
            let binaryTree = new Object()
            if (Array.isArray(tables)) {
                if (tables.length > 0) {
                    let length = 0
                    tables.forEach(e => {
                        if (e.table) {
                            database.objectStoreCursor(e.table).then((i) => {
                                if (e.child) {
                                    this._ConvertToBinaryTreePart3(database, e.child, i).then(j => {
                                        binaryTree[e.table] = j
                                        length += 1
                                        if (length >= tables.length) {
                                            resolve(binaryTree)
                                        }
                                    }).catch(() => {
                                        i.forEach(j => {
                                            j.id = undefined
                                        })
                                        binaryTree[e.table] = i
                                        length += 1
                                        if (length >= tables.length) {
                                            resolve(binaryTree)
                                        }
                                    })
                                }
                                else {
                                    i.forEach(j => {
                                        j.id = undefined
                                    })
                                    binaryTree[e.table] = i
                                    length += 1
                                    if (length >= tables.length) {
                                        resolve(binaryTree)
                                    }
                                }
                            }).catch(() => {
                                length += 1
                                if (length >= tables.length) {
                                    resolve(binaryTree)
                                }
                            })
                        }
                    })
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

    _ConvertToBinaryTreePart3(database, child, obj) {
        return new Promise((resolve, reject) => {
            if (Array.isArray(child) && Array.isArray(obj)) {
                if (child.length > 0) {
                    let length = 0
                    child.forEach(e => {
                        if (e.table && e.index) {
                            if (obj.length > 0) {
                                for (let i = 0; i < obj.length; i++) {
                                    database.objectStoreIndex(e.table, e.index, obj[i].id).then(j => {
                                        obj[i].id = undefined
                                        if (e.child) {
                                            this._ConvertToBinaryTreePart3(database, e.child, j).then(k => {
                                                k.forEach(l => {
                                                    l[e.index] = undefined
                                                })
                                                obj[i][e.table] = k
                                                length += 1
                                                if (length >= child.length) {
                                                    resolve(obj)
                                                }
                                            }).catch(() => {
                                                j.forEach(k => {
                                                    k.id = undefined
                                                    k[e.index] = undefined
                                                })
                                                obj[i][e.table] = j
                                                length += 1
                                                if (length >= child.length) {
                                                    resolve(obj)
                                                }
                                            })
                                        }
                                        else {
                                            j.forEach(k => {
                                                k.id = undefined
                                                k[e.index] = undefined
                                            })
                                            obj[i][e.table] = j
                                            length += 1
                                            if (length >= child.length) {
                                                resolve(obj)
                                            }
                                        }
                                    }).catch(() => {
                                        obj[i].id = undefined
                                        length += 1
                                        if (length >= child.length) {
                                            resolve(obj)
                                        }
                                    })
                                }
                            }
                            else {
                                length += 1
                                if (length >= child.length) {
                                    resolve(obj)
                                }
                            }
                        }
                        else {
                            length += 1
                            if (length >= child.length) {
                                resolve(obj)
                            }
                        }
                    })
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