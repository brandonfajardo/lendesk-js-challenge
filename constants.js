const constants = {
    BASE: 'https://api.iextrading.com/1.0/stock/',
    COMPANY_URL: function(inputVal) {
        return `${this.BASE}${inputVal}/company`
    },
    PRICE_URL: function(inputVal) {
        return `${this.BASE}${inputVal}/price`
    }
}