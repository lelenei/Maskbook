import { useCallback, useEffect, useState } from 'react'
import { getActivatedUI } from '../../../social-network/ui'

export function useSearchedKeyword() {
    const internalName = getActivatedUI()?.internalName
    const [keyword, setKeyword] = useState('')

    const onLocationChange = useCallback(() => {
        const params = new URLSearchParams(location.search)
        if (internalName === 'twitter' && location.pathname === '/search' && !params.get('f'))
            setKeyword(decodeURIComponent(params.get('q') ?? ''))
        else setKeyword('')
    }, [])

    useEffect(() => {
        onLocationChange()
        window.addEventListener('locationchange', onLocationChange)
        return () => window.removeEventListener('locationchange', onLocationChange)
    }, [onLocationChange])
    return keyword
}
