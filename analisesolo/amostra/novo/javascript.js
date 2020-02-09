import { LayoutSyncClass } from '../../../script/class/LayoutSyncClass.js'
import { NavbarSyncClass } from '../../../script/class/NavbarSyncClass.js'
import { InputFieldClass } from '../../../script/util/InputFieldClass.js'
import { ClienteController } from '../../../source/controller/ClienteController.js'
import { TalhaoController } from '../../../source/controller/TalhaoController.js'
import { AnaliseSoloController } from '../../../source/controller/AnaliseSoloController.js'
import { LaudoSoloController } from '../../../source/controller/LaudoSoloController.js'
import { DateClass } from '../../../source/util/models/DateClass.js'

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
                    const laudoQuimicoSolo = laudoSolo.getLaudoQuimicoSolo()

                    talhaoController.setMapAndPoints(document.querySelector('div#map'), [laudoSolo])

                    const amostra = document.getElementsByName('amostra')[0]
                    const entrada = document.getElementsByName('entrada')[0]
                    const emissao = document.getElementsByName('emissao')[0]
                    const coletador = document.getElementsByName('coletador')[0]
                    const empresa = document.getElementsByName('empresa')[0]
                    const profundidade = document.getElementsByName('profundidade')
                    const file = document.getElementsByName('file')[0]
                    const longitude = document.getElementsByName('longitude')[0]
                    const latitude = document.getElementsByName('latitude')[0]
                    const descricao = document.getElementsByName('descricao')[0]
                    const ph = document.getElementsByName('ph')[0]
                    const smp = document.getElementsByName('smp')[0]
                    const alcmolcdm3 = document.getElementsByName('alcmolcdm3')[0]
                    const halcmolcdm3 = document.getElementsByName('halcmolcdm3')[0]
                    const alPercentage = document.getElementsByName('alPercentage')[0]
                    const vpercentage = document.getElementsByName('vpercentage')[0]
                    const ctcefetivacmolcdm3 = document.getElementsByName('ctcefetivacmolcdm3')[0]
                    const ctcph7cmolcdm3 = document.getElementsByName('ctcph7cmolcdm3')[0]
                    const cacmolcdm3 = document.getElementsByName('cacmolcdm3')[0]
                    const mgcmolcdm3 = document.getElementsByName('mgcmolcdm3')[0]
                    const kmolcdm3 = document.getElementsByName('kmolcdm3')[0]
                    const kmgdm3 = document.getElementsByName('kmgdm3')[0]
                    const smgdm3 = document.getElementsByName('smgdm3')[0]
                    const pmehlichmgdm3 = document.getElementsByName('pmehlichmgdm3')[0]
                    const presinamgdm3 = document.getElementsByName('presinamgdm3')[0]
                    const premmgdm3 = document.getElementsByName('premmgdm3')[0]
                    const cumgdm3 = document.getElementsByName('cumgdm3')[0]
                    const znmgdm3 = document.getElementsByName('znmgdm3')[0]
                    const bmgdm3 = document.getElementsByName('bmgdm3')[0]
                    const femgdm3 = document.getElementsByName('femgdm3')[0]
                    const mnmgdm3 = document.getElementsByName('mnmgdm3')[0]
                    const ctotalmgdm3 = document.getElementsByName('ctotalmgdm3')[0]
                    const mopercentage = document.getElementsByName('mopercentage')[0]
                    const argilapercentage = document.getElementsByName('argilapercentage')[0]
                    const textura = document.getElementsByName('textura')[0]

                    const elementos = analiseSoloController.getConfiguracaoElementosRequeridos()
                    // console.log(elementos)
                    elementos.forEach(e => {
                        const u = e[1]
                        e = e[0]
                        if (e == 'pH') {
                            setRequired(ph)
                        }
                        else if (e == 'SMP') {
                            setRequired(smp)
                        }
                        else if (e == 'textura') {
                            setRequired(textura)
                        }
                        else if (e == 'Ca') {
                            if (u == 'cmolcdm3') {
                                setRequired(cacmolcdm3)
                            }
                        }
                        else if (e == 'Mg') {
                            if (u == 'cmolcdm3') {
                                setRequired(mgcmolcdm3)
                            }
                        }
                        else if (e == 'Al') {
                            if (u == 'cmolcdm3') {
                                setRequired(alcmolcdm3)
                            }
                            else if (u == 'percentage') {
                                setRequired(alPercentage)
                            }
                        }
                        else if (e == 'HAl') {
                            if (u == 'cmolcdm3') {
                                setRequired(halcmolcdm3)
                            }
                        }
                        else if (e == 'CTCefetiva') {
                            if (u == 'cmolcdm3') {
                                setRequired(ctcefetivacmolcdm3)
                            }
                        }
                        else if (e == 'CTCph7') {
                            if (u == 'cmolcdm3') {
                                setRequired(ctcph7cmolcdm3)
                            }
                        }
                        else if (e == 'V') {
                            if (u == 'percentage') {
                                setRequired(vpercentage)
                            }
                        }
                        else if (e == 'MO') {
                            if (u == 'percentage') {
                                setRequired(mopercentage)
                            }
                        }
                        else if (e == 'argila') {
                            if (u == 'percentage') {
                                setRequired(argilapercentage)
                            }
                        }
                        else if (e == 'S') {
                            if (u == 'mgdm3') {
                                setRequired(smgdm3)
                            }
                        }
                        else if (e == 'Pmehlich') {
                            if (u == 'mgdm3') {
                                setRequired(pmehlichmgdm3)
                            }
                        }
                        else if (e == 'Presina') {
                            if (u == 'mgdm3') {
                                setRequired(presinamgdm3)
                            }
                        }
                        else if (e == 'Prem') {
                            if (u == 'mgdm3') {
                                setRequired(premmgdm3)
                            }
                        }
                        else if (e == 'K') {
                            if (u == 'cmolcdm3') {
                                setRequired(kmolcdm3)
                            }
                            else if (u == 'mgdm3') {
                                setRequired(kmgdm3)
                            }
                        }
                        else if (e == 'Cu') {
                            if (u == 'mgdm3') {
                                setRequired(cumgdm3)
                            }
                        }
                        else if (e == 'Zn') {
                            if (u == 'mgdm3') {
                                setRequired(znmgdm3)
                            }
                        }
                        else if (e == 'B') {
                            if (u == 'mgdm3') {
                                setRequired(bmgdm3)
                            }
                        }
                        else if (e == 'Fe') {
                            if (u == 'mgdm3') {
                                setRequired(femgdm3)
                            }
                        }
                        else if (e == 'Mn') {
                            if (u == 'mgdm3') {
                                setRequired(mnmgdm3)
                            }
                        }
                        else if (e == 'C') {
                            if (u == 'mnmgdm3') {
                                setRequired(ctotalmgdm3)
                            }
                        }
                    })

                    function setRequired(e) {
                        if (e) {
                            inputs.setHelpInvalid(e, 'campo requerido pelo pacote de configuração')
                            inputs.setRequired(e)
                        }
                    }

                    form.addEventListener('change', e => {
                        if (
                            e.target.tagName == 'INPUT' ||
                            e.target.tagName == 'SELECT' ||
                            e.target.tagName == 'TEXTAREA'
                        ) {
                            const i = e.target
                            inputs.clearInput(i)
                            if (i.name == 'amostra') {
                                if (laudoSolo.setAmostra(i.value)) {
                                    i.value = laudoSolo.getAmostra()
                                }
                                else {
                                    inputs.setInvalid(i)
                                }
                            }
                            else if (i.name == 'coletador') {
                                if (laudoSolo.setColetador(i.value)) {
                                    i.value = laudoSolo.getColetador()
                                }
                                else {
                                    inputs.setInvalid(i)
                                }
                            }
                            else if (i.name == 'profundidade') {
                                laudoSolo.setProfundidade(validaProfundidade(laudoSolo.getProfundidade(), profundidade))
                            }
                            else if (i.name == 'entrada') {
                                if (!laudoSolo.setEntrada(new DateClass(i.value))) {
                                    inputs.setInvalid(i)
                                }
                            }
                            else if (i.name == 'emissao') {
                                if (!laudoSolo.setEmissao(new DateClass(i.value))) {
                                    inputs.setInvalid(i)
                                }
                            }
                            else if (i.name == 'empresa') {
                                if (laudoSolo.setEmpresa(i.value)) {
                                    i.value = laudoSolo.getEmpresa()
                                }
                                else {
                                    inputs.setInvalid(i)
                                }
                            }
                            else if (i.name == 'descricao') {
                                if (laudoSolo.setDescricao(i.value)) {
                                    i.value = laudoSolo.getDescricao()
                                }
                                else {
                                    inputs.setInvalid(i)
                                }
                            }
                            else if (i.name == 'file') {
                                if (longitude && latitude) {
                                    inputs.clearInput(longitude)
                                    inputs.clearInput(latitude)
                                }
                                laudoSolo.setKml(i.files[0]).then(() => {
                                    inputs.setValid(i)
                                    if (longitude && latitude) {
                                        const c = laudoSolo.getCoordenadas()
                                        longitude.value = c.getLongitude()
                                        latitude.value = c.getLatitude()
                                        longitude.disabled = true
                                        latitude.disabled = true
                                        talhaoController.setMapAndPoints(document.querySelector('div#map'), [laudoSolo])
                                    }
                                }).catch(e => {
                                    inputs.setHelpInvalid(i, e)
                                    inputs.setInvalid(i)
                                    if (longitude && latitude) {
                                        longitude.value = ''
                                        latitude.value = ''
                                        longitude.disabled = false
                                        latitude.disabled = false
                                        talhaoController.setMapAndPoints(document.querySelector('div#map'), [laudoSolo])
                                    }
                                })
                            }
                            else if (i.name == 'longitude') {
                                const c = laudoSolo.getCoordenadas()
                                if (c.setLongitude(i.value)) {
                                    i.value = c.getLongitude()
                                }
                                else {
                                    inputs.setInvalid(i)
                                }
                                laudoSolo.setCoordenadas(c)
                                talhaoController.setMapAndPoints(document.querySelector('div#map'), [laudoSolo])
                            }
                            else if (i.name == 'latitude') {
                                const c = laudoSolo.getCoordenadas()
                                if (c.setLatitude(i.value)) {
                                    i.value = c.getLatitude()
                                }
                                else {
                                    inputs.setInvalid(i)
                                }
                                laudoSolo.setCoordenadas(c)
                                talhaoController.setMapAndPoints(document.querySelector('div#map'), [laudoSolo])
                            }
                            else if (i.name == 'ph') {
                                if (laudoQuimicoSolo.setpH(i.value)) {
                                    i.value = laudoQuimicoSolo.getpH()
                                }
                                else {
                                    inputs.setInvalid(i)
                                }
                            }
                            else if (i.name == 'smp') {
                                if (laudoQuimicoSolo.setSMP(i.value)) {
                                    i.value = laudoQuimicoSolo.getSMP()
                                }
                                else {
                                    inputs.setInvalid(i)
                                }
                            }
                            else if (i.name == 'textura') {
                                if (laudoQuimicoSolo.setTextura(i.value)) {
                                    i.value = laudoQuimicoSolo.getTextura()
                                }
                                else {
                                    inputs.setInvalid(i)
                                }
                            }
                            else if (i.name == 'alcmolcdm3') {
                                const elemento = laudoQuimicoSolo.getAl()
                                if (elemento.setCmolcdm3(i.value)) {
                                    i.value = elemento.getCmolcdm3ForInput()
                                }
                                else {
                                    inputs.setInvalid(i)
                                }
                                laudoQuimicoSolo.setAl(elemento)
                            }
                            else if (i.name == 'halcmolcdm3') {
                                const elemento = laudoQuimicoSolo.getHAl()
                                if (elemento.setCmolcdm3(i.value)) {
                                    i.value = elemento.getCmolcdm3ForInput()
                                }
                                else {
                                    inputs.setInvalid(i)
                                }
                                laudoQuimicoSolo.setHAl(elemento)
                            }
                            else if (i.name == 'alPercentage') {
                                const elemento = laudoQuimicoSolo.getAl()
                                if (elemento.setPercentage(i.value)) {
                                    i.value = elemento.getPercentageForInput()
                                }
                                else {
                                    inputs.setInvalid(i)
                                }
                                laudoQuimicoSolo.setAl(elemento)
                            }
                            else if (i.name == 'vpercentage') {
                                const elemento = laudoQuimicoSolo.getV()
                                if (elemento.setPercentage(i.value)) {
                                    i.value = elemento.getPercentageForInput()
                                }
                                else {
                                    inputs.setInvalid(i)
                                }
                                laudoQuimicoSolo.setV(elemento)
                            }
                            else if (i.name == 'ctcefetivacmolcdm3') {
                                const elemento = laudoQuimicoSolo.getCTCefetiva()
                                if (elemento.setCmolcdm3(i.value)) {
                                    i.value = elemento.getCmolcdm3ForInput()
                                }
                                else {
                                    inputs.setInvalid(i)
                                }
                                laudoQuimicoSolo.setCTCefetiva(elemento)
                            }
                            else if (i.name == 'ctcph7cmolcdm3') {
                                const elemento = laudoQuimicoSolo.getCTCph7()
                                if (elemento.setCmolcdm3(i.value)) {
                                    i.value = elemento.getCmolcdm3ForInput()
                                }
                                else {
                                    inputs.setInvalid(i)
                                }
                                laudoQuimicoSolo.setCTCph7(elemento)
                            }
                            else if (i.name == 'cacmolcdm3') {
                                const elemento = laudoQuimicoSolo.getCa()
                                if (elemento.setCmolcdm3(i.value)) {
                                    i.value = elemento.getCmolcdm3ForInput()
                                }
                                else {
                                    inputs.setInvalid(i)
                                }
                                laudoQuimicoSolo.setCa(elemento)
                            }
                            else if (i.name == 'mgcmolcdm3') {
                                const elemento = laudoQuimicoSolo.getMg()
                                if (elemento.setCmolcdm3(i.value)) {
                                    i.value = elemento.getCmolcdm3ForInput()
                                }
                                else {
                                    inputs.setInvalid(i)
                                }
                                laudoQuimicoSolo.setMg(elemento)
                            }
                            else if (i.name == 'kmolcdm3') {
                                const elemento = laudoQuimicoSolo.getK()
                                if (elemento.setCmolcdm3(i.value)) {
                                    i.value = elemento.getCmolcdm3ForInput()
                                }
                                else {
                                    inputs.setInvalid(i)
                                }
                                laudoQuimicoSolo.setK(elemento)
                            }
                            else if (i.name == 'kmgdm3') {
                                const elemento = laudoQuimicoSolo.getK()
                                if (elemento.setMgdm3(i.value)) {
                                    i.value = elemento.getMgdm3ForInput()
                                }
                                else {
                                    inputs.setInvalid(i)
                                }
                                laudoQuimicoSolo.setK(elemento)
                            }
                            else if (i.name == 'smgdm3') {
                                const elemento = laudoQuimicoSolo.getS()
                                if (elemento.setMgdm3(i.value)) {
                                    i.value = elemento.getMgdm3ForInput()
                                }
                                else {
                                    inputs.setInvalid(i)
                                }
                                laudoQuimicoSolo.setS(elemento)
                            }
                            else if (i.name == 'pmehlichmgdm3') {
                                const elemento = laudoQuimicoSolo.getPmehlich()
                                if (elemento.setMgdm3(i.value)) {
                                    i.value = elemento.getMgdm3ForInput()
                                }
                                else {
                                    inputs.setInvalid(i)
                                }
                                laudoQuimicoSolo.setPmehlich(elemento)
                            }
                            else if (i.name == 'presinamgdm3') {
                                const elemento = laudoQuimicoSolo.getPresina()
                                if (elemento.setMgdm3(i.value)) {
                                    i.value = elemento.getMgdm3ForInput()
                                }
                                else {
                                    inputs.setInvalid(i)
                                }
                                laudoQuimicoSolo.setPresina(elemento)
                            }
                            else if (i.name == 'premmgdm3') {
                                const elemento = laudoQuimicoSolo.getPrem()
                                if (elemento.setMgdm3(i.value)) {
                                    i.value = elemento.getMgdm3ForInput()
                                }
                                else {
                                    inputs.setInvalid(i)
                                }
                                laudoQuimicoSolo.setPrem(elemento)
                            }
                            else if (i.name == 'cumgdm3') {
                                const elemento = laudoQuimicoSolo.getCu()
                                if (elemento.setMgdm3(i.value)) {
                                    i.value = elemento.getMgdm3ForInput()
                                }
                                else {
                                    inputs.setInvalid(i)
                                }
                                laudoQuimicoSolo.setCu(elemento)
                            }
                            else if (i.name == 'znmgdm3') {
                                const elemento = laudoQuimicoSolo.getZn()
                                if (elemento.setMgdm3(i.value)) {
                                    i.value = elemento.getMgdm3ForInput()
                                }
                                else {
                                    inputs.setInvalid(i)
                                }
                                laudoQuimicoSolo.setZn(elemento)
                            }
                            else if (i.name == 'bmgdm3') {
                                const elemento = laudoQuimicoSolo.getB()
                                if (elemento.setMgdm3(i.value)) {
                                    i.value = elemento.getMgdm3ForInput()
                                }
                                else {
                                    inputs.setInvalid(i)
                                }
                                laudoQuimicoSolo.setB(elemento)
                            }
                            else if (i.name == 'femgdm3') {
                                const elemento = laudoQuimicoSolo.getFe()
                                if (elemento.setMgdm3(i.value)) {
                                    i.value = elemento.getMgdm3ForInput()
                                }
                                else {
                                    inputs.setInvalid(i)
                                }
                                laudoQuimicoSolo.setFe(elemento)
                            }
                            else if (i.name == 'mnmgdm3') {
                                const elemento = laudoQuimicoSolo.getMn()
                                if (elemento.setMgdm3(i.value)) {
                                    i.value = elemento.getMgdm3ForInput()
                                }
                                else {
                                    inputs.setInvalid(i)
                                }
                                laudoQuimicoSolo.setMn(elemento)
                            }
                            else if (i.name == 'ctotalmgdm3') {
                                const elemento = laudoQuimicoSolo.getC()
                                if (elemento.setMgdm3(i.value)) {
                                    i.value = elemento.getMgdm3ForInput()
                                }
                                else {
                                    inputs.setInvalid(i)
                                }
                                laudoQuimicoSolo.setC(elemento)
                            }
                            else if (i.name == 'mopercentage') {
                                const elemento = laudoQuimicoSolo.getMO()
                                if (elemento.setPercentage(i.value)) {
                                    i.value = elemento.getPercentageForInput()
                                }
                                else {
                                    inputs.setInvalid(i)
                                }
                                laudoQuimicoSolo.setMO(elemento)
                            }
                            else if (i.name == 'argilapercentage') {
                                const elemento = laudoQuimicoSolo.getArgila()
                                if (elemento.setPercentage(i.value)) {
                                    i.value = elemento.getPercentageForInput()
                                }
                                else {
                                    inputs.setInvalid(i)
                                }
                                laudoQuimicoSolo.setArgila(elemento)
                            }
                            console.log(laudoSolo)
                        }
                    })

                    function validaProfundidade(p, a) {
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

                    // SALVA FORMULARIO
                    document.querySelector('form').addEventListener('submit', e => {
                        e.preventDefault()
                        if (laudoSolo.setLaudoQuimicoSolo(laudoQuimicoSolo)) {
                            const laudoCorrecaoAcidez = laudoSolo.getLaudoAcidezSolo()
                            laudoCorrecaoAcidez.setCalcario(laudoSoloController.calculateAcidezCalcario(laudoSolo))
                            if (laudoSolo.setLaudoAcidezSolo(laudoCorrecaoAcidez)) {
                                laudoSoloController.save(laudoSolo, '../editar/index.html')
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
    }).catch(e => {
        console.log(e)
    })
}