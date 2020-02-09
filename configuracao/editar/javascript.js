import { InputFieldClass } from '../../script/util/InputFieldClass.js'
import { LayoutSyncClass } from '../../script/class/LayoutSyncClass.js'
import { NavbarSyncClass } from '../../script/class/NavbarSyncClass.js'
import { ConfiguracaoController } from '../../source/controller/ConfiguracaoController.js'

const inputs = new InputFieldClass()
const layout = new LayoutSyncClass()
const sync = new NavbarSyncClass()

const form = document.querySelector('form')
if (form) {
    const configuracaoController = new ConfiguracaoController(false)
    configuracaoController.load.then(() => {
        const configuracao = configuracaoController.configuracao

        form.addEventListener('change', e => {
            if (
                e.target.tagName == 'INPUT' ||
                e.target.tagName == 'SELECT'
            ) {
                let i = e.target
                if (i.name == 'titulo') {
                    if (configuracao.setTitulo(i.value)) {
                        i.value = configuracao.getTitulo()
                    }
                    else {
                        inputs.setInvalid(i)
                    }
                }
                if (i.name == 'ano') {
                    if (configuracao.setAno(i.value)) {
                        i.value = configuracao.getAno()
                    }
                    else {
                        inputs.setInvalid(i)
                    }
                }
                if (i.name == 'autor') {
                    if (configuracao.setAutor(i.value)) {
                        i.value = configuracao.getAutor()
                    }
                    else {
                        inputs.setInvalid(i)
                    }
                }
                if (i.name == 'tipo') {
                    if (configuracao.setTipo(i.value)) {
                        i.value = configuracao.getTipo()
                    }
                    else {
                        inputs.setInvalid(i)
                    }
                }
                if (i.name == 'regiao') {
                    if (configuracao.setRegiao(i.value)) {
                        i.value = configuracao.getRegiao()
                    }
                    else {
                        inputs.setInvalid(i)
                    }
                }
                console.log(configuracao)
                sync.unsave()
            }
        })

        form.addEventListener('submit', e => {
            e.preventDefault()
            configuracaoController.save(configuracao, '../../analisesolo/pacote/acidez/editar/index.html')
        })
    }).catch(e => {
        console.log(e)
    })
}