import { ParseClass } from '../services/ParseClass.js'
const number = new ParseClass()

export class UnidadeClass {
    constructor(obj = {}) {
        this.percentage = obj.percentage || 0
        this.mgdm3 = obj.mgdm3 || 0
        this.cmolcdm3 = obj.cmolcdm3 || 0
    }

    setPercentage(e) {
        e = number.parseFloat(e)
        if (e >= 0 && e <= 100) {
            this.percentage = e
            return true
        }
        this.percentage = 0
        return false
    }

    getPercentage() {
        if (!isNaN(this.percentage) && this.percentage > 0) {
            return `${this.percentage}%`
        }
        return ''
    }

    getPercentageForInput() {
        if (!isNaN(this.percentage)) {
            return `${this.percentage} %`
        }
        return ''
    }

    getPercentageInt() {
        return this.percentage
    }

    setMgdm3(e) {
        e = number.parseFloat(e)
        if (e >= 0) {
            this.mgdm3 = e
            return true
        }
        this.mgdm3 = 0
        return false
    }

    getMgdm3() {
        if (!isNaN(this.mgdm3) && this.mgdm3 > 0) {
            return `${this.mgdm3} mg/dm<sup>3</sup>`
        }
        return ''
    }

    getMgdm3Int() {
        return this.mgdm3
    }

    getMgdm3ForInput() {
        if (!isNaN(this.mgdm3)) {
            return `${this.mgdm3} mg/dm³`
        }
        return ''
    }

    setCmolcdm3(e) {
        e = number.parseFloat(e)
        if (e >= 0) {
            this.cmolcdm3 = e
            return true
        }
        this.cmolcdm3 = 0
        return false
    }

    getCmolcdm3() {
        if (!isNaN(this.cmolcdm3) && this.cmolcdm3 > 0) {
            return `${this.cmolcdm3} cmol<sup>c</sup>/dm<sup>3</sup>`
        }
        return ''
    }

    getCmolcdm3Int() {
        return this.cmolcdm3
    }

    getCmolcdm3ForInput() {
        if (!isNaN(this.cmolcdm3)) {
            return `${this.cmolcdm3} cmolc/dm³`
        }
        return ''
    }

    toString() {
        if (
            !isNaN(this.percentage) ||
            !isNaN(this.mgdm3) ||
            !isNaN(this.cmolcdm3)
        ) {
            return JSON.parse(JSON.stringify({
                percentage: this.percentage || undefined,
                mgdm3: this.mgdm3 || undefined,
                cmolcdm3: this.cmolcdm3 || undefined
            }))
        }
    }
}