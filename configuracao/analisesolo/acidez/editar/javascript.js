import { InputFieldClass } from '../../../../script/util/InputFieldClass.js'
import { LayoutSyncClass } from '../../../../script/class/LayoutSyncClass.js'
import { NavbarSyncClass } from '../../../../script/class/NavbarSyncClass.js'
import { ProfundidadeClass } from '../../../../source/util/models/ProfundidadeClass.js'
import { LogicoClass } from '../../../../source/util/models/DecisaoClass.js'
import { SMPclass, SaturacaoBasesClass, THaClass } from '../../../../source/util/models/FormulaAcidezSoloClass.js'
import { ConfiguracaoController } from '../../../../source/controller/ConfiguracaoController.js'
import { AcidezSoloController } from '../../../../source/controller/AcidezSoloController.js'

const inputs = new InputFieldClass()
const layout = new LayoutSyncClass()
const sync = new NavbarSyncClass()

const form = document.querySelector('form')

if (form) {
    const configuracaoController = new ConfiguracaoController(false)
    const acidezSoloController = new AcidezSoloController(false)

    configuracaoController.load.then(() => {
        layout.setLinkBack(`../../../detalhes/index.html?configuracaoId=${configuracaoController.id}`)
        
        acidezSoloController.load(configuracaoController).then(() => {
            const acidez = acidezSoloController.acidezSolo

            // EVENTOS DE BOTOES
            form.addEventListener('click', e => {
                if (e.target.tagName == 'BUTTON') {
                    const b = e.target
                    // adicionar na tabela
                    if (b.className == 'add') {
                        if (b.parentNode.tagName == 'TD') {
                            if (b.parentNode.parentNode.tagName == 'TR') {
                                // tabela de culturas
                                if (b.parentNode.parentNode.parentNode.id == 'cultura') {
                                    const table = b.parentNode.parentNode.parentNode
                                    const newRow = table.insertRow(table.rows.length)

                                    let newCell = newRow.insertCell(0)
                                    newCell.setAttribute('class', 'field')
                                    const input = document.createElement('input')
                                    input.setAttribute('type', 'text')
                                    input.setAttribute('name', 'cultura')
                                    input.setAttribute('list', 'culturas')
                                    newCell.appendChild(input)

                                    newCell = newRow.insertCell(1)
                                    const del = document.createElement('button')
                                    del.setAttribute('type', 'button')
                                    del.setAttribute('class', 'del')
                                    newCell.appendChild(del)
                                    newCell = newRow.insertCell(2)
                                    newCell.appendChild(b)
                                }
                                // tabela de tomada de decisao
                                else if (
                                    b.parentNode.parentNode.parentNode.id == 'decisao' ||
                                    b.parentNode.parentNode.parentNode.id == 'contraDecisao'
                                ) {
                                    const table = b.parentNode.parentNode.parentNode
                                    const newRow = table.insertRow(table.rows.length)
                                    const name = b.parentNode.parentNode.parentNode.id

                                    let newCell = newRow.insertCell(0)
                                    newCell.setAttribute('class', 'field')
                                    newCell.innerHTML = `<input name="${name}" list="laudo" required>`

                                    newCell = newRow.insertCell(1)
                                    newCell.setAttribute('class', 'field')
                                    newCell.innerHTML = `<select name="${name}" required>
                                    <option value="value">valor</option>
                                    <option value="percentage">%</option>
                                    <option value="cmolcdm3">cmolc/dm3</option>
                                    <option value="mgdm3">mg/dm3</option>
                                </select>`

                                    newCell = newRow.insertCell(2)
                                    newCell.setAttribute('class', 'field')
                                    newCell.innerHTML = `<select name="${name}" required>
                                    <option selected><</option>
                                    <option><=</option>
                                    <option selected>></option>
                                    <option>>=</option>
                                </select>`

                                    newCell = newRow.insertCell(3)
                                    newCell.setAttribute('class', 'field')
                                    newCell.innerHTML = `<input name="${name}" type="number" step="0.001" required>`

                                    newCell = newRow.insertCell(4)
                                    newCell.setAttribute('class', 'field')
                                    newCell.innerHTML = `<select name="${name}" required>
                                    <option value="||" selected>OU</option>
                                    <option value="&&">E</option>
                                    </select>`

                                    newCell = newRow.insertCell(5)
                                    newCell.setAttribute('class', 'field')
                                    const del = document.createElement('button')
                                    del.setAttribute('type', 'button')
                                    del.setAttribute('class', 'del')
                                    newCell.appendChild(del)
                                    newCell = newRow.insertCell(6)
                                    newCell.appendChild(b)
                                }
                            }
                        }
                    }
                    // apagar na tabela
                    else if (b.className == 'del') {
                        if (b.parentNode.tagName == 'TD') {
                            if (b.parentNode.parentNode.tagName == 'TR') {
                                if (
                                    b.parentNode.parentNode.parentNode.id == 'cultura' ||
                                    b.parentNode.parentNode.parentNode.id == 'decisao' ||
                                    b.parentNode.parentNode.parentNode.id == 'contraDecisao'
                                ) {
                                    const table = b.parentNode.parentNode.parentNode
                                    const i = b.parentNode.parentNode.rowIndex - 1
                                    const row = b.parentNode.parentNode
                                    if (row.cells[row.cells.length - 1].childNodes[0]) {
                                        const add = row.cells[row.cells.length - 1].childNodes[0]
                                        if (add.className == 'add') {
                                            table.rows[i - 1].cells[table.rows[i - 1].cells.length - 1].appendChild(add)
                                        }
                                    }
                                    table.deleteRow(i)
                                    if (table.id == 'cultura') {
                                        validaCultura()
                                    }
                                    else if (table.id == 'decisao') {
                                        validaDecisao()
                                    }
                                    else if (table.id == 'contraDecisao') {
                                        validaContraDecisao()
                                    }
                                    console.log(acidez)
                                }
                            }
                        }
                    }
                }
            })

            // FORMULARO
            form.addEventListener('change', e => {
                if (
                    e.target.tagName == 'INPUT' ||
                    e.target.tagName == 'SELECT' ||
                    e.target.tagName == 'TEXTAREA'
                ) {
                    const i = e.target
                    inputs.clearInput(i)
                    if (i.name == 'classe') {
                        if (acidez.setClasse(i.value)) {
                            i.value = acidez.getClasse()
                        }
                        else {
                            inputs.setInvalid(i)
                        }
                    }
                    else if (i.name == 'cultura') {
                        validaCultura()
                    }
                    else if (i.name == 'culturaObs') {
                        if (acidez.setCulturaObs(i.value)) {
                            i.value = acidez.getCulturaObs()
                        }
                        else {
                            inputs.setInvalid(i)
                        }
                    }
                    else if (i.name == 'manejo') {
                        acidez.setManejo(i.value)
                    }
                    else if (i.name == 'manejoObs') {
                        if (acidez.setManejoObs(i.value)) {
                            i.value = acidez.getManejoObs()
                        }
                        else {
                            inputs.setInvalid(i)
                        }
                    }
                    else if (i.name == 'condicao') {
                        if (acidez.setCondicao(i.value)) {
                            i.value = acidez.getCondicao()
                        }
                        else {
                            inputs.setInvalid(i)
                        }
                    }
                    else if (i.name == 'condicaoObs') {
                        if (acidez.setCondicaoObs(i.value)) {
                            i.value = acidez.getCondicaoObs()
                        }
                        else {
                            inputs.setInvalid(i)
                        }
                    }
                    else if (i.name == 'profundidade') {
                        const array = document.getElementsByName('profundidade')
                        acidez.setProfundidade(validaProfundidade(array))
                    }
                    else if (i.name == 'profundidadeObs') {
                        if (acidez.setProfundidadeObs(i.value)) {
                            i.value = acidez.getProfundidadeObs()
                        }
                        else {
                            inputs.setInvalid(i)
                        }
                    }
                    // TOMADA DE DECISAO
                    else if (i.name == 'decisao') {
                        validaDecisao()
                    }
                    else if (i.name == 'contraDecisao') {
                        validaContraDecisao()
                    }
                    else if (i.name == 'decisaoObs') {
                        if (acidez.setDecisaoObs(i.value)) {
                            i.value = acidez.getDecisaoObs()
                        }
                        else {
                            inputs.setInvalid(i)
                        }
                    }
                    // FORMULAS
                    if (i.id == 'formula') { // ALTERNA ENTRE OS TIPOS DE FORMULAS
                        const fsmp = document.getElementsByName('formulaSMP')
                        const fsatb = document.getElementsByName('formulaSaturacaoBases')
                        const ftha = document.getElementsByName('formulaTonelada')
                        const smp = document.querySelector('div.formulaSMP')
                        const satb = document.querySelector('div.formulaSaturacaoBases')
                        const tha = document.querySelector('div.formulaTonelada')
                        ocultaGrupoInputs(smp, fsmp)
                        ocultaGrupoInputs(satb, fsatb)
                        ocultaGrupoInputs(tha, ftha)
                        if (i.value == 'smp') {
                            exibeGrupoInputs(smp, fsmp)
                        }
                        else if (i.value == 'sat') {
                            exibeGrupoInputs(satb, fsatb)
                        }
                        else if (i.value == 'ton') {
                            exibeGrupoInputs(tha, ftha)
                        }
                    }
                    else if (i.name == 'formulaSMP') {
                        const a = document.getElementsByName('formulaSMP')
                        if (a) {
                            const smp = new SMPclass()
                            if (smp.setQuantidade(a[0].value)) {
                                inputs.setValid(a[0])
                            }
                            else {
                                inputs.setInvalid(a[0])
                            }
                            if (smp.setpHreferencia(a[1].value)) {
                                inputs.setValid(a[1])
                            }
                            else {
                                inputs.setInvalid(a[1])
                            }
                            acidez.setFormula(smp)
                        }
                    }
                    else if (i.name == 'formulaSaturacaoBases') {
                        const satb = new SaturacaoBasesClass()
                        if (!satb.setVreferencia(i.value)) {
                            inputs.setInvalid(i)
                        }
                        acidez.setFormula(satb)
                    }
                    else if (i.name == 'formulaTonelada') {
                        const tha = new THaClass()
                        if (!tha.settHa(i.value)) {
                            inputs.setInvalid(i)
                        }
                        acidez.setFormula(tha)
                    }
                    else if (i.name == 'formulaObs') {
                        if (acidez.setFormulaObs(i.value)) {
                            i.value = acidez.getFormulaObs()
                        }
                        else {
                            inputs.setInvalid(i)
                        }
                    }
                    // APLICACAO
                    else if (i.name == 'aplicacao') {
                        const apli = acidez.getAplicacao()
                        if (!apli.setModo(i.value)) {
                            inputs.setInvalid(i)
                        }
                        acidez.setAplicacao(apli)
                    }
                    else if (i.name == 'aplicacaoArea') {
                        const apli = acidez.getAplicacao()
                        if (!apli.setArea(i.value)) {
                            inputs.setInvalid(i)
                        }
                        acidez.setAplicacao(apli)
                    }
                    else if (i.name == 'aplicacaoProfundidade') {
                        const apli = acidez.getAplicacao()
                        const array = document.getElementsByName('aplicacaoProfundidade')
                        if (i.value != '-1') {
                            apli.setProfundidade(validaProfundidade(array))
                        }
                        else {
                            apli.setProfundidade(new ProfundidadeClass())
                            array.forEach(j => {
                                inputs.emptyInput(j)
                            })
                        }
                        acidez.setAplicacao(apli)
                    }
                    else if (i.name == 'aplicacaoObs') {
                        if (acidez.setAplicacaoObs(i.value)) {
                            i.value = acidez.getAplicacaoObs()
                        }
                        else {
                            inputs.setInvalid(i)
                        }
                    }
                    console.log(acidez)
                    sync.unsave()
                }
            })

            function validaCultura() {
                const array = document.getElementsByName('cultura')
                if (array) {
                    acidez.resetCultura()
                    let j = 0
                    array.forEach(i => {
                        if (acidez.addCultura(i.value)) {
                            i.value = acidez.getCultura(j)
                            j += 1
                        }
                        else {
                            inputs.setInvalid(i)
                        }
                    })
                }
            }

            function validaProfundidade(a) {
                const p = new ProfundidadeClass()
                if (a) {
                    if (p.setMinima(a[0].value)) {
                        inputs.setValid(a[0])
                    }
                    else {
                        inputs.setInvalid(a[0])
                    }
                    if (p.setMaxima(a[1].value)) {
                        inputs.setValid(a[1])
                    }
                    else {
                        inputs.setInvalid(a[1])
                    }
                }
                return p
            }

            function validaDecisao() {
                const decisao = document.getElementsByName('decisao')
                const tomadaDecisao = acidez.getDecisao()
                tomadaDecisao.resetDecisao()
                _validaLogica(decisao).forEach(e => {
                    tomadaDecisao.pushDecisao(e)
                })
                document.querySelector('#decisaoGerada').innerHTML = tomadaDecisao.getFormula()
                acidez.setDecisao(tomadaDecisao)
            }

            function validaContraDecisao() {
                const contraDecisao = document.getElementsByName('contraDecisao')
                const tomadaDecisao = acidez.getDecisao()
                tomadaDecisao.resetContraDecisao()
                _validaLogica(contraDecisao).forEach(e => {
                    tomadaDecisao.pushContraDecisao(e)
                })
                document.querySelector('#decisaoGerada').innerHTML = tomadaDecisao.getFormula()
                acidez.setDecisao(tomadaDecisao)
            }

            function _validaLogica(decisao) {
                let r = new Array()
                for (let i = 0; i < decisao.length; i++) {
                    const logico = new LogicoClass()
                    if (logico.setElemento(decisao[i].value)) {
                        inputs.setValid(decisao[i])
                    }
                    else {
                        inputs.setInvalid(decisao[i])
                    }
                    i++
                    if (logico.setUnidade(decisao[i].value)) {
                        inputs.setValid(decisao[i])
                    }
                    else {
                        inputs.setInvalid(decisao[i])
                    }
                    i++
                    if (logico.setOperadorLogico(decisao[i].value)) {
                        inputs.setValid(decisao[i])
                    }
                    else {
                        inputs.setInvalid(decisao[i])
                    }
                    i++
                    if (logico.setOperadorCondicional(decisao[i].value)) {
                        inputs.setValid(decisao[i])
                    }
                    else {
                        inputs.setInvalid(decisao[i])
                    }
                    i++
                    if (logico.setOperadorPrecedencia(decisao[i].value)) {
                        inputs.setValid(decisao[i])
                    }
                    else {
                        inputs.setInvalid(decisao[i])
                    }
                    r.push(logico)
                }
                return r
            }

            function exibeGrupoInputs(g, a) {
                g.style.display = 'grid'
                a.forEach(e => {
                    e.disabled = false
                })
            }

            function ocultaGrupoInputs(g, a) {
                g.style.display = 'none'
                a.forEach(e => {
                    inputs.emptyInput(e)
                    e.disabled = true
                })
            }

            // SALVA FORMULARIO
            form.addEventListener('submit', e => {
                e.preventDefault()
                acidezSoloController.save(acidez, '../detalhes/index.html')
            })
        }).catch(e => {
            console.log(e)
        })
    }).catch(e => {
        console.log(e)
    })
}