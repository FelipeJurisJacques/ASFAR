export class XMLClass {
    constructor(xml = '') {
        this.xml = new Object()
        if (typeof xml == 'string') {
            try {
                this.xml = new DOMParser().parseFromString(xml, "text/xml")
            }
            catch (e) {
                this.xml = new Object()
            }
        }
    }

    _xmlToObject(xml) {
        let obj = new Object()
        if (xml.nodeType) {
            if (xml.nodeType == 1) {
                if (xml.attributes.length > 0) {
                    obj["@attributes"] = {}
                    for (let j = 0; j < xml.attributes.length; j++) {
                        let attribute = xml.attributes.item(j)
                        obj["@attributes"][attribute.nodeName] = attribute.nodeValue
                    }
                }
            } else if (xml.nodeType == 3) {
                obj = xml.nodeValue
            }
        }
        if (xml.hasChildNodes) {
            if (xml.hasChildNodes()) {
                if (
                    xml.childNodes.length == 1 &&
                    (
                        xml.childNodes[0].nodeName == '#cdata-section' ||
                        xml.childNodes[0].nodeName == '#text'
                    )
                ) {
                    let text = xml.childNodes[0].textContent.trim()
                    if (text && text != '↵') {
                        obj = text
                    }
                }
                else {
                    xml.childNodes.forEach(e => {
                        if (typeof obj[e.nodeName] == 'undefined') {
                            if (e.nodeName == '#cdata-section' || e.nodeName == '#text') {
                                let text = e.textContent.trim()
                                if (text && text != '↵') {
                                    obj[e.nodeName] = text
                                }
                            }
                            else {
                                obj[e.nodeName] = this._xmlToObject(e)
                            }
                        }
                        else {
                            if (typeof obj[e.nodeName].push == 'undefined') {
                                let prev = obj[e.nodeName]
                                obj[e.nodeName] = new Array()
                                obj[e.nodeName].push(prev)
                            }
                            if (e.nodeName == '#cdata-section' || e.nodeName == '#text') {
                                let text = e.textContent.trim()
                                if (text && text != '↵') {
                                    obj[e.nodeName].push(text)
                                }
                            }
                            else {
                                obj[e.nodeName].push(this._xmlToObject(e))
                            }
                        }
                    })
                }
            }
        }
        return obj
    }

    toObject() {
        return this._xmlToObject(this.xml)
    }
}