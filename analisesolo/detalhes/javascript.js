import { LayoutSyncClass } from '../../script/class/LayoutSyncClass.js'
import { NavbarSyncClass } from '../../script/class/NavbarSyncClass.js'
import { ClienteController } from '../../source/controller/ClienteController.js'
import { TalhaoController } from '../../source/controller/TalhaoController.js'
import { AnaliseSoloController } from '../../source/controller/AnaliseSoloController.js'
import { LaudoSoloController } from '../../source/controller/LaudoSoloController.js'
import { AnaliseSoloPrintClass } from '../../source/util/services/AnaliseSoloPrintClass.js'

const layout = new LayoutSyncClass()
const sync = new NavbarSyncClass()

const clienteController = new ClienteController(false)
const talhaoController = new TalhaoController(false)
const analiseSoloController = new AnaliseSoloController(false)
const laudoSoloController = new LaudoSoloController()

const chartLaudoQuimicoValores = {
    chart: {
        caption: "Amostras",
        subcaption: "Dados dos laudos químico",
        xaxisname: "Amostras",
        yaxisname: "valores",
        formatnumberscale: "1",
        plottooltext:
            "Amostra $label <b>$seriesName</b>: <b>$dataValue</b>",
        theme: "candy",
        drawcrossline: "1"
    },
    categories: [{ category: [] }],
    dataset: [{ seriesname: "pH", data: [] }, { seriesname: "SMP", data: [] }]
}

const chartLaudoQuimicoPercentage = {
    chart: {
        caption: "Amostras",
        subcaption: "Dados dos laudos químico",
        xaxisname: "Amostras",
        yaxisname: "%",
        formatnumberscale: "1",
        plottooltext:
            "Amostra $label <b>$seriesName</b>: <b>$dataValue</b>",
        theme: "candy",
        drawcrossline: "1"
    },
    categories: [{ category: [] }],
    dataset: [{ seriesname: "V", data: [] }, { seriesname: "Al", data: [] }, { seriesname: "MO", data: [] }, { seriesname: "argila", data: [] }]
}

const chartLaudoQuimicoMgdm3 = {
    chart: {
        caption: "Amostras",
        subcaption: "Dados dos laudos químico",
        xaxisname: "Amostras",
        yaxisname: "mg/dm³",
        formatnumberscale: "1",
        plottooltext:
            "Amostra $label <b>$seriesName</b>: <b>$dataValue</b>",
        theme: "candy",
        drawcrossline: "1"
    },
    categories: [{ category: [] }],
    dataset: [{ seriesname: "P-mehlich", data: [] }, { seriesname: "K", data: [] }, { seriesname: "S", data: [] }]
}

const chartLaudoQuimicoCmolcdm3 = {
    chart: {
        caption: "Amostras",
        subcaption: "Dados dos laudos químico",
        xaxisname: "Amostras",
        yaxisname: "cmolc/dm³",
        formatnumberscale: "1",
        plottooltext:
            "Amostra $label <b>$seriesName</b>: <b>$dataValue</b>",
        theme: "candy",
        drawcrossline: "1"
    },
    categories: [{ category: [] }],
    dataset: [{ seriesname: "CTCpH7", data: [] }, { seriesname: "Ca", data: [] }, { seriesname: "Mg", data: [] }]
}

