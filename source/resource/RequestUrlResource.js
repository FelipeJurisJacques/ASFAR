export class RequestUrlResource {
    constructor() {
        this.itens = new Object()
        let get = location.search.slice(1)
        let array = get.split('&')
        array.forEach(e => {
            e = e.split('=')
            if (e.length == 2) {
                let o = e[0]
                let v = parseInt(e[1])
                if (typeof o == 'string' && !isNaN(v)) {
                    this.itens[o] = v
                }
            }
        })
    }

    getItens() {
        return this.itens
    }
}