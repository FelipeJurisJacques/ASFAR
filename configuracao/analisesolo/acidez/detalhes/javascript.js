import { LayoutSyncClass } from '../../../../script/class/LayoutSyncClass.js'
import { NavbarSyncClass } from '../../../../script/class/NavbarSyncClass.js'
import { ConfiguracaoController } from '../../../../source/controller/ConfiguracaoController.js'
import { AcidezSoloController } from '../../../../source/controller/AcidezSoloController.js'

const layout = new LayoutSyncClass()
const sync = new NavbarSyncClass()

const tabela = document.querySelector('table tbody#data')

if (tabela) {
    const configuracaoController = new ConfiguracaoController(false)
    configuracaoController.load.then(() => {
        layout.setLinkBack(`../../../detalhes/index.html?configuracaoId=${configuracaoController.id}`)

        const acidezSoloController = new AcidezSoloController(false)
        acidezSoloController.load(configuracaoController).then(() => {
            const acidezSolo = acidezSoloController.acidezSolo
            
            // acidezSoloController.goEdit(document.querySelector('button#editar'), e, '../editar/index.html')

            document.body.addEventListener('click', e => {
                if (e.target.tagName == 'BUTTON') {
                    if (e.target.id == 'excluir') {
                        acidezSoloController.delete(acidezSolo, '../../../detalhes/index.html')
                    }
                }
            })

            tabela.insertRow().innerHTML = `<th>Classe</th>
                <td>${acidezSolo.getClasse()}</td>`

            if (acidezSolo.getCultura()) {
                tabela.insertRow().innerHTML = `<th>Cultura</th>
                    <td>${acidezSolo.getCultura()}</td>`
                if (acidezSolo.getCulturaObs()) {
                    tabela.insertRow().innerHTML = `<th>Observações sobre a cultura</th>
                        <td>${acidezSolo.getCulturaObs()}</td>`
                }
            }

            tabela.insertRow().innerHTML = `<th>Sistema de manejo</th>
                <td>${acidezSolo.getManejo()}</td>`

            if (acidezSolo.getManejoObs()) {
                tabela.insertRow().innerHTML = `<th>Observações sobre o sistema de manejo</th>
                    <td>${acidezSolo.getManejoObs()}</td>`
            }

            if (acidezSolo.getCondicao()) {
                tabela.insertRow().innerHTML = `<th>Condição da área s ser cultivada</th>
                    <td>${acidezSolo.getCondicao()}</td>`
                if (acidezSolo.getCondicaoObs()) {
                    tabela.insertRow().innerHTML = `<th>Observações sobre a condição da área s ser cultivada</th>
                        <td>${acidezSolo.getCondicaoObs()}</td>`
                }
            }

            tabela.insertRow().innerHTML = `<th>Profundidade da amostra</th>
                <td>${acidezSolo.getProfundidade().getText()}</td>`
            if (acidezSolo.getProfundidadeObs()) {
                tabela.insertRow().innerHTML = `<th>Observações sobre a profundidade da amostra</th>
                    <td>${acidezSolo.getProfundidadeObs()}</td>`
            }
            
            tabela.insertRow().innerHTML = `<th>Fórmula lógica de tomada de decisão</th>
            <td>${acidezSolo.getDecisao().getFormula()}</td>`
            if (acidezSolo.getDecisaoObs()) {
                tabela.insertRow().innerHTML = `<th>Observações sobre a tomada de decisão</th>
                <td>${acidezSolo.getDecisaoObs()}</td>`
            }

            const formula = acidezSolo.getFormula()

            tabela.insertRow().innerHTML = `<th>Tipo de fórmula para correção da acidez</th>
                <td>${formula.getType()}</td>`

            tabela.insertRow().innerHTML = `<th>Fórmula para correção da acidez</th>
                <td>${formula.getText()}</td>`

            tabela.insertRow().innerHTML = `<th>Produto para correção da acidez</th>
                <td>${formula.getProduto()}</td>`

            if (acidezSolo.getFormulaObs()) {
                tabela.insertRow().innerHTML = `<th>Observações sobre a fórmula para correção da acidez</th>
                    <td>${acidezSolo.getFormulaObs()}</td>`
            }

            const aplicacao = acidezSolo.getAplicacao()

            tabela.insertRow().innerHTML = `<th>Modo de aplicação</th>
                <td>${aplicacao.getModo()}</td>`

            if (aplicacao.getArea()) {
                tabela.insertRow().innerHTML = `<th>Área de aplicação</th>
                    <td>${aplicacao.getArea()}</td>`
            }

            if (aplicacao.getProfundidade().getText()) {
                tabela.insertRow().innerHTML = `<th>Profundidade de aplicação</th>
                    <td>${aplicacao.getProfundidade().getText()}</td>`
            }

            if (acidezSolo.getAplicacaoObs()) {
                tabela.insertRow().innerHTML = `<th>Observações sobre o modo de aplicação</th>
                    <td>${acidezSolo.getAplicacaoObs()}</td>`
            }
        }).catch(e => {
            consolacidezSolo.log(e)
        })
    }).catch(e => {
        consolacidezSolo.log(e)
    })
}