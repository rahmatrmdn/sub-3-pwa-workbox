import runtime from 'serviceworker-webpack-plugin/lib/runtime'
import registerEvents from 'serviceworker-webpack-plugin/lib/browser/registerEvents'

const registerServiceWorker = () => {
    if ('serviceWorker' in navigator) {
        const registration = runtime.register()

        registerEvents(registration, {
            onInstalled: () => {
                console.log('onInstalled')
            },
            onUpdateReady: () => {
                console.log('onUpdateReady')
            },

            onUpdating: () => {
                console.log('onUpdating')
            },
            onUpdateFailed: () => {
                console.log('onUpdateFailed')
            },
            onUpdated: () => {
                console.log('onUpdated')
            },
        })
    } else {
        console.log('serviceWorker not available')
    }
}

export default registerServiceWorker