import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiPlus } from "react-icons/fi"
import { fetchNews, deleteNews } from '@/lib/api/news'
import { timeDiffFromDate } from '@/lib/utils/helper'
import { useShowErrorContext } from '@/lib/context/showErrorProvider'
import Loading from '@/components/loading'

export default function Index() {
    const [news, setNews] = useState([])
    const {loading, isLoading, isError} = useShowErrorContext()
    
    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchNews()
                setNews(data)
            } catch (error) {
                isError('Error fetching data')
            } finally {
                isLoading(false)
            }
        }
        loadData()
    }, [])

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await deleteNews(id)
                setNews((prev) => prev.filter((item) => item.id !== id))
            } catch (error) {
                isError('Error deleting data')
            }
        }
    }

    return (
        <>
        {loading ? (
            <Loading />
        ) : <>
            <Link href="/news/add" className="inline-flex items-center p-2 bg-green-50 border-[1px] border-green-500 text-green-500 rounded-lg"><FiPlus className="text-lg mr-1" />Add</Link>
            <table className="w-full leading-normal mt-2">
                <thead>
                    <tr>
                        <th
                            scope="col"
                            className="border-b border-gray-200 bg-white py-3 pl-5 text-left text-gray-400 font-thin text-sm rounded-tl-lg"
                        >
                            Title
                        </th>
                        <th
                            scope="col"
                            className="border-b border-gray-200 bg-white py-3 pl-5 text-left text-gray-400 font-thin text-sm"
                        >
                            Content
                        </th>
                        <th
                            scope="col"
                            className="border-b border-gray-200 bg-white py-3 pl-5 text-left text-gray-400 font-thin text-sm"
                        >
                            Updated At
                        </th>
                        <th
                            scope="col"
                            className="border-b border-gray-200 bg-white py-3 pl-5 text-left text-gray-400 font-thin text-sm rounded-tr-lg"
                        >
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {news?.map(item => (
                        <tr key={item.id} className="bg-white">
                            <td className="pl-5 py-5 text-gray-600">{item.title}</td>
                            <td className="pl-5 py-5 text-gray-600 max-w-[300px] truncate">{item.content}</td>
                            <td className="pl-5 py-5 text-gray-400">{timeDiffFromDate(item.updatedAt)}</td>
                            <td className="">
                                <div className="flex self-center gap-1">
                                    <Link href={`/news/${item.id}`} className="p-2 bg-blue-50 border-[1px] border-blue-500 text-blue-500 rounded-lg text-xs">Edit</Link>
                                    <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-50 border-[1px] border-red-500 text-red-500 rounded-lg text-xs">Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
        }
        </>
    )
}