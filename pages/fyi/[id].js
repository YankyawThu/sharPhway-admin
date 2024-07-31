import { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { getFyi, updateFyi } from '@/lib/api/fyi'
import { useShowErrorContext } from '@/lib/context/showErrorProvider'
import Loading from '@/components/loading'

const CustomEditor = dynamic( () => import( '@/components/editor' ), { ssr: false } )

export default function Edit() {
    const [fyi, setFyi] = useState({})
    const {loading, isLoading, isError} = useShowErrorContext()

    const router = useRouter()
    
    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await getFyi(router.query.id)
                setFyi(data)
            } catch (error) {
                isError('Error fetching data')
            } finally {
                isLoading(false)
            }
        }
        loadData()
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await updateFyi(fyi, router.query.id)
            alert(data.msg)
            router.push('/fyi')
        } catch (error) {
            isError('Error updating data')
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
        {loading ? (
            <Loading />
        ) : <>
            <div className="bg-white py-3 p-7 rounded-lg">
                <form method="POST" onSubmit={handleSubmit}>
                    <div className="my-3">
                        <div className="text-gray-400">Title</div>
                        <input name="title" placeholder="eg., ထိုင်းမလေးတွေကိုချစ်တဲ့အကြောင်း နေ့တိိုင်းသတင်းလုပ်ပြီးရေးမယ်" type="text" value={fyi.title} onChange={(e) => handleTitle(e.target.value)} className="block focus:outline-none bg-transparent p-2 w-full border-[1px] border-gray-500 text-gray-600 rounded-lg" required/>
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
        }
        </>
    )
}