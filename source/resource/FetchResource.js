export class FetchResource {
    constructor(input = undefined, output = undefined, header = undefined) {
        this.input = 'json'
        this.output = 'json'
        this.header = {
            'Content-Type': 'application/json;charset=UTF-8'
        }
        this.mode = 'cors' // no-cors, cors, *same-origin
        this.setHeader(header)
        this.setInput(input)
        this.setOutput(output)
        this.response = undefined
        this.responseReaders = new Object()
        this.responseBody = undefined
    }

    setInput(e) {
        if (typeof e == 'string') {
            this.output = e.trim().toLowerCase()
        }
        else if (typeof e == 'boolean') {
            if (e == false) {
                this.input = 'none'
            }
        }
    }

    setOutput(e) {
        if (typeof e == 'string') {
            this.output = e.trim().toLowerCase()
        }
        else if (typeof e == 'boolean') {
            if (e == false) {
                this.output = 'none'
            }
        }
    }

    setHeader(e) {
        if (typeof e == 'object') {
            this.header = e
        }
    }

    setMode(e) {
        if (typeof e == 'string') {
            this.mode = e.trim().toLowerCase()
        }
        else if (typeof e == 'boolean') {
            if (e == false) {
                this.mode = false
            }
        }
    }

    GET(url) {
        return this._request('GET', url)
    }

    POST(url, data) {
        return this._request('POST', url, data)
    }

    PUT(url, data) {
        return this._request('PUT', url, data)
    }

    DELETE(url, data) {
        return this._request('DELETE', url, data)
    }

    _request(method, url, data = undefined) {
        return new Promise((resolve, reject) => {
            let request = {
                method: method, // *GET, POST, PUT, DELETE, etc.
                cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: this.header,
                redirect: 'follow', // manual, *follow, error
                referrer: 'no-referrer' // no-referrer, *client
            }
            if (data) {
                request.body = this._body(data)
            }
            if (this.mode) {
                request.mode = this.mode
            }
            this.response = fetch(url, request).then(e => {
                this.responseReaders = this._headers(e)
                resolve(this._response(e))
            }).catch(e => {
                reject(e)
            })
        })
    }

    _body(data) {
        if (this.input == 'json') {
            return JSON.stringify(data)
        }
        else {
            if (typeof data == 'string') {
                return data
            }
            else {
                console.log(new Error('Invalid data'))
                return ''
            }
        }
    }

    _response(e) {
        if (this.output == 'json') {
            let r = new Object()
            try {
                r = e.json()
            }
            catch (e) {
                console.log(e)
            }
            this.responseBody = r
            return r
        }
        else if (this.output == 'blob') {
            let r = undefined
            try {
                r = e.blob()
            }
            catch (e) {
                console.log(e)
            }
            this.responseBody = r
            return r
        }
        else {
            this.responseBody = undefined
            return e
        }
    }

    _headers(e) {
        let lenght = 0
        e.headers.forEach(() => {
            lenght++
        })
        let r = new Object()
        let en = e.headers.entries()
        for (let i = 0; i < lenght; i++) {
            let v = en.next(i)
            if (v.value) {
                if (Array.isArray(v.value)) {
                    r[v.value[0]] = v.value[1]
                }
            }
        }
        return r
    }
}

window.FetchResource = FetchResource