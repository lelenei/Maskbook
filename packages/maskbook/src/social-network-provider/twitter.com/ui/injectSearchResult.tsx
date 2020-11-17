import { MutationObserverWatcher } from '@dimensiondev/holoflows-kit/es'
import React from 'react'
import { Flags } from '../../../utils/flags'
import { renderInShadowRoot } from '../../../utils/shadow-root/renderInShadowRoot'
import { searchResultHeadingSelector } from '../utils/selector'
import { twitterUrl } from '../utils/url'

export function injectSearchResultAtTwitter() {
    if (location.hostname.indexOf(twitterUrl.hostIdentifier) === -1) return
    if (location.pathname !== '/search') return
    const watcher = new MutationObserverWatcher(searchResultHeadingSelector())
        .setDOMProxyOption({
            afterShadowRootInit: { mode: Flags.using_ShadowDOM_attach_mode },
        })
        .startWatch({
            childList: true,
            subtree: true,
        })

    renderInShadowRoot(<SearchBoxAtTwitter />, { shadow: () => watcher.firstDOMProxy.afterShadow })
}

function SearchBoxAtTwitter() {
    return <div>Search Box At Twitter</div>
}
