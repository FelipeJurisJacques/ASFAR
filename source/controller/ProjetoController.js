import { ProjetoDao } from '../dao/ProjetoDao.js'

let log = undefined
let logText = ''
let logCursor = undefined

const dao = new ProjetoDao()

export class ProjetoController {
    create(url) {
        if (window.layout) {
            window.navbar.unsave()
            window.layout.confirm('Todos os dados do projeto anterior será perdido. Deseja prosseguir?').then(e => {
                if (e) {
                    dao.delete().then(() => {
                        window.navbar.save()
                        window.navbar.goTab(url)
                    }).catch(e => {
                        console.log(e)
                    })
                }
                else {
                    window.navbar.save()
                }
            })
        }
    }

    import(file) {
        if (window.layout && window.navbar) {
            consoleLog('autorizando')
            window.layout.confirm('Ao prosseguir, seu projeto atual será destruido. Deseja continuar?').then(q => {
                if (q) {
                    window.navbar.unsave()
                    consoleLogOk()
                    consoleLog('decodificando arquivo')
                    const reader = new FileReader()
                    reader.readAsText(file)
                    reader.onload = r => {
                        if (r.target) {
                            if (r.target.result) {
                                const obj = JSON.parse(r.target.result)
                                consoleLogOk()
                                consoleLog('destruindo dados atuais')
                                dao.delete().then(() => {
                                    consoleLogOk()
                                    consoleLog('lendo arquivo')
                                    console.log(obj)
                                    if (obj.database) {
                                        consoleLog('importando projeto')
                                        dao.update(obj.database).then(() => {
                                            consoleLogOk()
                                            consoleLog(`processo finalizado`, true)
                                        }).catch(() => {
                                            consoleLogDenied()
                                            consoleLogError(`processo interrompido`, true)
                                        })
                                    }
                                    else {
                                        consoleLogDenied()
                                        consoleLog('arquivo vazio')
                                        consoleLogError(`processo interrompido`, true)
                                    }
                                }).catch(() => {
                                    consoleLogDenied()
                                    consoleLogError(`processo interrompido`, true)
                                })
                            }
                            else {
                                consoleLogDenied()
                                consoleLogError(`processo interrompido`, true)
                            }
                        }
                        else {
                            consoleLogDenied()
                            consoleLogError(`processo interrompido`, true)
                        }
                    }
                }
                else {
                    consoleLogDenied()
                    consoleLogError(`processo interrompido`, true)
                }
            })
        }
    }

    export(name) {
        if (typeof name == 'string') {
            window.navbar.unsave()
            consoleLog(`varrendo banco de dados`)
            dao.select().then(database => {
                consoleLogOk()
                console.log(database)
                consoleLog(`construindo arquivo`)
                const element = document.createElement('a')
                element.setAttribute('href', `data:text/plain;charset=utf-8, ${encodeURIComponent(JSON.stringify({ database }))}`)
                element.setAttribute('download', `${name.trim()}.json`)
                element.style.display = 'none'
                document.body.appendChild(element)
                element.click()
                document.body.removeChild(element)
                consoleLog(`processo finalizado`, true)
            }).catch(e => {
                console.log(e)
                consoleLogError(`processo interrompido`, true)
            })
        }
    }

    // obtem uma tela de carregamento que indica o estado do processo
    getLog() {
        logText = ''
        log = document.createElement('p')
        log.setAttribute('class', 'log')
        logCursor = document.createElement('span')
        logCursor.setAttribute('class', 'cursor')
        consoleLog('inicializando...')
        return log
    }
}


// controla uma tela de carregamento do processo de importacao e exportacao

function consoleLog(m, stop = false) {
    if (typeof m == 'string') {
        if (typeof log == 'object') {
            if (log.tagName == 'P') {
                if (typeof logCursor == 'object') {
                    if (logCursor.tagName == 'SPAN') {
                        logText += `<br> ${m} `
                        if (stop) {
                            logCursor.remove()
                            log.innerHTML = logText
                        }
                        else {
                            document.body.appendChild(logCursor)
                            log.innerHTML = logText
                            log.appendChild(logCursor)
                        }
                    }
                }
            }
        }
    }
}

function consoleLogOk(stop = false) {
    if (typeof log == 'object') {
        if (log.tagName == 'P') {
            if (typeof logCursor == 'object') {
                if (logCursor.tagName == 'SPAN') {
                    logText += `...OK `
                    if (stop) {
                        logCursor.remove()
                        log.innerHTML = logText
                    }
                    else {
                        document.body.appendChild(logCursor)
                        log.innerHTML = logText
                        log.appendChild(logCursor)
                    }
                }
            }
        }
    }
}

function consoleLogDenied(stop = false) {
    if (typeof log == 'object') {
        if (log.tagName == 'P') {
            if (typeof logCursor == 'object') {
                if (logCursor.tagName == 'SPAN') {
                    logText += `...<span class="error">NEGADO</span>`
                    if (stop) {
                        logCursor.remove()
                        log.innerHTML = logText
                    }
                    else {
                        document.body.appendChild(logCursor)
                        log.innerHTML = logText
                        log.appendChild(logCursor)
                    }
                }
            }
        }
    }
}

function consoleLogError(m, stop = false) {
    if (typeof m == 'string') {
        consoleLog(`<span class="error">${m}</span>`, stop)
    }
}