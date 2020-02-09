import { XMLClass } from '../services/XMLClass.js'

export class GoogleEarthKmlClass {
    constructor(kml) {
        this.kml = ''
        if (this.is(kml)) {
            this.kml = kml
        }
        this.temp = undefined
        this.polygon = undefined
        this.point = undefined
    }

    is(s) {
        const file = new XMLClass(s).toObject()
        if (file.kml) {
            if (file.kml.Document) {
                this.temp = file
                return true
            }
        }
        return false
    }

    setKml(kml) {
        this.temp = undefined
        return new Promise((resolve, reject) => {
            if (typeof kml == 'object') {
                if (kml.type == "application/vnd.google-earth.kml+xml") {
                    let reader = new FileReader()
                    reader.readAsText(kml)
                    reader.onload = i => {
                        this.kml = i.target.result
                        resolve(true)
                    }
                    reader.onerror = i => {
                        reject(i)
                        this.kml = undefined
                    }
                }
                else {
                    reject(new Error('No application/vnd.google-earth.kml+xml'))
                    this.kml = undefined
                }
            }
            else {
                reject(new Error('No file'))
                this.kml = undefined
            }
        })
    }

    getName() {
        if (this.kml || this.temp) {
            let file = this.temp || new XMLClass(this.kml).toObject()
            if (file.kml) {
                if (file.kml.Document) {
                    if (file.kml.Document.Placemark) {
                        if (file.kml.Document.Placemark.name) {
                            return file.kml.Document.Placemark.name
                        }
                    }
                }
            }
        }
        return ''
    }

    isPolygon() {
        let file = this.temp || new XMLClass(this.kml).toObject()
        if (file.kml) {
            if (file.kml.Document) {
                if (file.kml.Document.Placemark) {
                    if (file.kml.Document.Placemark.Polygon) {
                        return true
                    }
                }
            }
        }
        return false
    }

    isPoint() {
        let file = this.temp || new XMLClass(this.kml).toObject()
        if (file.kml) {
            if (file.kml.Document) {
                if (file.kml.Document.Placemark) {
                    if (file.kml.Document.Placemark.Point) {
                        return true
                    }
                }
            }
        }
        return false
    }

    getPolygon() {
        if (Array.isArray(this.polygon)) {
            return this.polygon
        }
        if (this.kml) {
            let file = this.temp || new XMLClass(this.kml).toObject()
            if (file.kml) {
                if (file.kml.Document) {
                    if (file.kml.Document.Placemark) {
                        if (file.kml.Document.Placemark.Polygon) {
                            if (file.kml.Document.Placemark.Polygon.outerBoundaryIs) {
                                if (file.kml.Document.Placemark.Polygon.outerBoundaryIs.LinearRing) {
                                    if (file.kml.Document.Placemark.Polygon.outerBoundaryIs.LinearRing.coordinates) {
                                        this.polygon = file.kml.Document.Placemark.Polygon.outerBoundaryIs.LinearRing.coordinates
                                        this.polygon = this.polygon.split(' ').map(e => e.split(','))
                                        this.polygon = this.polygon.map(e => e.map(i => parseFloat(i)))
                                        return this.polygon
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return undefined
    }

    getPoint() {
        if (Array.isArray(this.point)) {
            return this.point
        }
        if (this.kml) {
            let file = this.temp || new XMLClass(this.kml).toObject()
            if (file.kml) {
                if (file.kml.Document) {
                    if (file.kml.Document.Placemark) {
                        if (file.kml.Document.Placemark.Point) {
                            if (file.kml.Document.Placemark.Point.coordinates) {
                                this.point = file.kml.Document.Placemark.Point.coordinates
                                this.point = this.point.split(',')
                                this.point = this.point.map(e => parseFloat(e))
                                return this.point
                            }
                        }
                        else {
                            let coordinates = this.getPolygon()
                            if (coordinates) {
                                let x = 0
                                let y = 0
                                let i = 0
                                coordinates.forEach(e => {
                                    x += e[0]
                                    y += e[1]
                                    i += 1
                                })
                                x = x / i
                                y = y / i
                                return [x, y]
                            }
                        }
                    }
                }
            }
        }
        return undefined
    }

    toString() {
        return this.kml
    }
}