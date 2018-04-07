const app = {
    cache: {},
    initialize: function() {
        const textInput = document.querySelector('input')
        textInput.addEventListener('keyup', util.debounce(this.findStock.bind(this), 200))
    },
    findStock: function(e) {
        const stockSymbol = document.querySelector('#symbol')
        const stockDescription = document.querySelector('#description')
        const stockPrice = document.querySelector('#price')
        const inputVal = e.target.value.toUpperCase()

        if (this.cache[inputVal]){
            stockSymbol.innerHTML = this.cache[inputVal].data.symbol
            stockDescription.innerHTML = this.cache[inputVal].data.description
            stockPrice.innerHTML = `$${this.cache[inputVal].price}`
        } else {
            const urls = [constants.COMPANY_URL(inputVal), constants.PRICE_URL(inputVal)]
            const promises = urls.map(url => fetch(url).then(data => data.json()))

            Promise.all(promises)
                .then(data => {
                    const { symbol, description } = data[0]
                    const price = data[1]
                    this.cache[symbol] = { data: data[0], price }
                    
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