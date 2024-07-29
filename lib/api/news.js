import { saveImagesToDrive } from './googleDrive'

export const fetchNews = async () => {
    try {
        const response = await fetch('/api/news')
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

export const getNews = async (id) => {
    try {
        const response = await fetch(`/api/news/${id}`)
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

export const saveNews = async (data) => {
    try {
        const imgs = await saveImagesToDrive(data.img)
        const response = await fetch(`/api/news`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: data.title,
                content: data.content,
                imgs: imgs
            })
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

export const updateNews = async (data, id) => {
    try {
        let imgsArray = data.img.filter(item => typeof item.img == 'string')
        const filesArray = data.img.filter(item => item.img instanceof File)
        if(filesArray.length > 0) {
            const imgs = await saveImagesToDrive(filesArray)
            imgs.map(img => {
                imgsArray = [...imgsArray, {preview: '', img: img.thumbnailLink}]
            })
        }
        const response = await fetch(`/api/news/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: data.title,
                content: data.content,
                imgs: imgsArray
            })
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

export const deleteNews = async (id) => {
    try {
        const response = await fetch(`/api/news/${id}`, { method: 'DELETE' })
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