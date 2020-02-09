import { InputFieldClass } from '../../script/util/InputFieldClass.js'
import { LayoutSyncClass } from '../../script/class/LayoutSyncClass.js'
import { NavbarSyncClass } from '../../script/class/NavbarSyncClass.js'
import { ProjetoController } from '../../source/controller/ProjetoController.js'

const inputs = new InputFieldClass()
const layout = new LayoutSyncClass()
const sync = new NavbarSyncClass()
const controller = new ProjetoController()
const main = document.querySelector('main')

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()
    if (main) {
        main.appendChild(controller.getLog())
    }
    controller.export(document.getElementsByName('nome')[0].value)
})