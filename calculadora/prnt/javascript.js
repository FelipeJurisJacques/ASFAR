import { LayoutSyncClass } from '../../script/class/LayoutSyncClass.js'
import { NavbarSyncClass } from '../../script/class/NavbarSyncClass.js'
import { ParseClass } from '../../source/util/services/ParseClass.js'

const layout = new LayoutSyncClass()
const sync = new NavbarSyncClass()
const number = new ParseClass()

let v = 0
let prnt = 0
let response = 0

document.body.addEventListener('change', e => {
    const i = e.target
    const id = i.id
    if (id == 'v') {
        v = number.parseFloat(i.value)
        if (isNaN(v) || v <= 0) {
            v = 0
        }
        i.value = v.toFixed(3)
    }
    else if (id == 'prnt') {
        prnt = number.parseFloat(i.value)
        if (isNaN(prnt) || prnt <= 0 || prnt > 100) {
            prnt = 0
        }
        i.value = `${prnt.toFixed(2)} %`
    }
    calc()
})

function calc() {
    if (prnt > 0 && v > 0) {
        response = (v * 100) / prnt
        const r = document.querySelector('#response')
        if (r) {
            r.innerHTML = response.toFixed(2)
        }
    }
}