import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState<string | null>(null)
    const [sellerID, setSellerID] = useState<string | null>(null)

    const login = useCallback((jwtToken: string, id: string) => {
        setToken(jwtToken)
        setSellerID(id)

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken
        }))
    }, [])


    const logout = useCallback(() => {
        setToken(null)
        setSellerID(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(<string>localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId)
        }
    }, [login])


    return { login, logout, token, sellerID }
}
