export class AnaliseSoloPrintClass {
    constructor(clienteController, talhaoController, analiseSoloController, laudoSoloController) {
        this.cliente = null
        this.talhao = null
        this.analiseSolo = null
        this.laudoSolo = null
        if (typeof clienteController == 'object') {
            if (clienteController.constructor.name == 'ClienteController') {
                this.cliente = clienteController
            }
        }
        if (typeof talhaoController == 'object') {
            if (talhaoController.constructor.name == 'TalhaoController') {
                this.talhao = talhaoController
            }
        }
        if (typeof analiseSoloController == 'object') {
            if (analiseSoloController.constructor.name == 'AnaliseSoloController') {
                this.analiseSolo = analiseSoloController
            }
        }
        if (typeof laudoSoloController == 'object') {
            if (laudoSoloController.constructor.name == 'LaudoSoloController') {
                this.laudoSolo = laudoSoloController
            }
        }
    }

    print() {
        let r = Header()
        if (
            this.cliente != null &&
            this.talhao != null &&
            this.analiseSolo != null &&
            this.laudoSolo != null
        ) {
            const cliente = this.cliente.cliente
            const talhao = this.talhao.talhao
            const analiseSolo = this.analiseSolo.analiseSolo
            if (
                cliente != null &&
                talhao != null &&
                analiseSolo != null
            ) {
                r += `<div class="container">
                        <center><h1>LAUDO DE ANÁLISES DE SOLO</h1></center>
                        <table>
                            <tbody>
                                <tr>
                                    <td><b>Cliente:</b> ${cliente.getFullNome()}</td>
                                    <td><b>CPF:</b> ${cliente.getCpf()}</t>
                                    <td><b>Localidade:</b> ${cliente.getLocalidade()}</td>
                                </tr>
                                <tr>
                                    <td><b>Cidade:</b> ${cliente.getCidade()}</t>
                                    <td><b>CEP:</b> ${cliente.getCep()}</td>
                                    <td><b>Estado:</b> ${cliente.getUftoString()}</t>
                                </tr>
                                <tr>
                                </tr>
                            </tbody>
                        </table>
                    </div>`
            }
        }
        r += Footer()
        const e = document.createElement('a')
        e.setAttribute('href', `data:text/html;charset=utf-8, ${encodeURIComponent(r)}`)
        e.setAttribute('download', `print.html`)
        e.style.display = 'none'
        document.body.appendChild(e)
        e.click()
        document.body.removeChild(e)
    }
}

function Header() {
    return `<!DOCTYPE html>
        <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>print</title>
                <style>
                    :root {
                        --delta: 2.26;
                        --width: calc(2480px / var(--delta)); /*210mm*/
                        --height: calc(3508px / var(--delta)); /*297mm*/
                        --mgin1: calc(85.2px / var(--delta)); /*3cm*/
                        --mgin2: calc(70.85px / var(--delta)); /*2,5cm*/
                    }

                    body {
                        padding: 0px;
                        background-color: black;
                    }
                    
                    .container {
                        width: calc(var(--width) - var(--mgin1));
                        height: calc(var(--height) - var(--mgin2));
                        background-color: white;
                        padding-left: var(--mgin1);
                        padding-right: var(--mgin2);
                        padding-top: var(--mgin2);
                        font-family: 'Arial', Cambria, Cochin, Georgia, Times, serif;
                        font-size: 12px;
                    }

                    table {
                        width: 100%;
                    }
                </style>
            </head>
        <body>`
}

function Footer() {
    return `</body>
        </html>`
}