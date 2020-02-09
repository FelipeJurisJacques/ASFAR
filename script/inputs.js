let utilFormat = new Format

document.querySelectorAll('.formatName').forEach(e => {
    e.addEventListener('change', function () {
        let r = utilFormat.formatName(this.value)
        if (r != undefined) {
            this.value = r
        }
        else{
            this.value = ''
        }
    })
})

document.querySelectorAll('.formatVectorNumeric').forEach(e => {
    e.addEventListener('change', function () {
        let r = utilFormat.formatVectorNumeric(this.value)
        if (r != undefined) {
            this.value = r
        }
        else{
            this.value = ''
        }
    })
})

document.querySelectorAll('.formatVector').forEach(e => {
    e.addEventListener('change', function () {
        let r = utilFormat.formatVector(this.value)
        if (r != undefined) {
            this.value = r
        }
        else{
            this.value = ''
        }
    })
})

function Cpf(element) {
    let cpfValue = element.value.trim().split('').map(e => parseInt(e))
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
    cpfArray.forEach(e => {
        cpf += e
    })
    element.value = cpf
}