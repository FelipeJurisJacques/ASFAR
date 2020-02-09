export class DictionaryClass {
    constructor() {
        this.items = {}
    }

    getItems() {
        return this.items
    }

    add(key, value) { //Inserir
        this.items[key] = value
    }

    clear() { //Limpa tudo
        this.items = {}
    }

    has(key) { //Verifica
        return key in this.items
    }

    remove(key) { //Remove
        if (this.has(key)) {
            delete this.items[key]
            return true
        }
        return false
    }

    get(key) { //Pega o valor
        if (this.has(key)) {
            return this.items[key]
        } else {
            return undefined
        }
    }

    size() { //Mostra quantidade de keys
        let j = 0
        for (let i in this.items) {
            j++
        }
        return j
    }

    keys() { //Pega todas as keys
        return Object.keys(this.items)
    }

    values() { //Pego todos os valores
        return Object.values(this.items)
    }

    attach(e) {
        if (typeof e == 'object') {
            if (e.constructor.name == 'DictionaryClass') {
                for (let i in this.items) {
                    e.add(i, this.items[i])
                }
                return e
            }
        }
        return undefined
    }
}