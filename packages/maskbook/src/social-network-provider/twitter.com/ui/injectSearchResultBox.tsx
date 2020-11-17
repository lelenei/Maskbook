import React from 'react'
import { MutationObserverWatcher } from '@dimensiondev/holoflows-kit/es'
import { SearchResultBox } from '../../../components/InjectedComponents/SearchResultBox'
import { Flags } from '../../../utils/flags'
import { renderInShadowRoot } from '../../../utils/shadow-root/renderInShadowRoot'
import { searchResultHeadingSelector } from '../utils/selector'
import { twitterUrl } from '../utils/url'

export function injectSearchResultBoxAtTwitter() {
    if (location.hostname.indexOf(twitterUrl.hostIdentifier) === -1) return
    const watcher = new MutationObserverWatcher(searchResultHeadingSelector())
        .setDOMProxyOption({
            afterShadowRootInit: { mode: Flags.using_ShadowDOM_attach_mode },
        })
        .startWatch({
            childList: true,
            subtree: true,
        })

    renderInShadowRoot(<SearchResultBoxAtTwitter />, { shadow: () => watcher.firstDOMProxy.afterShadow })
}

function SearchResultBoxAtTwitter() {
    return <SearchResultBox keyword="$UNI" />
}
