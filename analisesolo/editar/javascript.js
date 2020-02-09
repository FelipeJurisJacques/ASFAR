import { LayoutSyncClass } from '../../script/class/LayoutSyncClass.js'
import { NavbarSyncClass } from '../../script/class/NavbarSyncClass.js'
import { RequestUrlResource } from '../../source/resource/RequestUrlResource.js'
import { AnaliseSoloController } from '../../source/controller/AnaliseSoloController.js'

const layout = new LayoutSyncClass()
const sync = new NavbarSyncClass()

const title = document.querySelector('div#header b#headerTitle')
const back = document.querySelector('div#header a.back')
const contextBack = document.querySelector('div#header div.menu ul li#back')
const laudoList = document.querySelector('tbody#laudoList')
const requestUrl = new RequestUrlResource().getItens()

if (
    requestUrl.clienteId &&
    requestUrl.talhaoId &&
    requestUrl.analiseSoloId &&
    title &&
    back &&
    contextBack &&
    laudoList
) {
    const clienteId = requestUrl.clienteId
    const talhaoId = requestUrl.talhaoId
    const analiseSoloId = requestUrl.analiseSoloId
    const controller = new AnaliseSoloController(clienteId, talhaoId, analiseSoloId, true)

    back.setAttribute('data-href', `../../cliente/talhao/detalhes/index.html?clienteId=${clienteId}&talhaoId=${talhaoId}`)
    contextBack.setAttribute('data-href', `../../cliente/talhao/detalhes/index.html?clienteId=${clienteId}&talhaoId=${talhaoId}`)
    document.querySelector('#add').setAttribute('data-href', `laudoquimico/index.html?clienteId=${clienteId}&talhaoId=${talhaoId}&analiseSoloId=${analiseSoloId}`)

    controller.load.then(() => {
        // TITULO DA PAGINA
        title.innerHTML = controller.cliente.getApelido()
        title.innerHTML += ` - ${controller.talhao.getNome().toUpperCase()}`
        title.innerHTML += ` - ${controller.analiseSolo.getInicio().getDate()}`

        // INFORMACOES DO CLIENTE E TALHAO
        document.querySelector('#cliente').innerHTML = controller.cliente.getFullNome()
        document.querySelector('#talhao').innerHTML = controller.talhao.getNome()
        document.querySelector('#inicio').innerHTML = controller.analiseSolo.getInicio().getDate()
        document.querySelector('#configuracao').innerHTML = `${controller.analiseSolo.getConfiguracao().getTitulo()}
            <br><br>
            <b>ANO</b>: ${controller.analiseSolo.getConfiguracao().getAno()}
            <br><br>
            <b>AUTOR</b>: ${controller.analiseSolo.getConfiguracao().getAutor()}`

        // IFORMACOES DOS PACOTES DE CONFIGURACOES
        document.querySelector('#configuracaoacidezsolo').innerHTML = `<b>${controller.analiseSolo.getAcidezSolo().length}</b> pacotes <br>`
        controller.analiseSolo.getAcidezSolo().forEach(e => {
            document.querySelector('#configuracaoacidezsolo').innerHTML += `Para correção da camada ${e.getProfundidade().getText()}<br>`
        })

        controller.analiseSolo.laudoSoloList.forEach(laudoSolo => {
            const newRow = laudoList.insertRow(laudoList.rows.length)
            newRow.setAttribute('tabindex', '0')

            let newCell = newRow.insertCell(0)
            newCell.innerHTML = `<b>${laudoSolo.getAmostra()}</b><br>
                Camada de profundidade da amostra: ${laudoSolo.getProfundidade().getText()}<br>
                Geolocalização: ${laudoSolo.getCoordenadas().getLatitude()} / ${laudoSolo.getCoordenadas().getLongitude()}`

            newCell = newRow.insertCell(1)
            newCell.innerHTML = `<button class="text" type="button" 
                data-href="laudoquimico/index.html?clienteId=${clienteId}&talhaoId=${talhaoId}&analiseSoloId=${analiseSoloId}&laudoSoloId=${laudoSolo.getId()}"
                >Laudo químico</button>
                <button class="text" type="button" 
                data-href="laudoacidez/index.html?clienteId=${clienteId}&talhaoId=${talhaoId}&analiseSoloId=${analiseSoloId}&laudoSoloId=${laudoSolo.getId()}"
                >correção da acidez</button>`

            newCell = newRow.insertCell(2)
            newCell.innerHTML = `<button type="button" class="del" name="deletelaudo" id="${laudoSolo.getId()}" style="display: none"></button>`
        })

        // MAPA DAS AMOSTRAS
        const map1 = document.querySelector('div#mapAmostra')
        if(map1){
            map1.innerHTML = controller.getAmostrasMapSVG()
        }

        document.addEventListener('click', e => {
            if (e.target.tagName == 'BUTTON') {
                if (e.target.id == 'edit') {
                    e.target.parentNode.remove()
                    document.querySelector('button#delete').remove()
                    document.querySelectorAll('div.field input').forEach(i => {
                        i.disabled = false
                    })
                    document.querySelectorAll('div.field select').forEach(i => {
                        i.disabled = false
                    })
                    document.querySelectorAll('div.field textarea').forEach(i => {
                        i.disabled = false
                    })
                    document.querySelectorAll('button').forEach(i => {
                        i.style.display = 'block'
                    })
                }
                else if (e.target.name == 'deletelaudo') {
                    controller.deleteLaudo(e.target.id).then(i => {
                        if (i) {
                            window.navbar.goTab('reload')
                        }
                    }).catch(() => { })
                }
                else if (e.target.id == 'delete') {
                    controller.deleteAnalise().then(i => {
                        if (i) {
                            sync.goTab(`../../cliente/talhao/detalhes/index.html?clienteId=${clienteId}&talhaoId=${talhaoId}`)
                        }
                    }).catch(() => { })
                }
            }
        })
    }).catch(() => { })
}