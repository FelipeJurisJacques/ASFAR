export class InputFieldClass {
    constructor() {
        document.querySelectorAll('div.field').forEach(e => {
            let r = false
            let h = true
            e.childNodes.forEach(i => {
                if (
                    i.tagName == 'INPUT' ||
                    i.tagName == 'TEXTAREA'
                ) {
                    if (i.value != '') {
                        i.setAttribute('class', 'active')
                    }
                    if (i.required) {
                        r = true
                    }
                }
                else if (i.tagName == 'SELECT') {
                    const none = document.createElement('option')
                    none.selected = true
                    none.disabled = true
                    i.appendChild(none)
                    if (i.required) {
                        r = true
                    }
                }
                else if (i.tagName == 'SPAN') {
                    if (i.className == 'invalid') {
                        h = false
                    }
                }
            })
            if (h) {
                if (r) {
                    const help = document.createElement('span')
                    help.setAttribute('class', 'invalid')
                    help.innerHTML = 'Requerido'
                    e.appendChild(help)
                }
            }
        })
        document.body.addEventListener('change', e => {
            this.validity(e.target)
        })
        window.inputs = this
    }

    is(e) {
        if (typeof e == 'object') {
            if (
                e.tagName == 'INPUT' ||
                e.tagName == 'SELECT' ||
                e.tagName == 'TEXTAREA'
            ) {
                if (e.parentNode.classList.contains('field')) {
                    return true
                }
            }
        }
        return false
    }

    isCheck(e) {
        if (typeof e == 'object') {
            if (e.tagName == 'INPUT') {
                if (e.type == 'checkbox' || e.type == 'radio') {
                    return true
                }
            }
        }
        return false
    }

    validity(e) {
        if (this.is(e)) {
            if (e.value == '') {
                if (e.classList.contains('valid')) {
                    e.classList.remove('valid')
                }
                if (e.hasAttribute('invalid')) { // Remove sobreposicao
                    e.removeAttribute('invalid')
                }
                if (e.required) {
                    if (!e.classList.contains('invalid')) {
                        e.classList.add('invalid')
                    }
                    // e.reportValidity()
                    // e.focus()
                }
                else if (e.classList.contains('invalid')) {
                    e.classList.remove('invalid')
                }
            }
            else {
                if (!e.classList.contains('active')) {
                    e.classList.add('active')
                }
                if (e.validity.valid && !e.hasAttribute('invalid')) {
                    if (!e.classList.contains('valid')) {
                        e.classList.add('valid')
                    }
                    if (e.classList.contains('invalid')) {
                        e.classList.remove('invalid')
                    }
                }
                else {
                    if (!e.classList.contains('invalid')) {
                        e.classList.add('invalid')
                    }
                    if (e.classList.contains('valid')) {
                        e.classList.remove('valid')
                    }
                }
            }
        }
    }

    // Sobrepoem invalidacao forcada
    setInvalid(e) {
        if (this.is(e)) {
            if (e.classList.contains('valid')) {
                e.classList.remove('valid')
            }
            if (e.value == '') {
                if (e.classList.contains('active')) {
                    e.classList.remove('active')
                }
                if (e.hasAttribute('invalid')) { // Remove sobreposicao
                    e.removeAttribute('invalid')
                }
                if (e.required) {
                    if (!e.classList.contains('invalid')) {
                        e.classList.add('invalid')
                    }
                }
                else if (e.classList.contains('invalid')) {
                    e.classList.remove('invalid')
                }
            }
            else {
                if (!e.classList.contains('active')) {
                    e.classList.add('active')
                }
                if (!e.classList.contains('invalid')) {
                    e.classList.add('invalid')
                }
                if (!e.hasAttribute('invalid')) { // Forca sobreposicao
                    e.setAttribute('invalid', '')
                }
            }
        }
        else if (this.isCheck(e)) {
            if (!e.classList.contains('invalid')) {
                e.classList.add('invalid')
            }
        }
    }

    // Forca validacao
    setValid(e) {
        if (this.is(e)) {
            if (e.hasAttribute('invalid')) { // Remove sobreposicao
                e.removeAttribute('invalid')
            }
            if (e.value == '') {
                if (e.classList.contains('active')) {
                    e.classList.remove('active')
                }
                if (e.classList.contains('valid')) {
                    e.classList.remove('valid')
                }
                if (e.required) {
                    if (!e.classList.contains('invalid')) {
                        e.classList.add('invalid')
                    }
                }
                else if (e.classList.contains('invalid')) {
                    e.classList.remove('invalid')
                }
            }
            else {
                if (!e.classList.contains('active')) {
                    e.classList.add('active')
                }
                if (e.validity.valid) {
                    if (e.classList.contains('invalid')) {
                        e.classList.remove('invalid')
                    }
                    if (!e.classList.contains('valid')) {
                        e.classList.add('valid')
                    }
                }
                else {
                    if (!e.classList.contains('invalid')) {
                        e.classList.add('invalid')
                    }
                    if (e.classList.contains('valid')) {
                        e.classList.remove('valid')
                    }
                }
            }
        }
        else if (this.isCheck(e)) {
            if (e.classList.contains('invalid')) {
                e.classList.remove('invalid')
            }
        }
    }

    // Remove sobreposicao de invalidacao forcada
    clearInput(e) {
        if (this.is(e)) {
            if (e.hasAttribute('invalid')) {
                e.removeAttribute('invalid')
            }
        }
        else if (this.isCheck(e)) {
            if (e.classList.contains('invalid')) {
                e.classList.remove('invalid')
            }
        }
    }

    // Esvazia input
    emptyInput(e) {
        if (this.is(e)) {
            e.value = ''
            if (e.hasAttribute('invalid')) {
                e.removeAttribute('invalid')
            }
            if (e.classList.contains('invalid')) {
                e.classList.remove('invalid')
            }
            if (e.classList.contains('valid')) {
                e.classList.remove('valid')
            }
            if (e.classList.contains('active')) {
                e.classList.remove('active')
            }
        }
        else if (this.isCheck(e)) {
            e.checked = false
            if (e.classList.contains('invalid')) {
                e.classList.remove('invalid')
            }
        }
    }

    // Altera mensagem de invalidacao
    setHelpInvalid(i, m) {
        if (typeof m == 'string') {
            m = m.trim()
            if (this.is(i)) {
                let has = true
                i.parentNode.childNodes.forEach(e => {
                    if (e.tagName == 'SPAN' && e.className == 'invalid') {
                        e.innerHTML = m
                        has = false
                    }
                })
                if (has) {
                    const invalid = document.createElement('span')
                    invalid.setAttribute('class', 'invalid')
                    invalid.innerHTML = m
                    i.parentNode.appendChild(invalid)
                }
            }
        }
    }

    setRequired(i) {
        if (this.is(i)) {
            i.required = true
            i.parentNode.childNodes.forEach(e => {
                if (e.tagName == 'LABEL') {
                    let n = e.innerHTML
                    n = n.trim().split('')
                    if (n[n.length - 1] != '*') {
                        e.innerHTML += ' *'
                    }
                }
            })
        }
        else if (this.isCheck(i)) {
            i.required = true
        }
    }

    // Insere valor em ocasioes assincronas sem realizar validacoes
    insertValue(i, v) {
        let a = false
        if (this.is(i)) {
            if (i.type != 'file') {
                if (i.classList.contains('valid')) {
                    i.classList.remove('valid')
                }
                else if (i.classList.contains('invalid')) {
                    i.classList.remove('invalid')
                }
                if (i.hasAttribute('invalid')) { // Remove sobreposicao
                    i.removeAttribute('invalid')
                }
                if (typeof v == 'string') {
                    v = v.trim()
                    if (v) {
                        i.value = v
                        a = true

                    }
                }
                else if (typeof v == 'number') {
                    if (!isNaN(v)) {
                        i.value = v
                        a = true
                    }
                }
                else if (Array.isArray(v)) {
                    i.value = v
                    a = true
                }
                if (a) {
                    if (!i.classList.contains('active')) {
                        i.classList.add('active')
                    }
                }
                else {
                    i.value = ''
                    if (i.classList.contains('active')) {
                        i.classList.remove('active')
                    }
                }
            }
        }
        else if (this.isCheck(i)) {
            if (typeof v == 'boolean') {
                i.checked = v
            }
        }
    }

    disable(i, b = true) {
        if (typeof b == 'boolean') {
            if (this.is(i)) {
                i.disabled = b
            }
        }
    }
}