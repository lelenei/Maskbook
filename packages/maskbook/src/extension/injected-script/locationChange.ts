export const LOCATION_CHANGE_EVENT_NAME = 'locationchange'

// Learn more about this hack from https://stackoverflow.com/a/52809105/1986338
history.pushState = ((f) =>
    function pushState(data: any, title: string, url?: string | null | undefined) {
        var ret = f.apply(history, [data, title, url])
        window.dispatchEvent(new Event('pushstate'))
        window.dispatchEvent(new Event(LOCATION_CHANGE_EVENT_NAME))
        return ret
    })(history.pushState)

history.replaceState = ((f) =>
    function replaceState(data: any, title: string, url?: string | null | undefined) {
        var ret = f.apply(history, [data, title, url])
        window.dispatchEvent(new Event('replacestate'))
        window.dispatchEvent(new Event(LOCATION_CHANGE_EVENT_NAME))
        return ret
    })(history.replaceState)

window.addEventListener('popstate', () => {
    window.dispatchEvent(new Event(LOCATION_CHANGE_EVENT_NAME))
})

// declare interface WindowEventMap {
//     locationchange: Event
// }
