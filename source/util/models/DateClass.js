// CORRIGE BUGS DE DATAS DO JAVASCRIPT

export class DateClass {
    constructor(d = undefined) {
        this.datetime = new Date()
        if (typeof d == 'string') {
            d = d.trim()
            if (d) {
                this.datetime = new Date(d)
            }
        }
    }

    getDate(){
        return `${this.datetime.getUTCDate()}/${intToNumericMonth(this.datetime.getMonth() + 1)}/${this.datetime.getFullYear()}`
    }

    getDateToInput() {
        return `${this.datetime.getFullYear()}-${intToNumericMonth(this.datetime.getMonth() + 1)}-${this.datetime.getUTCDate()}`
    }

    toString() {
        return this.datetime.toJSON()
    }
}

function intToNumericMonth(e) {
    if (e == '02' || parseInt(e) == 2) {
        return '02'
    }
    else if (e == '03' || parseInt(e) == 3) {
        return '03'
    }
    else if (e == '04' || parseInt(e) == 4) {
        return '04'
    }
    else if (e == '05' || parseInt(e) == 5) {
        return '05'
    }
    else if (e == '06' || parseInt(e) == 6) {
        return '06'
    }
    else if (e == '07' || parseInt(e) == 7) {
        return '07'
    }
    else if (e == '08' || parseInt(e) == 8) {
        return '08'
    }
    else if (e == '09' || parseInt(e) == 9) {
        return '09'
    }
    else if (e == '10' || parseInt(e) == 10) {
        return '10'
    }
    else if (e == '11' || parseInt(e) == 11) {
        return '11'
    }
    else if (e == '12' || parseInt(e) == 12) {
        return '12'
    }
    else {
        return '01'
    }
}