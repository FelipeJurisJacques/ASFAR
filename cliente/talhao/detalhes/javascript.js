import { LayoutSyncClass } from '../../../script/class/LayoutSyncClass.js'
import { NavbarSyncClass } from '../../../script/class/NavbarSyncClass.js'
import { ClienteController } from '../../../source/controller/ClienteController.js'
import { TalhaoController } from '../../../source/controller/TalhaoController.js'
import { AnaliseSoloController } from '../../../source/controller/AnaliseSoloController.js'
import { LaudoSoloController } from '../../../source/controller/LaudoSoloController.js'

const layout = new LayoutSyncClass()
const sync = new NavbarSyncClass()

const clienteController = new ClienteController(false)
const talhaoController = new TalhaoController(false)
const analiseSoloController = new AnaliseSoloController()
const laudoSoloController = new LaudoSoloController()

clienteController.load.then(() => {
    const cliente = clienteController.cliente
    layout.setLinkBack(`../../detalhes/index.html?clienteId=${clienteController.id}`)

    talhaoController.load(clienteController).then(() => {
        const talhao = talhaoController.talhao
        layout.setTitle(`${cliente.getFullNome()} - ${talhao.getNome().toUpperCase()}`)

        const action = document.querySelector('#novaAnaliseSolo')
        if (action) {
            action.setAttribute('data-href', `../../../analisesolo/novo/index.html?clienteId=${clienteController.id}&talhaoId=${talhaoController.id}`)
        }
        const editar = document.querySelector('button#editar')
        if (editar) {
            editar.setAttribute('data-href', `../editar/index.html?clienteId=${clienteController.id}&talhaoId=${talhaoController.id}`)
        }
        document.body.addEventListener('click', e => {
            if (e.target.tagName == 'BUTTON') {
                if (e.target.id == 'excluir') {
                    talhaoController.delete(talhao, '../../detalhes/index.html')
                }
            }
        })

        const nome = document.querySelector('#nome')
        if (nome) {
            nome.innerHTML = talhao.getNome()
        }
        const area = document.querySelector('#area')
        if (area) {
            area.innerHTML = talhao.getArea()
        }
        const matricula = document.querySelector('#matricula')
        if (matricula) {
            matricula.innerHTML = talhao.getMatricula()
        }

        const cord = talhao.getCoordenadas()
        const longitude = document.querySelector('#longitude')
        if (longitude) {
            longitude.innerHTML = cord.getLongitude()
        }
        const latitude = document.querySelector('#latitude')
        if (latitude) {
            latitude.innerHTML = cord.getLatitude()
        }
        const elevacao = document.querySelector('#elevacao')
        if (elevacao) {
            elevacao.innerHTML = cord.getElevation()
        }

        talhaoController.setMap(document.querySelector('#map'), talhao)

        const analiseList = document.querySelector('tbody#analiseList')
        if (analiseList) {
            analiseSoloController.load(talhaoController).then(() => {
                const list = analiseSoloController.list

                for (let i = 0; i < list.length; i++) {
                    let newRow = analiseList.insertRow()
                    newRow.setAttribute('tabindex', '0')
                    newRow.setAttribute('data-href', `../../../analisesolo/detalhes/index.html?clienteId=${clienteController.id}&talhaoId=${talhaoController.id}&analiseSoloId=${list[i].getId()}`)
                    newRow.innerHTML = `<tr>
                            <th>ID ${list[i].getId()}</th>
                            <td>${list[i].getInicio().getDate()}</td>
                        </tr>`
                }
            }).catch(e => {
                console.log(e)
            })
        }
    }).catch(e => {
        console.log(e)
    })
}).catch(e => {
    console.log(e)
})