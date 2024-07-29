import { useState, useEffect, useRef } from "react"
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { TiDelete } from "react-icons/ti"

const CustomEditor = dynamic( () => import( '@/components/editor' ), { ssr: false } )

export default function Edit() {
    const [title, setTitle] = useState('')
    const [img, setImg] = useState([])
    const [content, setContent] = useState('')
    const maxFiles = 5
    const router = useRouter()
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/news/${router.query.id}`)
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const data = await response.json()
                setTitle(data.title)
                setContent(data.content)
                const array = [{preview: '', img: data.img1 ?? ''}, {preview: '', img: data.img2 ?? ''}, {preview: '', img: data.img3 ?? ''}, {preview: '', img: data.img4 ?? ''}, {preview: '', img: data.img5 ?? ''}]
                const filteredArray = array.filter(item => item.img.trim() !== '')
                setImg(filteredArray)
            } catch (error) {
                console.error('Error fetching:', error)
            } finally {
                // setLoading(false)
            }
        }
        fetchData()
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        let imgsArray = img.filter(item => typeof item.img == 'string')
        const filesArray = img.filter(item => item.img instanceof File)
        if(filesArray.length > 0) {
            const formData = new FormData()
            Array.from(filesArray).forEach(file => {
                formData.append('file', file.img)
            })
            const response = await fetch('/api/googleDrive', {
                method: 'POST',
                body: formData
            })
            const imgUrls = await response.json()
            imgUrls.map(imgUrl => {
                imgsArray = [...imgsArray, {preview: '', img: imgUrl.thumbnailLink}]
            })
            if(!response.ok) {
                alert(data.msg)
            }
        }
        const response = await fetch(`/api/news/${router.query.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                content,
                imgsArray
            })
        })

        const data = await response.json()
        if(response.ok) {
            alert(data.msg)
            router.push('/news')
        }
        else alert(data.msg)
    }

    const handleFileChange = async (event) => {
        event.preventDefault()

        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImg(prevstate => [...prevstate, {preview: reader.result, img: file}])
            }
            reader.readAsDataURL(file)
        }
    }

    const handleFileDelete = (key) => {
        const array = [...img]
        const newArray = array.filter((_, index) => index !== key)
        setImg([...newArray])
    }

    return (
        <div className="bg-white py-3 p-7 rounded-lg">
            <form method="POST" onSubmit={handleSubmit}>
                <div className="my-3">
                    <div className="text-gray-400">Images (Not more than 5 images)</div>
                    <div className="flex flex-row gap-5 my-2">
                        {img?.map((item, key) => (
                            <div key={key} className="relative p-5 rounded-lg border-[1px] border-gray-500">
                                <TiDelete onClick={() => handleFileDelete(key)} className="absolute text-[30px] text-red-700 -top-3 -right-3 bg-white cursor-pointer" />
                                <Image src={item.preview == '' ? item.img : item.preview} width="130" height="130" alt="image" className="w-[130px] h-[130px]" />
                            </div>
                        ))}
                    </div>
                    {img.length <= maxFiles-1 ?
                    <input name="image" type="file" onChange={handleFileChange} accept="image/*" className="block focus:outline-none bg-transparent p-2 w-full border-[1px] border-gray-500 text-gray-600 rounded-lg"/>
                    :
                    ''
                    }
                </div>
                <div className="my-3">
                    <div className="text-gray-400">Title</div>
                    <input name="title" placeholder="eg., ထိုင်းမလေးတွေကိုချစ်တဲ့အကြောင်း နေ့တိိုင်းသတင်းလုပ်ပြီးရေးမယ်" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="block focus:outline-none bg-transparent p-2 w-full border-[1px] border-gray-500 text-gray-600 rounded-lg" required/>
                </div>
                <div className="my-3">
                    <div className="text-gray-400">Content</div>
                    <CustomEditor text={content} setText={setContent} />
                </div>
                
                <div className="mt-7 mb-3">
                    <button type="submit" className="bg-blue-50 border-[1px] border-blue-500 text-blue-500 py-2 px-3 rounded-lg mr-1">Submit</button>
                    <button type="button" onClick={() => router.push('/news')} className="bg-yellow-50 border-[1px] border-yellow-600 text-yellow-600 py-2 px-3 rounded-lg">Cancel</button>
                </div>
            </form>
        </div>
    )
}