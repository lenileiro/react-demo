if('serviceWorker' in navigator){
    try { 
        navigator.serviceWorker.register('sw.js')
    } catch (error){
        console.log(error)
    }
}