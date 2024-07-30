export const fetchFyis = async () => {
    try {
        const response = await fetch('/api/fyi')
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

export const getFyi = async (id) => {
    try {
        const response = await fetch(`/api/fyi/${id}`)
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

export const saveFyi = async (data) => {
    try {
        const response = await fetch(`/api/fyi`, {
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

export const updateFyi = async (data, id) => {
    try {
        const response = await fetch(`/api/fyi/${id}`, {
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

export const deleteFyi = async (id) => {
    try {
        const response = await fetch(`/api/fyi/${id}`, { method: 'DELETE' })
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