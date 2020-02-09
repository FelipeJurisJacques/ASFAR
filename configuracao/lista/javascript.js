import { LayoutSyncClass } from '../../script/class/LayoutSyncClass.js'
import { NavbarSyncClass } from '../../script/class/NavbarSyncClass.js'
import { ConfiguracaoController } from '../../source/controller/ConfiguracaoController.js'

const layout = new LayoutSyncClass()
const sync = new NavbarSyncClass()

const table = document.querySelector('tbody')
if (table) {
    const controller = new ConfiguracaoController()
    controller.load.then(() => {
        const list = controller.list
        for (let i = 0; i < list.length; i++) {
            let newRow = table.insertRow(table.rows.length)
            newRow.setAttribute('tabindex', '0')
            newRow.insertCell(0).innerHTML = `<a class="text" data-href="../detalhes/index.html?configuracaoId=${list[i].getId()}">${list[i].getTitulo()} - ${list[i].getAno()}</a>`
        }
    }).catch(e => {
        console.log(e)
    })
}