export class ValidityClass {
    // NOMES
    name(s) {
        const r = this.character(s)
        if (r.length > 2 && r.length < 50) {
            return r
        }
        return ''
    }

    // NOMES DE OBJETOS E ANIMAIS
    nameObject(s) {
        const r = this.character2(s)
        if (r.length > 2 && r.length < 100) {
            return r
        }
        return ''
    }

    simpleDescription(s) {
        const r = this.characterNumberSymbol2(s)
        if (r.length > 10 && r.length < 500) {
            return r
        }
        return ''
    }

    description(s) {
        const r = this.characterNumberSymbol(s)
        if (r.length > 10 && r.length < 2000) {
            return r
        }
        return ''
    }

    email(s) {
        let r = email(s)
        if (r.length > 5 && r.length < 30) {
            if (r.split('@').length == 2) {
                return r
            }
        }
        return ''
    }

    // TODOS OS CARACTERES NUMEROS E SIMBOLOS DO TECLADO USAVEIS
    characterNumberSymbol(s) {
        let r = ''
        if (typeof s == 'string') {
            for (let i = 0; i < s.length; i++) {
                const e = s[i].toLowerCase()
                if (
                    e == '0' ||
                    e == '1' ||
                    e == '2' ||
                    e == '3' ||
                    e == '4' ||
                    e == '5' ||
                    e == '6' ||
                    e == '7' ||
                    e == '8' ||
                    e == '9' ||
                    e == 'a' ||
                    e == 'b' ||
                    e == 'c' ||
                    e == 'd' ||
                    e == 'e' ||
                    e == 'f' ||
                    e == 'g' ||
                    e == 'h' ||
                    e == 'i' ||
                    e == 'j' ||
                    e == 'k' ||
                    e == 'l' ||
                    e == 'm' ||
                    e == 'n' ||
                    e == 'o' ||
                    e == 'p' ||
                    e == 'q' ||
                    e == 'r' ||
                    e == 's' ||
                    e == 't' ||
                    e == 'u' ||
                    e == 'v' ||
                    e == 'w' ||
                    e == 'x' ||
                    e == 'y' ||
                    e == 'z' ||
                    e == 'à' ||
                    e == 'á' ||
                    e == 'â' ||
                    e == 'ã' ||
                    e == 'è' ||
                    e == 'é' ||
                    e == 'ê' ||
                    e == 'ì' ||
                    e == 'í' ||
                    e == 'î' ||
                    e == 'ò' ||
                    e == 'ó' ||
                    e == 'ô' ||
                    e == 'õ' ||
                    e == 'ù' ||
                    e == 'ú' ||
                    e == 'û' ||
                    e == 'ç' ||
                    e == '!' ||
                    e == '?' ||
                    e == ',' ||
                    e == '.' ||
                    e == ':' ||
                    e == ';' ||
                    e == '@' ||
                    e == '#' ||
                    e == '$' ||
                    e == '%' ||
                    e == '&' ||
                    e == '(' ||
                    e == ')' ||
                    e == '{' ||
                    e == '}' ||
                    e == '[' ||
                    e == ']' ||
                    e == '*' ||
                    e == '-' ||
                    e == '+' ||
                    e == '/' ||
                    e == '=' ||
                    e == '_' ||
                    e == 'ª' ||
                    e == 'º' ||
                    e == '°' ||
                    e == '¹' ||
                    e == '²' ||
                    e == '³' ||
                    e == '"' ||
                    e == "'" ||
                    e == '|' ||
                    e == ' ' ||
                    e == '  '
                ) {
                    r += s[i]
                }
            }
        }
        return r.trim()
    }

