export class Themes {
    constructor() {
        this.itens = []

        //Tema escuro
        this.push('Green', {
            "background": "#32333D",
            "font": "#FFF",
            "outline-size": "thin",
            "outline-color": "#0AF",
            "header-background": "#27272F",

            "menu-background": "#2C3642",
            "menu-button-background": "#364252",
            "menu-button-hover": "#3F3F49",
            "menu-button-font": "#D9D9D9",
            "menu-button-border": "0",
            "menu-button-radius": "0",
            "menu-activitybar-background": "#1E1E1E",
            "menu-activitybar-label-hover": "#333",

            "bottombar-background": "#424250",
            "bottombar-font": "#D9D9D9",

            "navbar-background": "#37373F",
            "navbar-button-background": "#355",
            "navbar-button-selected": "#4F8F8F",
            "navbar-button-hover": "#4F8F8F",
            "navbar-button-font": "#D9D9D9",
            "navbar-button-border": "0",

            "popup-background": "#555A",
            "popup-font": "#D9D9D9",
            "popup-border": "1px solid #0AF",

            "input-background": "#3D3D47",
            "input-border-color": "#FFF",
            "input-border-focus-color": "#FFF",
            "input-check": "#ADADAD",
            "input-checked": "#EEE",

            "fieldset-border": "2px solid #555",

            "button-background": "#3F3F49",
            "button-hover": "#424250",
            "button-font": "#FFF"
        })

        //Tema claro
        this.push('Light', {
            "background": "#FFF",
            "font": "#000",
            "outline-size": "thin",
            "outline-color": "#0AF",
            "header-background": "#0AF",

            "menu-background": "#2F4F4F",
            "menu-button-background": "#244",
            "menu-button-hover": "#3F6F6F",
            "menu-button-font": "#D9D9D9",
            "menu-button-border": "0",
            "menu-button-radius": "0",
            "menu-activitybar-background": "#1E1E1E",
            "menu-activitybar-label-hover": "#333",

            "bottombar-background": "#0AF",
            "bottombar-font": "#D9D9D9",

            "navbar-background": "#009632",
            "navbar-button-background": "#008C28",
            "navbar-button-selected": "#FFF",
            "navbar-button-hover": "#FFF",
            "navbar-button-font": "#000",
            "navbar-button-border": "0",

            "popup-background": "#555A",
            "popup-font": "#D9D9D9",
            "popup-border": "1px solid #0AF",

            "input-background": "none",
            "input-border-color": "#727272",
            "input-border-focus-color": "#3F51B5",
            "input-check": "#777777",
            "input-checked": "#6200EE",

            "fieldset-border": "2px solid #AAA",

            "button-background": "#3F51B5",
            "button-hover": "#118CFF",
            "button-font": "#FFF"
        })
    }

    push(name, theme){
        this.itens.push({
            name: name,
            theme: theme
        })
    }

    get(i){
        if(i < this.itens.length){
            return this.itens[i].theme
        }
    }

    getKey(i){
        if(i < this.itens.length){
            return this.itens[i].name
        }
    }

    size(){
        return this.itens.length
    }
}