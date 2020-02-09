import { LayoutSyncClass } from '../../script/class/LayoutSyncClass.js'
import { NavbarSyncClass } from '../../script/class/NavbarSyncClass.js'
import { ClienteController } from '../../source/controller/ClienteController.js'
import { TalhaoController } from '../../source/controller/TalhaoController.js'

const layout = new LayoutSyncClass()
const sync = new NavbarSyncClass()
const controller = new ClienteController()

controller.load.then(() => {
    layout.setTitle(controller.cliente.getFullNome())
    const action = document.querySelector('#novotalhao')
    if (action) {
        action.setAttribute('data-href', `../talhao/editar/index.html?clienteId=${controller.id}`)
    }
    const editar = document.querySelector('button#editar')
    if (editar) {
        editar.setAttribute('data-href', `../editar/index.html?clienteId=${controller.id}`)
    }
    document.body.addEventListener('click', e => {
        if (e.target.tagName == 'BUTTON') {
            if (e.target.id == 'excluir') {
                controller.delete(controller.cliente, '../lista/index.html')
            }
        }
    })

    const cliente = document.querySelector('#cliente')
    if (cliente) {
        cliente.innerHTML = controller.cliente.getFullNome()
    }
    const cpf = document.querySelector('#cpf')
    if (cpf) {
        cpf.innerHTML = controller.cliente.getCpf()
    }
    const matricula = document.querySelector('#matricula')
    if (matricula) {
        matricula.innerHTML = controller.cliente.getMatricula()
    }
    const cep = document.querySelector('#cep')
    if (cep) {
        cep.innerHTML = controller.cliente.getCep()
    }
    const cidade = document.querySelector('#cidade')
    if (cidade) {
        cidade.innerHTML = controller.cliente.getCidade()
    }
    const uf = document.querySelector('#uf')
    if (uf) {
        uf.innerHTML = controller.cliente.getUf()
    }
    const localidade = document.querySelector('#localidade')
    if (localidade) {
        localidade.innerHTML = controller.cliente.getLocalidade()
    }
    const logradouro = document.querySelector('#logradouro')
    if (logradouro) {
        logradouro.innerHTML = controller.cliente.getLogradouro()
    }
    const numero = document.querySelector('#numero')
    if (numero) {
        numero.innerHTML = controller.cliente.getNumero()
    }
    const bairro = document.querySelector('#bairro')
    if (bairro) {
        bairro.innerHTML = controller.cliente.getBairro()
    }
    const complemento = document.querySelector('#complemento')
    if (complemento) {
        complemento.innerHTML = controller.cliente.getComplemento()
    }
    const cell = document.querySelector('#cell')
    if (cell) {
        cell.innerHTML = controller.cliente.getCell()
    }
    const email = document.querySelector('#email')
    if (email) {
        email.innerHTML = controller.cliente.getEmail()
    }

    const talhaoController = new TalhaoController()
    talhaoController.load(controller).then(() => {

        const table = document.querySelector('table tbody#talhaoList')
        if (table) {
            talhaoController.list.forEach(talhao => {
                const newRow = table.insertRow(table.rows.length)
                newRow.setAttribute('tabindex', '0')

                let newCell = newRow.insertCell(0)
                newCell.innerHTML = `<a class="text" data-href="../talhao/detalhes/index.html?clienteId=${controller.id}&talhaoId=${talhao.getId()}">${talhao.getNome()}</a>`

                newCell = newRow.insertCell(1)
                newCell.innerHTML = `<div class="summary">
                    ${talhao.getArea()}
                    </div>
                    <div class="details">
                        Área: ${talhao.getArea()}
                        <br>
                        Matrícula: ${talhao.getMatricula()}
                    </div>`

                newCell = newRow.insertCell(2)
                newCell.innerHTML = talhaoController.getIcon(talhao)
            })
        }
    }).catch(e => {
        console.log(e)
    })
}).catch(e => {
    console.log(e)
})