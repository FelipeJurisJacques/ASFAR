class Format {

    //todas as palavras com mais de 2 caractere iniciam com letra maiuscula
    formatName(e) {
        if (e) {
            let r = ''
            let f = e.toString().trim().toLowerCase()
            let p = f.split(' ')
            p.forEach(e => {
                if (e.length > 1) {
                    let q = e.split('')
                    if (q.length > 2) {
                        q[0] = q[0].toUpperCase()
                    }
                    q.forEach(i => {
                        r += i
                    })
                    r += ' '
                }
            })
            r = r.trim()
            if (r != '') {
                return r
            }
        }
        return undefined
    }

    toCpf(cpfValue){
        if (cpfValue) {
            cpfValue = cpfValue.toString().trim().split('').map(e => parseInt(e))
            let cpfArray = []
            let cpf = ''
            cpfValue.forEach(e => {
                if (!isNaN(e)) {
                    if (cpfArray.length == 3 || cpfArray.length == 7) {
                        cpfArray.push('.')
                    }
                    if (cpfArray.length == 11) {
                        cpfArray.push('-')
                    }
                    if (cpfArray.length < 14) {
                        cpfArray.push(e)
                    }
                }
            })
            if (cpfArray.length == 14) {
                cpfArray.forEach(e => {
                    cpf += e
                })
                return cpf
            }
        }
        return undefined
    }

    //remove espacos em brancos de um vetor
    formatVector(e){
        if(e){
            let r = []
            e = e.toString().split(',').map(e => e.trim())
            e.forEach(i => {
                if(i != ''){
                    r.push(i)
                }
            })
            if(r.length > 0){
                return r
            }
        }
        return undefined
    }

    //remove espacos em brancos de um vetor numerico
    formatVectorNumeric(e){
        if(e){
            let r = []
            e = e.toString().split(',').map(e => e.trim())
            e.forEach(i => {
                if(!isNaN(parseInt(i))){
                    r.push(i)
                }
            })
            if(r.length > 0){
                return r
            }
        }
        return undefined
    }
}