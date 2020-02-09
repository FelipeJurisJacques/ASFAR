class RequestRestFull {
    constructor(request, dbName) {
        this.request = undefined
        this.node = undefined
        this.id = NaN
        this.parentNode = undefined
        this.parentId = NaN
        this.method = request.method
        this.body = null
        this.is = false
        if (typeof request == 'object' && typeof dbName == 'string') {
            this.request = request
            if (this.request.url) {
                const requestURL = new URL(this.request.url)
                const path = requestURL.pathname
                if (path.search(dbName) != -1) {
                    this.is = true
                    let url = new Array()
                    path.split('/').forEach(e => {
                        if (e) {
                            url.push(e)
                        }
                    })
                    const i = url.length
                    if (i >= 2) {
                        this.id = parseInt(url[i - 1])
                        if (!isNaN(this.id)) {
                            this.node = url[i - 2]
                            if (i >= 4) {
                                this.parentId = parseInt(url[i - 3])
                                this.parentNode = url[i - 4]
                            }
                        }
                        else {
                            this.node = url[i - 1]
                            if (i >= 3) {
                                this.parentId = parseInt(url[i - 2])
                                this.parentNode = url[i - 3]
                            }
                        }
                    }
                }
            }
        }
    }

    get json() {
        return new Promise((resolve, reject) => {
            if (this.request) {
                try {
                    this.request.json().then(e => {
                        this.body = e
                        resolve(e)
                    }).catch(e => {
                        this.body = e
                        reject(e)
                    })
                }
                catch (e) {
                    this.body = e
                    reject(e)
                }
            }
            else {
                reject(new Error('request is not defined'))
            }
        })
    }
}

class ResponseRestFull {
    constructor(input = 'json') {
        this.input = input
        this.headers = new Object()
        if (this.input == 'json') {
            this.headers['content-type'] = 'application/json; charset=UTF-8'
        }
        else {
            this.input = 'text'
            this.headers['content-type'] = 'text/html; charset=utf-8'
        }
    }

    send(body, status = NaN, statusText = '') {
        let r = `"respose": "no have response"`
        if (isNaN(status)) {
            status = 404
            statusText = 'Not Found'
        }
        if (typeof statusText != 'string') {
            statusText = ''
        }
        if (this.input == 'json') {
            try {
                r = JSON.stringify(body)
            } catch (error) {
                r = `"respose": "JSON stringify error"`
            }
        }
        /*console.log({
            body: r,
            headers: this.headers,
            status: status,
            statusText: statusText
        })*/
        return new Response(r, {
            headers: this.headers,
            status: status,
            statusText: statusText
        })
    }
}

class IndexedDbTablesRepository {
    constructor() {
        this.name = 'ASFAR'
        this.version = 1
    }

    onUpgrade(upgrade) {
        let db = upgrade.target.result
        let objectStore = undefined

        if (!db.objectStoreNames.contains('cliente')) {
            objectStore = db.createObjectStore('cliente', {
                keyPath: "id",
                autoIncrement: true
            })
            objectStore.createIndex("nome", "nome", { unique: false })
        }

        if (!db.objectStoreNames.contains('talhao')) {
            objectStore = db.createObjectStore('talhao', {
                keyPath: "id",
                autoIncrement: true
            })
            objectStore.createIndex("clienteId", "clienteId", { unique: false })
        }

        if (!db.objectStoreNames.contains('analiseSolo')) {
            objectStore = db.createObjectStore('analiseSolo', {
                keyPath: "id",
                autoIncrement: true
            })
            objectStore.createIndex("talhaoId", "talhaoId", { unique: false })
        }

        if (!db.objectStoreNames.contains('laudoSolo')) {
            objectStore = db.createObjectStore('laudoSolo', {
                keyPath: "id",
                autoIncrement: true
            })
            objectStore.createIndex("analiseSoloId", "analiseSoloId", { unique: false })
        }

        if (!db.objectStoreNames.contains('configuracao')) {
            objectStore = db.createObjectStore('configuracao', {
                keyPath: "id",
                autoIncrement: true
            })
        }

        if (!db.objectStoreNames.contains('acidezSolo')) {
            objectStore = db.createObjectStore('acidezSolo', {
                keyPath: "id",
                autoIncrement: true
            })
            objectStore.createIndex("configuracaoId", "configuracaoId", { unique: false })
        }

        if (!db.objectStoreNames.contains('fertilidadeSolo')) {
            objectStore = db.createObjectStore('fertilidadeSolo', {
                keyPath: "id",
                autoIncrement: true
            })
            objectStore.createIndex("configuracaoId", "configuracaoId", { unique: false })
        }
    }
}

