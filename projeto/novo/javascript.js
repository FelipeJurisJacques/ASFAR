import { LayoutSyncClass } from '../../script/class/LayoutSyncClass.js'
import { NavbarSyncClass } from '../../script/class/NavbarSyncClass.js'
import { ProjetoController } from '../../source/controller/ProjetoController.js'

const layout = new LayoutSyncClass()
const sync = new NavbarSyncClass()
const projetoController = new ProjetoController()

document.querySelector('button').addEventListener('click', () => {
    projetoController.create('../../configuracao/editar/index.html')
})