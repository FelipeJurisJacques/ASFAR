export class ProfundidadeClass {
    constructor(obj = {}) {
        this.min = obj.min || 0
        this.max = obj.max || undefined
    }

    setProfundidade(min, max) {
        if (this.setMinima(min) && this.setMaxima(max)) {
            return true
        }
        return false
    }

    getMinima() {
        if (!isNaN(this.min)) {
            return this.min
        }
        return ''
    }

    setMinima(e) {
        e = parseFloat(e)
        if (!isNaN(e) && e >= 0) {
            if (e < this.max || isNaN(this.max)) {
                this.min = e
                return true
            }
        }
        this.min = 0
        return false
    }

    getMaxima() {
        if (!isNaN(this.max)) {
            return this.max
        }
        return ''
    }

    setMaxima(e) {
        e = parseFloat(e)
        if (!isNaN(e) && e > this.min) {
            this.max = e
            return true
        }
        this.max = undefined
        return false
    }

    getText() {
        if (!isNaN(this.max) && !isNaN(this.min)) {
            return `${this.min}cm a ${this.max}cm`
        }
        return ''
    }

    equal(e) {
        if (!isNaN(this.max) && !isNaN(this.min)) {
            if (typeof e == 'object') {
                if (e.constructor.name == 'ProfundidadeClass') {
                    if (!isNaN(e.max) && !isNaN(e.min)) {
                        if (e.max == this.max && e.min == this.min) {
                            return true
                        }
                    }
                }
            }
        }
        return false
    }

    in(e) {
        if (!isNaN(this.max) && !isNaN(this.min)) {
            if (typeof e == 'object') {
                if (e.constructor.name == 'ProfundidadeClass') {
                    if (!isNaN(e.max) && !isNaN(e.min)) {
                        if (e.max <= this.max && e.min >= this.min) {
                            return true
                        }
                    }
                }
            }
        }
        return false
    }

    toString() {
        if (!isNaN(this.max) && !isNaN(this.min)) {
            return JSON.parse(JSON.stringify({
                min: this.min,
                max: this.max,
            }))
        }
    }
}