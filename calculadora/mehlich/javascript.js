import { LayoutSyncClass } from '../../script/class/LayoutSyncClass.js'
import { NavbarSyncClass } from '../../script/class/NavbarSyncClass.js'
import { ParseClass } from '../../source/util/services/ParseClass.js'

const layout = new LayoutSyncClass()
const sync = new NavbarSyncClass()
const number = new ParseClass()

let p = 0
let a = 0
let response1 = 0

let k = 0
let response2 = 0

let zn = 0
let response3 = 0

document.body.addEventListener('change', e => {
    const i = e.target
    const id = i.id
    if (id == 'p') {
        p = number.parseFloat(i.value)
        if (isNaN(p) || p <= 0) {
            p = 0
        }
        i.value = `${p.toFixed(3)} mg/dm³`
        calc1()
    }
    else if (id == 'a') {
        a = number.parseFloat(i.value)
        if (isNaN(a) || a <= 0 || a > 100) {
            a = 0
        }
        i.value = `${a.toFixed(2)} %`
        calc1()
    }
    else if (id == 'k') {
        k = number.parseFloat(i.value)
        if (isNaN(k) || k <= 0) {
            k = 0
        }
        i.value = `${k.toFixed(3)} mg/dm³`
        calc2()
    }
    else if (id == 'zn') {
        zn = number.parseFloat(i.value)
        if (isNaN(zn) || zn <= 0) {
            zn = 0
        }
        i.value = `${zn.toFixed(3)} mg/dm³`
        calc3()
    }
})

function calc1() {
    if (p > 0 && a > 0) {
        response1 = (p / (2 - (0.02 * a)))
        const r = document.querySelector('#r1')
        if (r) {
            r.innerHTML = `${response1.toFixed(2)} mg/dm³ mehlich-1`
        }
    }
}

function calc2() {
    if (k > 0) {
        response2 = k * 0.83
        const r = document.querySelector('#r2')
        if (r) {
            r.innerHTML = `${response2.toFixed(2)} mg/dm³ mehlich-1`
        }
    }
}

function calc3() {
    if (zn > 0) {
        response3 = zn * 2
        const r = document.querySelector('#r3')
        if (r) {
            r.innerHTML = `${response3.toFixed(2)} mg/dm³ mehlich-1`
        }
    }
}