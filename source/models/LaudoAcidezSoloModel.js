import { NutrienteCorrecaoClass } from '../util/models/NutrienteCorrecaoClass.js'

export class LaudoAcidezSoloModel {
    constructor(obj = {}) {
        this.calcario = new NutrienteCorrecaoClass(obj.calcario)
        this.gesso = new NutrienteCorrecaoClass(obj.gesso)
    }

    setCalcario(c) {
        if (typeof c == 'object') {
            if (c.constructor.name == 'NutrienteCorrecaoClass') {
                this.calcario = new NutrienteCorrecaoClass(c.toString())
                this.calcario.setProduto('Calcário PRNT 100%')
                return true
            }
        }
        return false
    }

    getCalcario() {
        return new NutrienteCorrecaoClass(this.calcario.toString())
    }

    setGesso(c) {
        if (typeof c == 'object') {
            if (c.constructor.name == 'NutrienteCorrecaoClass') {
                this.gesso = new NutrienteCorrecaoClass(c.toString())
                this.gesso.setProduto('Sulfato de cálcio')
                return true
            }
        }
        return false
    }

    getGesso() {
        return new NutrienteCorrecaoClass(this.gesso.toString())
    }

    toString() {
        return {
            calcario: this.calcario.toString(),
            gesso: this.gesso.toString()
        }
    }
}