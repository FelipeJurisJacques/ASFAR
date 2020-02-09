import { LayoutSyncClass } from '../../script/class/LayoutSyncClass.js'
import { NavbarSyncClass } from '../../script/class/NavbarSyncClass.js'
import { ConfiguracaoController } from '../../source/controller/ConfiguracaoController.js'
import { AcidezSoloController } from '../../source/controller/AcidezSoloController.js'

const layout = new LayoutSyncClass()
const sync = new NavbarSyncClass()

const table = document.querySelector('tbody')
if (table) {

    const controller = new ConfiguracaoController(false)
    controller.load.then(() => {
        const configuracao = controller.configuracao

        const action = document.querySelector('#add')
        if (action) {
            action.setAttribute('data-href', `../analisesolo/acidez/editar/index.html?configuracaoId=${controller.id}`)
        }

        document.body.addEventListener('click', e => {
            if (e.target.tagName == 'BUTTON') {
                if (e.target.id == 'excluir') {
                    controller.delete(configuracao, '../lista/index.html')
                }
            }
        })

        const titulo = document.querySelector('#titulo')
        if (titulo) {
            titulo.innerHTML = configuracao.getTitulo()
        }

        const autor = document.querySelector('#autor')
        if (autor) {
            autor.innerHTML = configuracao.getAutor()
        }

        const ano = document.querySelector('#ano')
        if (ano) {
            ano.innerHTML = configuracao.getAno()
        }

        const tipo = document.querySelector('#tipo')
        if (tipo) {
            tipo.innerHTML = configuracao.getTipo()
        }

        const regiao = document.querySelector('#regiao')
        if (regiao) {
            regiao.innerHTML = configuracao.getRegiao()
        }

        const acidezSoloList = document.querySelector('table tbody#acidezSoloList')
        if (acidezSoloList) {
            const acidezSoloController = new AcidezSoloController()
            acidezSoloController.load(controller).then(() => {
                acidezSoloController.list.forEach(e => {
                    let newRow = acidezSoloList.insertRow(acidezSoloList.rows.length)
                    newRow.setAttribute('tabindex', '0')
                    newRow.innerHTML = `<tr>
                            <td>
                                ID ${e.getId()}
                            </td>
                            <td>
                                <div class="summary">
                                    ${e.getManejo()}<br>
                                    ${e.getCultura()}
                                </div>
                                <div class="details">
                                    <b>Sistema de manejo:</b> ${e.getManejo()}<br>
                                    <b>Condição da área a ser cultivada:</b> ${e.getCondicao()}<br>
                                    <b>Culturas:</b> ${e.getCultura()}<br>
                                    <b>Profundidade da amostra:</b> ${e.getProfundidade().getText()}
                                </div>
                            </td>
                            <td>
                                <a class="text" data-href="../analisesolo/acidez/detalhes/index.html?configuracaoId=${controller.id}&acidezSoloId=${e.getId()}">${e.getClasse()}</a>
                            </td>
                        </tr>`
                })
            }).catch(e => {
                console.log(e)
            })
        }
    }).catch(e => {
        console.log(e)
    })
}