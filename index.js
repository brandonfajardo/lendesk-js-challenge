const app = {
    cache: {},
    initialize: () => {
        const textInput = document.querySelector('input')
        textInput.addEventListener('keyup', util.debounce(app.findStock, 200))
    },
    findStock: e => {
        const stockSymbol = document.querySelector('#symbol')
        const stockDescription = document.querySelector('#description')
        const stockPrice = document.querySelector('#price')
        const inputVal = e.target.value.toUpperCase()

        if (app.cache[inputVal]){
            stockSymbol.innerHTML = app.cache[inputVal].data.symbol
            stockDescription.innerHTML = app.cache[inputVal].data.description
            stockPrice.innerHTML = `$${app.cache[inputVal].price}`
        } else {
            const urls = [constants.COMPANY_URL(inputVal), constants.PRICE_URL(inputVal)]
            const promises = urls.map(url => fetch(url).then(data => data.json()))

            Promise.all(promises)
                .then(data => {
                     const { symbol, description } = data[0]
                    const price = data[1]
                    app.cache[symbol] = { data: data[0], price }
                    
                    stockSymbol.innerHTML = symbol
                    stockDescription.innerHTML = description
                    stockPrice.innerHTML = `$${price}`
                })
                .catch(function() {
                    stockSymbol.innerHTML = ''
                    stockDescription.innerHTML = ''
                    stockPrice.innerHTML = ''
                })
        }   
    }
}

app.initialize()