class IndexedDbRepository extends IndexedDbTablesRepository {
    constructor() {
        super()
        this.opened = false
        this.database = undefined
        this.transaction = undefined
    }

    get open() {
        return new Promise((resolve, reject) => {
            if (this.opened) {
                resolve(false)
            }
            else {
                if (indexedDB) {
                    this.database = indexedDB.open(this.name, this.version)
                    this.database.onerror = () => {
                        reject(false)
                    }
                    this.database.onupgradeneeded = (upgrade) => {
                        this.onUpgrade(upgrade)
                    }
                    this.database.onsuccess = () => {
                        this.opened = true
                        resolve(true)
                    }
                }
                else {
                    reject(false)
                }
            }
        })
    }

    close() {
        if (this.opened) {
            this.database.result.close()
            this.opened = false
            return true
        }
        return false
    }

    get dropDataBase() {
        return new Promise((resolve, reject) => {
            if (indexedDB) {
                this.database = indexedDB.deleteDatabase(this.name)
                this.database.onerror = () => {
                    reject(false)
                }
                this.database.onsuccess = () => {
                    this.opened = false
                    resolve(true)
                }
            }
            else {
                reject(false)
            }
        })
    }

    set setTransaction(tables) {
        if (this.opened) {
            if (typeof tables == 'object') {
                if (Array.isArray(tables)) {
                    this.transaction = this.database.result.transaction(tables, "readwrite")
                    return true
                }
            }
        }
        return false
    }

    get getTransactionComplete() {
        return new Promise((resolve, reject) => {
            if (this.transaction) {
                this.transaction.onerror = () => {
                    this.transaction = undefined
                    resolve(false)
                }
                this.transaction.oncomplete = () => {
                    this.transaction = undefined
                    resolve(true)
                }
                this.transaction.onabort = () => {
                    this.transaction = undefined
                    resolve(false)
                }
            }
            else {
                resolve(false)
            }
        })
    }

