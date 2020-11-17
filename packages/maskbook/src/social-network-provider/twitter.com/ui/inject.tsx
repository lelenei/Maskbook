import type { SocialNetworkUIInjections } from '../../../social-network/ui'
import { injectPostDialogAtTwitter } from './injectPostDialog'
import { injectPostDialogHintAtTwitter } from './injectPostDialogHint'
import { injectPostInspectorAtTwitter } from './injectPostInspector'
import { injectPostDialogIconAtTwitter } from './injectPostDialogIcon'
import { injectPostReplacerAtTwitter } from './injectPostReplacer'
import { injectPageInspectorDefault } from '../../../social-network/defaults/injectPageInspector'
import { injectSearchResultAtTwitter } from './injectSearchResult'

const injectPostBox = () => {
    injectPostDialogAtTwitter()
    injectPostDialogHintAtTwitter()
    injectPostDialogIconAtTwitter()
}

export const twitterUIInjections: SocialNetworkUIInjections = {
    injectPostBox,
    injectSearchResultBox: injectSearchResultAtTwitter,
    injectPostReplacer: injectPostReplacerAtTwitter,
    injectPostInspector: injectPostInspectorAtTwitter,
    injectPageInspector: injectPageInspectorDefault(),
}
