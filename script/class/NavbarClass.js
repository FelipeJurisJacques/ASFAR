import { Asfar } from '../../asfar.js'

export class NavBarClass extends Asfar {
    constructor() {
        super()
        this.tabs = {}
        this.current = 0
        this.bar = document.querySelector('div.navbar div.content div')
        this.container = document.querySelector('div.container')
        this.background = document.querySelector('main')
        this.id = 0
        window.navbar = this
    }

    has(key) {
        return key in this.tabs
    }

    hiddenAll() {
        for (let i in this.tabs) {
            this.tabs[i].tab.setAttribute('class', 'unselected tab')
            this.tabs[i].iframe.setAttribute('class', 'unselected')
        }
    }

    select(i) {
        console.log('selecionando aba id: ' + i)
        if (this.has(i)) {
            this.hiddenAll()
            this.tabs[i].tab.setAttribute('class', 'selected tab')
            this.tabs[i].iframe.setAttribute('class', 'selected')
            this.current = i
            return true
        }
        console.log('selecao negada')
        return false
    }

    remove(i) {
        console.log('removendo aba id: ' + i)
        if (this.has(i)) {
            let grant = true
            if (this.tabs[i].saved == false) {
                grant = confirm("Realmente deseja descartar o documento selecionado?")
            }
            if (grant) {
                this.tabs[i].iframe.parentNode.removeChild(this.tabs[i].iframe)
                this.tabs[i].tab.parentNode.removeChild(this.tabs[i].tab)
                delete this.tabs[i]
                if (this.size() > 0) {
                    if (i == this.current) {
                        this._autoSelect()
                    }
                }
                else {
                    this.background.removeAttribute('class')
                }
                return true
            }
        }
        return false
    }

    setTabTitle(i, title, href) {
        this.tabs[i].title = title
        this.tabs[i].saved = true
        this._showTabTitle(i)
        this.tabs[i].tab.setAttribute('title', href)
    }

    setTabSaved(i) {
        this.tabs[i].saved = true
        this._showTabTitle(i)
    }

    setTabUnsaved(i) {
        this.tabs[i].saved = false
        this._showTabTitle(i)
    }

    newTab(src) {
        if (typeof src == 'string') {
            const id = this._generateId()
            const tab = document.createElement('button')
            tab.setAttribute('class', 'selected tab')
            tab.setAttribute('title', src)
            tab.setAttribute('id', id)
            const close = document.createElement('div')
            tab.appendChild(close)
            tab.innerHTML += src
            this.bar.appendChild(tab)
            const iframe = document.createElement('iframe')
            iframe.setAttribute('class', 'loading')
            iframe.setAttribute('src', src)
            this.container.appendChild(iframe)
            const obj = {
                title: src, //string
                tab: tab,//element
                close: close,//element
                iframe: iframe,//element
                saved: true,//bolean
                sync: false//bolean
            }
            this.hiddenAll()
            this.tabs[id] = obj
            this.current = id
            this.background.setAttribute('class', 'loading')
            return true
        }
        return false
    }

    _generateId() {
        let id = this.id
        this.id += 1
        return id
    }

    _showTabTitle(i) {
        this.bar.appendChild(this.tabs[i].close)
        this.tabs[i].tab.innerHTML = ''
        this.tabs[i].tab.appendChild(this.tabs[i].close)
        if (this.tabs[i].saved == true) {
            this.tabs[i].tab.innerHTML += this.tabs[i].title
        }
        else {
            this.tabs[i].tab.innerHTML += '* ' + this.tabs[i].title
        }
    }

    _autoSelect() {
        for (let i in this.tabs) {
            console.log('reselecionando primeira aba id:' + i)
            this.tabs[i].tab.setAttribute('class', 'selected tab')
            this.tabs[i].iframe.setAttribute('class', 'selected')
            this.current = i
            break
        }
    }

    size() {
        let j = 0
        for (let i in this.tabs) {
            j++
        }
        return j
    }
}