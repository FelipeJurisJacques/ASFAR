import { UnidadeClass } from '../util/models/UnidadeClass.js'

export class LaudoQuimicoSoloModel {
    constructor(obj = {}) {
        this.pH = obj.pH || 0 //UNIDADE FLOATGUER
        this.SMP = obj.SMP || 0 //UNIDADE FLOATGUER
        this.textura = obj.textura || 0 //UNIDADE INTEGUER
        //CLASSE DE UNIDADES DIVERSAS
        this.Ca = new UnidadeClass(obj.Ca) //CALCIO
        this.Mg = new UnidadeClass(obj.Mg) //MAGNESIO
        this.Al = new UnidadeClass(obj.Al) //ALUMINIO
        this.HAl = new UnidadeClass(obj.HAl) //HIDROGENIO MAIS ALUMINIO
        this.CTCefetiva = new UnidadeClass(obj.CTCefetiva) //TROCA DE CATIONS
        this.CTCph7 = new UnidadeClass(obj.CTCph7) //TROCA DE CATION POR pH7
        this.V = new UnidadeClass(obj.V) //SATURACAO POR BASES
        this.MO = new UnidadeClass(obj.MO) //MATERIO ORGANICA
        this.argila = new UnidadeClass(obj.argila)
        this.S = new UnidadeClass(obj.S) //ENXOFRE
        this.Pmehlich = new UnidadeClass(obj.Pmehlich) //FOSFORO
        this.Presina = new UnidadeClass(obj.Presina) //FOSFORO
        this.Prem = new UnidadeClass(obj.Prem) //FOSFORO
        this.K = new UnidadeClass(obj.K) //POTASSIO
        this.Cu = new UnidadeClass(obj.Cu) //COBRE
        this.Zn = new UnidadeClass(obj.Zn) //ZINCO
        this.B = new UnidadeClass(obj.B) //BORO
        this.Fe = new UnidadeClass(obj.Fe) //FERRO
        this.Mn = new UnidadeClass(obj.Mn) //MANGANES
        this.C = new UnidadeClass(obj.C) //CARBONO
    }

    setpH(e) {
        e = parseFloat(e)
        if (!isNaN(e)) {
            if (e > 0 && e < 15) {
                this.pH = e
                return true
            }
        }
        this.pH = undefined
        return false
    }

    getpH() {
        return this.pH
    }

    setSMP(e) {
        e = parseFloat(e)
        if (!isNaN(e)) {
            if (e > 0) {
                this.SMP = e
                return true
            }
        }
        this.SMP = undefined
        return false
    }

    getSMP() {
        return this.SMP
    }

    setTextura(e) {
        e = parseInt(e)
        if (!isNaN(e)) {
            if (e > 0) {
                this.textura = e
                return true
            }
        }
        this.textura = undefined
        return false
    }

    getTextura() {
        return this.textura
    }

    setCa(e) {
        if (typeof e == 'object') {
            if (e.constructor.name == 'UnidadeClass') {
                this.Ca = e
                return true
            }
        }
        return false
    }

    getCa() {
        return this.Ca
    }

    setMg(e) {
        if (typeof e == 'object') {
            if (e.constructor.name == 'UnidadeClass') {
                this.Mg = e
                return true
            }
        }
        return false
    }

    getMg() {
        return this.Mg
    }

    setAl(e) {
        if (typeof e == 'object') {
            if (e.constructor.name == 'UnidadeClass') {
                this.Al = e
                return true
            }
        }
        return false
    }

    getAl() {
        return this.Al
    }

    setHAl(e) {
        if (typeof e == 'object') {
            if (e.constructor.name == 'UnidadeClass') {
                this.HAl = e
                return true
            }
        }
        return false
    }

    getHAl() {
        return this.HAl
    }

    setCTCefetiva(e) {
        if (typeof e == 'object') {
            if (e.constructor.name == 'UnidadeClass') {
                this.CTCefetiva = e
                return true
            }
        }
        return false
    }

    getCTCefetiva() {
        return this.CTCefetiva
    }

    setCTCph7(e) {
        if (typeof e == 'object') {
            if (e.constructor.name == 'UnidadeClass') {
                this.CTCph7 = e
                return true
            }
        }
        return false
    }