    // CARACTERES NUMEROS ACENTUACAO ESPACOS E SIMBOLOS PARA CONTAGEM
    characterNumberSymbol2(s) {
        let r = ''
        if (typeof s == 'string') {
            for (let i = 0; i < s.length; i++) {
                const e = s[i].toLowerCase()
                if (
                    e == '0' ||
                    e == '1' ||
                    e == '2' ||
                    e == '3' ||
                    e == '4' ||
                    e == '5' ||
                    e == '6' ||
                    e == '7' ||
                    e == '8' ||
                    e == '9' ||
                    e == 'a' ||
                    e == 'b' ||
                    e == 'c' ||
                    e == 'd' ||
                    e == 'e' ||
                    e == 'f' ||
                    e == 'g' ||
                    e == 'h' ||
                    e == 'i' ||
                    e == 'j' ||
                    e == 'k' ||
                    e == 'l' ||
                    e == 'm' ||
                    e == 'n' ||
                    e == 'o' ||
                    e == 'p' ||
                    e == 'q' ||
                    e == 'r' ||
                    e == 's' ||
                    e == 't' ||
                    e == 'u' ||
                    e == 'v' ||
                    e == 'w' ||
                    e == 'x' ||
                    e == 'y' ||
                    e == 'z' ||
                    e == 'à' ||
                    e == 'á' ||
                    e == 'â' ||
                    e == 'ã' ||
                    e == 'è' ||
                    e == 'é' ||
                    e == 'ê' ||
                    e == 'ì' ||
                    e == 'í' ||
                    e == 'î' ||
                    e == 'ò' ||
                    e == 'ó' ||
                    e == 'ô' ||
                    e == 'õ' ||
                    e == 'ù' ||
                    e == 'ú' ||
                    e == 'û' ||
                    e == 'ç' ||
                    e == '!' ||
                    e == '?' ||
                    e == ',' ||
                    e == '.' ||
                    e == ':' ||
                    e == ';' ||
                    e == '@' ||
                    e == '#' ||
                    e == '$' ||
                    e == '%' ||
                    e == '&' ||
                    e == '(' ||
                    e == ')' ||
                    e == '*' ||
                    e == '-' ||
                    e == '+' ||
                    e == '/' ||
                    e == '=' ||
                    e == 'ª' ||
                    e == 'º' ||
                    e == '°' ||
                    e == '¹' ||
                    e == '²' ||
                    e == '³' ||
                    e == ' ' ||
                    e == '  '
                ) {
                    r += s[i]
                }
            }
        }
        return r.trim()
    }

    // CARACTERES NUMEROS ACENTUACAO E ESPACOS E IFENS
    characterNumber(s) {
        let r = ''
        if (typeof s == 'string') {
            for (let i = 0; i < s.length; i++) {
                const e = s[i].toLowerCase()
                if (
                    e == '0' ||
                    e == '1' ||
                    e == '2' ||
                    e == '3' ||
                    e == '4' ||
                    e == '5' ||
                    e == '6' ||
                    e == '7' ||
                    e == '8' ||
                    e == '9' ||
                    e == 'a' ||
                    e == 'b' ||
                    e == 'c' ||
                    e == 'd' ||
                    e == 'e' ||
                    e == 'f' ||
                    e == 'g' ||
                    e == 'h' ||
                    e == 'i' ||
                    e == 'j' ||
                    e == 'k' ||
                    e == 'l' ||
                    e == 'm' ||
                    e == 'n' ||
                    e == 'o' ||
                    e == 'p' ||
                    e == 'q' ||
                    e == 'r' ||
                    e == 's' ||
                    e == 't' ||
                    e == 'u' ||
                    e == 'v' ||
                    e == 'w' ||
                    e == 'x' ||
                    e == 'y' ||
                    e == 'z' ||
                    e == 'à' ||
                    e == 'á' ||
                    e == 'â' ||
                    e == 'ã' ||
                    e == 'è' ||
                    e == 'é' ||
                    e == 'ê' ||
                    e == 'ì' ||
                    e == 'í' ||
                    e == 'î' ||
                    e == 'ò' ||
                    e == 'ó' ||
                    e == 'ô' ||
                    e == 'õ' ||
                    e == 'ù' ||
                    e == 'ú' ||
                    e == 'û' ||
                    e == 'ç' ||
                    e == '-' ||
                    e == '_' ||
                    e == ' '
                ) {
                    r += s[i]
                }
            }
        }
        return r.trim()
    }

    // CARACTERES ACENTUACAO E ESPACO
    character(s) {
        let r = ''
        if (typeof s == 'string') {
            for (let i = 0; i < s.length; i++) {
                const e = s[i].toLowerCase()
                if (
                    e == 'a' ||
                    e == 'b' ||
                    e == 'c' ||
                    e == 'd' ||
                    e == 'e' ||
                    e == 'f' ||
                    e == 'g' ||
                    e == 'h' ||
                    e == 'i' ||
                    e == 'j' ||
                    e == 'k' ||
                    e == 'l' ||
                    e == 'm' ||
                    e == 'n' ||
                    e == 'o' ||
                    e == 'p' ||
                    e == 'q' ||
                    e == 'r' ||
                    e == 's' ||
                    e == 't' ||
                    e == 'u' ||
                    e == 'v' ||
                    e == 'w' ||
                    e == 'x' ||
                    e == 'y' ||
                    e == 'z' ||
                    e == 'à' ||
                    e == 'á' ||
                    e == 'â' ||
                    e == 'ã' ||
                    e == 'è' ||
                    e == 'é' ||
                    e == 'ê' ||
                    e == 'ì' ||
                    e == 'í' ||
                    e == 'î' ||
                    e == 'ò' ||
                    e == 'ó' ||
                    e == 'ô' ||
                    e == 'õ' ||
                    e == 'ù' ||
                    e == 'ú' ||
                    e == 'û' ||
                    e == 'ç' ||
                    e == ' '
                ) {
                    r += s[i]
                }
            }
        }
        return r.trim()
    }

