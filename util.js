const util = {
    debounce: (fn, wait, immediate) => {  
        let timeout
        return function(...args) {
            if (immediate && !timeout) {
            fn.apply(this, args)
            }
            clearTimeout(timeout)
            timeout = setTimeout(function() {
            timeout = null
            if (!immediate) {
                fn.apply(this, args)
            }
            }, wait)
        }
    }
}