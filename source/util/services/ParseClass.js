// Transforma qualquer texto em numero ignorando caracteres
export class ParseClass {
    parseFloat(e) {
        if (typeof e == 'string') {
            e = e.trim().split('')
            let r = ''
            let p = true
            e.forEach(i => {
                if (!isNaN(parseInt(i))) {
                    r += i
                }
                else if (p) {
                    if (r.length == 0) {
                        if (i == '-') {
                            r = '-'
                        }
                    }
                    if (i == '.' || i == ',') {
                        p = false
                        r += '.'
                    }
                }
            })
            return parseFloat(r)
        }
        else if (typeof e == 'number') {
            return parseFloat(e)
        }
        return NaN
    }

    // Textos nao sao arredondados
    parseInt(e) {
        if (typeof e == 'string') {
            e = e.trim().split('')
            let r = ''
            e.forEach(i => {
                if (!isNaN(parseInt(i))) {
                    r += i
                }
                else if (r.length == 0) {
                    if (i == '-') {
                        r = '-'
                    }
                }
            })
            return parseInt(r)
        }
        else if (typeof e == 'number') {
            return parseInt(e)
        }
        return NaN
    }

    // Filtra apenas numeros em um texto
    fillNumber(e) {
        if(typeof e == 'number'){
            e = e.toString()
        }
        let r = ''
        if (typeof e == 'string') {
            for (let i = 0; i < e.length; i++) {
                if (
                    e[i] == '0' ||
                    e[i] == '1' ||
                    e[i] == '2' ||
                    e[i] == '3' ||
                    e[i] == '4' ||
                    e[i] == '5' ||
                    e[i] == '6' ||
                    e[i] == '7' ||
                    e[i] == '8' ||
                    e[i] == '9'
                ) {
                    r += e[i]
                }
            }
        }
        return r
    }
}


window.ParseClass = ParseClass