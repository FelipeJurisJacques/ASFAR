import { LayoutSyncClass } from '../../../script/class/LayoutSyncClass.js'
import { NavbarSyncClass } from '../../../script/class/NavbarSyncClass.js'
import { InputFieldClass } from '../../../script/util/InputFieldClass.js'
import { ClienteController } from '../../../source/controller/ClienteController.js'
import { TalhaoController } from '../../../source/controller/TalhaoController.js'
import { AnaliseSoloController } from '../../../source/controller/AnaliseSoloController.js'
import { LaudoSoloController } from '../../../source/controller/LaudoSoloController.js'
import { SMPclass, SaturacaoBasesClass, THaClass } from '../../../source/util/models/FormulaAcidezSoloClass.js'
import { NutrienteCorrecaoClass } from '../../../source/util/models/NutrienteCorrecaoClass.js'

const inputs = new InputFieldClass()
const layout = new LayoutSyncClass()
const sync = new NavbarSyncClass()

const form = document.querySelector('form')
const clienteController = new ClienteController(false)
const talhaoController = new TalhaoController(false)
const analiseSoloController = new AnaliseSoloController(false)
const laudoSoloController = new LaudoSoloController(false)

if (form) {
    clienteController.load.then(() => {
        const cliente = clienteController.cliente

        talhaoController.load(clienteController).then(() => {
            const talhao = talhaoController.talhao

            analiseSoloController.load(talhaoController).then(() => {
                const analiseSolo = analiseSoloController.analiseSolo

                layout.setLinkBack(`../../detalhes/index.html?clienteId=${clienteController.id}&talhaoId=${talhaoController.id}&analiseSoloId=${analiseSoloController.id}`)

                laudoSoloController.load(analiseSoloController).then(() => {
                    const laudoSolo = laudoSoloController.laudoSolo
                    const pacoteAcidez = analiseSolo.getAcidezSolo(laudoSolo)
                    const laudoQuimico = laudoSolo.getLaudoQuimicoSolo()
                    const laudoCorrecaoAcidez = laudoSolo.getLaudoAcidezSolo()
                    const laudoCorrecaoFertilidade = laudoSolo.getLaudoFertilidadeSolo()

                    layout.setTitle(`${cliente.getFullNome()} - ${talhao.getNome().toUpperCase()} - ${analiseSolo.getInicio().getDate()}`)

                    exibeAmostra(laudoSolo)
                    exibeLaudoQuimico(laudoSolo)
                    exibePacoteAcidez(pacoteAcidez, laudoQuimico)
                    preencheFormulasComConfiguracoes(pacoteAcidez)
                    exibeCorrecaoAcidez(laudoCorrecaoAcidez)
                    exibeCorrecaoFertilidade(laudoCorrecaoFertilidade)

                    if (!pacoteAcidez) {
                        layout.dialog('Não foi possível reconhecer um pacote de configuração apropriado para a profundidade dessa amostra')
                    }

                    // INTERACAO DO USUARIO PARA ANALISE DO SOLO

                    form.addEventListener('click', e => {
                        if (e.target.tagName == 'BUTTON') {
                            if (e.target.id == 'reset') {
                                preencheFormulasComConfiguracoes(pacoteAcidez)
                                laudoCorrecaoAcidez.setCalcario(laudoSoloController.calculateAcidezCalcario(laudoSolo))
                                exibeCorrecaoAcidez(laudoCorrecaoAcidez)
                            }
                        }
                    })

                    form.addEventListener('change', e => {
                        if (
                            e.target.tagName == 'INPUT' ||
                            e.target.tagName == 'SELECT' ||
                            e.target.tagName == 'TEXTAREA'
                        ) {
                            const i = e.target
                            inputs.clearInput(i)
                            if (i.name == 'smp') {
                                const input = document.getElementsByName('smp')
                                if (input.length == 2) {
                                    const smp = new SMPclass()
                                    smp.setQuantidade(input[0].value)
                                    smp.setpHreferencia(input[1].value)
                                    laudoCorrecaoAcidez.setCalcario(laudoSoloController.calculateAcidezCalcario(laudoSolo, smp))
                                    exibeCorrecaoAcidez(laudoCorrecaoAcidez)
                                }
                            }
                            else if (i.name == 'vreferencia') {
                                const sat = new SaturacaoBasesClass()
                                sat.setVreferencia(i.value)
                                laudoCorrecaoAcidez.setCalcario(laudoSoloController.calculateAcidezCalcario(laudoSolo, sat))
                                exibeCorrecaoAcidez(laudoCorrecaoAcidez)
                            }
                            else if (i.name == 'tha') {
                                const tha = new THaClass()
                                tha.settHa(i.value)
                                laudoCorrecaoAcidez.setCalcario(laudoSoloController.calculateAcidezCalcario(laudoSolo, tha))
                                exibeCorrecaoAcidez(laudoCorrecaoAcidez)
                            }
                            else if (i.name == 'gesso') {
                                const n = new NutrienteCorrecaoClass()
                                n.setValor(i.value)
                                if (laudoCorrecaoAcidez.setGesso(n)) {
                                    inputs.insertValue(i, laudoCorrecaoAcidez.getGesso().getValor())
                                }
                            }
                            else if (i.name == 'n') {
                                const n = new NutrienteCorrecaoClass()
                                n.setValor(i.value)
                                if (laudoCorrecaoFertilidade.setN(n)) {
                                    inputs.insertValue(i, laudoCorrecaoFertilidade.getN().getValor())
                                }
                            }
                            else if (i.name == 'p') {
                                const n = new NutrienteCorrecaoClass()
                                n.setValor(i.value)
                                if (laudoCorrecaoFertilidade.setP(n)) {
                                    inputs.insertValue(i, laudoCorrecaoFertilidade.getP().getValor())
                                }
                            }
                            else if (i.name == 'k') {
                                const n = new NutrienteCorrecaoClass()
                                n.setValor(i.value)
                                if (laudoCorrecaoFertilidade.setK(n)) {
                                    inputs.insertValue(i, laudoCorrecaoFertilidade.getK().getValor())
                                }
                            }
                            else if (i.name == 'formula') {
                                preencheFormulasComConfiguracoes()
                            }
                            console.log(laudoCorrecaoAcidez)
                        }
                    })

                    // SALVA FORMULARIO
                    document.querySelector('form').addEventListener('submit', e => {
                        e.preventDefault()
                        if (
                            laudoSolo.setLaudoAcidezSolo(laudoCorrecaoAcidez) &&
                            laudoSolo.setLaudoFertilidadeSolo(laudoCorrecaoFertilidade)
                        ) {
                            laudoSoloController.save(laudoSolo, '../../detalhes/index.html')
                        }
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
    }).catch(e => {
        console.log(e)
    })
}

function exibeAmostra(laudoSolo) {
    const amostra = document.querySelector('tbody#amostra')
    if (amostra) {
        amostra.innerHTML = `<tr>
                <th>Identificação</th>
                <td>${laudoSolo.getAmostra()}</td>
            </tr>
            <tr>
                <th>Profundidade</th>
                <td>${laudoSolo.getProfundidade().getText()}</td>
            </tr>
            <tr>
                <th>Coletador</th>
                <td>${laudoSolo.getColetador()}</td>
            </tr>
            <tr>
                <th>Coordenadas</th>
                <td>${laudoSolo.getCoordenadas().getText()}</td>
            </tr>
            <tr>
                <th>Descrissão</th>
                <td>${laudoSolo.getDescricao()}</td>
            </tr>`
    }
}

function exibeLaudoQuimico(laudoSolo) {
    const laudoQuimico = document.querySelector('tbody#laudoQuimico')
    if (laudoQuimico) {
        const quimico = laudoSolo.getLaudoQuimicoSolo()
        const quimicoCa = quimico.getCa()
        const quimicoMg = quimico.getMg()
        const quimicoAl = quimico.getAl()
        const quimicoHAl = quimico.getHAl()
        const quimicoCTCefetiva = quimico.getCTCefetiva()
        const quimicoCTCph7 = quimico.getCTCph7()
        const quimicoV = quimico.getV()
        const quimicoMO = quimico.getMO()
        const quimicoArgila = quimico.getArgila()
        const quimicoS = quimico.getS()
        const quimicoPmehlich = quimico.getPmehlich()
        const quimicoPresina = quimico.getPresina()
        const quimicoPrem = quimico.getPrem()
        const quimicoK = quimico.getK()
        const quimicoCu = quimico.getCu()
        const quimicoZn = quimico.getZn()
        const quimicoB = quimico.getB()
        const quimicoFe = quimico.getFe()
        const quimicoMn = quimico.getMn()
        const quimicoC = quimico.getC()
        laudoQuimico.innerHTML = `<tr>
                <th>Entrada</th>
                <td colspan="4">${laudoSolo.getEntrada().getDate()}</td>
            </tr>
            <tr>
                <th>Emissão</th>
                <td colspan="4">${laudoSolo.getEmissao().getDate()}</td>
            </tr>
            <tr>
                <th>Empresa emissora</th>
                <td colspan="4">${laudoSolo.getEmpresa()}</td>
            </tr>
            <tr>
                <th>pH</th>
                <td colspan="4">${quimico.getpH()}</td>
            </tr>
            <tr>
                <th>SMP</th>
                <td colspan="4">${quimico.getSMP()}</td>
            </tr>
            <tr>
                <th>textura</th>
                <td colspan="4">${quimico.getTextura()}</td>
            </tr>
            <tr>
                <th>Ca (CALCIO)</th>
                <td>${quimicoCa.getCmolcdm3()}</td>
                <td>${quimicoCa.getMgdm3()}</td>
                <td>${quimicoCa.getPercentage()}</td>
            </tr>
            <tr>
                <th>Mg (MAGNESIO)</th>
                <td>${quimicoMg.getCmolcdm3()}</td>
                <td>${quimicoMg.getMgdm3()}</td>
                <td>${quimicoMg.getPercentage()}</td>
            </tr>
            <tr>
                <th>Al (ALUMINIO)</th>
                <td>${quimicoAl.getCmolcdm3()}</td>
                <td>${quimicoAl.getMgdm3()}</td>
                <td>${quimicoAl.getPercentage()}</td>
            </tr>
            <tr>
                <th>H + Al (HIDROGENIO + ALUMINIO)</th>
                <td>${quimicoHAl.getCmolcdm3()}</td>
                <td>${quimicoHAl.getMgdm3()}</td>
                <td>${quimicoHAl.getPercentage()}</td>
            </tr>
            <tr>
                <th>CTC efetiva (TROCA DE CATIONS)</th>
                <td>${quimicoCTCefetiva.getCmolcdm3()}</td>
                <td>${quimicoCTCefetiva.getMgdm3()}</td>
                <td>${quimicoCTCefetiva.getPercentage()}</td>
            </tr>
            <tr>
                <th>CTCph7 (TROCA DE CATION POR pH7)</th>
                <td>${quimicoCTCph7.getCmolcdm3()}</td>
                <td>${quimicoCTCph7.getMgdm3()}</td>
                <td>${quimicoCTCph7.getPercentage()}</td>
            </tr>
            <tr>
                <th>V (SATURACAO POR BASES)</th>
                <td>${quimicoV.getCmolcdm3()}</td>
                <td>${quimicoV.getMgdm3()}</td>
                <td>${quimicoV.getPercentage()}</td>
            </tr>
            <tr>
                <th>MO (MATERIO ORGANICA)</th>
                <td>${quimicoMO.getCmolcdm3()}</td>
                <td>${quimicoMO.getMgdm3()}</td>
                <td>${quimicoMO.getPercentage()}</td>
            </tr>
            <tr>
                <th>argila</th>
                <td>${quimicoArgila.getCmolcdm3()}</td>
                <td>${quimicoArgila.getMgdm3()}</td>
                <td>${quimicoArgila.getPercentage()}</td>
            </tr>
            <tr>
                <th>S (ENXOFRE)</th>
                <td>${quimicoS.getCmolcdm3()}</td>
                <td>${quimicoS.getMgdm3()}</td>
                <td>${quimicoS.getPercentage()}</td>
            </tr>
            <tr>
                <th>Pmehlich (FOSFORO)</th>
                <td>${quimicoPmehlich.getCmolcdm3()}</td>
                <td>${quimicoPmehlich.getMgdm3()}</td>
                <td>${quimicoPmehlich.getPercentage()}</td>
            </tr>
            <tr>
                <th>Presina (FOSFORO)</th>
                <td>${quimicoPresina.getCmolcdm3()}</td>
                <td>${quimicoPresina.getMgdm3()}</td>
                <td>${quimicoPresina.getPercentage()}</td>
            </tr>
            <tr>
                <th>Prem (FOSFORO)</th>
                <td>${quimicoPrem.getCmolcdm3()}</td>
                <td>${quimicoPrem.getMgdm3()}</td>
                <td>${quimicoPrem.getPercentage()}</td>
            </tr>
            <tr>
                <th>K (POTASSIO)</th>
                <td>${quimicoK.getCmolcdm3()}</td>
                <td>${quimicoK.getMgdm3()}</td>
                <td>${quimicoK.getPercentage()}</td>
            </tr>
            <tr>
                <th>Cu (COBRE)</th>
                <td>${quimicoCu.getCmolcdm3()}</td>
                <td>${quimicoCu.getMgdm3()}</td>
                <td>${quimicoCu.getPercentage()}</td>
            </tr>
            <tr>
                <th>Zn (ZINCO)</th>
                <td>${quimicoZn.getCmolcdm3()}</td>
                <td>${quimicoZn.getMgdm3()}</td>
                <td>${quimicoZn.getPercentage()}</td>
            </tr>
            <tr>
                <th>B (BORO)</th>
                <td>${quimicoB.getCmolcdm3()}</td>
                <td>${quimicoB.getMgdm3()}</td>
                <td>${quimicoB.getPercentage()}</td>
            </tr>
            <tr>
                <th>Fe (FERRO)</th>
                <td>${quimicoFe.getCmolcdm3()}</td>
                <td>${quimicoFe.getMgdm3()}</td>
                <td>${quimicoFe.getPercentage()}</td>
            </tr>
            <tr>
                <th>Mn (MANGANES)</th>
                <td>${quimicoMn.getCmolcdm3()}</td>
                <td>${quimicoMn.getMgdm3()}</td>
                <td>${quimicoMn.getPercentage()}</td>
            </tr>
            <tr>
                <th>C (CARBONO)</th>
                <td>${quimicoC.getCmolcdm3()}</td>
                <td>${quimicoC.getMgdm3()}</td>
                <td>${quimicoC.getPercentage()}</td>
            </tr>`

        // const laudoQuimicoGrafico = document.querySelector('div#laudoQuimicoGrafico')
        // if (laudoQuimicoGrafico) {
        //     const dataSource = {
        //         chart: {
        //             caption: "Laudo Químico",
        //             subcaption: "",
        //             theme: "candy",
        //             showlegend: "0",
        //             showdivlinevalues: "0",
        //             showlimits: "0",
        //             showvalues: "1",
        //             plotfillalpha: "40",
        //             plottooltext: "Harry's <b>$label</b> skill is rated as <b>$value</b>"
        //         },
        //         categories: [{
        //             category: [
        //                 { label: "V" },
        //                 { label: "pH" },
        //                 { label: "MO" },
        //                 { label: "Al%" },
        //                 { label: "K" },
        //                 { label: "P" }]
        //         }
        //         ],
        //         dataset: [{
        //             seriesname: "User Ratings", data: [
        //                 { value: quimicoV.getPercentageInt() },
        //                 { value: quimico.getpH() },
        //                 { value: quimicoMO.getPercentageInt() },
        //                 { value: quimicoAl.getPercentageInt() },
        //                 { value: quimicoK.getMgdm3Int() },
        //                 { value: quimicoPmehlich.getMgdm3Int() }
        //             ]
        //         }]
        //     }

        //     FusionCharts.ready(function () {
        //         var myChart = new FusionCharts({
        //             type: "radar",
        //             renderAt: "laudoQuimicoGrafico",
        //             width: "100%",
        //             height: "100%",
        //             dataFormat: "json",
        //             dataSource
        //         }).render()
        //     })
        // }
    }
}

function exibePacoteAcidez(pacoteAcidez, laudoQuimico) {
    if (pacoteAcidez) {
        const pacote = document.querySelector('tbody#pacote')
        if (pacote) {
            pacote.innerHTML = `<tr>
                <th>Classe de cultura</th>
                <td colspan="2">${pacoteAcidez.getClasse()}</td>
            </tr>`

            if (pacoteAcidez.getCultura()) {
                if (pacoteAcidez.getCulturaObs()) {
                    pacote.innerHTML += `<tr>
                        <th>Cultura</th>
                        <td>${pacoteAcidez.getCultura()}</td>
                        <td><div class="obs">${pacoteAcidez.getCulturaObs()}</div></td>
                    </tr>`
                }
                else {
                    pacote.innerHTML += `<tr>
                        <th>Cultura</th>
                        <td colspan="2">${pacoteAcidez.getCultura()}</td>
                    </tr>`
                }
            }

            if (pacoteAcidez.getManejoObs()) {
                pacote.innerHTML += `<tr>
                    <th>Sistema de manejo</th>
                    <td>${pacoteAcidez.getManejo()}</td>
                    <td><div class="obs">${pacoteAcidez.getManejoObs()}</div></td>
                </tr>`
            }
            else {
                pacote.innerHTML += `<tr>
                    <th>Sistema de manejo</th>
                    <td colspan="2">${pacoteAcidez.getManejo()}</td>
                </tr>`
            }

            if (pacoteAcidez.getCondicaoObs()) {
                if (pacoteAcidez.getCondicao()) {
                    pacote.innerHTML += `<tr>
                        <th>Condição da área</th>
                        <td>${pacoteAcidez.getCondicao()}</td>
                        <td><div class="obs">${pacoteAcidez.getCondicaoObs()}</div></td>
                    </tr>`
                }
                else {
                    pacote.innerHTML += `<tr>
                        <th>Condição da área</th>
                        <td colspan="2">nada a declarar</td>
                    </tr>`
                }
            }
            else {
                if (pacoteAcidez.getCondicao()) {
                    pacote.innerHTML += `<tr>
                        <th>Condição da área</th>
                        <td colspan="2">${pacoteAcidez.getCondicao()}</td>
                    </tr>`
                }
                else {
                    pacote.innerHTML += `<tr>
                        <th>Condição da área</th>
                        <td colspan="2">nada a declarar</td>
                    </tr>`
                }
            }

            if (pacoteAcidez.getProfundidadeObs()) {
                pacote.innerHTML += `<tr>
                    <th>Profundidade requerida</th>
                    <td>${pacoteAcidez.getProfundidade().getText()}</td>
                    <td><div class="obs">${pacoteAcidez.getProfundidadeObs()}</div></td>
                </tr>`
            }
            else {
                pacote.innerHTML += `<tr>
                    <th>Profundidade requerida</th>
                    <td colspan="2">${pacoteAcidez.getProfundidade().getText()}</td>
                </tr>`
            }

            const decisao = document.querySelector('tbody#decisao')
            if (decisao) {
                const acidezDecisao = pacoteAcidez.getDecisao()

                decisao.innerHTML = `<tr>
                    <th>Fórmula lógica</th>
                    <td>${acidezDecisao.getFormula()}</td>
                </tr>`

                if (acidezDecisao.is(laudoQuimico)) {
                    decisao.innerHTML += `<tr>
                        <th>Resultado</th>
                        <td>Aplicar correção</td>
                    </tr>`
                }
                else {
                    decisao.innerHTML += `<tr>
                        <th>Resultado</th>
                        <td>Não aplicar correção</td>
                    </tr>`
                }

                if (pacoteAcidez.getDecisaoObs()) {
                    decisao.innerHTML += `<tr>
                        <td><div class="obs top">${pacoteAcidez.getDecisaoObs()}</div></td>
                    </tr>`
                }
            }

            const formula = document.querySelector('tbody#formula')
            if (formula) {
                const acidezFormula = pacoteAcidez.getFormula()

                formula.innerHTML += `<tr>
                    <th>Tipo de fórmula</th>
                    <td>${acidezFormula.getType()}</td>
                </tr>
                <tr>
                    <th>Fórmula</th>
                    <td>${acidezFormula.getText()}</td>
                </tr>`

                if (pacoteAcidez.getFormulaObs()) {
                    formula.innerHTML += `<tr>
                        <th>Tipo de fórmula</th>
                        <td><div class="obs top">${pacoteAcidez.getFormulaObs()}</div></td>
                    </tr>`
                }
            }
        }
    }
}

function preencheFormulasComConfiguracoes(pacoteAcidez) {
    const formulaDiv = document.querySelector('div#formula')
    const formulaRadio = document.getElementsByName('formula')
    const formSmp = document.querySelector('div#smp')
    const formSat = document.querySelector('div#sat')
    const formTha = document.querySelector('div#tha')
    if (
        formulaDiv &&
        formulaRadio &&
        formSmp &&
        formSat &&
        formTha
    ) {
        formSmp.style.display = "none"
        formSat.style.display = "none"
        formTha.style.display = "none"

        if (typeof pacoteAcidez == 'object') {
            formulaDiv.style.display = "none"
            const acidezFormula = pacoteAcidez.getFormula()
            if (acidezFormula.constructor.name == 'SMPclass') {
                formSmp.style.display = "block"
                inputs.insertValue(document.getElementsByName('smp')[0], acidezFormula.getQuantidade())
                inputs.insertValue(document.getElementsByName('smp')[1], acidezFormula.getpHreferencia())
            }
            else if (acidezFormula.constructor.name == 'SaturacaoBasesClass') {
                formSat.style.display = "block"
                inputs.insertValue(document.getElementsByName('vreferencia')[0], acidezFormula.getVreferencia())
            }
            else if (acidezFormula.constructor.name == 'THaClass') {
                formTha.style.display = "block"
                inputs.insertValue(document.getElementsByName('tha')[0], acidezFormula.gettHa())
            }
        }
        else {
            formulaDiv.style.display = "block"
            formulaRadio.forEach(e => {
                if (e.checked) {
                    if (e.value == 'smp') {
                        formSmp.style.display = 'block'
                    }
                    else if (e.value == 'sat') {
                        formSat.style.display = 'block'
                    }
                    else if (e.value == 'tha') {
                        formTha.style.display = 'block'
                    }
                }
            })
        }
    }
}

function exibeCorrecaoAcidez(laudoAcidez) {
    const correcaoAcidez = document.querySelector('tr#correcaoAcidez')
    if (correcaoAcidez) {
        const calcario = laudoAcidez.getCalcario()
        correcaoAcidez.innerHTML = `<td>${calcario.getProduto()}</td>
            <td>${calcario.getValor()}</td>
            <td>${calcario.getLegendaFull()}</td>`
    }
    inputs.insertValue(document.getElementsByName('gesso')[0], laudoAcidez.getGesso().getValor())
}

function exibeCorrecaoFertilidade(laudoFertilidade) {
    inputs.insertValue(document.getElementsByName('n')[0], laudoFertilidade.getN().getValor())
    inputs.insertValue(document.getElementsByName('p')[0], laudoFertilidade.getP().getValor())
    inputs.insertValue(document.getElementsByName('k')[0], laudoFertilidade.getK().getValor())
}