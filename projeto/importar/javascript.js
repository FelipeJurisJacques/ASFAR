import { LayoutSyncClass } from '../../script/class/LayoutSyncClass.js'
import { NavbarSyncClass } from '../../script/class/NavbarSyncClass.js'
import { ProjetoController } from '../../source/controller/ProjetoController.js'

const layout = new LayoutSyncClass()
const sync = new NavbarSyncClass()
const controller = new ProjetoController()

const file = document.getElementsByName('file')[0]
const main = document.querySelector('main')

if (file) {
    file.addEventListener('change', () => {
        if (main) {
            main.innerHTML = ''
            main.append(controller.getLog())
        }
        controller.import(file.files[0])
        file.value = ''
    })
}