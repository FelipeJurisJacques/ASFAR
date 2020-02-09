import { TeorNutrienteClass } from './util/TeorNutrienteClass.js'

export class TeoresNutrientesSoloModel {
    constructor(obj = {}) {
        this.Ca = new TeorNutrienteClass(obj.Ca) //CALCIO
        this.Mg = new TeorNutrienteClass(obj.Mg) //MAGNESIO
        this.Al = new TeorNutrienteClass(obj.Al) //ALUMINIO
        this.HAl = new TeorNutrienteClass(obj.HAl) //HIDROGENIO MAIS ALUMINIO
        this.CTCefetiva = new TeorNutrienteClass(obj.CTCefetiva) //TROCA DE CATIONS
        this.CTCph7 = new TeorNutrienteClass(obj.CTCph7) //TROCA DE CATION POR pH7
        this.V = new TeorNutrienteClass(obj.V) //SATURACAO POR BASES
        this.MO = new TeorNutrienteClass(obj.MO) //MATERIO ORGANICA
        this.argila = new TeorNutrienteClass(obj.argila, 4, false, true, false, false)
        this.S = new TeorNutrienteClass(obj.S) //ENXOFRE
        this.Pmehlich = new TeorNutrienteClass(obj.Pmehlich) //FOSFORO
        this.Presina = new TeorNutrienteClass(obj.Presina) //FOSFORO
        this.Prem = new TeorNutrienteClass(obj.Prem) //FOSFORO
        this.K = new TeorNutrienteClass(obj.K) //POTASSIO
        this.Cu = new TeorNutrienteClass(obj.Cu) //COBRE
        this.Zn = new TeorNutrienteClass(obj.Zn) //ZINCO
        this.B = new TeorNutrienteClass(obj.B) //BORO
        this.Fe = new TeorNutrienteClass(obj.Fe) //FERRO
        this.Mn = new TeorNutrienteClass(obj.Mn) //MANGANES
        this.C = new TeorNutrienteClass(obj.C) //CARBONO
    }
}