import { ValidityClass } from '../util/services/ValidityClass.js'
import { ParseClass } from '../util/services/ParseClass.js'
import { UfBrClass } from '../util/services/UfBrClass.js'
import { DateClass } from '../util/models/DateClass.js'

const validity = new ValidityClass()
const number = new ParseClass()

export class ClienteModel {
    constructor(obj = {}) {
        this.id = obj.id || undefined
        this.nome = obj.nome || ''
        this.apelido = obj.apelido || ''
        this.cpf = obj.cpf || ''
        this.matricula = obj.matricula || new Array()
        this.cep = obj.cep || ''
        this.cidade = obj.cidade || ''
        this.uf = obj.uf || ''
        this.localidade = obj.localidade || ''
        this.logradouro = obj.logradouro || ''
        this.numero = obj.numero || 'S/N'
        this.bairro = obj.bairro || 'INTERIOR'
        this.complemento = obj.complemento || ''
        this.cell = obj.cell || new Array()
        this.email = obj.email || new Array()
        this.criado = new DateClass(obj.criado)
    }

    getId() {
        return this.id
    }

    setNome(s) {
        this.nome = validity.name(s).toUpperCase()
        if (this.nome) {
            return true
        }
        return false
    }

    getNome() {
        return this.nome
    }

    setApelido(s) {
        this.apelido = validity.name(s).toUpperCase()
        if (this.apelido) {
            return true
        }
        return false
    }

    getApelido() {
        return this.apelido
    }

    getFullNome() {
        if (this.nome && this.apelido) {
            return `${this.nome} ${this.apelido}`
        }
        return ''
    }

    setCpf(i) {
        const s = number.fillNumber(i)
        if (s) {
            if (s.length >= 11) {
                this.cpf = `${s[0]}${s[1]}${s[2]}.${s[3]}${s[4]}${s[5]}.${s[6]}${s[7]}${s[8]}-${s[9]}${s[10]}`
                return true
            }
        }
        return false
    }

    getCpf() {
        return this.cpf
    }

    setMatricula(e) {
        if (Array.isArray(e)) {
            this.resetMatricula()
            e.forEach(i => {
                this.addMatricula(i)
            })
            return true
        }
        else if (typeof e == 'string') {
            this.resetMatricula()
            e.split(',').forEach(i => {
                this.addMatricula(i)
            })
            return true
        }
        return false
    }

    addMatricula(s) {
        const c = number.fillNumber(s)
        if (c.length >= 4 && c.length <= 8) {
            this.matricula.push(c)
            return true
        }
        return false
    }

    resetMatricula() {
        this.matricula = new Array()
    }

    getMatricula() {
        return this.matricula
    }

    setCep(i) {
        const s = number.fillNumber(i)
        if (s) {
            if (s.length >= 8) {
                this.cep = `${s[0]}${s[1]}${s[2]}${s[3]}${s[4]}-${s[5]}${s[6]}${s[7]}`
                return true
            }
        }
        return false
    }

    getCep() {
        return this.cep
    }

    getCepInt() {
        return number.parseInt(this.cep)
    }

    setCidade(s) {
        this.cidade = validity.name(s).toUpperCase()
        if (this.cidade) {
            return true
        }
        return false
    }

    getCidade() {
        return this.cidade
    }

    getCidadeUF() {
        if (this.cidade && this.uf) {
            return `${this.cidade}-${this.uf}`
        }
        return ''
    }

    setUf(e) {
        this.uf = new UfBrClass().validity(e)
        if (this.uf) {
            return true
        }
        return false
    }

    getUf() {
        return this.uf
    }

    getUftoString() {
        return new UfBrClass().UFtoText(this.uf)
    }

    setLocalidade(s) {
        this.localidade = validity.name(s).toUpperCase()
        if (this.localidade) {
            return true
        }
        return false
    }

    getLocalidade() {
        return this.localidade
    }

    setLogradouro(s) {
        this.logradouro = validity.name(s).toUpperCase()
        if (this.logradouro) {
            return true
        }
        return false
    }

    getLogradouro() {
        return this.logradouro
    }

    setNumero(i) {
        this.numero = number.fillNumber(i)
        if (this.numero) {
            return true
        }
        this.numero = 'S/N'
        return false
    }

    getNumero() {
        return this.numero
    }

    setBairro(s) {
        this.bairro = validity.name(s).toUpperCase()
        if (this.bairro) {
            return true
        }
        return false
    }

    getBairro() {
        return this.bairro
    }

    setComplemento(s) {
        this.complemento = validity.simpleDescription(s).toLowerCase()
        if (this.complemento) {
            return true
        }
        return false
    }

    getComplemento() {
        return this.complemento
    }

    setCell(e) {
        if (Array.isArray(e)) {
            this.resetCell()
            e.forEach(i => {
                this.addCell(i)
            })
            return true
        }
        else if (typeof e == 'string') {
            this.resetCell()
            e.split(',').forEach(i => {
                this.addCell(i)
            })
            return true
        }
        return false
    }

    addCell(i) {
        const c = number.fillNumber(i)
        if (c.length >= 8 && c.length <= 20) {
            this.cell.push(c)
            return true
        }
        return false
    }

    resetCell() {
        this.cell = new Array()
    }

    getCell() {
        return this.cell
    }

    setEmail(e) {
        if (Array.isArray(e)) {
            this.resetEmail()
            e.forEach(i => {
                this.addEmail(i)
            })
            return true
        }
        else if (typeof e == 'string') {
            this.resetEmail()
            e.split(',').forEach(i => {
                this.addEmail(i)
            })
            return true
        }
        return false
    }

    addEmail(s) {
        const e = validity.email(s)
        if (e) {
            this.email.push(e)
            return true
        }
        return false
    }

    resetEmail() {
        this.email = new Array()
    }

    getEmail() {
        return this.email
    }

    toString() {
        if (
            this.nome &&
            this.apelido &&
            this.cpf &&
            this.matricula.length > 0 &&
            this.cep &&
            this.cidade &&
            this.uf &&
            this.localidade &&
            this.logradouro &&
            this.numero &&
            this.bairro
        ) {
            return JSON.parse(JSON.stringify({
                id: this.id || undefined,
                nome: this.nome,
                apelido: this.apelido,
                cpf: this.cpf,
                matricula: this.matricula,
                cep: this.cep,
                cidade: this.cidade,
                uf: this.uf,
                localidade: this.localidade,
                logradouro: this.logradouro,
                numero: this.numero,
                bairro: this.bairro,
                complemento: this.complemento || undefined,
                cell: this.cell || undefined,
                email: this.email || undefined,
                criado: this.criado.toString() || undefined
            }))
        }
    }
}