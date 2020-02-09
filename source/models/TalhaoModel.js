import { ParseClass } from '../util/services/ParseClass.js'
import { ValidityClass } from '../util/services/ValidityClass.js'
import { CoordinatesClass } from '../util/models/CoordinatesClass.js'
import { GoogleEarthKmlClass } from '../util/models/GoogleEarthKmlClass.js'

export class TalhaoModel {
    constructor(obj = {}) {
        this.id = obj.id || undefined
        this.clienteId = obj.clienteId || undefined
        this.nome = obj.nome || 'gleba'
        this.matricula = obj.matricula || ''
        this.area = obj.area || 1
        this.coordenadas = new CoordinatesClass(obj.coordenadas)
        this.kml = new GoogleEarthKmlClass(obj.kml)
    }

    getId() {
        return this.id
    }

    setClienteId(c) {
        if (typeof c == 'object') {
            if (c.constructor.name == 'ClienteModel') {
                this.clienteId = c.getId()
                if (this.clienteId) {
                    return true
                }
            }
        }
        return false
    }

    getClienteId() {
        return this.clienteId
    }

    setNome(s) {
        this.nome = new ValidityClass().name(s).toLowerCase()
        if (this.nome) {
            return true
        }
        return false
    }

    getNome() {
        return this.nome
    }

    setMatricula(e) {
        this.matricula = new ParseClass().fillNumber(e)
        if (this.matricula) {
            return true
        }
        return false
    }

    getMatricula() {
        return this.matricula
    }

    setArea(n) {
        this.area = new ParseClass().parseFloat(n)
        if (!isNaN(this.area) && this.area > 0) {
            return true
        }
        this.area = 1
        return false
    }

    getArea() {
        return `${this.area} ha`
    }

    getAreaInt() {
        return this.area
    }

    setCoordenadas(c) {
        if (typeof c == 'object') {
            if (c.constructor.name == 'CoordinatesClass') {
                if (
                    this.coordenadas.getLatitude() != c.getLatitude() ||
                    this.coordenadas.getLongitude() != c.getLongitude()
                ) {
                    this.kml = new GoogleEarthKmlClass()
                }
                this.coordenadas = new CoordinatesClass(c.toString())
                return true
            }
        }
        return false
    }

    getCoordenadas() {
        return new CoordinatesClass(this.coordenadas.toString())
    }

    setKml(kml) { //ASSINCRONO
        return new Promise((resolve, reject) => {
            this.kml = new GoogleEarthKmlClass()
            this.kml.setKml(kml).then(() => {
                if (this.kml.isPolygon()) {
                    const c = this.kml.getPoint()
                    if (c) {
                        this.coordenadas.latitude = c[0]
                        this.coordenadas.longitude = c[1]
                    }
                    resolve()
                }
                else {
                    this.kml = new GoogleEarthKmlClass()
                    reject('O arquivo não possuí um polígono')
                }
            }).catch(e => {
                this.kml = new GoogleEarthKmlClass()
                console.log(e)
                reject('Arquivo não pertence ao Google Earth')
            })
        })
    }

    getKml() {
        return new GoogleEarthKmlClass(this.kml.toString())
    }

    toString() {
        if (
            this.clienteId &&
            this.nome &&
            this.matricula &&
            this.area
        ) {
            return JSON.parse(JSON.stringify({
                id: this.id || undefined,
                clienteId: this.clienteId,
                nome: this.nome,
                matricula: this.matricula,
                area: this.area,
                coordenadas: this.coordenadas.toString() || undefined,
                kml: this.kml.toString() || undefined,
            }))
        }
    }
}