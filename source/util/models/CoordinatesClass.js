import { ParseClass } from '../services/ParseClass.js'

const number = new ParseClass()

export class CoordinatesClass{
    constructor(obj = {}) {
        this.longitude = obj.longitude || 0
        this.latitude = obj.latitude || 0
        this.elevation = obj.elevation || 0
    }

    setLongitude(e) {
        this.longitude = this._toCoordinate(e)
        if (this.longitude) {
            if (this.longitude > -180 && this.longitude < 180) {
                return true
            }
            else {
                this.longitude = 0
            }
        }
        return false
    }

    getLongitude() {
        return this._toCoordinateText(this.longitude, false)
    }

    getLongitudeInt() {
        return this.longitude
    }

    setLatitude(e) {
        this.latitude = this._toCoordinate(e)
        if (this.latitude) {
            if (this.latitude > -90 && this.latitude < 90) {
                return true
            }
            else {
                this.latitude = 0
            }
        }
        return false
    }

    getLatitude() {
        return this._toCoordinateText(this.latitude)
    }

    getLatitudeInt() {
        return this.latitude
    }

    setElevation(e) {
        e = number.parseFloat(e)
        if (!isNaN(e)) {
            if (e > 0 && e < 8849.868) {
                this.elevation = e
                return true
            }
        }
        return false
    }

    getElevation() {
        if (this.elevation) {
            return `${this.elevation}m`
        }
        return ''
    }

    getElevationInt() {
        return this.elevation
    }

    getText() {
        return `${this.getLongitude()} ${this.getLatitude()} ${this.getElevation()}`
    }

    equal(e) {
        if (!isNaN(this.longitude) && !isNaN(this.latitude)) {
            if (typeof e == 'object') {
                if (e.constructor.name == 'CoordinatesClass') {
                    if (!isNaN(e.longitude) && !isNaN(e.latitude)) {
                        if (e.longitude == this.longitude && e.latitude == this.latitude) {
                            return true
                        }
                    }
                }
            }
        }
        return false
    }

    _toCoordinate(e) {
        let c = number.parseInt(e)
        if (!isNaN(c)) {
            if (typeof e == 'string') {
                let n = e.trim().split('')
                if (
                    n[n.length - 1] == 'S' ||
                    n[n.length - 1] == 'W' ||
                    n[n.length - 1] == 's' ||
                    n[n.length - 1] == 'w'
                ) {
                    c *= -1
                }
            }
            return c / 1000000
        }
        return undefined
    }

    _toCoordinateText(e, d = true) {
        if (!isNaN(e)) {
            let c = e.toString().split('')
            let r = ''
            let g = false
            for (let i = 0; i < 12; i++) {
                let l = r.split(`°`)
                if (l.length > 1) {
                    if (l[1].length == 2) {
                        r += `'`
                    }
                    if (l[1].length == 5) {
                        r += `.`
                    }
                    if (l[1].length >= 8) {
                        break
                    }
                }
                if (i < c.length) {
                    if (c[i] == '.') {
                        r += `°`
                        g = true
                    }
                    else if (c[i] != '-') {
                        r += c[i]
                    }
                }
                else {
                    if (g) {
                        r += '0'
                    }
                    else {
                        r += `°`
                        g = true
                    }
                }
            }
            r += `"`
            if (e >= 0) {
                if (d == true) {
                    r += 'N'
                }
                else {
                    r += 'E'
                }
            }
            else {
                if (d == true) {
                    r += 'S'
                }
                else {
                    r += 'W'
                }
            }
            //console.log(r)
            return r
        }
        return ''
    }

    toString() {
        return {
            longitude: this.longitude,
            latitude: this.latitude,
            elevation: this.elevation
        }
    }
}