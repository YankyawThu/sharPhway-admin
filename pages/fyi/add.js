import { useState } from "react"
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { saveFyi } from '@/lib/api/fyi'
import { useShowErrorContext } from '@/lib/context/showErrorProvider'
import Loading from '@/components/loading'

const CustomEditor = dynamic( () => import( '@/components/editor' ), { ssr: false } )

export default function Add() {
    const [fyi, setFyi] = useState({
        title: '',
        content: ''
    })
    const {loading, isLoading, isError} = useShowErrorContext()

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await saveFyi(fyi)
            alert(data.msg)
            router.push('/fyi')
        } catch (error) {
            isError('Error saving data')
        } finally {
            // isLoading(false)
        }
    }

    const handleTitle = val => {
        const data = {...fyi, title: val}
        setFyi(data)
    }

    const handleContent = val => {
        const data = {...fyi, content: val}
        setFyi(data)
    }

    return (
        <>
        <div className="bg-white py-3 p-7 rounded-lg">
            <form method="POST" onSubmit={handleSubmit}>
                <div className="my-3">
                    <div className="text-gray-400">Title</div>
                    <input name="title" placeholder="eg., ထိုင်းမလေးရဲ့အချစ်ရအောင်ဘယ်လိုကြိုးစားရမလဲ" type="text" value={fyi.title} onChange={(e) => handleTitle(e.target.value)} className="block focus:outline-none bg-transparent p-2 w-full border-[1px] border-gray-500 text-gray-600 rounded-lg" required/>
                </div>
                <div className="my-3">
                    <div className="text-gray-400">Content</div>
                    <CustomEditor text={fyi.content} setText={handleContent} />
                </div>
                
                <div className="mt-7 mb-3">
                    <button type="submit" className="bg-blue-50 border-[1px] border-blue-500 text-blue-500 py-2 px-3 rounded-lg mr-1">Submit</button>
                    <button type="button" onClick={() => router.push('/fyi')} className="bg-yellow-50 border-[1px] border-yellow-600 text-yellow-600 py-2 px-3 rounded-lg">Cancel</button>
                </div>
            </form>
        </div>
        </>
    )
}