import { Asfar } from '../../asfar.js'
import { Themes } from '../../themes.js'

export class LayoutSyncClass extends Asfar {
    constructor() {
        super()
        this.themes = new Themes()
        this.root = document.querySelector(':root')
        this.theme = 0
        this.media = 'HD'
        this.header = document.querySelector('div#header') || document.querySelector('div#header-hidden')
        try {
            let c = localStorage.getItem(this.storageConfig)
            if (c) {
                c = JSON.parse(c)
                if (c.theme) {
                    this.setTheme(c.theme)
                }
                if (c.media) {
                    this.setMedia(c.media)
                }
            }
        } catch (e) { }
        window.layout = this
    }

    setTheme(s) {
        this.theme = s
        const t = this.themes.get(s)
        if (t) {
            for (let i in t) {
                this.root.style.setProperty('--' + i, t[i])
            }
        }
    }

    setMedia(m) {
        this.media = m
        if (this.header) {
            if (
                this.media == 'CGA' ||
                this.media == 'VGA' ||
                this.media == 'SVGA'
            ) {
                this.header.setAttribute('class', 'header show')
                document.body.setAttribute('class', 'headerSpace')
            }
            else {
                this.header.setAttribute('class', 'header')
                document.body.setAttribute('class', '')
            }
        }
    }

    confirm(mensage) {
        return new Promise((resolve, reject) => {
            if (typeof mensage == 'string') {
                const confirm = document.createElement('div')
                confirm.setAttribute('class', 'confirm')
                confirm.innerHTML = `<div class="mensage">
                    ${mensage.trim()}
                </div>
                <div class="action">
                    <button class="contained" id="y">SIM</button>
                    <button class="contained red" id="n">NÂO</button>
                </div>`
                document.body.appendChild(confirm)
                confirm.addEventListener('click', e => {
                    if (e.target.id == 'y') {
                        confirm.remove()
                        resolve(true)
                    }
                    else {
                        confirm.remove()
                        resolve(false)
                    }
                })
            }
            else {
                reject(false)
            }
        })
    }

    dialog(mensage) {
        if (typeof mensage == 'string') {
            const confirm = document.createElement('div')
            confirm.setAttribute('class', 'confirm')
            confirm.innerHTML = `<div class="mensage">
                    ${mensage.trim()}
                </div>
                <div class="action">
                    <button class="contained" id="n">ok</button>
                </div>`
            document.body.appendChild(confirm)
            confirm.addEventListener('click', e => {
                confirm.remove()
            })
        }
    }

    setTitle(s) {
        const title = document.querySelector('div#header b')
        if (title) {
            if (typeof s == 'string') {
                title.innerHTML = s.trim().toLowerCase()
            }
        }
    }

    setLinkBack(url) {
        const array = document.querySelectorAll('div#header .back')
        array.forEach(e => {
            e.setAttribute('data-href', url)
        })
    }
}