    getCTCph7() {
        return this.CTCph7
    }

    setV(e) {
        if (typeof e == 'object') {
            if (e.constructor.name == 'UnidadeClass') {
                this.V = e
                return true
            }
        }
        return false
    }

    getV() {
        return this.V
    }

    setMO(e) {
        if (typeof e == 'object') {
            if (e.constructor.name == 'UnidadeClass') {
                this.MO = e
                return true
            }
        }
        return false
    }

    getMO() {
        return this.MO
    }

    setArgila(e) {
        if (typeof e == 'object') {
            if (e.constructor.name == 'UnidadeClass') {
                this.argila = e
                return true
            }
        }
        return false
    }

    getArgila() {
        return this.argila
    }

    setS(e) {
        if (typeof e == 'object') {
            if (e.constructor.name == 'UnidadeClass') {
                this.S = e
                return true
            }
        }
        return false
    }

    getS() {
        return this.S
    }

    setPmehlich(e) {
        if (typeof e == 'object') {
            if (e.constructor.name == 'UnidadeClass') {
                this.Pmehlich = e
                return true
            }
        }
        return false
    }

    getPmehlich() {
        return this.Pmehlich
    }

    setPresina(e) {
        if (typeof e == 'object') {
            if (e.constructor.name == 'UnidadeClass') {
                this.Presina = e
                return true
            }
        }
        return false
    }

    getPresina() {
        return this.Presina
    }

    setPrem(e) {
        if (typeof e == 'object') {
            if (e.constructor.name == 'UnidadeClass') {
                this.Prem = e
                return true
            }
        }
        return false
    }

    getPrem() {
        return this.Prem
    }

    setK(e) {
        if (typeof e == 'object') {
            if (e.constructor.name == 'UnidadeClass') {
                this.K = e
                return true
            }
        }
        return false
    }

    getK() {
        return this.K
    }

    setCu(e) {
        if (typeof e == 'object') {
            if (e.constructor.name == 'UnidadeClass') {
                this.Cu = e
                return true
            }
        }
        return false
    }

    getCu() {
        return this.Cu
    }

    setZn(e) {
        if (typeof e == 'object') {
            if (e.constructor.name == 'UnidadeClass') {
                this.Zn = e
                return true
            }
        }
        return false
    }

    getZn() {
        return this.Zn
    }

    setB(e) {
        if (typeof e == 'object') {
            if (e.constructor.name == 'UnidadeClass') {
                this.B = e
                return true
            }
        }
        return false
    }

    getB() {
        return this.B
    }

    setFe(e) {
        if (typeof e == 'object') {
            if (e.constructor.name == 'UnidadeClass') {
                this.Fe = e
                return true
            }
        }
        return false
    }

    getFe() {
        return this.Fe
    }

    setMn(e) {
        if (typeof e == 'object') {
            if (e.constructor.name == 'UnidadeClass') {
                this.Mn = e
                return true
            }
        }
        return false
    }

    getMn() {
        return this.Mn
    }

    setC(e) {
        if (typeof e == 'object') {
            if (e.constructor.name == 'UnidadeClass') {
                this.C = e
                return true
            }
        }
        return false
    }

    getC() {
        return this.C
    }

    toString() {
        return JSON.parse(JSON.stringify({
            pH: this.pH || undefined,
            SMP: this.SMP || undefined,
            textura: this.textura || undefined,
            Ca: this.Ca.toString(),
            Mg: this.Mg.toString(),
            Al: this.Al.toString(),
            CTCefetiva: this.CTCefetiva.toString(),
            CTCph7: this.CTCph7.toString(),
            V: this.V.toString(),
            MO: this.MO.toString(),
            argila: this.argila.toString(),
            S: this.S.toString(),
            Pmehlich: this.Pmehlich.toString(),
            Presina: this.Presina.toString(),
            Prem: this.Prem.toString(),
            K: this.K.toString(),
            Cu: this.Cu.toString(),
            Zn: this.Zn.toString(),
            B: this.B.toString(),
            Fe: this.Fe.toString(),
            Mn: this.Mn.toString(),
            C: this.C.toString()
        }))
    }
}