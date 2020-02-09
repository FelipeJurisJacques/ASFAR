import { LayoutSyncClass } from '../../script/class/LayoutSyncClass.js'
import { NavbarSyncClass } from '../../script/class/NavbarSyncClass.js'
import { InputFieldClass } from '../../script/util/InputFieldClass.js'
import { ClienteController } from '../../source/controller/ClienteController.js'
import { TalhaoController } from '../../source/controller/TalhaoController.js'
import { ConfiguracaoController } from '../../source/controller/ConfiguracaoController.js'
import { AcidezSoloController } from '../../source/controller/AcidezSoloController.js'
import { AnaliseSoloController } from '../../source/controller/AnaliseSoloController.js'

const inputs = new InputFieldClass()
const layout = new LayoutSyncClass()
const sync = new NavbarSyncClass()

const form = document.querySelector('form')
const configuracaoList = document.querySelector('table tbody#configuracaoList')
const acidezSoloList = document.querySelector('table tbody#acidezSoloList')

if (
    form &&
    configuracaoList &&
    acidezSoloList
) {
    const clienteController = new ClienteController(false)
    const talhaoController = new TalhaoController(false)
    const analiseSoloController = new AnaliseSoloController(false)
    const configuracaoController = new ConfiguracaoController()
    const acidezSoloController = new AcidezSoloController()

    clienteController.load.then(() => {
        const cliente = clienteController.cliente

        talhaoController.load(clienteController).then(() => {
            const talhao = talhaoController.talhao

            layout.setTitle(`${cliente.getFullNome()} - ${talhao.getNome().toUpperCase()}`)
            layout.setLinkBack(`../../cliente/talhao/detalhes/index.html?clienteId=${clienteController.id}&talhaoId=${talhaoController.id}`)

            analiseSoloController.load(talhaoController).then(() => {
                const analiseSolo = analiseSoloController.analiseSolo

                configuracaoController.load.then(() => {
                    const cList = configuracaoController.list
                    for (let i = 0; i < cList.length; i++) {
                        let newRow = configuracaoList.insertRow()
                        newRow.setAttribute('tabindex', '0')
                        let newCell = newRow.insertCell(0)
                        newCell.innerHTML = `<input type="radio" class="field" name="configuracao" value="${i}"></input>`

                        newCell = newRow.insertCell(1)
                        newCell.innerHTML = `<div class="summary">
                                ${cList[i].getTitulo()} - ${cList[i].getAno()}
                            </div>
                            <div class="details">
                                <b>Título:</b> ${cList[i].getTitulo()}<br>
                                <b>Autor:</b> ${cList[i].getAutor()}<br>
                                <b>Ano:</b> ${cList[i].getAno()}<br>
                                <b>Tipo:</b> ${cList[i].getTipo()}<br>
                                <b>Região:</b> ${cList[i].getRegiao()}<br>
                            </div>`
                    }
                }).catch(e => {
                    console.log(e)
                })

                form.addEventListener('change', e => {
                    if (e.target.tagName == 'INPUT') {
                        let i = e.target
                        if (i.name == 'configuracao') {
                            configuracaoController.configuracao = configuracaoController.list[i.value]
                            analiseSolo.setConfiguracao(configuracaoController.configuracao)
                            acidezSoloController.load(configuracaoController).then(() => {
                                const aList = acidezSoloController.list
                                for (let i = 0; i < aList.length; i++) {
                                    let newRow = acidezSoloList.insertRow(acidezSoloList.rows.length)
                                    newRow.setAttribute('tabindex', '0')
                                    newRow.innerHTML = `<tr>
                                            <td>
                                                <input type="checkbox" class="field" name="acidezsolo" value="${i}"></input>
                                                ID ${aList[i].getId()}
                                            </td>
                                            <td>
                                                <div class="summary">
                                                    ${aList[i].getClasse()}<br>
                                                    ${aList[i].getManejo()}<br>
                                                    ${aList[i].getProfundidade().getText()}<br>
                                                    ${aList[i].getCultura()}
                                                </div>
                                                <div class="details">
                                                    <b>Classe:</b> ${aList[i].getClasse()}<br>
                                                    <b>Sistema de manejo:</b> ${aList[i].getManejo()}<br>
                                                    <b>Condição da área a ser cultivada:</b> ${aList[i].getCondicao()}<br>
                                                    <b>Culturas:</b> ${aList[i].getCultura()}<br>
                                                    <b>Profundidade da amostra:</b> ${aList[i].getProfundidade().getText()}
                                                </div>
                                            </td>
                                        </tr>`
                                }
                            }).catch(e => {
                                console.log(e)
                            })
                        }
                        else if (i.name == 'acidezsolo') {
                            analiseSolo.resetAcidezSolo()
                            document.getElementsByName('acidezsolo').forEach(j => {
                                if (j.checked) {
                                    if (analiseSolo.addAcidezSolo(acidezSoloController.list[j.value])) {
                                        inputs.setValid(j)
                                    } else {
                                        inputs.setInvalid(j)
                                    }
                                }
                            })
                        }
                        sync.unsave()
                        console.log(analiseSolo)
                    }
                })

                // SALVA FORMULARIO
                form.addEventListener('submit', e => {
                    e.preventDefault()
                    analiseSoloController.save(analiseSolo, '../detalhes/index.html')
                })
            }).catch(e => {
                console.log(e)
            })
        }).catch(e => {
            console.log(e)
        })
    }).catch(e => {
        console.log(e)
    })
}