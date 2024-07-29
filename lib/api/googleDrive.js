export const saveImagesToDrive = async (files) => {
    try {
        const formData = new FormData()
        Array.from(files).forEach(item => {
            formData.append('file', item.img)
        })
        const response = await fetch(`/api/googleDrive`, {
            method: 'POST',
            body: formData
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