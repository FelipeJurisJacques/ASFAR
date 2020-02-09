if (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0)) {
    let input = document.querySelectorAll('input')

    let numeric = []

    input.forEach(e => {
        if (e.type == "number") {
            numeric.push(e)
        }
    })

    numeric.forEach(e => {
        e.type = 'range'
    })
}

let faixa = document.querySelectorAll('.faixa')
faixa.forEach(e => {
    let i = e.querySelector('input')
    let div = e.querySelector('div')
    i.addEventListener('change', _setFaixa(div, i))
    console.log('listou')
})

function _setFaixa(e, i){
    console.log('foi')
    e.innerHTML = 'Faixa entre ' + i.value + ' e ' + '(numero)'
    console.log(e)
}