    // CARACTERES E ACENTUACAO COM ESPACOS ANDERLINE E IFENS
    character2(s) {
        let r = ''
        if (typeof s == 'string') {
            for (let i = 0; i < s.length; i++) {
                const e = s[i].toLowerCase()
                if (
                    e == 'a' ||
                    e == 'b' ||
                    e == 'c' ||
                    e == 'd' ||
                    e == 'e' ||
                    e == 'f' ||
                    e == 'g' ||
                    e == 'h' ||
                    e == 'i' ||
                    e == 'j' ||
                    e == 'k' ||
                    e == 'l' ||
                    e == 'm' ||
                    e == 'n' ||
                    e == 'o' ||
                    e == 'p' ||
                    e == 'q' ||
                    e == 'r' ||
                    e == 's' ||
                    e == 't' ||
                    e == 'u' ||
                    e == 'v' ||
                    e == 'w' ||
                    e == 'x' ||
                    e == 'y' ||
                    e == 'z' ||
                    e == 'à' ||
                    e == 'á' ||
                    e == 'â' ||
                    e == 'ã' ||
                    e == 'è' ||
                    e == 'é' ||
                    e == 'ê' ||
                    e == 'ì' ||
                    e == 'í' ||
                    e == 'î' ||
                    e == 'ò' ||
                    e == 'ó' ||
                    e == 'ô' ||
                    e == 'õ' ||
                    e == 'ù' ||
                    e == 'ú' ||
                    e == 'û' ||
                    e == 'ç' ||
                    e == '-' ||
                    e == '_' ||
                    e == ' '
                ) {
                    r += s[i]
                }
            }
        }
        return r.trim()
    }

    characterPure(s) {
        let r = ''
        if (typeof s == 'string') {
            for (let i = 0; i < s.length; i++) {
                const e = s[i].toLowerCase()
                if (
                    e == 'a' ||
                    e == 'b' ||
                    e == 'c' ||
                    e == 'd' ||
                    e == 'e' ||
                    e == 'f' ||
                    e == 'g' ||
                    e == 'h' ||
                    e == 'i' ||
                    e == 'j' ||
                    e == 'k' ||
                    e == 'l' ||
                    e == 'm' ||
                    e == 'n' ||
                    e == 'o' ||
                    e == 'p' ||
                    e == 'q' ||
                    e == 'r' ||
                    e == 's' ||
                    e == 't' ||
                    e == 'u' ||
                    e == 'v' ||
                    e == 'w' ||
                    e == 'x' ||
                    e == 'y' ||
                    e == 'z'
                ) {
                    r += s[i]
                }
            }
        }
        return r
    }
}

// EMAIL
function email(s) {
    let r = ''
    if (typeof s == 'string') {
        for (let i = 0; i < s.length; i++) {
            const e = s[i].toLowerCase()
            if (
                e == '0' ||
                e == '1' ||
                e == '2' ||
                e == '3' ||
                e == '4' ||
                e == '5' ||
                e == '6' ||
                e == '7' ||
                e == '8' ||
                e == '9' ||
                e == 'a' ||
                e == 'b' ||
                e == 'c' ||
                e == 'd' ||
                e == 'e' ||
                e == 'f' ||
                e == 'g' ||
                e == 'h' ||
                e == 'i' ||
                e == 'j' ||
                e == 'k' ||
                e == 'l' ||
                e == 'm' ||
                e == 'n' ||
                e == 'o' ||
                e == 'p' ||
                e == 'q' ||
                e == 'r' ||
                e == 's' ||
                e == 't' ||
                e == 'u' ||
                e == 'v' ||
                e == 'w' ||
                e == 'x' ||
                e == 'y' ||
                e == 'z' ||
                e == 'à' ||
                e == 'á' ||
                e == 'â' ||
                e == 'ã' ||
                e == 'è' ||
                e == 'é' ||
                e == 'ê' ||
                e == 'ì' ||
                e == 'í' ||
                e == 'î' ||
                e == 'ò' ||
                e == 'ó' ||
                e == 'ô' ||
                e == 'õ' ||
                e == 'ù' ||
                e == 'ú' ||
                e == 'û' ||
                e == 'ç' ||
                e == '@' ||
                e == '-' ||
                e == '_' ||
                e == '.'
            ) {
                r += s[i]
            }
        }
    }
    return r
}