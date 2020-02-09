export class RequestResource {
    constructor(input = 'json', output = 'json') {
        this.input = input
        this.output = output
        this.request = undefined
        this.response = {
            header: null,
            body: null,
            status: null,
            statusText: ''
        }
    }

    GET(url) {
        return request(this, 'GET', url)
    }

    POST(url, data) {
        return request(this, 'POST', url, data)
    }

    PUT(url, data) {
        return request(this, 'PUT', url, data)
    }

    PATCH(url, data) {
        return request(this, 'PATCH', url, data)
    }

    DELETE(url) {
        return request(this, 'DELETE', url)
    }
}

function request(resource, method, url, data = undefined) {
    //console.log(resource)
    return new Promise((resolve, reject) => {
        if (
            typeof method == 'string' &&
            typeof url == 'string'
        ) {
            let body = undefined
            resource.request = new XMLHttpRequest()
            resource.request.open(method, url)
            if (resource.input == 'json') {
                resource.request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
                try {
                    body = JSON.stringify(data)
                } catch (e) { }
            }
            resource.request.send(body)
            resource.request.onreadystatechange = () => {
                if (resource.request.readyState == 4) {
                    resource.response.header = getHeader(resource.request.getAllResponseHeaders())
                    resource.response.status = resource.request.status
                    resource.response.statusText = resource.request.statusText
                    resource.response.body = resource.request.response
                    if (
                        resource.request.status >= 200 &&
                        resource.request.status < 400
                    ) {
                        if (resource.output == 'json') {
                            if (resource.response.header['content-type']) {
                                if (resource.response.header['content-type'].search('application/json') != -1) {
                                    try {
                                        resource.response.body = JSON.parse(resource.request.response)
                                        resolve(resource.response.body)
                                    } catch (e) {
                                        reject(null)
                                    }
                                }
                                else {
                                    reject(null)
                                }
                            }
                            else {
                                reject(null)
                            }
                        }
                        else {
                            resolve(resource.request.response)
                        }
                    }
                    else {
                        reject(null)
                    }
                }
            }
        }
        else {
            reject(null)
        }
    })
}

function getHeader(s) {
    if (typeof s == 'string') {
        let v = s.split('')
        let a = ['']
        v.forEach(e => {
            if (e == '\n') {
                a.push('')
            }
            else {
                a[a.length - 1] += e
            }
        })
        let r = new Object()
        a.forEach(e => {
            let i = e.split(': ')
            if (i.length == 2) {
                r[i[0]] = i[1]
            }
        })
        return r
    }
    return new Object()
}

window.RequestResource = RequestResource