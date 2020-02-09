import { Asfar } from '../../asfar.js'

export class AlertsClass extends Asfar {
    constructor() {
        super()
        this.alerts = []
        this.executing = false
        this.timeout = undefined
        this.popup = {
            element: document.createElement('div'),
            content: document.createElement('div'),
            icon: document.createElement('div'),
            close: document.createElement('div')
        }
        this.popup.element.setAttribute('id', 'popup')
        this.popup.content.setAttribute('id', 'content')
        this.popup.icon.setAttribute('id', 'icon')
        this.popup.close.setAttribute('id', 'close')
        this.popup.close.setAttribute('tabindex', '0')
        this.popup.element.appendChild(this.popup.content)
        this.popup.element.appendChild(this.popup.icon)
        this.popup.element.appendChild(this.popup.close)
        document.body.appendChild(this.popup.element)
        this.console = document.querySelector('#console')
        window.alerts = this
    }

    push(a) {
        if (a.mensage) {
            const name = a.name.trim() || 'Alerta'
            const type = parseInt(a.type) || 1
            const display = parseInt(a.display) || 1
            const time = parseInt(a.time) || 2000
            this.alerts.push({
                name: name,
                mensage: a.mensage,
                type: type,
                display: display,
                time: time
            })
        }
        if (this.executing == false) {
            this.execute()
        }
    }

    execute() {
        this.executing = true
        if (this.alerts.length > 0) {
            const a = this.alerts.shift()
            if (a.display == 1 || a.display == 3) {
                this.popup.element.setAttribute('class', 'active')
                this.popup.content.innerHTML = `<b>${a.name}</b><br>${a.mensage}`
                if (a.type == 1) {
                    this.popup.icon.setAttribute('class', 'success')
                } else if (a.type == 2) {
                    this.popup.icon.setAttribute('class', 'alert')
                } else {
                    this.popup.icon.setAttribute('class', 'error')
                }
            }
            if (a.display == 2 || a.display == 3) {
                this.console.innerHTML = `${a.name}: ${a.mensage}`
            }
            this.timeout = window.setTimeout(() => { this.execute() }, a.time)
        }
        else {
            this.executing = false
            this.popup.element.removeAttribute('class')
        }
    }

    close() {
        if (this.popup.element.className == 'active') {
            this.popup.element.focus()
            if (this.timeout) {
                clearTimeout(this.timeout)
                this.execute()
            }
        }
    }
}