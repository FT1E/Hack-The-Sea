import ReactGA from 'react-ga4'

ReactGA.initialize('G-L1683XMKLN')

const getProfile = () => {
    try {
        return JSON.parse(localStorage.getItem('userProfile') || '{}')
    } catch {
        return {}
    }
}

export const trackEvent = (eventName, extraData = {}) => {
    const profile = getProfile()
    ReactGA.event(eventName, {
        ...profile,
        ...extraData,
    })
}

export const trackPageView = (page) => {
    const profile = getProfile()
    ReactGA.send({
        hitType: 'pageview',
        page,
        ...profile,
    })
}