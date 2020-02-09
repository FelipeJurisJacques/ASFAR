import { AlertsClass } from './class/AlertsClass.js'
import { LayoutClass } from './class/LayoutClass.js'
import { NavBarClass } from './class/NavbarClass.js'
// import {RequestResource} from '../source/resource/RequestResource.js'

const alerts = new AlertsClass()
const navbar = new NavBarClass()
const layout = new LayoutClass()
// const request = new RequestResource()

document.body.addEventListener('click', e => { // BOTOES
    // ABRE NOVA ABA
    if (e.target.hasAttribute('data-href')) {
        navbar.newTab(e.target.getAttribute('data-href'))
    }
    // ALTERA TEMA
    else if (e.target.parentNode.id == 'bt') {
        layout.setTheme(-1)
    }
    // FECHA ALERTA
    else if (e.target.parentNode.id == 'popup') {
        if (e.target.id == 'close') {
            alerts.close()
        }
    }
    // SELECIONA ABA
    else if (e.target.tagName == 'BUTTON') {
        const c = e.target.classList
        c.forEach(cl => {
            if (cl == 'tab') {
                navbar.select(e.target.id)
            }
        })
    }
    // REMOVE ABA
    else if (e.target.tagName == 'DIV') {
        if (e.target.parentNode.tagName == 'BUTTON') {
            const c = e.target.parentNode.classList
            c.forEach(cl => {
                if (cl == 'tab') {
                    navbar.remove(e.target.parentNode.id)
                }
            })
        }
    }
})

window.addEventListener('beforeinstallprompt', e => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
        return e.preventDefault()
    } else {
        console.log('event beforeinstallprompt')
        const btn = document.querySelector('#install')
        btn.hidden = false
        btn.addEventListener('click', () => {
            console.log('install action')
            e.prompt()
        })
        return e.preventDefault()
    }
})


// SERVICE WORKER
if ('serviceWorker' in navigator) {
    alerts.push({
        name: 'Service Worker',
        mensage: 'Suportado',
        type: 1,
        display: 2,
        time: 2000
    })
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./serviceWorker.js').then(() => {
            alerts.push({
                name: 'Service Worker',
                mensage: 'Registrado',
                type: 1,
                display: 2,
                time: 2000
            })
        }).catch(() => {
            alerts.push({
                name: 'Service Worker',
                mensage: 'Erro ao registrar',
                type: 3,
                display: 3,
                time: 2000
            })
        })
    })
} else {
    alerts.push({
        name: 'Service Worker',
        mensage: 'Não suportado pelo navgador',
        type: 3,
        display: 3,
        time: 2000
    })
}
let t = localStorage.getItem('asfar-tutorial')
if (!t || t == null || t == undefined) {
    navbar.newTab('./tutorial/index.html')
    localStorage.setItem('asfar-tutorial', 'true')
}