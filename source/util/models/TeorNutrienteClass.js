import { ParseClass } from '../../controller/util/ParseClass.js'

const number = new ParseClass()

/**
 * interpreta teores de nutrientes
 * varias unidades
 * linear
 */
export class TeorNutrienteClass {
    constructor(obj = {}, tracks, value = true, percentage = true, mgdm3 = true, cmolcdm3 = true) {
        this.linear = new Object()
        if (obj.linear) {
            if (value && obj.linear.value) {
                this.linear.value = new TeorNutrienteLinearClass(obj.linear.value, tracks, 'value')
            }
            if (percentage && obj.linear.percentage) {
                this.linear.percentage = new TeorNutrienteLinearClass(obj.linear.percentage, tracks, 'percentage')
            }
            if (mgdm3 && obj.linear.mgdm3) {
                this.linear.mgdm3 = new TeorNutrienteLinearClass(obj.linear.mgdm3, tracks, 'mgdm3')
            }
            if (cmolcdm3 && obj.linear.cmolcdm3) {
                this.linear.cmolcdm3 = new TeorNutrienteLinearClass(obj.linear.cmolcdm3, tracks, 'cmolcdm3')
            }
        }
    }

    getLinear() {
        if (this.linear) {
            return this.linear
        }
        return undefined
    }
}

/**
 * interpreta teores lineares
 */
export class TeorNutrienteLinearClass {
    constructor(obj = {}, tracks, type) {
        this.min = obj.min || 0
        this.max = obj.max || 0
        this.tracks = tracks || 1
        this.type = type
    }

    setMin(e) {
        this.min = number.parseFloat(e)
        if (this.min) {
            return true
        }
        this.min = 0
        return false
    }

    setMax(e) {
        this.max = number.parseFloat(e)
        if (this.max) {
            return true
        }
        this.max = 0
        return false
    }
}