export class AlertsSyncClass {
    constructor() {
        this.alerts = window.parent.alerts || window.alerts
    }

    /**
     * 
     * @param {nome do alerta} name 
     * @param {mensagem do alerta} mensage 
     * @param {tipo de alerta. 1 = passivo, 2 = atencao, 3 = erro} type 
     * @param {exibicao do alerta. 1 = alrta, 2 = console, 3 = ambos} display 
     * @param {tempo de exibicao} time 
     * @param {exibir em console log} c 
     */
    add(name, mensage, type, display, time, c = true) {
        if (c) {
            console.log(name + ': ' + mensage)
        }
        if (this.alerts) {
            this.alerts.push({
                name: name,
                mensage: mensage,
                type: type,
                display: display,
                time: time
            })
        }
    }
}