import { LayoutSyncClass } from '../../script/class/LayoutSyncClass.js'
import { NavbarSyncClass } from '../../script/class/NavbarSyncClass.js'
import { ClienteController } from '../../source/controller/ClienteController.js'

const layout = new LayoutSyncClass()
const sync = new NavbarSyncClass()

const table = document.querySelector('tbody')
if (table) {
    const controller = new ClienteController()
    controller.load.then(() => {
        controller.list.forEach(cliente => {
            const newRow = table.insertRow(table.rows.length)
            newRow.setAttribute('tabindex', '0')

            let newCell = newRow.insertCell(0)
            newCell.innerHTML = `${cliente.getCidadeUF()}
                <br>
                <div class="details">
                    ${cliente.getLogradouro()}
                    <br>
                    ${cliente.getLocalidade()}
                </div>`

            newCell = newRow.insertCell(1)
            newCell.innerHTML = `<a class="text" data-href="../detalhes/index.html?clienteId=${cliente.getId()}">${cliente.getFullNome()}</a>`
        })
    }).catch(() => { })
}