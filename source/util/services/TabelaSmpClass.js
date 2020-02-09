export class TabelaSmpClass {
    constructor() {
        this.PH55 = {}
        this.PH60 = {}
        this.PH65 = {}

        //PH 5,5
        this.setPH55(4.4, 15.0)
        this.setPH55(4.5, 12.5)
        this.setPH55(4.6, 10.9)
        this.setPH55(4.7, 9.6)
        this.setPH55(4.8, 8.6)
        this.setPH55(4.9, 7.7)
        this.setPH55(5, 6.6)
        this.setPH55(5.1, 6.0)
        this.setPH55(5.2, 5.3)
        this.setPH55(5.3, 4.8)
        this.setPH55(5.4, 4.2)
        this.setPH55(5.5, 3.7)
        this.setPH55(5.6, 3.2)
        this.setPH55(5.7, 2.8)
        this.setPH55(5.8, 2.3)
        this.setPH55(5.9, 2.0)
        this.setPH55(6, 1.6)
        this.setPH55(6.1, 1.3)
        this.setPH55(6.2, 1.0)
        this.setPH55(6.3, 0.8)
        this.setPH55(6.4, 0.6)
        this.setPH55(6.5, 0.4)
        this.setPH55(6.6, 0.2)
        this.setPH55(6.7, 0.0)
        this.setPH55(6.8, 0.0)
        this.setPH55(6.9, 0.0)
        this.setPH55(7, 0.0)
        this.setPH55(7.1, 0.0)
        //PH 6,0
        this.setPH60(4.4, 21.0)
        this.setPH60(4.5, 17.3)
        this.setPH60(4.6, 15.1)
        this.setPH60(4.7, 13.3)
        this.setPH60(4.8, 11.9)
        this.setPH60(4.9, 10.7)
        this.setPH60(5, 9.9)
        this.setPH60(5.1, 9.1)
        this.setPH60(5.2, 8.3)
        this.setPH60(5.3, 7.5)
        this.setPH60(5.4, 6.8)
        this.setPH60(5.5, 6.1)
        this.setPH60(5.6, 5.4)
        this.setPH60(5.7, 4.8)
        this.setPH60(5.8, 4.2)
        this.setPH60(5.9, 3.7)
        this.setPH60(6, 3.2)
        this.setPH60(6.1, 2.7)
        this.setPH60(6.2, 2.2)
        this.setPH60(6.3, 1.8)
        this.setPH60(6.4, 1.4)
        this.setPH60(6.5, 1.1)
        this.setPH60(6.6, 0.8)
        this.setPH60(6.7, 0.5)
        this.setPH60(6.8, 0.3)
        this.setPH60(6.9, 0.2)
        this.setPH60(7, 0.0)
        this.setPH60(7.1, 0.0)
        //PH 6,5
        this.setPH65(4.4, 29.0)
        this.setPH65(4.5, 24.0)
        this.setPH65(4.6, 20.0)
        this.setPH65(4.7, 17.5)
        this.setPH65(4.8, 15.7)
        this.setPH65(4.9, 14.2)
        this.setPH65(5, 13.3)
        this.setPH65(5.1, 12.3)
        this.setPH65(5.2, 11.3)
        this.setPH65(5.3, 10.4)
        this.setPH65(5.4, 9.5)
        this.setPH65(5.5, 8.6)
        this.setPH65(5.6, 7.8)
        this.setPH65(5.7, 7.0)
        this.setPH65(5.8, 6.3)
        this.setPH65(5.9, 5.6)
        this.setPH65(6, 4.9)
        this.setPH65(6.1, 4.3)
        this.setPH65(6.2, 3.7)
        this.setPH65(6.3, 3.1)
        this.setPH65(6.4, 2.6)
        this.setPH65(6.5, 2.1)
        this.setPH65(6.6, 1.6)
        this.setPH65(6.7, 1.2)
        this.setPH65(6.8, 0.8)
        this.setPH65(6.9, 0.5)
        this.setPH65(7, 0.2)
        this.setPH65(7.1, 0.0)
    }

    setPH55(key, value) { //Inserir
        this.PH55[key] = value
    }

    setPH60(key, value) { //Inserir
        this.PH60[key] = value
    }

    setPH65(key, value) { //Inserir
        this.PH65[key] = value
    }

    get(key, elevar) { //Pega o valor
        var SMP = (key.toString()).split('')
        if (SMP[0] == undefined || key < 4.4) {
            SMP[0] = '4'
            SMP[1] = '.'
            SMP[2] = '4'
        }
        if (SMP[1] == undefined || SMP[2] == undefined) {
            SMP[1] = ''
            SMP[2] = ''
        }
        key = (SMP[0] + SMP[1] + SMP[2])

        if (elevar == '5.5') {
            if (key in this.PH55) {
                return this.PH55[key]
            } else {
                return 0.0
            }
        }

        if (elevar == '6') {
            if (key in this.PH60) {
                return this.PH60[key]
            } else {
                return 0.0
            }
        }

        if (elevar == '6.5') {
            if (key in this.PH65) {
                return this.PH65[key]
            } else {
                return 0.0
            }
        }
    }
}