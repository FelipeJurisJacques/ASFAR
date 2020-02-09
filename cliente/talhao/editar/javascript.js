import { InputFieldClass } from '../../../script/util/InputFieldClass.js'
import { LayoutSyncClass } from '../../../script/class/LayoutSyncClass.js'
import { NavbarSyncClass } from '../../../script/class/NavbarSyncClass.js'
import { ClienteController } from '../../../source/controller/ClienteController.js'
import { TalhaoController } from '../../../source/controller/TalhaoController.js'

const inputs = new InputFieldClass()
const layout = new LayoutSyncClass()
const sync = new NavbarSyncClass()

const form = document.querySelector('form')
if (form) {

    const clienteController = new ClienteController(false)
    clienteController.load.then(() => {
        const cliente = clienteController.cliente
        layout.setTitle(cliente.getFullNome())
        layout.setLinkBack(`../../detalhes/index.html?clienteId=${clienteController.id}`)

        // CARREGA OS SELECTS ASSINCRONOS
        cliente.getMatricula().forEach(e => {
            const option = document.createElement('option')
            option.innerHTML = e
            option.setAttribute('value', e)
            matricula.appendChild(option)
        })

        const controller = new TalhaoController(false)
        controller.load(clienteController).then(() => {
            const talhao = controller.talhao

            if (!isNaN(controller.id)) {
                layout.setLinkBack(`../detalhes/index.html?clienteId=${clienteController.id}&talhaoId=${controller.id}`)
                sync.setTitle('editar talhão')
            }

            inputs.insertValue(document.getElementsByName('nome')[0], talhao.getNome())
            inputs.insertValue(document.getElementsByName('matricula')[0], talhao.getMatricula())
            inputs.insertValue(document.getElementsByName('area')[0], talhao.getArea())
            inputs.insertValue(document.getElementsByName('longitude')[0], talhao.getCoordenadas().getLongitude())
            inputs.insertValue(document.getElementsByName('latitude')[0], talhao.getCoordenadas().getLatitude())
            inputs.insertValue(document.getElementsByName('elevacao')[0], talhao.getCoordenadas().getElevation())
            controller.setMap(document.querySelector('div#map'), talhao)

            // FORMULARIO
            form.addEventListener('change', e => {
                if (
                    e.target.tagName == 'INPUT' ||
                    e.target.tagName == 'SELECT'
                ) {
                    let i = e.target
                    inputs.clearInput(i)
                    if (i.name == 'nome') {
                        if (talhao.setNome(i.value)) {
                            i.value = talhao.getNome()
                        }
                        else {
                            inputs.setInvalid(i)
                        }
                    }
                    else if (i.name == 'matricula') {
                        if (talhao.setMatricula(i.value)) {
                            i.value = talhao.getMatricula()
                        }
                        else {
                            inputs.setInvalid(i)
                        }
                    }
                    else if (i.name == 'area') {
                        if (talhao.setArea(i.value)) {
                            i.value = talhao.getArea()
                        }
                        else {
                            inputs.setInvalid(i)
                        }
                    }
                    else if (i.name == 'file') {
                        talhao.setKml(i.files[0]).then(() => {
                            inputs.setValid(i)
                            let c = talhao.getCoordenadas()
                            inputs.insertValue(document.getElementsByName('longitude')[0], c.getLongitude())
                            inputs.insertValue(document.getElementsByName('latitude')[0], c.getLatitude())
                        }).catch(e => {
                            inputs.setHelpInvalid(i, e)
                            inputs.setInvalid(i)
                            let c = talhao.getCoordenadas()
                            inputs.insertValue(document.getElementsByName('longitude')[0], c.getLongitude())
                            inputs.insertValue(document.getElementsByName('latitude')[0], c.getLatitude())
                        }).finally(() => {
                            controller.setMap(document.querySelector('div#map'), talhao)
                        })
                    }
                    else if (i.name == 'longitude') {
                        const c = talhao.getCoordenadas()
                        if (c.setLongitude(i.value)) {
                            i.value = c.getLongitude()
                        }
                        else {
                            inputs.setInvalid(i)
                        }
                        talhao.setCoordenadas(c)
                        controller.setMap(document.querySelector('div#map'), talhao)
                    }
                    else if (i.name == 'latitude') {
                        const c = talhao.getCoordenadas()
                        if (c.setLatitude(i.value)) {
                            i.value = c.getLatitude()
                        }
                        else {
                            inputs.setInvalid(i)
                        }
                        talhao.setCoordenadas(c)
                        controller.setMap(document.querySelector('div#map'), talhao)
                    }
                    else if (i.name == 'elevacao') {
                        const c = talhao.getCoordenadas()
                        if (c.setElevation(i.value)) {
                            i.value = c.getElevation()
                        }
                        else {
                            inputs.setInvalid(i)
                        }
                        talhao.setCoordenadas(c)
                        controller.setMap(document.querySelector('div#map'), talhao)
                    }
                    console.log(talhao)
                    sync.unsave()
                }
            })

            // SALVA FORMULARIO
            form.addEventListener('submit', e => {
                e.preventDefault()
                controller.save(talhao, '../detalhes/index.html')
            })
        })
    })
}