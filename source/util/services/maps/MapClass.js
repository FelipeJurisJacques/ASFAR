export class MapClass {
    constructor(kml) {
        this.kml = undefined
        this.setKml(kml)
    }

    setKml(kml) {
        if (typeof kml == 'object') {
            if (kml.constructor.name == 'GoogleEarthKmlClass') {
                this.kml = kml
            }
        }
    }

    getMapSVG(coordinates, s = 640) {
        let svg = header(s)
        svg += border()
        svg += polygonToSVG(this.kml)
        svg += legendCoordinates(coordinates)
        svg += `</svg>`
        return svg
    }

    getIconSVG(s = 64) {
        let svg = header(s)
        svg += polygonToSVG(this.kml)
        svg += `</svg>`
        return svg
    }

    getMapAndPointsSVG(coordinates, arrayCoordinates, s = 640) {
        let svg = header(s)
        svg += border()
        svg += polygonToSVG(this.kml, arrayCoordinates)
        svg += legendCoordinates(coordinates)
        svg += `</svg>`
        return svg
    }
}

function header(s = 640) {
    if (typeof s == 'number') {
        if (!(s > 10 && s < 1024)) {
            s = 640
        }
    }
    else {
        s = 640
    }
    return `<svg class="map" 
    xmlns="http://www.w3.org/2000/svg"
        xml:space="preserve"
        width="100%" height="${s}px"
        viewBox="0 0 1000 1000"
        zoomAndPan="enable" 
    >`
}

function border() {
    return `<line x1="40" y1="20" x2="40" y2="100" style="stroke:#767982;stroke-width:2"/>
        <line x1="20" y1="40" x2="100" y2="40" style="stroke:#767982;stroke-width:2"/>

        <polygon fill="red" points="920,900 930,830 940,900"/>
        <polygon fill="silver" points="920,900 930,980 940,900"/>`
}

function legendCoordinates(c) {
    if (typeof c == 'object') {
        if (c.constructor.name == 'CoordinatesClass') {
            return `<text x="40" y="970" fill="#767982">${c.getLongitude()} ${c.getLatitude()} ${c.getElevation()}</text>`
        }
    }
    return ''
}

function polygonToSVG(kml, placemarks = undefined) {
    let placemark = new Array()
    if (Array.isArray(placemarks)) {
        placemarks.forEach(p => {
            if (typeof p == 'object') {
                if (p.constructor.name == 'CoordinatesClass') {
                    if (p.getLongitudeInt() != 0 && p.getLatitudeInt() != 0) {
                        placemark.push([p.getLatitudeInt(), p.getLongitudeInt(), p.getElevationInt()])
                    }
                }
            }
        })
    }
    if (typeof kml == 'object') {
        if (kml.constructor.name == 'GoogleEarthKmlClass') {
            let polygon = kml.getPolygon()
            if (Array.isArray(polygon)) {
                placemark.forEach(e => {
                    polygon.push(e)
                })
                //console.log(polygon)
                // soma 360
                const min = 50.0
                const max = 950.0 - min
                let coordinates = polygon.map(e => e.map(i => i + 360))
                let x_min = 360.0
                let x_max = 0.0
                let y_min = 360.0
                let y_max = 0.0
                // obtem menores valores
                coordinates.forEach(e => {
                    if (e[0] < x_min) {
                        x_min = e[0]
                    }
                    if (e[1] < y_min) {
                        y_min = e[1]
                    }
                })
                // aproxima de zero
                coordinates = coordinates.map(e => {
                    e[0] -= x_min
                    e[1] -= y_min
                    return e
                })
                // obtem maiores valores
                coordinates.forEach(e => {
                    if (e[0] > x_max) {
                        x_max = e[0]
                    }
                    if (e[1] > y_max) {
                        y_max = e[1]
                    }
                })
                // obtem delta
                let delta = max
                if (x_max > y_max) {
                    delta /= x_max
                }
                else {
                    delta /= y_max
                }
                //console.log(delta)
                // multiplica pelo delta
                coordinates = coordinates.map(e => {
                    e[0] *= delta
                    e[1] *= delta
                    // corrigi latitude
                    e[1] *= -1.0
                    e[1] += y_max * delta

                    e[0] += min
                    e[1] += min
                    return e
                })
                //console.log(coordinates)
                let points = ''
                let c = ''
                for (let i = 0; i < coordinates.length; i++) {
                    if (i < (coordinates.length - placemark.length)) {
                        points += `${coordinates[i][0]},${coordinates[i][1]} `
                    }
                    else {
                        c += `<circle cx="${coordinates[i][0]}" cy="${coordinates[i][1]}" r="10" fill="blue"/>`
                    }
                }
                let r = `<polygon fill="green" points="${points}"/>`
                placemark.forEach(e => {
                })
                return r + c
            }
        }
    }
    return ''
}

function pointsToSVG(points) {
    let coordinates = ''
    if (Array.isArray(points)) {
        points.forEach(c => {
            if (typeof c == 'object') {
                if (c.constructor.name == 'CoordinatesClass') {
                    coordinates += `<text x="100" y="570" fill="#000">${c.getLongitude()} ${c.getLatitude()} ${c.getElevation()}</text>`
                }
            }
        })
    }
    return coordinates
}