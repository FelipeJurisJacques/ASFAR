import { Asfar } from '../../asfar.js'
import { Themes } from '../../themes.js'
import { AlertsSyncClass } from './AlertsSyncClass.js'

export class LayoutClass extends Asfar {
    constructor() {
        super()
        this.themes = new Themes()
        this.alert = new AlertsSyncClass()
        this.root = document.querySelector(':root')
        this.theme = 0
        this.media = 'HD'
        this.getMedia()
        this.load()
        this.save()
        window.onresize = () => {
            this.getMedia()
            const i = document.querySelectorAll('iframe')
            try {
                i.forEach(e => {
                    e.contentWindow.layout.setMedia(this.media)
                })
            }
            catch (e) { }
            this.save()
        }
        window.layout = this
    }

    load() {
        try {
            let c = localStorage.getItem(this.storageConfig)
            if (c) {
                c = JSON.parse(c)
                if (c.theme) {
                    if (c.theme != this.theme) {
                        this.setTheme(c.theme, false)
                    }
                }
            }
        } catch (e) { }
    }

    getMedia() {
        const windowWidth = window.innerWidth;
        // const windowHeight = window.innerHeight;

        // const screenWidth = screen.width;
        // const screenHeight = screen.height;

        if (windowWidth <= 320) {
            this.media = 'CGA'
        }
        else if (windowWidth <= 640) {
            this.media = 'VGA'
        }
        else if (windowWidth <= 800) {
            this.media = 'SVGA'
        }
        else if (windowWidth <= 1024) {
            this.media = 'XGA'
        }
        else if (windowWidth <= 1280) {
            this.media = 'SXGA'
        }
        else if (windowWidth <= 1366) {
            this.media = 'WXGA'
        }
        else if (windowWidth <= 1400) {
            this.media = 'SXGA+'
        }
        else if (windowWidth <= 1440) {
            this.media = 'WXGA+'
        }
        else if (windowWidth <= 1600) {
            this.media = 'UXGA'
        }
        else if (windowWidth <= 1680) {
            this.media = 'WSXGA+'
        }
        else if (windowWidth <= 1920) {
            this.media = 'WUXGA'
        }
        else if (windowWidth <= 2048) {
            this.media = 'QXGA'
        }
        else {
            this.media = 'HD'
        }
        console.log('Resolucao atual: ' + this.media)
    }

    save() {
        const c = JSON.stringify({
            'theme': this.theme,
            'media': this.media
        })
        try {
            localStorage.setItem(this.storageConfig, c)
        } catch (e) { }
    }

    setTheme(i, notification = true) {
        // ALTERA ID DO TEMA
        if (i == -1) {
            this.theme += 1
            if (this.theme >= this.themes.size()) {
                this.theme = 0
            }
        } else {
            this.theme = parseInt(i)
        }
        // CARREGA TEMA
        const theme = this.themes.get(this.theme)
        if (theme) {
            for (let i in theme) {
                this.root.style.setProperty('--' + i, theme[i])
            }
        }
        // CARREGA TEMA NOS IFRAMES
        const ifr = document.querySelectorAll('iframe')
        try {
            ifr.forEach(e => {
                e.contentWindow.layout.setTheme(this.theme)
            })
        }
        catch (e) { }
        this.save()
        if (notification) {
            this.alert.add(
                'Tema alterado',
                'Tema selecionado: ' + this.themes.getKey(this.theme),
                1,
                3,
                2000
            )
        }
    }
}