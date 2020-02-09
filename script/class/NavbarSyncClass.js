import { Asfar } from '../../asfar.js'
import { AlertsSyncClass } from './AlertsSyncClass.js'

export class NavbarSyncClass extends Asfar {
    constructor() {
        super()
        this.alert = new AlertsSyncClass()
        this.navbar = window.parent.navbar
        this.tab
        this.id
        this.saved = true
        this.tag = document.querySelector('title')
        this.title = this.tag.text
        this.contextmenu = document.createElement('ul')
        this.contextmenu.setAttribute('class', 'contextmenu')
        this.contextmenu.setAttribute('tabindex', '0')
        document.body.appendChild(this.contextmenu)
        document.body.addEventListener('click', e => { // LINKS
            if (e.target.hasAttribute('data-href')) {
                this._openLink(e.target)
            }
            else if (e.target.parentNode) {
                if (
                    e.target.parentNode.tagName == 'TR' ||
                    e.target.parentNode.tagName == 'TD' ||
                    e.target.parentNode.tagName == 'TH'
                ) {
                    if (e.target.parentNode.hasAttribute('data-href') && e.target.parentNode.hasAttribute('tabindex')) {
                        if (e.target.parentNode.getAttribute('tabindex') == '0') {
                            this._openLink(e.target.parentNode)
                        }
                    }
                }
            }
        })
        document.body.addEventListener('contextmenu', e => { // CONTEXT LINKS
            if (e.target.hasAttribute('data-href')) {
                e.preventDefault()
                const href = e.target.getAttribute('data-href')
                this.setContextMenuLinks(href, e.x, e.y)
            }
        })
        window.onload = () => {
            if (this.navbar) {
                for (let i in this.navbar.tabs) {
                    if (this.navbar.has(i)) {
                        let iframe = this.navbar.tabs[i].iframe.contentDocument || this.navbar.tabs[i].iframe.contentWindow.document
                        if (iframe == document) {
                            this.tab = this.navbar.tabs[i]
                            this.id = i
                            break
                        }
                    }
                }
                this.navbar.setTabTitle(this.id, this.title, window.location.href)
                this.tab.iframe.setAttribute('class', 'selected')
            }
            else {
                this.alert.add(
                    'Bloqueio de quadro de origem cruzada',
                    'Não foi possivel estabelecer sincronia entre iframe e pagina principal.',
                    2,
                    2,
                    2000
                )
            }
        }
        window.navbar = this
    }

    unsave() {
        if (this.saved == true) {
            this.tag.text = `* ${this.title}`
            this.saved = false
            if (this.navbar) {
                this.navbar.setTabUnsaved(this.id)
            }
        }
    }

    save() {
        if (this.saved == false) {
            this.tag.text = this.title
            this.saved = true
            if (this.navbar) {
                this.navbar.setTabSaved(this.id)
            }
        }
    }

    setTitle(s) {
        if (typeof s == 'string') {
            this.title = s.trim().toLowerCase()
            if (this.saved) {
                this.tag.text = this.title
            }
            else {
                this.tag.text = `* ${this.title}`
            }
            if (this.navbar) {
                this.navbar.setTabTitle(this.id, this.title, window.location.href)
            }
        }
    }

    goTab(href, target = '_self') {
        if (target == '_self') {
            let grant = true
            if (this.saved == false) {
                grant = confirm("Realmente deseja descartar o documento selecionado?")
            }
            if (grant) {
                if (this.tab) {
                    this.tab.iframe.setAttribute('class', 'loading')
                }
                else {
                    console.log('Propriedade de carregamento em iframe nao definida')
                }
                if (href == 'reload') {
                    window.location.reload()
                }
                else {
                    window.location.href = href
                }
            }
        }
        else if (target == '_blank') {
            if (href == 'reload') {
                if (this.navbar) {
                    this.navbar.newTab(window.location.href)
                }
                else {
                    window.open(window.location.href, '_blank')
                }
            }
            else {
                if (this.navbar) {
                    this._createIframe(href)
                }
                else {
                    window.open(href, '_blank')
                }
            }
        }
    }

    _createIframe(href) {
        const i = document.createElement('iframe')
        i.setAttribute('src', href)
        document.body.appendChild(i)
        i.style.display = 'none'
        this._waitIframeLoad(i)
    }

    _waitIframeLoad(i, j = 0) {
        j += 1
        console.log(j)
        let c = true
        if (i.contentWindow) {
            if (i.contentWindow.location) {
                if (i.contentWindow.location.href) {
                    if (i.contentWindow.location.href != 'about:blank') {
                        this.navbar.newTab(i.contentWindow.location.href)
                        c = false
                        i.remove()
                    }
                }
            }
        }
        if (c) {
            if (j > 50) { //Em 5s desiste
                this.alert.add(
                    'Carregar',
                    'Não foi possivel carregar o destino, verifique sua conexão ou tente novamente mais tarde.',
                    2,
                    1,
                    3000
                )
                i.remove()
            }
            else {
                window.setTimeout(() => { this._waitIframeLoad(i, j) }, 100)
            }
        }
    }

    _openLink(e) {
        if (e.hasAttribute('data-href')) {
            const href = e.getAttribute('data-href')
            if (e.hasAttribute('data-target')) {
                this.goTab(href, e.getAttribute('data-target'))
            }
            else {
                this.goTab(href)
            }
        }
    }

    setContextMenuLinks(href, x, y) {
        if (typeof this.contextmenu == 'object') {
            if (this.contextmenu.constructor.name == 'HTMLUListElement') {
                this.contextmenu.innerHTML = `<li data-href="${href}">Abrir</li>
                    <li data-href="${href}" data-target="_blank">Abrir em nova aba</li>`
                this.contextmenu.focus()
                const windowWidth = window.innerWidth;
                if ((this.contextmenu.offsetWidth + x) > windowWidth) {
                    x = windowWidth - (this.contextmenu.offsetWidth + (windowWidth - x))
                }
                const windowHeight = window.innerHeight;
                if ((this.contextmenu.offsetHeight + y) > windowHeight) {
                    y = windowHeight - (this.contextmenu.offsetHeight + (windowHeight - y))
                }
                this.contextmenu.style.top = `${y}px`
                this.contextmenu.style.left = `${x}px`
                return true
            }
        }
        return false
    }
}