    objectStoreAdd(table, obj) {
        return new Promise((resolve, reject) => {
            if (typeof table == 'string' && typeof obj == 'object') {
                if (this.transaction) {
                    const request = this.transaction.objectStore(table).add(obj)
                    request.onerror = () => {
                        reject(null)
                    }
                    request.onsuccess = () => {
                        resolve(request.result)
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

    objectStoreGet(table, id) {
        return new Promise((resolve, reject) => {
            if (typeof table == 'string' && !isNaN(id)) {
                if (this.transaction) {
                    const request = this.transaction.objectStore(table).get(id)
                    request.onerror = () => {
                        reject(null)
                    }
                    request.onsuccess = () => {
                        if (request.result) {
                            resolve(request.result)
                        }
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

    objectStoreCursor(table) {
        return new Promise((resolve, reject) => {
            let r = new Array()
            if (typeof table == 'string') {
                if (this.transaction) {
                    const request = this.transaction.objectStore(table).openCursor()
                    request.onerror = () => {
                        reject(r)
                    }
                    request.onsuccess = () => {
                        if (request.result) {
                            r.push(request.result.value)
                            request.result.continue()
                        }
                        else {
                            if (r.length > 0) {
                                resolve(r)
                            }
                            else {
                                resolve(r)
                            }
                        }
                    }
                }
                else {
                    reject(r)
                }
            }
            else {
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
                        reject(r)
                    }
                    request.onerror = () => {
                        reject(r)
                    }
                    request.onsuccess = () => {
                        if (request.result) {
                            r.push(request.result.value)
                            request.result.continue()
                        }
                        else {
                            if (r.length > 0) {
                                resolve(r)
                            }
                            else {
                                resolve(r)
                            }
                        }
                    }
                }
                else {
                    reject(r)
                }
            }
            else {
                reject(r)
            }
        })
    }

    objectStorePut(table, obj) {
        return new Promise((resolve, reject) => {
            if (typeof table == 'string' && typeof obj == 'object') {
                if (!isNaN(obj.id)) {
                    if (this.transaction) {
                        const request = this.transaction.objectStore(table).put(obj)
                        request.onerror = () => {
                            reject(false)
                        }
                        request.onsuccess = () => {
                            resolve(true)
                        }
                    }
                    else {
                        reject(false)
                    }
                }
                else {
                    reject(false)
                }
            }
            else {
                reject(false)
            }
        })
    }

    objectStoreDelete(table, id) {
        return new Promise((resolve, reject) => {
            if (typeof table == 'string' && !isNaN(id)) {
                if (this.transaction) {
                    const request = this.transaction.objectStore(table).delete(id)
                    request.onerror = () => {
                        reject(false)
                    }
                    request.onsuccess = () => {
                        resolve(true)
                    }
                }
                else {
                    reject(false)
                }
            }
            else {
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
                    reject(null)
                }
            }
            else {
                reject(null)
            }
        })
    }

    objectStoreIndexEmpty(table, column, parentId) {
        return new Promise((resolve, reject) => {
            if (typeof table == 'string' && typeof column == 'string' && !isNaN(parentId)) {
                if (this.transaction) {
                    const request = this.transaction.objectStore(table).index(column).openCursor(parentId)
                    request.onerror = () => {
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
                    reject(null)
                }
            }
            else {
                reject(null)
            }
        })
    }

    objectStoreHas(table, id) {
        return new Promise((resolve, reject) => {
            if (typeof table == 'string' && !isNaN(id)) {
                if (this.transaction) {
                    const request = this.transaction.objectStore(table).get(id)
                    request.onerror = () => {
                        reject(null)
                    }
                    request.onsuccess = () => {
                        if (request.result) {
                            resolve(true)
                        }
                        resolve(false)
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

class Dao {
    constructor(db, table, column = undefined) {
        this.DataBase = db
        this.table = table
        this.column = column
        this.response = new ResponseRestFull()
    }

    insert(rest) {
        return new Promise((resolve, reject) => {
            rest.json.then(json => {
                this.DataBase.open.then(() => {
                    this.DataBase.setTransaction = [this.table]
                    this.DataBase.objectStoreAdd(this.table, json).then(e => {
                        this.DataBase.close()
                        resolve(this.response.send(e, 201))
                    }).catch(e => {
                        this.DataBase.close()
                        reject(this.response.send(e, 406))
                    })
                }).catch(() => {
                    this.DataBase.close()
                    reject(this.response.send({ 'respose': 'Internal DataBase Error' }, 500))
                })
            }).catch(() => {
                reject(this.response.send({ 'respose': 'json not received' }, 403))
            })
        })
    }

    select(rest) {
        return new Promise((resolve, reject) => {
            this.DataBase.open.then(() => {
                this.DataBase.setTransaction = [this.table]
                if (isNaN(rest.id)) {
                    this.DataBase.objectStoreCursor(this.table).then(e => {
                        if (e.length > 0) {
                            this.DataBase.close()
                            resolve(this.response.send(e, 200))
                        }
                        else {
                            this.DataBase.close()
                            resolve(this.response.send(e, 204))
                        }
                    }).catch(e => {
                        this.DataBase.close()
                        reject(this.response.send(e, 404))
                    })
                }
                else {
                    this.DataBase.objectStoreGet(this.table, rest.id).then(e => {
                        this.DataBase.close()
                        resolve(this.response.send(e, 200))
                    }).catch(e => {
                        this.DataBase.close()
                        reject(this.response.send(e, 404))
                    })
                }
            }).catch(() => {
                this.DataBase.close()
                reject(this.response.send({ 'respose': 'Internal DataBase Error' }, 500))
            })
        })
    }

    selectIndex(rest) {
        return new Promise((resolve, reject) => {
            this.DataBase.open.then(() => {
                this.DataBase.setTransaction = [this.table]
                if (isNaN(rest.id) && !isNaN(rest.parentId)) {
                    this.DataBase.objectStoreIndex(this.table, this.column, rest.parentId).then(e => {
                        if (e.length > 0) {
                            this.DataBase.close()
                            resolve(this.response.send(e, 200))
                        }
                        else {
                            this.DataBase.close()
                            resolve(this.response.send(e, 204))
                        }
                    }).catch(e => {
                        this.DataBase.close()
                        reject(this.response.send(e, 404))
                    })
                }
                else {
                    this.DataBase.objectStoreGet(this.table, rest.id).then(e => {
                        this.DataBase.close()
                        resolve(this.response.send(e, 200))
                    }).catch(e => {
                        this.DataBase.close()
                        reject(this.response.send(e, 404))
                    })
                }
            }).catch(() => {
                this.DataBase.close()
                reject(this.response.send({ 'respose': 'Internal DataBase Error' }, 500))
            })
        })
    }

    update(rest) {
        return new Promise((resolve, reject) => {
            rest.json.then(json => {
                this.DataBase.open.then(() => {
                    json.id = rest.id
                    this.DataBase.setTransaction = [this.table]
                    this.DataBase.objectStorePut(this.table, json).then(e => {
                        this.DataBase.close()
                        resolve(this.response.send(e, 201))
                    }).catch(e => {
                        this.DataBase.close()
                        reject(this.response.send(e, 500))
                    })
                }).catch(() => {
                    this.DataBase.close()
                    reject(this.response.send({ 'respose': 'Internal DataBase Error' }, 500))
                })
            }).catch(() => {
                reject(this.response.send({ 'respose': 'json not received' }, 403))
            })
        })
    }

    //deleta
    delete(rest) {
        return new Promise((resolve, reject) => {
            this.DataBase.open.then(() => {
                this.DataBase.setTransaction = [this.table]
                this.DataBase.objectStoreDelete(this.table, rest.id).then(() => {
                    this.DataBase.close()
                    resolve(this.response.send('', 202))
                }).catch(() => {
                    this.DataBase.close()
                    reject(this.response.send('', 400))
                })
            }).catch(() => {
                this.DataBase.close()
                reject(this.response.send({ 'respose': 'Internal DataBase Error' }, 500))
            })
        })
    }

    //deleta se nao houver filhos
    delete2(rest, childTable, childTableColumn) {
        return new Promise((resolve, reject) => {
            this.DataBase.open.then(() => {
                this.DataBase.setTransaction = [childTable, this.table]
                this.DataBase.objectStoreIndexEmpty(childTable, childTableColumn, rest.id).then(e => {
                    if (e) {
                        this.DataBase.objectStoreDelete(this.table, rest.id).then(() => {
                            this.DataBase.close()
                            resolve(this.response.send('', 202))
                        }).catch(() => {
                            this.DataBase.close()
                            reject(this.response.send('', 400))
                        })
                    }
                    else {
                        this.DataBase.close()
                        reject(this.response.send('', 403))
                    }
                }).catch(() => {
                    this.DataBase.close()
                    reject(this.response.send('', 400))
                })
            }).catch(() => {
                this.DataBase.close()
                reject(this.response.send({ 'respose': 'Internal DataBase Error' }, 500))
            })
        })
    }
}

class Resource {
    response(rest) {
        if (rest.method == 'POST') {
            return this.POST(rest)
        }
        else if (rest.method == 'PUT') {
            return this.PUT(rest)
        }
        else if (rest.method == 'DELETE') {
            return this.DELETE(rest)
        }
        else {
            return this.GET(rest)
        }
    }
}

class ConfiguracaoResource extends Resource {
    constructor(db) {
        super()
        this.dao = new Dao(db, 'configuracao')
    }

    GET(rest) {
        return this.dao.select(rest)
    }

    POST(rest) {
        return this.dao.insert(rest)
    }

    PUT(rest) {
        return this.dao.update(rest)
    }

    DELETE(rest) {
        return this.dao.delete2(rest, 'acidezSolo', 'configuracaoId')
    }
}

class AcidezSoloResource extends Resource {
    constructor(db) {
        super()
        this.dao = new Dao(db, 'acidezSolo', 'configuracaoId')
    }

    GET(rest) {
        return this.dao.selectIndex(rest)
    }

    POST(rest) {
        return this.dao.insert(rest)
    }

    PUT(rest) {
        return this.dao.update(rest)
    }

    DELETE(rest) {
        return this.dao.delete(rest)
    }
}

class ClienteResource extends Resource {
    constructor(db) {
        super()
        this.dao = new Dao(db, 'cliente')
    }

    GET(rest) {
        return this.dao.select(rest)
    }

    POST(rest) {
        return this.dao.insert(rest)
    }

    PUT(rest) {
        return this.dao.update(rest)
    }

    DELETE(rest) {
        return this.dao.delete2(rest, 'talhao', 'clienteId')
    }
}

class TalhaoResource extends Resource {
    constructor(db) {
        super()
        this.dao = new Dao(db, 'talhao', 'clienteId')
    }

    GET(rest) {
        return this.dao.selectIndex(rest)
    }

    POST(rest) {
        return this.dao.insert(rest)
    }

    PUT(rest) {
        return this.dao.update(rest)
    }

    DELETE(rest) {
        return this.dao.delete2(rest, 'analiseSolo', 'talhaoId')
    }
}

class AnaliseSoloResource extends Resource {
    constructor(db) {
        super()
        this.dao = new Dao(db, 'analiseSolo', 'talhaoId')
    }

    GET(rest) {
        return this.dao.selectIndex(rest)
    }

    POST(rest) {
        return this.dao.insert(rest)
    }

    PUT(rest) {
        return this.dao.update(rest)
    }

    DELETE(rest) {
        return new Promise((resolve, reject) => {
            this.dao.DataBase.open.then(() => {
                let empty = false
                this.dao.DataBase.setTransaction = ['laudoSolo']
                this.dao.DataBase.objectStoreIndex('laudoSolo', 'analiseSoloId', rest.id).then(e => {
                    if (e.length > 0) {
                        empty = true
                        e.forEach(i => {
                            this.dao.DataBase.objectStoreDelete('laudoSolo', i.id).then(() => { }).catch(() => {
                                empty = false
                            })
                        })
                    }
                    else {
                        empty = true
                    }
                }).catch(() => {
                    empty = false
                })
                this.dao.DataBase.getTransactionComplete.then(e => {
                    if (e) {
                        if (empty) {
                            this.dao.DataBase.setTransaction = [this.dao.table]
                            this.dao.DataBase.objectStoreDelete(this.dao.table, rest.id).then(() => {
                                this.dao.DataBase.close()
                                resolve(this.dao.response.send('', 202))
                            }).catch(() => {
                                this.dao.DataBase.close()
                                reject(this.dao.response.send('', 400))
                            })
                        }
                        else {
                            reject(this.dao.response.send({ 'respose': 'Delete itens laudoSolo Error' }, 500))
                        }
                    }
                    else {
                        reject(this.dao.response.send({ 'respose': 'Transaction DataBase Error' }, 500))
                    }
                }).catch(() => {
                    this.dao.DataBase.close()
                    reject(this.dao.response.send({ 'respose': 'Transaction Error' }, 500))
                })
            }).catch(() => {
                this.dao.DataBase.close()
                reject(this.dao.response.send({ 'respose': 'Internal DataBase Error' }, 500))
            })
        })
    }
}

class LaudoSoloResource extends Resource {
    constructor(db) {
        super()
        this.dao = new Dao(db, 'laudoSolo', 'analiseSoloId')
    }

    GET(rest) {
        return this.dao.selectIndex(rest)
    }

    POST(rest) {
        return this.dao.insert(rest)
    }

    PUT(rest) {
        return this.dao.update(rest)
    }

    DELETE(rest) {
        return this.dao.delete(rest)
    }
}

class ProjetoResource extends Resource {
    constructor(db) {
        super()
        this.DataBase = db
        this.requestResponse = new ResponseRestFull()
    }

    GET(rest) {
        return new Promise((resolve, reject) => {
            let cliente = new Array()
            let talhao = new Array()
            let analiseSolo = new Array()
            let laudoSolo = new Array()
            let configuracao = new Array()
            let acidezSolo = new Array()
            let fertilidadeSolo = new Array()
            this.DataBase.open.then(() => {
                this.DataBase.setTransaction = ['cliente', 'talhao', 'analiseSolo', 'laudoSolo', 'configuracao', 'acidezSolo', 'fertilidadeSolo']
                this.DataBase.objectStoreCursor('cliente').then(e => {
                    cliente = e
                })
                this.DataBase.objectStoreCursor('talhao').then(e => {
                    talhao = e
                })
                this.DataBase.objectStoreCursor('analiseSolo').then(e => {
                    analiseSolo = e
                })
                this.DataBase.objectStoreCursor('laudoSolo').then(e => {
                    laudoSolo = e
                })
                this.DataBase.objectStoreCursor('configuracao').then(e => {
                    configuracao = e
                })
                this.DataBase.objectStoreCursor('acidezSolo').then(e => {
                    acidezSolo = e
                })
                this.DataBase.objectStoreCursor('fertilidadeSolo').then(e => {
                    fertilidadeSolo = e
                })
                this.DataBase.getTransactionComplete.then(() => {
                    this.DataBase.close()
                    if (
                        Array.isArray(configuracao) &&
                        Array.isArray(acidezSolo) &&
                        Array.isArray(fertilidadeSolo) &&
                        Array.isArray(cliente) &&
                        Array.isArray(talhao) &&
                        Array.isArray(analiseSolo) &&
                        Array.isArray(laudoSolo)
                    ) {
                        configuracao.map(e => {
                            acidezSolo.forEach(i => {
                                if (i.configuracaoId == e.id) {
                                    i.id = undefined
                                    i.configuracaoId = undefined
                                    if (!e.acidezSolo) {
                                        e.acidezSolo = [i]
                                    }
                                    else {
                                        e.acidezSolo.push(i)
                                    }
                                }
                            })
                            fertilidadeSolo.forEach(i => {
                                i.id = undefined
                                i.configuracaoId = undefined
                                if (i.configuracaoId == e.id) {
                                    i.id = undefined
                                    i.configuracaoId = undefined
                                    if (!e.fertilidadeSolo) {
                                        e.fertilidadeSolo = [i]
                                    }
                                    else {
                                        e.fertilidadeSolo.push(i)
                                    }
                                }
                            })
                            e.id = undefined
                        })
                        analiseSolo.map(e => {
                            laudoSolo.forEach(i => {
                                if (i.analiseSoloId == e.id) {
                                    i.id = undefined
                                    i.analiseSoloId = undefined
                                    if (!e.laudoSolo) {
                                        e.laudoSolo = [i]
                                    }
                                    else {
                                        e.laudoSolo.push(i)
                                    }
                                }
                            })
                            e.id = undefined
                        })
                        talhao.map(e => {
                            analiseSolo.forEach(i => {
                                if (i.talhaoId == e.id) {
                                    i.id = undefined
                                    i.talhaoId = undefined
                                    if (!e.analiseSolo) {
                                        e.analiseSolo = [i]
                                    }
                                    else {
                                        e.analiseSolo.push(i)
                                    }
                                }
                            })
                            e.id = undefined
                        })
                        cliente.map(e => {
                            talhao.forEach(i => {
                                if (i.clienteId == e.id) {
                                    i.id = undefined
                                    i.clienteId = undefined
                                    if (!e.talhao) {
                                        e.talhao = [i]
                                    }
                                    else {
                                        e.talhao.push(i)
                                    }
                                }
                            })
                            e.id = undefined
                        })
                    }
                    resolve(this.requestResponse.send({
                        configuracao: configuracao,
                        cliente: cliente
                    }, 200))
                }).catch(() => {
                    this.DataBase.close()
                    reject(this.requestResponse.send('', 406))
                })
            }).catch(() => {
                this.DataBase.close()
                reject(this.requestResponse.send({ 'respose': 'Internal DataBase Error' }, 500))
            })
        })
    }

    POST(rest) {
        return new Promise((resolve, reject) => {
            resolve(this.requestResponse.send({ 'respose': 'Not implemented' }, 501))
        })
    }

    PUT(rest) {
        return new Promise((resolve, reject) => {
            rest.json.then(json => {
                this.DataBase.open.then(() => {
                    this.DataBase.setTransaction = ['cliente', 'talhao', 'analiseSolo', 'laudoSolo', 'configuracao', 'acidezSolo', 'fertilidadeSolo']
                    if (json.cliente) {
                        //console.log(json)
                        if (Array.isArray(json.cliente)) {
                            json.cliente.forEach(cliente => {
                                const talhoes = cliente.talhao || new Array()
                                cliente.talhao = undefined
                                this.DataBase.objectStoreAdd('cliente', cliente).then(clienteId => {
                                    talhoes.forEach(talhao => {
                                        talhao.clienteId = clienteId
                                        const analisesSolo = talhao.analiseSolo || new Array()
                                        talhao.analiseSolo = undefined
                                        this.DataBase.objectStoreAdd('talhao', talhao).then(talhaoId => {
                                            analisesSolo.forEach(analiseSolo => {
                                                analiseSolo.talhaoId = talhaoId
                                                const laudosSolo = analiseSolo.laudoSolo || new Array()
                                                analiseSolo.laudoSolo = undefined
                                                this.DataBase.objectStoreAdd('analiseSolo', analiseSolo).then(analiseSoloId => {
                                                    laudosSolo.forEach(laudoSolo => {
                                                        laudoSolo.analiseSoloId = analiseSoloId
                                                        this.DataBase.objectStoreAdd('laudoSolo', laudoSolo)
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        }
                    }
                    if (json.configuracao) {
                        if (Array.isArray(json.configuracao)) {
                            json.configuracao.forEach(configuracao => {
                                const pacotesAcidezSolo = configuracao.acidezSolo || new Array()
                                const pacotesFertilidadeSolo = configuracao.fertilidadeSolo || new Array()
                                configuracao.acidezSolo = undefined
                                configuracao.fertilidadeSolo = undefined
                                this.DataBase.objectStoreAdd('configuracao', configuracao).then(configuracaoId => {
                                    if (Array.isArray(pacotesAcidezSolo)) {
                                        pacotesAcidezSolo.forEach(acidezSolo => {
                                            acidezSolo.configuracaoId = configuracaoId
                                            this.DataBase.objectStoreAdd('acidezSolo', acidezSolo)
                                        })
                                    }
                                    if (Array.isArray(pacotesFertilidadeSolo)) {
                                        pacotesFertilidadeSolo.forEach(fertilidadeSolo => {
                                            fertilidadeSolo.configuracaoId = configuracaoId
                                            this.DataBase.objectStoreAdd('fertilidadeSolo', fertilidadeSolo)
                                        })
                                    }
                                })
                            })
                        }
                    }
                    this.DataBase.getTransactionComplete.then(() => {
                        this.DataBase.close()
                        resolve(this.requestResponse.send('', 201))
                    }).catch(() => {
                        this.DataBase.close()
                        reject(this.requestResponse.send('', 406))
                    })
                }).catch(() => {
                    this.DataBase.close()
                    reject(this.requestResponse.send({ 'respose': 'Internal DataBase Error' }, 500))
                })
            }).catch(() => {
                reject(this.requestResponse.send({ 'respose': 'json not received' }, 403))
            })
        })
    }

    DELETE(rest) {
        //console.log('DELETE?')
        return new Promise((resolve, reject) => {
            this.DataBase.dropDataBase.then(() => {
                //console.log('true')
                resolve(this.requestResponse.send({ 'respose': 'Banco de dados destruido' }, 200))
            }).catch(() => {
                //console.log('false')
                reject(this.requestResponse.send('', 500))
            })
        })
    }
}


const version = 0.909
const nameApp = `ASFAR-APP-V${version}`
const defaultCache = `ASFAR-CACHE-V${version}`
const scope = './'

//app
const cacheApp = new Array()
cacheApp.push(scope)
cacheApp.push(`${scope}script/app.js`)
cacheApp.push(`${scope}icon/logo-192.png`)
cacheApp.push(`${scope}icon/logo-512.png`)
cacheApp.push(`${scope}404/`)
const DataBase = new IndexedDbRepository()
const configuracaoResource = new ConfiguracaoResource(DataBase)
const acidezSoloResource = new AcidezSoloResource(DataBase)
const clienteResource = new ClienteResource(DataBase)
const talhaoResource = new TalhaoResource(DataBase)
const analiseSoloResource = new AnaliseSoloResource(DataBase)
const laudoSoloResource = new LaudoSoloResource(DataBase)
const projetoResource = new ProjetoResource(DataBase)

this.addEventListener("install", event => {
    //console.log(`Instalando ${cacheApp.length} arquivos em cache`)
    event.waitUntil(
        caches.open(nameApp).then(cache => {
            return cache.addAll(cacheApp).then(() => {
                //console.log('Caches instalados')
            }).catch(() => {
                //console.log('Caches nao instalados')
            })
        }).catch(() => {
            //console.log('Abertura de cache negada')
        })
    )
})

self.addEventListener('activate', event => {
    let cacheWhitelist = [nameApp]
    event.waitUntil(
        caches.keys().then(cacheNames => {
            //console.log('Destruindo caches antigos')
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})

self.addEventListener('fetch', event => {
    const rest = new RequestRestFull(event.request, '/localdb')
    if (!rest.is) {
        event.respondWith(
            caches.match(event.request).then(response => {
                if (response) {
                    return response
                }
                else {
                    return fetch(event.request.clone()).then(response => {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response
                        }
                        else {
                            return caches.open(defaultCache).then(cache => {
                                cache.put(event.request, response.clone())
                                return response
                            })
                        }
                    })
                }
            })
        )
    }
    else {
        //console.log(rest)
        if (rest.node == 'configuracao') {
            event.respondWith(configuracaoResource.response(rest))
        }
        else if (rest.node == 'acidezSolo') {
            event.respondWith(acidezSoloResource.response(rest))
        }
        else if (rest.node == 'cliente') {
            event.respondWith(clienteResource.response(rest))
        }
        else if (rest.node == 'talhao') {
            event.respondWith(talhaoResource.response(rest))
        }
        else if (rest.node == 'analiseSolo') {
            event.respondWith(analiseSoloResource.response(rest))
        }
        else if (rest.node == 'laudoSolo') {
            event.respondWith(laudoSoloResource.response(rest))
        }
        else {
            event.respondWith(projetoResource.response(rest))
        }
    }
})