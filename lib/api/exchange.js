export const fetchExchanges = async () => {
    try {
        const response = await fetch('/api/exchange')
        if (!response.ok) {
            const data = await response.json()
            throw new Error(data.msg)
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching:', error)
        throw error
    }
}

export const getExchange = async (id) => {
    try {
        const response = await fetch(`/api/exchange/${id}`)
        if (!response.ok) {
            const data = await response.json()
            throw new Error(data.msg)
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching:', error)
        throw error
    }
}

export const saveExchange = async (data) => {
    try {
        const response = await fetch(`/api/exchange`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({data})
        })
        if (!response.ok) {
            const data = await response.json()
            throw new Error(data.msg)
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching:', error)
        throw error
    }
}

export const updateExchange = async (data, id) => {
    try {
        const response = await fetch(`/api/exchange/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({data})
        })
        if (!response.ok) {
            const data = await response.json()
            throw new Error(data.msg)
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching:', error)
        throw error
    }
}

export const deleteExchange = async (id) => {
    try {
        const response = await fetch(`/api/exchange/${id}`, { method: 'DELETE' })
        if (!response.ok) {
            const data = await response.json()
            throw new Error(data.msg)
        }
        return await response.json()
    } catch (error) {
        console.error('Error deleting:', error)
        throw error
    }
}