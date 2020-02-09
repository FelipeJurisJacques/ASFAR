export class IndexedDbTablesRepository {
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