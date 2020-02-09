export class UfBrClass {
    validity(e) {
        if (typeof e == 'string') {
            e = e.toUpperCase(e).trim()
            if (e == 'AC') {
                return 'AC'
            }
            else if (e == 'AL') {
                return 'AL'
            }
            else if (e == 'AP') {
                return 'AP'
            }
            else if (e == 'AM') {
                return 'AM'
            }
            else if (e == 'BA') {
                return 'BA'
            }
            else if (e == 'CE') {
                return 'CE'
            }
            else if (e == 'DF') {
                return 'DF'
            }
            else if (e == 'ES') {
                return 'ES'
            }
            else if (e == 'GO') {
                return 'GO'
            }
            else if (e == 'MA') {
                return 'MA'
            }
            else if (e == 'MT') {
                return 'MT'
            }
            else if (e == 'MS') {
                return 'MS'
            }
            else if (e == 'MG') {
                return 'MG'
            }
            else if (e == 'PA') {
                return 'PA'
            }
            else if (e == 'PB') {
                return 'PB'
            }
            else if (e == 'PR') {
                return 'PR'
            }
            else if (e == 'PE') {
                return 'PE'
            }
            else if (e == 'PI') {
                return 'PI'
            }
            else if (e == 'RJ') {
                return 'RJ'
            }
            else if (e == 'RN') {
                return 'RN'
            }
            else if (e == 'RS') {
                return 'RS'
            }
            else if (e == 'RO') {
                return 'RO'
            }
            else if (e == 'RR') {
                return 'RR'
            }
            else if (e == 'SC') {
                return 'SC'
            }
            else if (e == 'SP') {
                return 'SP'
            }
            else if (e == 'SE') {
                return 'SE'
            }
            else if (e == 'TO') {
                return 'TO'
            }
        }
        return ''
    }

    UFtoText(e) {
        if (typeof e == 'string') {
            if (e == 'AC') {
                return 'Acre'
            }
            else if (e == 'AL') {
                return 'Alagoas'
            }
            else if (e == 'AP') {
                return 'Amapá'
            }
            else if (e == 'AM') {
                return 'Amazonas'
            }
            else if (e == 'BA') {
                return 'Bahia '
            }
            else if (e == 'CE') {
                return 'Ceará'
            }
            else if (e == 'DF') {
                return 'Distrito Federal '
            }
            else if (e == 'ES') {
                return 'Espírito Santo'
            }
            else if (e == 'GO') {
                return 'Goiás'
            }
            else if (e == 'MA') {
                return 'Maranhão'
            }
            else if (e == 'MT') {
                return 'Mato Grosso'
            }
            else if (e == 'MS') {
                return 'Mato Grosso do Sul'
            }
            else if (e == 'MG') {
                return 'Minas Gerais'
            }
            else if (e == 'PA') {
                return 'Pará'
            }
            else if (e == 'PB') {
                return 'Paraíba'
            }
            else if (e == 'PR') {
                return 'Paraná'
            }
            else if (e == 'PE') {
                return 'Pernambuco'
            }
            else if (e == 'PI') {
                return 'Piauí'
            }
            else if (e == 'RJ') {
                return 'Rio de Janeiro'
            }
            else if (e == 'RN') {
                return 'Rio Grande do Norte'
            }
            else if (e == 'RS') {
                return 'Rio Grande do Sul'
            }
            else if (e == 'RO') {
                return 'Rondônia'
            }
            else if (e == 'RR') {
                return 'Roraima'
            }
            else if (e == 'SC') {
                return 'Santa Catarina'
            }
            else if (e == 'SP') {
                return 'São Paulo'
            }
            else if (e == 'SE') {
                return 'Sergipe'
            }
            else if (e == 'TO') {
                return 'Tocantins'
            }
        }
        return undefined
    }
}