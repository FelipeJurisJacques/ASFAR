import { NutrienteCorrecaoClass } from '../util/models/NutrienteCorrecaoClass.js'

export class LaudoFertilidadeSoloModel {
    constructor(obj = {}) {
        this.n = new NutrienteCorrecaoClass(obj.n)
        this.p = new NutrienteCorrecaoClass(obj.p)
        this.k = new NutrienteCorrecaoClass(obj.k)
    }

    setN(c) {
        if (typeof c == 'object') {
            if (c.constructor.name == 'NutrienteCorrecaoClass') {
                this.n = new NutrienteCorrecaoClass(c.toString())
                this.n.setProduto('Nitrogênio')
                return true
            }
        }
        return false
    }

    getN() {
        return new NutrienteCorrecaoClass(this.n.toString())
    }

    setP(c) {
        if (typeof c == 'object') {
            if (c.constructor.name == 'NutrienteCorrecaoClass') {
                this.p = new NutrienteCorrecaoClass(c.toString())
                this.p.setProduto('Fósforo')
                return true
            }
        }
        return false
    }

    getP() {
        return new NutrienteCorrecaoClass(this.p.toString())
    }

    setK(c) {
        if (typeof c == 'object') {
            if (c.constructor.name == 'NutrienteCorrecaoClass') {
                this.k = new NutrienteCorrecaoClass(c.toString())
                this.k.setProduto('Potássio')
                return true
            }
        }
        return false
    }

    getK() {
        return new NutrienteCorrecaoClass(this.k.toString())
    }

    toString() {
        return {
            n: this.n.toString(),
            p: this.p.toString(),
            k: this.k.toString()
        }
    }
}