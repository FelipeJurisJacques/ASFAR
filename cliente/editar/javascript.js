import { InputFieldClass } from '../../script/util/InputFieldClass.js'
import { LayoutSyncClass } from '../../script/class/LayoutSyncClass.js'
import { NavbarSyncClass } from '../../script/class/NavbarSyncClass.js'
import { ClienteController } from '../../source/controller/ClienteController.js'
import { FetchResource } from '../../source/resource/FetchResource.js'

const inputs = new InputFieldClass()
const layout = new LayoutSyncClass()
const sync = new NavbarSyncClass()

const form = document.querySelector('form')
if (form) {

    const controller = new ClienteController(false)
    controller.load.then(() => {
        const cliente = controller.cliente

        if (!isNaN(controller.id)) {
            sync.setTitle('editar cliente')
            layout.setTitle(cliente.getFullNome())
            layout.setLinkBack(`../detalhes/index.html?clienteId=${controller.id}`)
        }

        inputs.insertValue(document.getElementsByName('nome')[0], cliente.getNome())
        inputs.insertValue(document.getElementsByName('sobrenome')[0], cliente.getApelido())
        inputs.insertValue(document.getElementsByName('cpf')[0], cliente.getCpf())
        inputs.insertValue(document.getElementsByName('matricula')[0], cliente.getMatricula())
        inputs.insertValue(document.getElementsByName('cep')[0], cliente.getCep())
        inputs.insertValue(document.getElementsByName('cidade')[0], cliente.getCidade())
        inputs.insertValue(document.getElementsByName('uf')[0], cliente.getUf())
        inputs.insertValue(document.getElementsByName('localidade')[0], cliente.getLocalidade())
        inputs.insertValue(document.getElementsByName('logradouro')[0], cliente.getLogradouro())
        inputs.insertValue(document.getElementsByName('numero')[0], cliente.getNumero())
        inputs.insertValue(document.getElementsByName('bairro')[0], cliente.getBairro())
        inputs.insertValue(document.getElementsByName('complemento')[0], cliente.getComplemento())
        inputs.insertValue(document.getElementsByName('cell')[0], cliente.getCell())
        inputs.insertValue(document.getElementsByName('email')[0], cliente.getEmail())

        form.addEventListener('change', e => {
            if (e.target.tagName == 'INPUT') {
                let i = e.target
                inputs.clearInput(i)
                if (i.name == 'nome') {
                    if (cliente.setNome(i.value)) {
                        i.value = cliente.getNome()
                    }
                    else {
                        inputs.setInvalid(i)
                    }
                }
                else if (i.name == 'sobrenome') {
                    if (cliente.setApelido(i.value)) {
                        i.value = cliente.getApelido()
                    }
                    else {
                        inputs.setInvalid(i)
                    }
                }
                else if (i.name == 'cpf') {
                    if (cliente.setCpf(i.value)) {
                        i.value = cliente.getCpf()
                    }
                    else {
                        inputs.setInvalid(i)
                    }
                }
                else if (i.name == 'matricula') {
                    if (cliente.setMatricula(i.value)) {
                        i.value = cliente.getMatricula()
                    }
                    else {
                        inputs.setInvalid(i)
                    }
                }
                else if (i.name == 'cep') {
                    if (cliente.setCep(i.value)) {
                        i.value = cliente.getCep()
                        const request = new FetchResource()
                        request.GET("https://viacep.com.br/ws/" + cliente.getCepInt() + "/json/").then(e => {
                            if (e.localidade) {
                                cliente.setCidade(e.localidade)
                                document.getElementsByName('cidade')[0].value = cliente.getCidade()
                                document.getElementsByName('cidade')[0].disabled = true
                                inputs.validity(i)
                            }
                            else {
                                document.getElementsByName('cidade')[0].disabled = false
                            }
                            if (e.uf) {
                                cliente.setUf(e.uf)
                                document.getElementsByName('uf')[0].value = cliente.getUf()
                                document.getElementsByName('uf')[0].disabled = true
                                inputs.validity(i)
                            }
                            else {
                                document.getElementsByName('uf')[0].disabled = false
                            }
                            if (e.logradouro) {
                                cliente.setLogradouro(e.logradouro)
                                document.getElementsByName('logradouro')[0].value = cliente.getLogradouro()
                                inputs.validity(i)
                            }
                            if (e.bairro) {
                                cliente.setBairro(e.bairro)
                                document.getElementsByName('bairro')[0].value = cliente.getBairro()
                                inputs.validity(i)
                            }
                            if (e.complemento) {
                                cliente.setComplemento(e.complemento)
                                document.getElementsByName('complemento')[0].value = cliente.getComplemento()
                                inputs.validity(i)
                            }
                        }).catch(() => {
                            document.getElementsByName('cidade')[0].disabled = false
                            document.getElementsByName('uf')[0].disabled = false
                        })
                    }
                    else {
                        inputs.setInvalid(i)
                    }
                }
                else if (i.name == 'cidade') {
                    if (cliente.setCidade(i.value)) {
                        i.value = cliente.getCidade()
                    }
                    else {
                        inputs.setInvalid(i)
                    }
                }
                else if (i.name == 'uf') {
                    if (cliente.setUf(i.value)) {
                        i.value = cliente.getUf()
                    }
                    else {
                        inputs.setInvalid(i)
                    }
                }
                else if (i.name == 'localidade') {
                    if (cliente.setLocalidade(i.value)) {
                        i.value = cliente.getLocalidade()
                    }
                    else {
                        inputs.setInvalid(i)
                    }
                }
                else if (i.name == 'logradouro') {
                    if (cliente.setLogradouro(i.value)) {
                        i.value = cliente.getLogradouro()
                    }
                    else {
                        inputs.setInvalid(i)
                    }
                }
                else if (i.name == 'numero') {
                    if (cliente.setNumero(i.value)) {
                        i.value = cliente.getNumero()
                    }
                    else {
                        inputs.setInvalid(i)
                    }
                }
                else if (i.name == 'bairro') {
                    if (cliente.setBairro(i.value)) {
                        i.value = cliente.getBairro()
                    }
                    else {
                        inputs.setInvalid(i)
                    }
                }
                else if (i.name == 'complemento') {
                    if (cliente.setComplemento(i.value)) {
                        i.value = cliente.getComplemento()
                    }
                    else {
                        inputs.setInvalid(i)
                    }
                }
                else if (i.name == 'cell') {
                    if (cliente.setCell(i.value)) {
                        i.value = cliente.getCell()
                    }
                    else {
                        inputs.setInvalid(i)
                    }
                }
                else if (i.name == 'email') {
                    if (cliente.setEmail(i.value)) {
                        i.value = cliente.getEmail()
                    }
                    else {
                        inputs.setInvalid(i)
                    }
                }
                console.log(cliente)
                sync.unsave()
            }
        })

        // SALVA FORMULARIO
        form.addEventListener('submit', e => {
            e.preventDefault()
            controller.save(cliente, '../detalhes/index.html')
        })
    })
}