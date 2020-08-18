import registerServiceWorker from "./service-worker/register"
import nav from "./nav"
import requestNotificationPermission from "./notification";


const main = () => {
    registerServiceWorker()
    requestNotificationPermission()
    nav()
}

export default main
