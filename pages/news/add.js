import { useState } from "react"
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { TiDelete } from "react-icons/ti"
import { saveNews } from '@/lib/api/news'
import { MAX_FILES } from '@/lib/config/const'

const CustomEditor = dynamic( () => import( '@/components/editor' ), { ssr: false } )

export default function Add() {
    const [news, setNews] = useState({
        title: '',
        content: '',
        img: []
    })
    const [error, setError] = useState(null)

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await saveNews(news)
            alert(data.msg)
            router.push('/news')
        } catch (error) {
            setError('Error saving data')
        } finally {
            // setLoading(false)
        }
    }

    const handleFileDelete = (key) => {
        const array = [...news.img]
        const newArray = array.filter((_, index) => index !== key)
        setNews({...news, img: newArray})
    }

    const handleFileChange = async (event) => {
        event.preventDefault()
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const img = [...news.img, {preview: reader.result, img: file}]
                const data = {...news, img}
                setNews(data)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleTitle = val => {
        const data = {...news, title: val}
        setNews(data)
    }

    const handleContent = val => {
        const data = {...news, content: val}
        setNews(data)
    }

    return (
        <>
        {error ? (
            <p>{error}</p>
        ) : (
        <div className="bg-white py-3 p-7 rounded-lg">
            <form method="POST" onSubmit={handleSubmit}>
                <div className="my-3">
                    <div className="text-gray-400">Images (Not more than 5 images)</div>
                    <div className="flex flex-row gap-5 my-2">
                        {news.img?.map((item, key) => (
                            <div key={key} className="relative p-5 rounded-lg border-[1px] border-gray-500">
                                <TiDelete onClick={() => handleFileDelete(key)} className="absolute text-[30px] text-red-700 -top-3 -right-3 bg-white cursor-pointer" />
                                <Image src={item.preview} width="130" height="130" alt="image" className="w-[130px] h-[130px]" />
                            </div>
                        ))}
                    </div>
                    {news.img.length <= MAX_FILES-1 ?
                    <input name="image" type="file" onChange={handleFileChange} accept="image/*" className="block focus:outline-none bg-transparent p-2 w-full border-[1px] border-gray-500 text-gray-600 rounded-lg"/>
                    :
                    ''
                    }
                </div>
                <div className="my-3">
                    <div className="text-gray-400">Title</div>
                    <input name="title" placeholder="eg., ထိုင်းမလေးတွေကိုချစ်တဲ့အကြောင်း နေ့တိိုင်းသတင်းလုပ်ပြီးရေးမယ်" type="text" value={news.title} onChange={(e) => handleTitle(e.target.value)} className="block focus:outline-none bg-transparent p-2 w-full border-[1px] border-gray-500 text-gray-600 rounded-lg" required/>
                </div>
                <div className="my-3">
                    <div className="text-gray-400">Content</div>
                    <CustomEditor text={news.content} setText={handleContent} />
                </div>
                
                <div className="mt-7 mb-3">
                    <button type="submit" className="bg-blue-50 border-[1px] border-blue-500 text-blue-500 py-2 px-3 rounded-lg mr-1">Submit</button>
                    <button type="button" onClick={() => router.push('/news')} className="bg-yellow-50 border-[1px] border-yellow-600 text-yellow-600 py-2 px-3 rounded-lg">Cancel</button>
                </div>
            </form>
        </div>
        )}
        </>
    )
}