clienteController.load.then(() => {
    const cliente = clienteController.cliente

    talhaoController.load(clienteController).then(() => {
        const talhao = talhaoController.talhao

        layout.setLinkBack(`../../cliente/talhao/detalhes/index.html?clienteId=${clienteController.id}&talhaoId=${talhaoController.id}`)

        analiseSoloController.load(talhaoController).then(() => {
            const analiseSolo = analiseSoloController.analiseSolo

            layout.setTitle(`${cliente.getFullNome()} - ${talhao.getNome().toUpperCase()} - ${analiseSolo.getInicio().getDate()}`)
            const add = document.querySelector('button#add')
            if (add) {
                add.setAttribute('data-href', `../amostra/novo/index.html?clienteId=${clienteController.id}&talhaoId=${talhaoController.id}&analiseSoloId=${analiseSoloController.id}`)
            }

            const informacoes = document.querySelector('tbody#informacoes')
            if (informacoes) {
                informacoes.innerHTML = `<tr>
                        <th>Cliente</th>
                        <td>${cliente.getFullNome()}</td>
                    </tr>
                    <tr>
                        <th>Talhão</th>
                        <td>${talhao.getNome()}</td>
                    </tr>
                    <tr>
                        <th>Análise de solo iniciado em</th>
                        <td>${analiseSolo.getInicio().getDate()}</td>
                    </tr>`
            }

            const configuracoes = document.querySelector('tbody#configuracoes')
            if (configuracoes) {
                configuracoes.innerHTML = `<tr>
                        <th>Título</th>
                        <td>${analiseSolo.getConfiguracao().getTitulo()}</td>
                    </tr>
                    <tr>
                        <th>Autor</th>
                        <td>${analiseSolo.getConfiguracao().getAutor()}</td>
                    </tr>
                    <tr>
                        <th>Região</th>
                        <td>${analiseSolo.getConfiguracao().getRegiao()}</td>
                    </tr>
                    <tr>
                        <th>Tipo</th>
                        <td>${analiseSolo.getConfiguracao().getTipo()}</td>
                    </tr>
                    <tr>
                        <th>Ano</th>
                        <td>${analiseSolo.getConfiguracao().getAno()}</td>
                    </tr>`

                const acidezSolo = analiseSolo.getAcidezSolo()
                if (acidezSolo.length > 0) {
                    let text = ''
                    acidezSolo.forEach(e => {
                        text += `Para correção da acidez do solo da camada ${e.getProfundidade().getText()}<br>`
                    })
                    configuracoes.innerHTML += `<tr>
                            <th>${acidezSolo.length} pacotes</th>
                            <td>${text}</td>
                        </tr>`
                }
            }

            laudoSoloController.load(analiseSoloController).then(() => {
                const list = laudoSoloController.list
                const map = document.querySelector('div#map')

                if (map) {
                    talhaoController.setMapAndPoints(map, list)
                }

                const amostras = document.querySelector('tbody#amostras')
                if (amostras) {
                    let i = 0
                    list.forEach(laudo => {
                        amostras.innerHTML += `<tr>
                                <td>
                                    <b>Amostra: ${laudo.getAmostra()}</b><br>
                                    Profundidade: ${laudo.getProfundidade().getText()}<br>
                                    Coordenadas: ${laudo.getCoordenadas().getText()}<br>
                                </td>
                                <td>
                                    <button class="text red" id="${i}">excluir amostra</button>
                                    <button class="text" data-href="../amostra/editar/index.html?clienteId=${clienteController.id}&talhaoId=${talhaoController.id}&analiseSoloId=${analiseSoloController.id}&laudoSoloId=${laudo.getId()}">editar amostra</button>
                                </td>
                            </tr>`

                        const quimico = laudo.getLaudoQuimicoSolo()
                        const quimicoCa = quimico.getCa()
                        const quimicoMg = quimico.getMg()
                        const quimicoAl = quimico.getAl()
                        const quimicoCTCph7 = quimico.getCTCph7()
                        const quimicoV = quimico.getV()
                        const quimicoMO = quimico.getMO()
                        const quimicoArgila = quimico.getArgila()
                        const quimicoS = quimico.getS()
                        const quimicoPmehlich = quimico.getPmehlich()
                        const quimicoK = quimico.getK()

                        chartLaudoQuimicoValores.categories[0].category.push({ label: laudo.getAmostra() })
                        chartLaudoQuimicoValores.dataset[0].data.push({ value: quimico.getpH() })
                        chartLaudoQuimicoValores.dataset[1].data.push({ value: quimico.getSMP() })

                        chartLaudoQuimicoPercentage.categories[0].category.push({ label: laudo.getAmostra() })
                        chartLaudoQuimicoPercentage.dataset[0].data.push({ value: quimicoV.getPercentageInt() })
                        chartLaudoQuimicoPercentage.dataset[1].data.push({ value: quimicoAl.getPercentageInt() })
                        chartLaudoQuimicoPercentage.dataset[2].data.push({ value: quimicoMO.getPercentageInt() })
                        chartLaudoQuimicoPercentage.dataset[3].data.push({ value: quimicoArgila.getPercentageInt() })

                        chartLaudoQuimicoMgdm3.categories[0].category.push({ label: laudo.getAmostra() })
                        chartLaudoQuimicoMgdm3.dataset[0].data.push({ value: quimicoPmehlich.getMgdm3Int() })
                        chartLaudoQuimicoMgdm3.dataset[1].data.push({ value: quimicoK.getMgdm3Int() })
                        chartLaudoQuimicoMgdm3.dataset[2].data.push({ value: quimicoS.getMgdm3Int() })

                        chartLaudoQuimicoCmolcdm3.categories[0].category.push({ label: laudo.getAmostra() })
                        chartLaudoQuimicoCmolcdm3.dataset[0].data.push({ value: quimicoCTCph7.getCmolcdm3Int() })
                        chartLaudoQuimicoCmolcdm3.dataset[1].data.push({ value: quimicoCa.getCmolcdm3Int() })
                        chartLaudoQuimicoCmolcdm3.dataset[2].data.push({ value: quimicoMg.getMgdm3Int() })

                        i++
                    })

                    exibirGraficoLaudoQuimicoValores(chartLaudoQuimicoValores)
                    exibirLaudoQuimicoPercentage(chartLaudoQuimicoPercentage)
                    exibirLaudoQuimicoMgdm3(chartLaudoQuimicoMgdm3)
                    exibirLaudoQuimicoCmolcdm3(chartLaudoQuimicoCmolcdm3)

                }

                const coordenadas = document.querySelector('tbody#coordenadas')
                if (coordenadas) {
                    const list = laudoSoloController.getCoordenadasList()
                    console.log(list)
                    list.forEach(e => {
                        const acidezMedia = e.getMediaLaudoAcidezSolo()
                        const acidezTotal = e.getTotalLaudoAcidezSolo()
                        let mediaCalcario = ''
                        let totalCalcario = ''
                        let mediaGesso = ''
                        let totalGesso = ''

                        if (acidezMedia.calcario.getProduto() != 'produto indefinido') {
                            mediaCalcario = `${acidezMedia.calcario.getValor()} de ${acidezMedia.calcario.getProduto()}<br>`
                        }
                        if (acidezTotal.calcario.getProduto() != 'produto indefinido') {
                            totalCalcario = `${acidezTotal.calcario.getValor()} de ${acidezTotal.calcario.getProduto()}<br>`
                        }
                        if (acidezMedia.gesso.getProduto() != 'produto indefinido') {
                            mediaGesso = `${acidezMedia.gesso.getValor()} de ${acidezMedia.gesso.getProduto()}<br>`
                        }
                        if (acidezTotal.gesso.getProduto() != 'produto indefinido') {
                            totalGesso = `${acidezTotal.gesso.getValor()} de ${acidezTotal.gesso.getProduto()}<br>`
                        }
                        
                        const fertilidadeMedia = e.getMediaLaudoFertilidadeSolo()
                        const fertilidadeTotal = e.getTotalLaudoFertilidadeSolo()
                        let mediaN = ''
                        let totalN = ''
                        let mediaP = ''
                        let totalP = ''
                        let mediaK = ''
                        let totalK = ''

                        if (fertilidadeMedia.n.getProduto() != 'produto indefinido') {
                            mediaN = `${fertilidadeMedia.n.getValor()} de ${fertilidadeMedia.n.getProduto()}<br>`
                        }
                        if (fertilidadeMedia.p.getProduto() != 'produto indefinido') {
                            mediaP = `${fertilidadeMedia.p.getValor()} de ${fertilidadeMedia.p.getProduto()}<br>`
                        }
                        if (fertilidadeMedia.k.getProduto() != 'produto indefinido') {
                            mediaK = `${fertilidadeMedia.k.getValor()} de ${fertilidadeMedia.k.getProduto()}<br>`
                        }
                        if (fertilidadeTotal.n.getProduto() != 'produto indefinido') {
                            totalN = `${fertilidadeTotal.n.getValor()} de ${fertilidadeTotal.n.getProduto()}<br>`
                        }
                        if (fertilidadeTotal.p.getProduto() != 'produto indefinido') {
                            totalP = `${fertilidadeTotal.p.getValor()} de ${fertilidadeTotal.p.getProduto()}<br>`
                        }
                        if (fertilidadeTotal.k.getProduto() != 'produto indefinido') {
                            totalK = `${fertilidadeTotal.k.getValor()} de ${fertilidadeTotal.k.getProduto()}<br>`
                        }
                        coordenadas.innerHTML += `<tr>
                                <td>${e.coordenadas.getText()}</td>
                                    <td>
                                        ${mediaCalcario}
                                        ${mediaGesso}
                                        ${mediaN}
                                        ${mediaP}
                                        ${mediaK}
                                    </td>
                                    <td>
                                        ${totalCalcario}
                                        ${totalGesso}
                                        ${totalN}
                                        ${totalP}
                                        ${totalK}
                                    </td>
                            </tr>`
                    })
                }
            }).catch(e => {
                console.log(e)
            })

            document.addEventListener('click', e => {
                if (e.target.tagName == 'BUTTON') {
                    const id = parseInt(e.target.id)
                    if (!isNaN(id)) {
                        laudoSoloController.delete(laudoSoloController.list[id], 'index.html')
                    }
                    else if (e.target.id == 'excluir') {
                        analiseSoloController.delete(analiseSolo, '../../cliente/talhao/detalhes/index.html')
                    }
                    else if (e.target.id == 'imprimir') {
                        new AnaliseSoloPrintClass(clienteController, talhaoController, analiseSoloController, laudoSoloController).print()
                    }
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

function exibirGraficoLaudoQuimicoValores(dataSource) {
    chart(dataSource, 'chartLaudoQuimicoValores')
}

function exibirLaudoQuimicoPercentage(dataSource) {
    chart(dataSource, 'chartLaudoQuimicoPercentage')
}

function exibirLaudoQuimicoMgdm3(dataSource) {
    chart(dataSource, 'chartLaudoQuimicoMgdm3')
}

function exibirLaudoQuimicoCmolcdm3(dataSource) {
    chart(dataSource, 'chartLaudoQuimicoCmolcdm3')
}

function chart(dataSource, id) {
    FusionCharts.ready(function () {
        var myChart = new FusionCharts({
            type: "mscolumn2d",
            renderAt: id,
            width: "100%",
            height: 400,
            dataFormat: "json",
            dataSource
        }).render()
    })
}